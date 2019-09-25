import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { CellUnits } from './index'

class HeaderView extends Component {

    constructor(props) {
        super(props);
    }

    static propTypes = {
        schedulerData: PropTypes.object.isRequired,
        nonAgendaCellHeaderTemplateResolver: PropTypes.func,
        isReversed: PropTypes.bool
    }

    render() {
        const { schedulerData, nonAgendaCellHeaderTemplateResolver } = this.props;
        const { headers, cellUnit, config, localeMoment } = schedulerData;
        let headerHeight = this.props.isReversed ? '' : schedulerData.getTableHeaderHeight();
        let cellWidth = schedulerData.getContentCellWidth();
        let minuteStepsInHour = schedulerData.getMinuteStepsInHour();

        let headerList = [];
        let style = {};
        if (cellUnit === CellUnits.Hour) {
            // ("Hour!!", headers.length)
            headers.forEach((item, index) => {
                if (index % minuteStepsInHour === 0) {
                    let datetime = localeMoment(item.time);
                    const isCurrentTime = datetime.isSame(new Date(), 'hour');
                    // console.log("weh ere", minuteStepsInHour)
                    style = !!item.nonWorkingTime ? { width: this.props.isReversed ? null : (cellWidth), color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor } : { width: this.props.isReversed ? '' : (cellWidth) };

                    if (index === headers.length - minuteStepsInHour)
                        style = !!item.nonWorkingTime ? { color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor } : {};

                    let pFormattedList = config.nonAgendaDayCellHeaderFormat.split('|').map(item => datetime.format(item));
                    let element;

                    if (this.props.isReversed) {
                        style.height = config.rowReverseHeight; // schedulerData.getContentCellWidth() * minuteStepsInHour;
                    }
                    if (typeof nonAgendaCellHeaderTemplateResolver === 'function') {
                        element = nonAgendaCellHeaderTemplateResolver(schedulerData, item, pFormattedList, style)
                    }
                    else {
                        const pList = pFormattedList.map((item, index) => (
                            <div key={index}>{item}</div>
                        ));

                        element = (
                            <th key={item.time} className="header3-text" style={style}>
                                <div>
                                    {pList}
                                </div>
                            </th>
                        );
                    }

                    headerList.push(element);
                }
            })
        }
        else {
            headerList = headers.map((item, index) => {
                let datetime = localeMoment(item.time);
                
                style = !!item.nonWorkingTime ? { width: this.props.isReversed ? '' : cellWidth, color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor } : { width: this.props.isReversed ? '' : cellWidth };
                if (index === headers.length - 1)
                    style = !!item.nonWorkingTime ? { color: config.nonWorkingTimeHeadColor, backgroundColor: config.nonWorkingTimeHeadBgColor } : {};

                let pFormattedList = config.nonAgendaOtherCellHeaderFormat.split('|').map(item => datetime.format(item));

                if (typeof nonAgendaCellHeaderTemplateResolver === 'function') {
                    return nonAgendaCellHeaderTemplateResolver(schedulerData, item, pFormattedList, style)
                }
                if (this.props.isReversed) {
                    style.height = config.rowReverseHeight; // schedulerData.getContentCellWidth()
                }
                const pList = pFormattedList.map((item, index) => (
                    <div key={index}>{item}</div>
                ));

                return (
                    <th key={item.time} className="header3-text" style={style}>
                        <div>
                            {pList}
                        </div>
                    </th>
                );
            });
        }

        return (
            <thead>
                <tr style={{ height: headerHeight }}>
                    {headerList}
                </tr>
            </thead>
        );
    }
}

export default HeaderView
