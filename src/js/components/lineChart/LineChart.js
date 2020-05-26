import React from 'react';
import Chart from 'chart.js';
import Moment from 'moment';
import LineChartMenu from '../lineChartMenu/LineChartMenu';
import dateRangeConstants from '../../lineChartDateRangeConstants/lineChartDateRangeConstants';
import LineChartCurrencies from '../../components/lineChartCurrencies/LineChartCurrencies';
import Range from '../../range/range';
import Preloader from '../preloader/Preloader';
import { connect } from 'react-redux';
import {fetchCurrenciesData} from '../../actions/fetchCurrenciesData';
import {isMobileDevice} from '../../isMobileDevice/isMobileDevice';




class LineChart extends React.Component {

    constructor(props) {
        super(props);

        this.ref = React.createRef();

        this.state = {
           
            labels: '',
            currenciesData: {},
            range: typeof this.props.range == 'string' ? this.excludeWeekend(dateRangeConstants[this.props.range]) : this.excludeWeekend(this.props.range),
            loading: false,
            error: false,
            colors: false,
            currencies: this.props.currencies
          
        };
    }

    loading = false;

    defaultColors = this.props.colors ? [...this.props.colors,'#240090', '#950740', '#084056', '#188467', '#9EA66D' , '#F53005']
     :  ['#240090', '#950740', '#084056',  '#188367', '#9EA66D', '#F53005','#270722', '#264653', '#e63946', '#000000',"#ff6b6b", '#2f3e46','#f63264'];

    usedColors = [];



    excludeWeekend(dates){
        
        dates[0] = new Moment(dates[0]);
        dates[1] = new Moment(dates[1]);

        if( dates[0].weekday()%6 === 0){
            dates[0] = dates[0].endOf('isoweek').day(1);
        }
        if( dates[1].weekday()%6 === 0){
            dates[1] = dates[1].startOf('isoweek').day(5);
        }

        dates[0] = dates[0].format('YYYY-MM-DD');
        dates[1] = dates[1].format('YYYY-MM-DD');

        return dates;
    }

    useColor(){
           
            if(this.defaultColors.length){
                let color = this.defaultColors[0];
                this.defaultColors.splice(0,1);
                return color;
            }
                
           
    }

    giveBackColor(color){
     
        this.defaultColors.unshift(color);
        console.log('AFTER', this.defaultColors);
        
    }


    setColors(){
        var currenciesColors = {...this.state.colors};

        this.state.currencies.map((item) =>{
            if(typeof currenciesColors[item] === 'undefined'){
                 currenciesColors[item] = this.useColor(); 
                
            }
            return false;
         });
    
          

    
        this.setState({
            colors: currenciesColors
        });
    }

    drawChart(data){

        
        this.myChart.data.labels = data[this.state.currencies[0]].map(function (elem) {
            return elem.date
        });
        var datasets = [];

        this.state.currencies.map(currencyName =>{
              datasets.push({
                data: data[currencyName].map(function (elem) {
                    return elem.value
                }),
                backgroundColor: ['transparent'],
                borderColor: [
                    this.state.colors[currencyName],

                ],
                pointBackgroundColor: this.state.colors[currencyName] ,
            }

                
            );
            return false;
        });


        
        
        
            
    

        this.myChart.data.datasets = datasets;

        this.myChart.update();
    }

    getDataFromCache(){
        let min,max;
        let data = [];
            
        const cacheData = this.props.cacheCurrenciesData;

        this.state.currencies.forEach(currencyName => {
      
            min = cacheData[currencyName].findIndex(elem => elem.date >= this.state.range[0]);
            max = cacheData[currencyName].findIndex(elem => elem.date >= this.state.range[1]);

            data[currencyName] = cacheData[currencyName].slice(min,max+1);
            
       
            
        });


        

        return data;
    }

    async updateChart(){
        let hasError = false;
        let  needUpdateCache = false;
        const fetchData =  this.state.currencies.map(  currencyName =>{

            needUpdateCache = this.checkIfNeedUpdateCache(currencyName);
            if(needUpdateCache){
                return  this.fetchDataFromApi(currencyName,needUpdateCache);
            }

            return Promise.resolve();
        });

        this.setState({loading: true});
        try{
            if(fetchData.length){

             await  Promise.all(fetchData);
            }

        }catch(error){
            hasError = true;
            this.setState({loading: false, error:true,});
         
        }
        
        if(!hasError){
            this.setState({loading: false});
            var data =  this.getDataFromCache();
            this.setColors();
            this.drawChart(data);
        }
           
        
       
    }

