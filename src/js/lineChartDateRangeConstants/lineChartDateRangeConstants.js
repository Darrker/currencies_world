import Moment from 'moment'

const dateRangeConstants = {
    

    '7DAYS': [Moment(new Date()).subtract(7,'days').format('YYYY-MM-DD'), Moment(new Date()).format('YYYY-MM-DD')],
    '1MONTH': [Moment(new Date()).subtract(1,'months').format('YYYY-MM-DD'), Moment(new Date()).format('YYYY-MM-DD')],
    '3MONTHS': [Moment(new Date()).subtract(3,'months').format('YYYY-MM-DD'), Moment(new Date()).format('YYYY-MM-DD')],
    '6MONTHS': [Moment(new Date()).subtract(6,'months').format('YYYY-MM-DD'), Moment(new Date()).format('YYYY-MM-DD')],
    '1YEAR': [Moment(new Date()).subtract(1,'years').format('YYYY-MM-DD'), Moment(new Date()).format('YYYY-MM-DD')],
    'OWNRANGE': 'OWNRANGE',

};  

export default dateRangeConstants;