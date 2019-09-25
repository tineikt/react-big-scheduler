import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { CellUnits } from './index'

class BodyView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        isReversed: PropTypes.bool
    }

    render() {

        const { schedulerData } = this.props;
        const { renderData, headers, config, behaviors } = schedulerData;
        let cellWidth = schedulerData.getContentCellWidth();
        if (schedulerData.cellUnit === CellUnits.Hour) cellWidth = cellWidth / schedulerData.getMinuteStepsInHour();

        let displayRenderData = renderData.filter(o => o.render);
        let tableRows = (this.props.isReversed ? headers : displayRenderData).map((i) => {
            let item = null;
            let header = null;
            if (this.props.isReversed) {
                header = i;
            } else {
                item = i;
            }
            let rowCells = (this.props.isReversed ? displayRenderData : headers).map((j, index) => {
                if (this.props.isReversed) {
                    item = j;
                } else {
                    header = j;
                }
                let key = item.slotId + '_' + header.time;
                let width = this.props.isReversed ? schedulerData.getReversedContentCellWidth(item.rowHeight) : cellWidth
                let style = index === headers.length - 1 ? {} : { width:  width };
                if (!!header.nonWorkingTime)
                    style = { ...style, backgroundColor: config.nonWorkingTimeBodyBgColor };
                if (item.groupOnly)
                    style = { ...style, backgroundColor: config.groupOnlySlotColor };
                if (!!behaviors.getNonAgendaViewBodyCellBgColorFunc) {
                    let cellBgColor = behaviors.getNonAgendaViewBodyCellBgColorFunc(schedulerData, item.slotId, header);
                    if (!!cellBgColor)
                        style = { ...style, backgroundColor: cellBgColor };
                }
                return (
                    <td key={key} style={style}><div></div></td>
                )
            });
            const key = this.props.isReversed ? header.time : item.slotId;
            let reversedHeight = null; 
            if (this.props.isReversed) {
                reversedHeight = config.rowReverseHeight; // schedulerData.getContentCellWidth()
                if (schedulerData.cellUnit === CellUnits.Hour) reversedHeight = reversedHeight / schedulerData.getMinuteStepsInHour()
            }
            const styleHeight = { height: this.props.isReversed ? reversedHeight : item.rowHeight };
            return (
                <tr key={key} style={styleHeight}>
                    {rowCells}
                </tr>
            );
        });
        return (
            <tbody>
                {tableRows}
            </tbody>
        );
    }
}

export default BodyView