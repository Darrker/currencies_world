import React from 'react';
import CurrencyChooser from '../currencyChooser/CurrencyChooser';
import {fetchAllCurrencies} from '../../actions/fetchAllCurrencies';
import {connect} from 'react-redux';

class LineChartCurrencies extends React.Component {

    constructor(props) {
        super(props);

        this.state={
            openCurrencyChooser: false,
         
            filteredListOfCurrencies: false,
        };
     
    }

    componentDidUpdate(){
    }

    onDeleteCurrency(currency){
        this.props.onDeleteCurrency(currency);
    }
     
    renderLineChartCurrencies(){
     
     return   Object.keys(this.props.listOfCurrencies).map(item =>{
 
            return(
                <li className="line-chart-currencies__item" key={item}>   
                    <div style={{backgroundColor: this.props.listOfCurrencies[item]}} className="line-chart-currencies__item__color"></div>
                    <span className="line-chart-currencies__item__name">{item}</span>
                  
                    {Object.keys(this.props.listOfCurrencies).length > 1 ? 
                        <button className="line-chart-currencies__item__exit" onClick={e => {e.preventDefault(); this.onDeleteCurrency(item); }}>X</button>
                     : ""}   
                 </li>
            );
        });
    }

    onWantToAddNewCurrency =  async e =>{
        e.preventDefault();
        if(!this.props.allCurrencies){
            await this.props.fetchAllCurrencies();

       

        }


        const filteredData = this.props.allCurrencies.filter(currency =>{
            if(currency.code === 'PLN'){
                return false;
            }
            return typeof this.props.listOfCurrencies[currency.code] == 'undefined';
        });

     
      

       this.setState({
           filteredListOfCurrencies:filteredData,
            openCurrencyChooser: !this.state.openCurrencyChooser
        });

    }

    onChosenCurrency = currencyName =>{
        this.props.onAddNewCurrency(currencyName);

        this.setState({openCurrencyChooser: !this.state.openCurrencyChooser});
    }

    render(){
        return(
            <div className="line-chart__legend">


        
                <ul className="line-chart-currencies">
                    {this.renderLineChartCurrencies()}
                </ul>
                <div className="line-chart__add-new currency-chooser-wrapper">
                            <button className={`line-chart__add-new__button btn btn--secondary ${!this.state.openCurrencyChooser ? `btn--only-border` : '' }`} onClick={this.onWantToAddNewCurrency}>Dodaj walutę</button>
                            { this.state.openCurrencyChooser ? <CurrencyChooser chosenCurrency={this.onChosenCurrency} list={this.state.filteredListOfCurrencies}/> : '' } 
                </div>
              

             </div>
        );

    }
}
const mapStateToProps = (state) =>{
    
    return{
        allCurrencies: state.allCurrencies.currencies ? state.allCurrencies.currencies : false
     
    
    };
  }
export default connect(mapStateToProps, {fetchAllCurrencies})(LineChartCurrencies);