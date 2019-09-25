import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import Icon from 'antd/lib/icon'

class ResourceView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        contentScrollbarHeight: PropTypes.number.isRequired,
        slotClickedFunc: PropTypes.func,
        slotItemTemplateResolver: PropTypes.func,
        toggleExpandFunc: PropTypes.func,
        isReversed: PropTypes.bool
    }

    render() {

        const { schedulerData, contentScrollbarHeight, slotClickedFunc, slotItemTemplateResolver, toggleExpandFunc } = this.props;
        const { renderData, config } = schedulerData;

        let width = this.props.isReversed ?  config.columnReversedWidth : (schedulerData.getResourceTableWidth() - 2);
        let paddingBottom = contentScrollbarHeight;
        let displayRenderData = renderData.filter(o => o.render);
        let resourceList = displayRenderData.map((item) => {
            let indents = [];
            if (!this.props.isReversed) {
                for (let i = 0; i < item.indent; i++) {
                    indents.push(<span key={`es${i}`} className="expander-space"></span>);
                }
                let indent = <span key={`es${item.indent}`} className="expander-space"></span>;
                if (item.hasChildren) {
                    indent = item.expanded ? (
                        <Icon type="minus-square" key={`es${item.indent}`} style={{}} className=""
                            onClick={() => {
                                if (!!toggleExpandFunc)
                                    toggleExpandFunc(schedulerData, item.slotId);
                            }} />
                    ) : (
                            <Icon type="plus-square" key={`es${item.indent}`} style={{}} className=""
                                onClick={() => {
                                    if (!!toggleExpandFunc)
                                        toggleExpandFunc(schedulerData, item.slotId);
                                }} />
                        );
                }
                indents.push(indent);
            }

            let a = slotClickedFunc != undefined ? <span className="slot-cell">{indents}<a className="slot-text" onClick={() => {
                slotClickedFunc(schedulerData, item);
            }}>{item.slotName}</a></span>
                : <span className="slot-cell">{indents}<span className="slot-text">{item.slotName}</span></span>;
            // console.log("item.rowHeight", item.rowHeight)
            let width = this.props.isReversed ? schedulerData.getReversedContentCellWidth(item.rowHeight) - 1 : null
            let slotItem = (
                <div title={item.slotName} className="overflow-text header2-text" style={{ textAlign: this.props.isReversed ? "center": "left", width }}>
                    {a}
                </div>
            );
            if (!!slotItemTemplateResolver) {
                let temp = slotItemTemplateResolver(schedulerData, item, slotClickedFunc, width, "overflow-text header2-text");
                if (!!temp)
                    slotItem = temp;
            }

            let tdStyle = { height: this.props.isReversed ? '44px' : item.rowHeight };
            if (item.groupOnly) {
                tdStyle = {
                    ...tdStyle,
                    backgroundColor: schedulerData.config.groupOnlySlotColor
                };
            }
            let td = (
                <td key={item.slotId}data-resource-id={item.slotId} style={tdStyle}>
                    {slotItem}
                </td>
            );
            if (this.props.isReversed) return td
            else return (
                <tr key={item.slotId}>
                    {td}
                </tr>
            );
        });
        if (this.props.isReversed) {
            resourceList = (
                <tr>
                    {resourceList}
                </tr>
            )
        }
        return (
            <div style={{ paddingBottom: paddingBottom }}>
                <table className="resource-table">
                    <tbody>
                        {resourceList}
                    </tbody>
                </table>
            </div>
        )
    }
}

export default ResourceView