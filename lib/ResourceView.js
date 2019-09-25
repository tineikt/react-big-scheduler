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

var _icon = require('antd/lib/icon');

var _icon2 = _interopRequireDefault(_icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResourceView = (_temp = _class = function (_Component) {
    _inherits(ResourceView, _Component);

    function ResourceView(props) {
        _classCallCheck(this, ResourceView);

        return _possibleConstructorReturn(this, (ResourceView.__proto__ || Object.getPrototypeOf(ResourceView)).call(this, props));
    }

    _createClass(ResourceView, [{
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                schedulerData = _props.schedulerData,
                contentScrollbarHeight = _props.contentScrollbarHeight,
                slotClickedFunc = _props.slotClickedFunc,
                slotItemTemplateResolver = _props.slotItemTemplateResolver,
                toggleExpandFunc = _props.toggleExpandFunc;
            var renderData = schedulerData.renderData,
                config = schedulerData.config;


            var width = this.props.isReversed ? config.columnReversedWidth : schedulerData.getResourceTableWidth() - 2;
            var paddingBottom = contentScrollbarHeight;
            var displayRenderData = renderData.filter(function (o) {
                return o.render;
            });
            var resourceList = displayRenderData.map(function (item) {
                var indents = [];
                if (!_this2.props.isReversed) {
                    for (var i = 0; i < item.indent; i++) {
                        indents.push(_react2.default.createElement('span', { key: 'es' + i, className: 'expander-space' }));
                    }
                    var indent = _react2.default.createElement('span', { key: 'es' + item.indent, className: 'expander-space' });
                    if (item.hasChildren) {
                        indent = item.expanded ? _react2.default.createElement(_icon2.default, { type: 'minus-square', key: 'es' + item.indent, style: {}, className: '',
                            onClick: function onClick() {
                                if (!!toggleExpandFunc) toggleExpandFunc(schedulerData, item.slotId);
                            } }) : _react2.default.createElement(_icon2.default, { type: 'plus-square', key: 'es' + item.indent, style: {}, className: '',
                            onClick: function onClick() {
                                if (!!toggleExpandFunc) toggleExpandFunc(schedulerData, item.slotId);
                            } });
                    }
                    indents.push(indent);
                }

                var a = slotClickedFunc != undefined ? _react2.default.createElement(
                    'span',
                    { className: 'slot-cell' },
                    indents,
                    _react2.default.createElement(
                        'a',
                        { className: 'slot-text', onClick: function onClick() {
                                slotClickedFunc(schedulerData, item);
                            } },
                        item.slotName
                    )
                ) : _react2.default.createElement(
                    'span',
                    { className: 'slot-cell' },
                    indents,
                    _react2.default.createElement(
                        'span',
                        { className: 'slot-text' },
                        item.slotName
                    )
                );
                // console.log("item.rowHeight", item.rowHeight)
                var width = _this2.props.isReversed ? schedulerData.getReversedContentCellWidth(item.rowHeight) - 1 : null;
                var slotItem = _react2.default.createElement(
                    'div',
                    { title: item.slotName, className: 'overflow-text header2-text', style: { textAlign: _this2.props.isReversed ? "center" : "left", width: width } },
                    a
                );
                if (!!slotItemTemplateResolver) {
                    var temp = slotItemTemplateResolver(schedulerData, item, slotClickedFunc, width, "overflow-text header2-text");
                    if (!!temp) slotItem = temp;
                }

                var tdStyle = { height: _this2.props.isReversed ? '44px' : item.rowHeight };
                if (item.groupOnly) {
                    tdStyle = _extends({}, tdStyle, {
                        backgroundColor: schedulerData.config.groupOnlySlotColor
                    });
                }
                var td = _react2.default.createElement(
                    'td',
                    { key: item.slotId, 'data-resource-id': item.slotId, style: tdStyle },
                    slotItem
                );
                if (_this2.props.isReversed) return td;else return _react2.default.createElement(
                    'tr',
                    { key: item.slotId },
                    td
                );
            });
            if (this.props.isReversed) {
                resourceList = _react2.default.createElement(
                    'tr',
                    null,
                    resourceList
                );
            }
            return _react2.default.createElement(
                'div',
                { style: { paddingBottom: paddingBottom } },
                _react2.default.createElement(
                    'table',
                    { className: 'resource-table' },
                    _react2.default.createElement(
                        'tbody',
                        null,
                        resourceList
                    )
                )
            );
        }
    }]);

    return ResourceView;
}(_react.Component), _class.propTypes = {
    schedulerData: _propTypes.PropTypes.object.isRequired,
    contentScrollbarHeight: _propTypes.PropTypes.number.isRequired,
    slotClickedFunc: _propTypes.PropTypes.func,
    slotItemTemplateResolver: _propTypes.PropTypes.func,
    toggleExpandFunc: _propTypes.PropTypes.func,
    isReversed: _propTypes.PropTypes.bool
}, _temp);
exports.default = ResourceView;