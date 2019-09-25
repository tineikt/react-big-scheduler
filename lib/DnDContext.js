'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = undefined;

var _reactDnd = require('react-dnd');

var _Util = require('./Util');

var _DnDTypes = require('./DnDTypes');

var _index = require('./index');

var _ViewTypes = require('./ViewTypes');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DnDContext = function DnDContext(sources, DecoratedComponent) {
    var _this = this;

    _classCallCheck(this, DnDContext);

    this.getDropSpec = function () {
        return {
            drop: function drop(props, monitor, component) {
                var schedulerData = props.schedulerData,
                    resourceEvents = props.resourceEvents;
                var cellUnit = schedulerData.cellUnit,
                    localeMoment = schedulerData.localeMoment;

                var type = monitor.getItemType();
                var pos = (0, _Util.getPos)(component.eventContainer);
                var cellWidth = schedulerData.getContentCellWidth();
                var initialStartTime = null,
                    initialEndTime = null;
                if (type === _DnDTypes.DnDTypes.EVENT) {
                    var initialPoint = monitor.getInitialClientOffset();
                    var initialLeftIndex = Math.floor((initialPoint.x - pos.x) / cellWidth);
                    initialStartTime = resourceEvents.headerItems[initialLeftIndex].start;
                    initialEndTime = resourceEvents.headerItems[initialLeftIndex].end;
                    if (cellUnit !== _index.CellUnits.Hour) initialEndTime = localeMoment(resourceEvents.headerItems[initialLeftIndex].start).hour(23).minute(59).second(59).format(_index.DATETIME_FORMAT);
                }
                var point = monitor.getClientOffset();
                var leftIndex = Math.floor((point.x - pos.x) / cellWidth);
                console.log("getDropSpec leftIndex", leftIndex);
                var startTime = resourceEvents.headerItems[leftIndex].start;
                var endTime = resourceEvents.headerItems[leftIndex].end;
                if (cellUnit !== _index.CellUnits.Hour) endTime = localeMoment(resourceEvents.headerItems[leftIndex].start).hour(23).minute(59).second(59).format(_index.DATETIME_FORMAT);

                return {
                    slotId: resourceEvents.slotId,
                    slotName: resourceEvents.slotName,
                    start: startTime,
                    end: endTime,
                    initialStart: initialStartTime,
                    initialEnd: initialEndTime
                };
            },

            hover: function hover(props, monitor, component) {
                var schedulerData = props.schedulerData,
                    resourceEvents = props.resourceEvents,
                    movingEvent = props.movingEvent;
                var cellUnit = schedulerData.cellUnit,
                    config = schedulerData.config,
                    viewType = schedulerData.viewType,
                    localeMoment = schedulerData.localeMoment;

                var item = monitor.getItem();
                var type = monitor.getItemType();
                var pos = (0, _Util.getPos)(component.eventContainer);
                var cellWidth = schedulerData.getContentCellWidth();
                var initialStart = null,
                    initialEnd = null;
                if (type === _DnDTypes.DnDTypes.EVENT) {
                    var initialPoint = monitor.getInitialClientOffset();
                    var initialLeftIndex = Math.floor((initialPoint.x - pos.x) / cellWidth);
                    initialStart = resourceEvents.headerItems[initialLeftIndex].start;
                    initialEnd = resourceEvents.headerItems[initialLeftIndex].end;
                    if (cellUnit !== _index.CellUnits.Hour) initialEnd = localeMoment(resourceEvents.headerItems[initialLeftIndex].start).hour(23).minute(59).second(59).format(_index.DATETIME_FORMAT);
                }
                var point = monitor.getClientOffset();
                var leftIndex = Math.floor((point.x - pos.x) / cellWidth);
                var newStart = resourceEvents.headerItems[leftIndex].start;
                var newEnd = resourceEvents.headerItems[leftIndex].end;
                if (cellUnit !== _index.CellUnits.Hour) newEnd = localeMoment(resourceEvents.headerItems[leftIndex].start).hour(23).minute(59).second(59).format(_index.DATETIME_FORMAT);
                var slotId = resourceEvents.slotId,
                    slotName = resourceEvents.slotName;
                var action = 'New';
                var isEvent = type === _DnDTypes.DnDTypes.EVENT;
                if (isEvent) {
                    var event = item;
                    if (config.relativeMove) {
                        newStart = localeMoment(event.start).add(localeMoment(newStart).diff(localeMoment(initialStart)), 'ms').format(_index.DATETIME_FORMAT);
                    } else {
                        if (viewType !== _ViewTypes.ViewTypes.Day) {
                            var tmpMoment = localeMoment(newStart);
                            newStart = localeMoment(event.start).year(tmpMoment.year()).month(tmpMoment.month()).date(tmpMoment.date()).format(_index.DATETIME_FORMAT);
                        }
                    }
                    newEnd = localeMoment(newStart).add(localeMoment(event.end).diff(localeMoment(event.start)), 'ms').format(_index.DATETIME_FORMAT);

                    //if crossResourceMove disabled, slot returns old value
                    if (config.crossResourceMove === false) {
                        slotId = schedulerData._getEventSlotId(item);
                        slotName = undefined;
                        var slot = schedulerData.getSlotById(slotId);
                        if (!!slot) slotName = slot.name;
                    }

                    action = 'Move';
                }

                if (!!movingEvent) {
                    movingEvent(schedulerData, slotId, slotName, newStart, newEnd, action, type, item);
                }
            },

            canDrop: function canDrop(props, monitor) {
                var schedulerData = props.schedulerData,
                    resourceEvents = props.resourceEvents;

                var item = monitor.getItem();
                if (schedulerData._isResizing()) return false;
                var config = schedulerData.config;

                return config.movable && !resourceEvents.groupOnly && (item.movable == undefined || item.movable !== false);
            }
        };
    };

    this.getDropCollect = function (connect, monitor) {
        return {
            connectDropTarget: connect.dropTarget(),
            isOver: monitor.isOver()
        };
    };

    this.getDropTarget = function () {
        return (0, _reactDnd.DropTarget)([].concat(_toConsumableArray(_this.sourceMap.keys())), _this.getDropSpec(), _this.getDropCollect)(_this.DecoratedComponent);
    };

    this.getDndSource = function () {
        var dndType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _DnDTypes.DnDTypes.EVENT;

        return _this.sourceMap.get(dndType);
    };

    this.sourceMap = new Map();
    sources.forEach(function (item) {
        _this.sourceMap.set(item.dndType, item);
    });
    this.DecoratedComponent = DecoratedComponent;
};

exports.default = DnDContext;