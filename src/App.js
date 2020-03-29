import React from 'react';
import Chart from 'chart.js';
import CurrencyConverter from './js/components/currencyConverter/CurrencyConverter';
import CurrenciesTable from './js/components/currenciesTable/CurrenciesTable';
import PopularCurrencies from './js/components/popularCurrencies/PopularCurrencies';
import ListOfCurrencies from './js/components/listOfCurrencies/ListOfCurrencies';
import SectionSwitcher from './js/components/sectionSwitcher/SectionSwitcher';
import NbpAPI from './js/nbp_api/nbpAPI';
import {fetchAllCurrencies} from './js/actions/fetchAllCurrencies';
import {connect} from 'react-redux';

import './scss/style.scss';



class App extends React.Component{

  constructor(props){
    super(props);

    this.ref = React.createRef();
    this.state = {data: ''};
   
    

  }
  componentDidUpdate(){
    
    console.log('didUpdate',this.props.allCurrencies);
    // if(this.state.data != ''){
     
    // this.myChart.data.labels = this.state.data.data.rates.map(function(elem) {return elem.effectiveDate });
    //   this.myChart.data.datasets[0].label = 'GPB'
   
  
     
    //   this.myChart.data.datasets[0].data = this.state.data.data.rates.map(function(elem) {return elem.bid});


    //   this.myChart.update();
    // }
 
  }


   componentDidMount(){
  
    
     this.props.fetchAllCurrencies();

    

  
  
    // this.myChart = new Chart(this.ref.current, {
    //   type: 'line',
    //   showXLabels: 10 ,  
    //   options: {
    //     scales: {
    //         xAxes: [{
    //             ticks: {
    //                maxTicksLimit: 5,
    //             }
    //         }]
    //     }
    // },
    //   data: {
    //     labels: [1,2],
    //     showXLabels: 10 ,
    //     datasets: [{
    //         label: '# of Votes',
    //         data: [] ,
          
         
    //         borderColor: [
    //             'rgba(255, 0, 0, 1)',
          
    //         ],
    //         pointBackgroundColor: 'rgba(255, 255, 255, 1)',
    //         borderWidth: 1
    //     },
    
    //   ]
    // },
    // });
    // this.setState({data: this.props.radzio });
   
  }
 
  render(){
    return(
      <div className="App">
              {
                  this.props.allCurrencies ?
        <CurrencyConverter allCurrencies={this.props.allCurrencies} defaultFromCurrency="PLN" defaultToCurrency="USD"/>
        : ''

      }
        <div className="container">
          <div className="row">
           
          </div>
          <div className="row justify-content-center">
              <div className="col-md-10">
                {
                  this.props.allCurrencies ?
                    <PopularCurrencies allCurrencies={this.props.allCurrencies} chosenCurrencies={['USD', 'EUR', 'GBP', 'CHF', 'JPY']} defaultCurrencyToConvert="PLN"/> 

                  : ''

                }
                
            
              </div>
          </div>
          <div className="row">


            <div className="col-md-8">
              <CurrenciesTable/>

            </div>

            <div className="col-md-4">
              <h3>Popularne waluty</h3>

              <SectionSwitcher/>

              <CurrenciesTable/>
            </div>
          </div>
        </div>
     
        <div className="container">
          <div className="col-6">
          <canvas ref={this.ref}></canvas>
          </div>
          <div className="col-6">
          </div>
        </div>
      
    
    </div>

    );
  }
}

const mapStateToProps = state =>{
  return{
    allCurrencies: state.currencies ? state.currencies : false
  };
}

export default connect(mapStateToProps,{fetchAllCurrencies})(App);