   fetchDataFromApi(currency,range){
        return  this.props.fetchCurrenciesData(currency, range);
    }

    copyDataFromCache(currencyName, range){
       
               
       var dataRangeIndexes = {
           start: this.props.cacheCurrenciesData[currencyName].findIndex(item =>  item.date === range[0]),
           end:  this.props.cacheCurrenciesData[currencyName].findIndex(item =>  item.date === range[1])
       }

 

       return this.props.cacheCurrenciesData[currencyName].splice(dataRangeIndexes.start, dataRangeIndexes.end);
      

    }

    checkIfNeedUpdateCache(currencyName){
            

        let rangeToFetch;
  
        if(typeof this.props.cacheCurrenciesData[currencyName] != 'undefined'){
         
            let lastIndexOfCache =  this.props.cacheCurrenciesData[currencyName].length - 1;
           
            rangeToFetch = new Range(this.props.cacheCurrenciesData[currencyName][0].date,this.props.cacheCurrenciesData[currencyName][lastIndexOfCache].date)
                                    .setRange(this.state.range[0],this.state.range[1]);


           
           
          
        }
        else{
            rangeToFetch = {
                start: this.state.range[0],
                end: this.state.range[1]
            };
           
        }
        
     
      
        return  rangeToFetch;
       
    }

    async componentDidMount() {

        this.myChart = new Chart(this.ref.current, {
            type: 'line',
        
            options: {
                scales: {
                    xAxes: [{
                        ticks: {
                            maxTicksLimit: 10,
                            display: !isMobileDevice(),
                        }
                    }]
                },
                legend:{
                    display: false,
                }
            },
            data: {
                labels: [],
                showXLabels: 10,
                datasets: [{
                        label: '',
                        data: [],


                        borderColor: [
                            'rgba(255, 0, 0, 1)',

                        ],
                        pointBackgroundColor: 'rgba(255, 255, 255, 1)',
                        borderWidth: 1
                    },

                ]
            },
        });

        await this.updateChart();
    }


    onSelectRange =  async (range) =>{
    

    this.setState({range: this.excludeWeekend(range)},
            async () =>{
                await this.updateChart();
            }

        );

       
    }

    onDeleteCurrency = async currency =>{
       let currencies = [...this.state.currencies];
    
       const index = currencies.findIndex(item => {
           return item === currency;
       })
    
       currencies.splice(index,1);

       let colors = {...this.state.colors};
       this.giveBackColor(colors[currency]);
       delete colors[currency];


       
  

    this.setState({ currencies, colors},
            async () =>{
                await this.updateChart();
            }
        );
        
    }

    onAddNewCurrency = async currencyName =>{
    let currencies = [...this.state.currencies];

    currencies.push(currencyName);

    this.setState({ currencies},
            async () =>{
                await this.updateChart();
            }
        );

    }

    generateRangeType(){
        if(typeof this.props.range === "array"){
            for(let key in dateRangeConstants){
          
                if(dateRangeConstants[key] === this.props.range){
                    return key;
                }
            }

            return 'OWNRANGE';
        }
        else if(typeof this.props.range == 'string'){
     
            return this.props.range ;
        }
       
    }

    render() {
        return ( 
       
            
            <div className="line-chart">
                 <Preloader loading={this.state.loading} error={this.state.error} />
                    {this.state.colors ? <LineChartCurrencies onAddNewCurrency={this.onAddNewCurrency} listOfCurrencies={this.state.colors} onDeleteCurrency={this.onDeleteCurrency}/>  : ''}
       
                    
                <div className="line-chart__data">
               
                  
                  <canvas className="chart" ref={ this.ref} > </canvas>
               
             
                <LineChartMenu rangeType={this.generateRangeType()} onSelectRange={this.onSelectRange}/>
                </div>
            

         
              
                 
            </div>
         
     
        );

    }
}


const mapStateToProps = state =>{
    return{
        cacheCurrenciesData : state.currenciesData
    }
}

export default connect(mapStateToProps, {fetchCurrenciesData})(LineChart);