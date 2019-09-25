'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp, _initialiseProps;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _popover = require('antd/lib/popover');

var _popover2 = _interopRequireDefault(_popover);

require('antd/lib/popover/style/index.css');

var _EventItemPopover = require('./EventItemPopover');

var _EventItemPopover2 = _interopRequireDefault(_EventItemPopover);

var _index = require('./index');

var _DnDTypes = require('./DnDTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var supportTouch = 'ontouchstart' in window;

var EventItem = (_temp = _class = function (_Component) {
    _inherits(EventItem, _Component);

    function EventItem(props) {
        _classCallCheck(this, EventItem);

        var _this = _possibleConstructorReturn(this, (EventItem.__proto__ || Object.getPrototypeOf(EventItem)).call(this, props));

        _initialiseProps.call(_this);

        var left = props.left,
            top = props.top,
            width = props.width,
            height = props.height;

        _this.state = {
            left: left,
            top: top,
            width: width,
            height: height
        };
        _this.startResizer = null;
        _this.endResizer = null;
        return _this;
    }

    _createClass(EventItem, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(np) {
            var left = np.left,
                top = np.top,
                width = np.width,
                height = np.height;

            this.setState({
                left: left,
                top: top,
                width: width,
                height: height
            });

            this.subscribeResizeEvent(np);
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.subscribeResizeEvent(this.props);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                eventItem = _props.eventItem,
                isStart = _props.isStart,
                isEnd = _props.isEnd,
                isInPopover = _props.isInPopover,
                eventItemClick = _props.eventItemClick,
                schedulerData = _props.schedulerData,
                isDragging = _props.isDragging,
                connectDragSource = _props.connectDragSource,
                connectDragPreview = _props.connectDragPreview,
                eventItemTemplateResolver = _props.eventItemTemplateResolver;
            var config = schedulerData.config,
                localeMoment = schedulerData.localeMoment;
            var _state = this.state,
                left = _state.left,
                width = _state.width,
                top = _state.top,
                height = _state.height;

            var roundCls = isStart ? isEnd ? 'round-all' : 'round-head' : isEnd ? 'round-tail' : 'round-none';
            var bgColor = config.defaultEventBgColor;
            if (!!eventItem.bgColor) bgColor = eventItem.bgColor;

            var titleText = schedulerData.behaviors.getEventTextFunc(schedulerData, eventItem);
            var content = _react2.default.createElement(_EventItemPopover2.default, _extends({}, this.props, {
                eventItem: eventItem,
                title: eventItem.title,
                startTime: eventItem.start,
                endTime: eventItem.end,
                statusColor: bgColor }));

            var start = localeMoment(eventItem.start);
            var eventTitle = isInPopover ? start.format('HH:mm') + ' ' + titleText : titleText;
            var startResizeDiv = _react2.default.createElement('div', null);
            if (this.startResizable(this.props)) startResizeDiv = _react2.default.createElement('div', { className: 'event-resizer event-start-resizer', ref: function ref(_ref) {
                    return _this2.startResizer = _ref;
                } });
            var endResizeDiv = _react2.default.createElement('div', null);
            if (this.endResizable(this.props)) endResizeDiv = _react2.default.createElement('div', { className: 'event-resizer event-end-resizer', ref: function ref(_ref2) {
                    return _this2.endResizer = _ref2;
                } });

            var eventItemTemplate = _react2.default.createElement(
                'div',
                { className: roundCls + ' event-item', key: eventItem.id,
                    style: { height: config.eventItemHeight, backgroundColor: bgColor } },
                _react2.default.createElement(
                    'span',
                    { style: { marginLeft: '10px', lineHeight: config.eventItemHeight + 'px' } },
                    eventTitle
                )
            );
            if (eventItemTemplateResolver != undefined) eventItemTemplate = eventItemTemplateResolver(schedulerData, eventItem, bgColor, isStart, isEnd, 'event-item', config.eventItemHeight, undefined);

            var a = _react2.default.createElement(
                'a',
                { className: 'timeline-event', style: { left: left, width: width, top: top, height: height }, onClick: function onClick() {
                        if (!!eventItemClick) eventItemClick(schedulerData, eventItem);
                    } },
                eventItemTemplate,
                startResizeDiv,
                endResizeDiv
            );

            return isDragging ? null : schedulerData._isResizing() || config.eventItemPopoverEnabled == false || eventItem.showPopover == false ? _react2.default.createElement(
                'div',
                null,
                connectDragPreview(connectDragSource(a))
            ) : _react2.default.createElement(
                _popover2.default,
                { placement: 'bottomLeft', content: content, trigger: 'hover' },
                connectDragPreview(connectDragSource(a))
            );
        }
    }]);

    return EventItem;
}(_react.Component), _class.propTypes = {
    schedulerData: _propTypes.PropTypes.object.isRequired,
    eventItem: _propTypes.PropTypes.object.isRequired,
    isStart: _propTypes.PropTypes.bool.isRequired,
    isEnd: _propTypes.PropTypes.bool.isRequired,
    left: _propTypes.PropTypes.number,
    width: _propTypes.PropTypes.number.isRequired,
    height: _propTypes.PropTypes.number,
    top: _propTypes.PropTypes.number.isRequired,
    isInPopover: _propTypes.PropTypes.bool.isRequired,
    leftIndex: _propTypes.PropTypes.number.isRequired,
    rightIndex: _propTypes.PropTypes.number.isRequired,
    isDragging: _propTypes.PropTypes.bool.isRequired,
    connectDragSource: _propTypes.PropTypes.func.isRequired,
    connectDragPreview: _propTypes.PropTypes.func.isRequired,
    updateEventStart: _propTypes.PropTypes.func,
    updateEventEnd: _propTypes.PropTypes.func,
    moveEvent: _propTypes.PropTypes.func,
    subtitleGetter: _propTypes.PropTypes.func,
    eventItemClick: _propTypes.PropTypes.func,
    viewEventClick: _propTypes.PropTypes.func,
    viewEventText: _propTypes.PropTypes.string,
    viewEvent2Click: _propTypes.PropTypes.func,
    viewEvent2Text: _propTypes.PropTypes.string,
    conflictOccurred: _propTypes.PropTypes.func,
    eventItemTemplateResolver: _propTypes.PropTypes.func
}, _initialiseProps = function _initialiseProps() {
    var _this3 = this;

    this.initStartDrag = function (ev) {
        var _props2 = _this3.props,
            schedulerData = _props2.schedulerData,
            eventItem = _props2.eventItem;

        var slotId = schedulerData._getEventSlotId(eventItem);
        var slot = schedulerData.getSlotById(slotId);
        if (!!slot && !!slot.groupOnly) return;
        if (schedulerData._isResizing()) return;

        ev.stopPropagation();
        var clientX = 0;
        if (supportTouch) {
            if (ev.changedTouches.length == 0) return;
            var touch = ev.changedTouches[0];
            clientX = touch.pageX;
        } else {
            if (ev.buttons !== undefined && ev.buttons !== 1) return;
            clientX = ev.clientX;
        }
        _this3.setState({
            startX: clientX
        });
        schedulerData._startResizing();
        if (supportTouch) {
            _this3.startResizer.addEventListener('touchmove', _this3.doStartDrag, false);
            _this3.startResizer.addEventListener('touchend', _this3.stopStartDrag, false);
            _this3.startResizer.addEventListener('touchcancel', _this3.cancelStartDrag, false);
        } else {
            document.documentElement.addEventListener('mousemove', _this3.doStartDrag, false);
            document.documentElement.addEventListener('mouseup', _this3.stopStartDrag, false);
        }
        document.onselectstart = function () {
            return false;
        };
        document.ondragstart = function () {
            return false;
        };
    };

    this.doStartDrag = function (ev) {
        ev.stopPropagation();

        var clientX = 0;
        if (supportTouch) {
            if (ev.changedTouches.length == 0) return;
            var touch = ev.changedTouches[0];
            clientX = touch.pageX;
        } else {
            clientX = ev.clientX;
        }
        var _props3 = _this3.props,
            left = _props3.left,
            width = _props3.width,
            leftIndex = _props3.leftIndex,
            rightIndex = _props3.rightIndex,
            schedulerData = _props3.schedulerData;

        var cellWidth = schedulerData.getContentCellWidth();
        var offset = leftIndex > 0 ? 5 : 6;
        var minWidth = cellWidth - offset;
        var maxWidth = rightIndex * cellWidth - offset;
        var startX = _this3.state.startX;

        var newLeft = left + clientX - startX;
        var newWidth = width + startX - clientX;
        if (newWidth < minWidth) {
            newWidth = minWidth;
            newLeft = (rightIndex - 1) * cellWidth + (rightIndex - 1 > 0 ? 2 : 3);
        } else if (newWidth > maxWidth) {
            newWidth = maxWidth;
            newLeft = 3;
        }

        _this3.setState({ left: newLeft, width: newWidth });
    };

    this.stopStartDrag = function (ev) {
        ev.stopPropagation();
        if (supportTouch) {
            _this3.startResizer.removeEventListener('touchmove', _this3.doStartDrag, false);
            _this3.startResizer.removeEventListener('touchend', _this3.stopStartDrag, false);
            _this3.startResizer.removeEventListener('touchcancel', _this3.cancelStartDrag, false);
        } else {
            document.documentElement.removeEventListener('mousemove', _this3.doStartDrag, false);
            document.documentElement.removeEventListener('mouseup', _this3.stopStartDrag, false);
        }
        document.onselectstart = null;
        document.ondragstart = null;
        var _props4 = _this3.props,
            width = _props4.width,
            height = _props4.height,
            left = _props4.left,
            top = _props4.top,
            leftIndex = _props4.leftIndex,
            rightIndex = _props4.rightIndex,
            schedulerData = _props4.schedulerData,
            eventItem = _props4.eventItem,
            updateEventStart = _props4.updateEventStart,
            conflictOccurred = _props4.conflictOccurred;

        schedulerData._stopResizing();
        if (_this3.state.width === width) return;

        var clientX = 0;
        if (supportTouch) {
            if (ev.changedTouches.length == 0) {
                _this3.setState({
                    left: left,
                    top: top,
                    width: width,
                    height: height
                });
                return;
            }
            var touch = ev.changedTouches[0];
            clientX = touch.pageX;
        } else {
            clientX = ev.clientX;
        }
        var cellUnit = schedulerData.cellUnit,
            events = schedulerData.events,
            config = schedulerData.config,
            localeMoment = schedulerData.localeMoment;

        var cellWidth = schedulerData.getContentCellWidth();
        var offset = leftIndex > 0 ? 5 : 6;
        var minWidth = cellWidth - offset;
        var maxWidth = rightIndex * cellWidth - offset;
        var startX = _this3.state.startX;

        var newWidth = width + startX - clientX;
        var deltaX = clientX - startX;
        var sign = deltaX < 0 ? -1 : deltaX === 0 ? 0 : 1;
        var count = (sign > 0 ? Math.floor(Math.abs(deltaX) / cellWidth) : Math.ceil(Math.abs(deltaX) / cellWidth)) * sign;
        if (newWidth < minWidth) count = rightIndex - leftIndex - 1;else if (newWidth > maxWidth) count = -leftIndex;
        var newStart = localeMoment(eventItem.start).add(cellUnit === _index.CellUnits.Hour ? count * config.minuteStep : count, cellUnit === _index.CellUnits.Hour ? 'minutes' : 'days').format(_index.DATETIME_FORMAT);
        if (count !== 0 && cellUnit !== _index.CellUnits.Hour && config.displayWeekend === false) {
            if (count > 0) {
                var tempCount = 0,
                    i = 0;
                while (true) {
                    i++;
                    var tempStart = localeMoment(eventItem.start).add(i, 'days');
                    var dayOfWeek = tempStart.weekday();
                    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                        tempCount++;
                        if (tempCount === count) {
                            newStart = tempStart.format(_index.DATETIME_FORMAT);
                            break;
                        }
                    }
                }
            } else {
                var _tempCount = 0,
                    _i = 0;
                while (true) {
                    _i--;
                    var _tempStart = localeMoment(eventItem.start).add(_i, 'days');
                    var _dayOfWeek = _tempStart.weekday();
                    if (_dayOfWeek !== 0 && _dayOfWeek !== 6) {
                        _tempCount--;
                        if (_tempCount === count) {
                            newStart = _tempStart.format(_index.DATETIME_FORMAT);
                            break;
                        }
                    }
                }
            }
        }

        var hasConflict = false;
        var slotId = schedulerData._getEventSlotId(eventItem);
        var slotName = undefined;
        var slot = schedulerData.getSlotById(slotId);
        if (!!slot) slotName = slot.name;
        if (config.checkConflict) {
            var start = localeMoment(newStart),
                end = localeMoment(eventItem.end);

            events.forEach(function (e) {
                if (schedulerData._getEventSlotId(e) === slotId && e.id !== eventItem.id) {
                    var eStart = localeMoment(e.start),
                        eEnd = localeMoment(e.end);
                    if (start >= eStart && start < eEnd || end > eStart && end <= eEnd || eStart >= start && eStart < end || eEnd > start && eEnd <= end) hasConflict = true;
                }
            });
        }

        if (hasConflict) {
            _this3.setState({
                left: left,
                top: top,
                width: width,
                height: height
            });

            if (conflictOccurred != undefined) {
                conflictOccurred(schedulerData, 'StartResize', eventItem, _DnDTypes.DnDTypes.EVENT, slotId, slotName, newStart, eventItem.end);
            } else {
                console.log('Conflict occurred, set conflictOccurred func in Scheduler to handle it');
            }
            _this3.subscribeResizeEvent(_this3.props);
        } else {
            if (updateEventStart != undefined) updateEventStart(schedulerData, eventItem, newStart);
        }
    };

    this.cancelStartDrag = function (ev) {
        ev.stopPropagation();

        _this3.startResizer.removeEventListener('touchmove', _this3.doStartDrag, false);
        _this3.startResizer.removeEventListener('touchend', _this3.stopStartDrag, false);
        _this3.startResizer.removeEventListener('touchcancel', _this3.cancelStartDrag, false);
        document.onselectstart = null;
        document.ondragstart = null;
        var _props5 = _this3.props,
            schedulerData = _props5.schedulerData,
            left = _props5.left,
            top = _props5.top,
            width = _props5.width,
            height = _props5.height;

        schedulerData._stopResizing();
        _this3.setState({
            left: left,
            top: top,
            width: width,
            height: height
        });
    };

    this.initEndDrag = function (ev) {
        var _props6 = _this3.props,
            schedulerData = _props6.schedulerData,
            eventItem = _props6.eventItem;

        var slotId = schedulerData._getEventSlotId(eventItem);
        var slot = schedulerData.getSlotById(slotId);
        if (!!slot && !!slot.groupOnly) return;
        if (schedulerData._isResizing()) return;

        ev.stopPropagation();
        var clientX = 0;
        if (supportTouch) {
            if (ev.changedTouches.length == 0) return;
            var touch = ev.changedTouches[0];
            clientX = touch.pageX;
        } else {
            if (ev.buttons !== undefined && ev.buttons !== 1) return;
            clientX = ev.clientX;
        }
        _this3.setState({
            endX: clientX
        });

        schedulerData._startResizing();
        if (supportTouch) {
            _this3.endResizer.addEventListener('touchmove', _this3.doEndDrag, false);
            _this3.endResizer.addEventListener('touchend', _this3.stopEndDrag, false);
            _this3.endResizer.addEventListener('touchcancel', _this3.cancelEndDrag, false);
        } else {
            document.documentElement.addEventListener('mousemove', _this3.doEndDrag, false);
            document.documentElement.addEventListener('mouseup', _this3.stopEndDrag, false);
        }
        document.onselectstart = function () {
            return false;
        };
        document.ondragstart = function () {
            return false;
        };
    };

    this.doEndDrag = function (ev) {
        ev.stopPropagation();
        var clientX = 0;
        if (supportTouch) {
            if (ev.changedTouches.length == 0) return;
            var touch = ev.changedTouches[0];
            clientX = touch.pageX;
        } else {
            clientX = ev.clientX;
        }
        var _props7 = _this3.props,
            width = _props7.width,
            leftIndex = _props7.leftIndex,
            schedulerData = _props7.schedulerData;
        var headers = schedulerData.headers;

        var cellWidth = schedulerData.getContentCellWidth();
        var offset = leftIndex > 0 ? 5 : 6;
        var minWidth = cellWidth - offset;
        var maxWidth = (headers.length - leftIndex) * cellWidth - offset;
        var endX = _this3.state.endX;


        var newWidth = width + clientX - endX;
        if (newWidth < minWidth) newWidth = minWidth;else if (newWidth > maxWidth) newWidth = maxWidth;

        _this3.setState({ width: newWidth });
    };

    this.stopEndDrag = function (ev) {
        ev.stopPropagation();

        if (supportTouch) {
            _this3.endResizer.removeEventListener('touchmove', _this3.doEndDrag, false);
            _this3.endResizer.removeEventListener('touchend', _this3.stopEndDrag, false);
            _this3.endResizer.removeEventListener('touchcancel', _this3.cancelEndDrag, false);
        } else {
            document.documentElement.removeEventListener('mousemove', _this3.doEndDrag, false);
            document.documentElement.removeEventListener('mouseup', _this3.stopEndDrag, false);
        }
        document.onselectstart = null;
        document.ondragstart = null;
        var _props8 = _this3.props,
            width = _props8.width,
            height = _props8.height,
            left = _props8.left,
            top = _props8.top,
            leftIndex = _props8.leftIndex,
            rightIndex = _props8.rightIndex,
            schedulerData = _props8.schedulerData,
            eventItem = _props8.eventItem,
            updateEventEnd = _props8.updateEventEnd,
            conflictOccurred = _props8.conflictOccurred;

        schedulerData._stopResizing();
        if (_this3.state.width === width) return;

        var clientX = 0;
        if (supportTouch) {
            if (ev.changedTouches.length == 0) {
                _this3.setState({
                    left: left,
                    top: top,
                    width: width,
                    height: height
                });
                return;
            }
            var touch = ev.changedTouches[0];
            clientX = touch.pageX;
        } else {
            clientX = ev.clientX;
        }
        var headers = schedulerData.headers,
            cellUnit = schedulerData.cellUnit,
            events = schedulerData.events,
            config = schedulerData.config,
            localeMoment = schedulerData.localeMoment;

        var cellWidth = schedulerData.getContentCellWidth();
        var offset = leftIndex > 0 ? 5 : 6;
        var minWidth = cellWidth - offset;
        var maxWidth = (headers.length - leftIndex) * cellWidth - offset;
        var endX = _this3.state.endX;


        var newWidth = width + clientX - endX;
        var deltaX = newWidth - width;
        var sign = deltaX < 0 ? -1 : deltaX === 0 ? 0 : 1;
        var count = (sign < 0 ? Math.floor(Math.abs(deltaX) / cellWidth) : Math.ceil(Math.abs(deltaX) / cellWidth)) * sign;
        if (newWidth < minWidth) count = leftIndex - rightIndex + 1;else if (newWidth > maxWidth) count = headers.length - rightIndex;
        var newEnd = localeMoment(eventItem.end).add(cellUnit === _index.CellUnits.Hour ? count * config.minuteStep : count, cellUnit === _index.CellUnits.Hour ? 'minutes' : 'days').format(_index.DATETIME_FORMAT);
        if (count !== 0 && cellUnit !== _index.CellUnits.Hour && config.displayWeekend === false) {
            if (count > 0) {
                var tempCount = 0,
                    i = 0;
                while (true) {
                    i++;
                    var tempEnd = localeMoment(eventItem.end).add(i, 'days');
                    var dayOfWeek = tempEnd.weekday();
                    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                        tempCount++;
                        if (tempCount === count) {
                            newEnd = tempEnd.format(_index.DATETIME_FORMAT);
                            break;
                        }
                    }
                }
            } else {
                var _tempCount2 = 0,
                    _i2 = 0;
                while (true) {
                    _i2--;
                    var _tempEnd = localeMoment(eventItem.end).add(_i2, 'days');
                    var _dayOfWeek2 = _tempEnd.weekday();
                    if (_dayOfWeek2 !== 0 && _dayOfWeek2 !== 6) {
                        _tempCount2--;
                        if (_tempCount2 === count) {
                            newEnd = _tempEnd.format(_index.DATETIME_FORMAT);
                            break;
                        }
                    }
                }
            }
        }

        var hasConflict = false;
        var slotId = schedulerData._getEventSlotId(eventItem);
        var slotName = undefined;
        var slot = schedulerData.getSlotById(slotId);
        if (!!slot) slotName = slot.name;
        if (config.checkConflict) {
            var start = localeMoment(eventItem.start),
                end = localeMoment(newEnd);

            events.forEach(function (e) {
                if (schedulerData._getEventSlotId(e) === slotId && e.id !== eventItem.id) {
                    var eStart = localeMoment(e.start),
                        eEnd = localeMoment(e.end);
                    if (start >= eStart && start < eEnd || end > eStart && end <= eEnd || eStart >= start && eStart < end || eEnd > start && eEnd <= end) hasConflict = true;
                }
            });
        }

        if (hasConflict) {
            _this3.setState({
                left: left,
                top: top,
                width: width,
                height: height
            });

            if (conflictOccurred != undefined) {
                conflictOccurred(schedulerData, 'EndResize', eventItem, _DnDTypes.DnDTypes.EVENT, slotId, slotName, eventItem.start, newEnd);
            } else {
                console.log('Conflict occurred, set conflictOccurred func in Scheduler to handle it');
            }
            _this3.subscribeResizeEvent(_this3.props);
        } else {
            if (updateEventEnd != undefined) updateEventEnd(schedulerData, eventItem, newEnd);
        }
    };

    this.cancelEndDrag = function (ev) {
        ev.stopPropagation();

        _this3.endResizer.removeEventListener('touchmove', _this3.doEndDrag, false);
        _this3.endResizer.removeEventListener('touchend', _this3.stopEndDrag, false);
        _this3.endResizer.removeEventListener('touchcancel', _this3.cancelEndDrag, false);
        document.onselectstart = null;
        document.ondragstart = null;
        var _props9 = _this3.props,
            schedulerData = _props9.schedulerData,
            left = _props9.left,
            top = _props9.top,
            width = _props9.width,
            height = _props9.height;

        schedulerData._stopResizing();
        _this3.setState({
            left: left,
            top: top,
            width: width,
            height: height
        });
    };

    this.startResizable = function (props) {
        var eventItem = props.eventItem,
            isInPopover = props.isInPopover,
            schedulerData = props.schedulerData;
        var config = schedulerData.config;

        return config.startResizable === true && isInPopover === false && (eventItem.resizable == undefined || eventItem.resizable !== false) && (eventItem.startResizable == undefined || eventItem.startResizable !== false);
    };

    this.endResizable = function (props) {
        var eventItem = props.eventItem,
            isInPopover = props.isInPopover,
            schedulerData = props.schedulerData;
        var config = schedulerData.config;

        return config.endResizable === true && isInPopover === false && (eventItem.resizable == undefined || eventItem.resizable !== false) && (eventItem.endResizable == undefined || eventItem.endResizable !== false);
    };

    this.subscribeResizeEvent = function (props) {
        if (_this3.startResizer != undefined) {
            if (supportTouch) {
                // this.startResizer.removeEventListener('touchstart', this.initStartDrag, false);
                // if (this.startResizable(props))
                //     this.startResizer.addEventListener('touchstart', this.initStartDrag, false);
            } else {
                _this3.startResizer.removeEventListener('mousedown', _this3.initStartDrag, false);
                if (_this3.startResizable(props)) _this3.startResizer.addEventListener('mousedown', _this3.initStartDrag, false);
            }
        }
        if (_this3.endResizer != undefined) {
            if (supportTouch) {
                // this.endResizer.removeEventListener('touchstart', this.initEndDrag, false);
                // if (this.endResizable(props))
                //     this.endResizer.addEventListener('touchstart', this.initEndDrag, false);
            } else {
                _this3.endResizer.removeEventListener('mousedown', _this3.initEndDrag, false);
                if (_this3.endResizable(props)) _this3.endResizer.addEventListener('mousedown', _this3.initEndDrag, false);
            }
        }
    };
}, _temp);
exports.default = EventItem;