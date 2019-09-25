'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _schedulerWidth$besid;

var _ViewTypes = require('./ViewTypes');

var _ViewTypes2 = _interopRequireDefault(_ViewTypes);

var _SummaryPos = require('./SummaryPos');

var _SummaryPos2 = _interopRequireDefault(_SummaryPos);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

exports.default = (_schedulerWidth$besid = {
    schedulerWidth: '100%',
    besidesWidth: 20,
    schedulerMaxHeight: 0,
    tableHeaderHeight: 40,

    agendaResourceTableWidth: 160,
    agendaMaxEventWidth: 100,

    dayResourceTableWidth: 160,
    weekResourceTableWidth: '16%',
    monthResourceTableWidth: 160,
    quarterResourceTableWidth: 160,
    yearResourceTableWidth: 160,
    customResourceTableWidth: 160,

    dayCellWidth: 30,
    weekCellWidth: '12%',
    monthCellWidth: 80,
    quarterCellWidth: 80,
    yearCellWidth: 80,
    customCellWidth: 80,

    dayMaxEvents: 99,
    weekMaxEvents: 99,
    monthMaxEvents: 99,
    quarterMaxEvents: 99,
    yearMaxEvents: 99,
    customMaxEvents: 99,

    eventItemHeight: 22,
    eventItemLineHeight: 24,
    nonAgendaSlotMinHeight: 0,
    dayStartFrom: 0,
    dayStopTo: 23,
    defaultEventBgColor: '#80C5F6',
    selectedAreaColor: '#7EC2F3',
    nonWorkingTimeHeadColor: '#999999',
    nonWorkingTimeHeadBgColor: '#fff0f6',
    nonWorkingTimeBodyBgColor: '#fff0f6',
    summaryColor: '#666',
    summaryPos: _SummaryPos2.default.TopRight,
    groupOnlySlotColor: '#F8F8F8',

    startResizable: true,
    endResizable: true,
    movable: true,
    creatable: true,
    crossResourceMove: true,
    checkConflict: false,
    scrollToSpecialMomentEnabled: true,
    eventItemPopoverEnabled: true,
    calendarPopoverEnabled: true,
    recurringEventsEnabled: true,
    headerEnabled: true,
    displayWeekend: true,
    relativeMove: true,
    defaultExpanded: true,

    resourceName: 'Oppgave:',
    taskName: 'Task Name',
    agendaViewHeader: 'Agenda',
    addMorePopoverHeaderFormat: 'MMM D, YYYY dddd',
    eventItemPopoverDateFormat: 'MMM D',
    nonAgendaDayCellHeaderFormat: 'ha',
    nonAgendaOtherCellHeaderFormat: 'ddd M/D',

    minuteStep: 30,

    views: [{ viewName: 'Day', viewType: _ViewTypes2.default.Day, showAgenda: false, isEventPerspective: false }, { viewName: 'Week', viewType: _ViewTypes2.default.Week, showAgenda: false, isEventPerspective: false }, { viewName: 'Month', viewType: _ViewTypes2.default.Month, showAgenda: false, isEventPerspective: false }, { viewName: 'Quarter', viewType: _ViewTypes2.default.Quarter, showAgenda: false, isEventPerspective: false }, { viewName: 'Year', viewType: _ViewTypes2.default.Year, showAgenda: false, isEventPerspective: false }],

    /* New reverse config */
    resourceNameReversed: 'Oppg:',
    eventItemReversedMargin: 6,
    columnReversedWidth: 90,
    rowReverseHeight: 60,
    reverseBreakpoint: 769

}, _defineProperty(_schedulerWidth$besid, 'eventItemHeight', 40), _defineProperty(_schedulerWidth$besid, 'eventItemLineHeight', 56), _defineProperty(_schedulerWidth$besid, 'dayStartFrom', 8), _defineProperty(_schedulerWidth$besid, 'dayStopTo', 17), _defineProperty(_schedulerWidth$besid, 'minuteStep', 15), _defineProperty(_schedulerWidth$besid, 'dayCellWidth', 160), _defineProperty(_schedulerWidth$besid, 'nonAgendaSlotMinHeight', 75), _defineProperty(_schedulerWidth$besid, 'nonAgendaDayCellHeaderFormat', 'HH:mm'), _defineProperty(_schedulerWidth$besid, 'dayResourceTableWidth', 170), _schedulerWidth$besid);