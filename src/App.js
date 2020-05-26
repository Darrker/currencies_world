import React from 'react';
import logo from '../src/images/logo.svg';
import CurrencyConverter from './js/components/currencyConverter/CurrencyConverter';
import CurrenciesTable from './js/components/currenciesTable/CurrenciesTable';
import PopularCurrencies from './js/components/popularCurrencies/PopularCurrencies';
import LineChart from './js/components/lineChart/LineChart';


import {fetchAllCurrencies} from './js/actions/fetchAllCurrencies';
import {connect} from 'react-redux';

import './scss/style.scss';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.ref = React.createRef();
    this.state = {
      data: ''
    };

  }
  componentDidUpdate() {}

  componentDidMount() {

    this.props.fetchAllCurrencies();

  }

  render() {
    return (
      <div className="App">
        <header className="header">
          <div className="container">
            <div className="header__top">
             <a href="/"><img src={logo} alt="Current exchange rates 24/7" className="header__logo"/></a>
              <h1 className="header__app-motto">Kursy walut 24/7</h1>
            </div>
           
          </div>
     
         <section>
          <div className="container ">
              <div className="row">
                <div className="col-12">

                  <CurrencyConverter
                    allCurrencies={this.props.allCurrencies}
                    defaultFromCurrency="PLN"
                    defaultToCurrency="USD"/>

                </div>
              </div>
            </div> 
        </section>   
        
        </header>
      <main>
      <div className="container">

<section  className="section-margin">
  <div className="row justify-content-center">
      <div className="col-md-10">
        {this.props.allCurrencies
          ? <PopularCurrencies
              allCurrencies={this.props.allCurrencies}
              chosenCurrencies={['USD', 'EUR', 'GBP', 'CHF', 'JPY']}
              defaultCurrencyToConvert="PLN"/>

          : ''
        }

      </div>
    </div>
</section>
        
  <section  className="section-margin">
    <div className="section-header">
      <h3 className="section-title"> Porównaj kursy różnych walut</h3>
    </div>

  <div className="row">
    <div className="col-md-12">
      <LineChart currencies={['EUR', 'USD', 'GBP', 'CHF']} range={'7DAYS'}/>

    </div>
    </div>
  </section>

    <section className="section-margin">
    <div className="section-header">
      <h3 className="section-title"> Tabela wszystkich walut</h3>
    </div>
    
  <div className="row">
  {  this.props.allCurrencies  ?
      
      <>
       
        <div className="col-lg-6">
          <CurrenciesTable     allCurrencies={this.props.allCurrencies.slice(0,Math.floor(this.props.allCurrencies.length/2))}/>
        </div>
          <div className="col-lg-6">
          <CurrenciesTable     allCurrencies={this.props.allCurrencies.slice(Math.floor(this.props.allCurrencies.length/2), this.props.allCurrencies.length)}/>
      </div>
     </>
      : ''
    }


  
    </div>


  </section>
 




  </div>

      </main>

    <footer className="footer">
      <div className="container">
 
            <img className="footer__logo" src={logo} alt="świat walut" />
            <span className="footer__author">Stworzone przez <strong>R Makosz</strong> </span>
            <a className="btn btn--secondary btn--only-border footer__github-link " href="https://github.com/Darrker/currencies_world"> Zobacz kod na <i className="footer__github-link__icon fab fa-github"></i></a> 

      </div>
    </footer>
    
 </div>

    );
  }
}

const mapStateToProps = state => {
  return {
    allCurrencies: state.allCurrencies.currencies
      ? state.allCurrencies.currencies
      : false
  };
}

export default connect(mapStateToProps, {fetchAllCurrencies})(App);
