'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _index = require('./index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BodyView = (_temp = _class = function (_Component) {
    _inherits(BodyView, _Component);

    function BodyView(props) {
        _classCallCheck(this, BodyView);

        return _possibleConstructorReturn(this, (BodyView.__proto__ || Object.getPrototypeOf(BodyView)).call(this, props));
    }

    _createClass(BodyView, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var schedulerData = this.props.schedulerData;
            var renderData = schedulerData.renderData,
                headers = schedulerData.headers,
                config = schedulerData.config,
                behaviors = schedulerData.behaviors;

            var cellWidth = schedulerData.getContentCellWidth();
            if (schedulerData.cellUnit === _index.CellUnits.Hour) cellWidth = cellWidth / schedulerData.getMinuteStepsInHour();

            var displayRenderData = renderData.filter(function (o) {
                return o.render;
            });
            var tableRows = (this.props.isReversed ? headers : displayRenderData).map(function (i) {
                var item = null;
                var header = null;
                if (_this2.props.isReversed) {
                    header = i;
                } else {
                    item = i;
                }
                var rowCells = (_this2.props.isReversed ? displayRenderData : headers).map(function (j, index) {
                    if (_this2.props.isReversed) {
                        item = j;
                    } else {
                        header = j;
                    }
                    var key = item.slotId + '_' + header.time;
                    var width = _this2.props.isReversed ? schedulerData.getReversedContentCellWidth(item.rowHeight) : cellWidth;
                    var style = index === headers.length - 1 ? {} : { width: width };
                    if (!!header.nonWorkingTime) style = _extends({}, style, { backgroundColor: config.nonWorkingTimeBodyBgColor });
                    if (item.groupOnly) style = _extends({}, style, { backgroundColor: config.groupOnlySlotColor });
                    if (!!behaviors.getNonAgendaViewBodyCellBgColorFunc) {
                        var cellBgColor = behaviors.getNonAgendaViewBodyCellBgColorFunc(schedulerData, item.slotId, header);
                        if (!!cellBgColor) style = _extends({}, style, { backgroundColor: cellBgColor });
                    }
                    return _react2.default.createElement(
                        'td',
                        { key: key, style: style },
                        _react2.default.createElement('div', null)
                    );
                });
                var key = _this2.props.isReversed ? header.time : item.slotId;
                var reversedHeight = null;
                if (_this2.props.isReversed) {
                    reversedHeight = config.rowReverseHeight; // schedulerData.getContentCellWidth()
                    if (schedulerData.cellUnit === _index.CellUnits.Hour) reversedHeight = reversedHeight / schedulerData.getMinuteStepsInHour();
                }
                var styleHeight = { height: _this2.props.isReversed ? reversedHeight : item.rowHeight };
                return _react2.default.createElement(
                    'tr',
                    { key: key, style: styleHeight },
                    rowCells
                );
            });
            return _react2.default.createElement(
                'tbody',
                null,
                tableRows
            );
        }
    }]);

    return BodyView;
}(_react.Component), _class.propTypes = {
    schedulerData: _propTypes.PropTypes.object.isRequired,
    isReversed: _propTypes.PropTypes.bool
}, _temp);
exports.default = BodyView;