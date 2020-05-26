import React from 'react';
import DateRangePicker from 'react-daterange-picker'
import Moment from 'moment';
import 'react-daterange-picker/dist/css/react-calendar.css' ;
import dateRangeConstants from '../../lineChartDateRangeConstants/lineChartDateRangeConstants';

class LineChartMenu extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedRange: this.props.rangeType ? this.props.rangeType : dateRangeConstants['OWNRANGE'],
            openOwnDateRange: false,
       
        };
    }

     

    toggleOwnDateRange(){
      
        this.setState({openOwnDateRange: !this.state.openOwnDateRange});

    }

    onSelectRange(rangeType,range){
      
         
        if(rangeType ==='OWNRANGE'){
            this.setState({selectedRange: rangeType,openOwnDateRange: true});
        }
        else{
            this.setState({selectedRange: rangeType, openOwnDateRange: false});
            this.emitRange(range);
        }

        
      

       
    }

    emitRange(range){
        this.props.onSelectRange(range);
    }

    onSelectOwnRange = range =>{
      
        this.setState({ openOwnDateRange: false});
        this.emitRange([range['start'].format('YYYY-MM-DD'), range['end'].format('YYYY-MM-DD')] );
    }

    render(){

        return(
                <ul className="chart-menu">
                          
                            <li 
                                onClick={e => {this.onSelectRange('7DAYS',dateRangeConstants['7DAYS'])}}
                                className={`chart-menu__item ${this.state.selectedRange === '7DAYS' ? 'chart-menu__item--is-active' : ''} `}>
                                7 dni
                            </li>
                            <li 
                                onClick={e => {this.onSelectRange('1MONTH',dateRangeConstants['1MONTH'])}}
                                className={`chart-menu__item ${this.state.selectedRange === '1MONTH' ? 'chart-menu__item--is-active' : ''} `}>
                                1 Miesiąc
                            </li>
                            <li 
                                onClick={e => {this.onSelectRange('3MONTHS',dateRangeConstants['3MONTHS'])}}
                                className={`chart-menu__item ${this.state.selectedRange === '3MONTHS' ? 'chart-menu__item--is-active' : ''} `}>
                                3 miesiące
                            </li>
                            <li 
                                onClick={e => {this.onSelectRange('6MONTHS',dateRangeConstants['6MONTHS'])}}
                                className={`chart-menu__item ${this.state.selectedRange === '6MONTHS' ? 'chart-menu__item--is-active' : ''} `}>
                                6 Miesięcy
                            </li>
                            <li 
                                onClick={e => {this.onSelectRange('1YEAR',dateRangeConstants['1YEAR'])}}
                                className={`chart-menu__item ${this.state.selectedRange === '1YEAR' ? 'chart-menu__item--is-active' : ''} `}>
                                1 rok
                            </li>
                            <div className="date-range-wrapper">
                                <li 
                                    onClick={e => {this.onSelectRange('OWNRANGE',dateRangeConstants['OWNRANGE']); this.toggleOwnDateRange();}}
                                    className={`chart-menu__item chart-menu__item--own-range ${this.state.selectedRange === dateRangeConstants['OWNRANGE'] ? 'chart-menu__item--is-active' : ''}` }>
                                    Własne
                                </li>

                                { this.state.openOwnDateRange ?
                            
                                <DateRangePicker
                                    minimumDate={new Date(Moment(new Date()).subtract(12,'months'))}
                                    maximumDate={new Date()}
                                    onSelect={this.onSelectOwnRange}
                                    value={this.state.test}
                                 
                                    />  
                                    : ''
                                }
                            </div>



            </ul>
        );

    }
}

export default LineChartMenu;