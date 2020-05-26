import React from 'react';
import PopularCurrency from '../popularCurrency/PopularCurrency';
import CurrencyChooser from '../currencyChooser/CurrencyChooser';
class PopularCurrencies extends React.Component{

  
    constructor(props){
        super(props);
        this.popularCurrencies = [];
        this.temp = [];
        this.state= {popularCurrencies: [], openCurrencyChooser: false, comparedCurrencyName: this.props.defaultCurrencyToConvert};
    }

    
    componentDidMount(){
   
            this.popularCurrencies = this.props.allCurrencies.filter(currency =>{
              
                if(this.props.chosenCurrencies.indexOf(currency.code) > -1){
                  
                    return true;
                }
                return false;
            });
       
            this.setState({popularCurrencies: this.popularCurrencies });

     
    }

    renderPopularCurrencies = () =>{
        if(this.state.popularCurrencies.length>0){
         let comparedCurrencyData = this.props.allCurrencies.find(item => item.code === this.state.comparedCurrencyName);
         let defaultComaparedCurrencyData = this.props.allCurrencies.find(item => item.code === this.props.defaultCurrencyToConvert);
         var temp =  this.state.popularCurrencies.map(function(item,index){
                 if(item.code === comparedCurrencyData.code){
                    
                    return(
                        <PopularCurrency name={defaultComaparedCurrencyData.code} value={defaultComaparedCurrencyData.bid /comparedCurrencyData.bid  } key={index}/>
                    );
                 }
                 else {
                    return(
                        <PopularCurrency name={item.code} value={item.bid / comparedCurrencyData.bid} key={index}/>
                    );
                 }   
               
    
            });
        
            return temp;
        }
     
    }

    toggleCurrencyChooser = e =>{
  

        this.setState({openCurrencyChooser: !this.state.openCurrencyChooser});
    }

    onChosenCurrencies = name =>{
        this.toggleCurrencyChooser();

        this.setComparedCurrencyName(name);
    }

    setComparedCurrencyName(name){
        this.setState({comparedCurrencyName: name});

    }
    render(){
        return(
            <div className="popular-currencies">
                <h3 className="popular-currencies__title">Kursy popularnych walut</h3>
                <header className="popular-currencies__compared-to">
                    Porównujesz waluty do: 
                        <span className="popular-currencies__compared-to__currency">{this.state.comparedCurrencyName}</span>
                        <div className="currency-chooser-wrapper">
                            <button className={`btn btn--light ${!this.state.openCurrencyChooser ? `btn--only-border` : '' }`} onClick={this.toggleCurrencyChooser}>Zmień walutę</button>
                            { this.state.openCurrencyChooser ? <CurrencyChooser chosenCurrency={this.onChosenCurrencies} list={this.props.allCurrencies}/> : '' } 
                        </div>
                      
                </header>

                <ul className="popular-currencies__list">
                    {this.renderPopularCurrencies()}
                </ul>
            </div>
        );
    }
}


export default PopularCurrencies;