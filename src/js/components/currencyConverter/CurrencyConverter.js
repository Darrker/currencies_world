import React from 'react';
import NbpAPI from '../../nbp_api/nbpAPI';
import CurrencyChooser from '../currencyChooser/CurrencyChooser';

class CurrencyConverter extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            amount: 1,
            amountError: false,
            currencyFrom: this.props.defaultFromCurrency,
            currencyFromLatestValue: this.props.defaultFromCurrency,
            openCurrencyChooserForFrom: false,
            openCurrencyChooserForTo: false,
            currencyTo: this.props.defaultToCurrency,
            currencyToLatestValue: this.props.defaultToCurrency,
            displayConvertResult: false,
        };

       
    }

    dataForConverterResult = {
        amount: '',
        currencyFrom: '',
        currencyTo: '',
        calculetedValue: '',
    };
    

    setAmount = e =>{
        e.preventDefault();
        const regex = new RegExp(`^([0-9]*[1-9][0-9]*(\.[0-9]+)?|[0]+\.[0-9]*[1-9][0-9]*)$`, 'gm');
        if(regex.test(e.target.value) || e.target.value.length == 0){
          this.setState({amountError: false});
          
        }
        else{
            this.setState({amountError: true});
        }
      
        this.setState({amount: e.target.value})
       
        
    }

    setCurrencyFrom = e =>{
        e.preventDefault();

        this.setState({currencyFrom: e.target.value})
        
    }
    setCurrencyTo = e =>{
        e.preventDefault();

        this.setState({currencyTo: e.target.value})
        
    }

     onFormSubmit = e=>{
        
        e.preventDefault();
        const fromCurrency = this.props.allCurrencies.find(item => item.code == this.state.currencyFromLatestValue);
        const toCurrency = this.props.allCurrencies.find(item => item.code == this.state.currencyToLatestValue);

 

        if(!this.state.amountError){
         
            this.dataForConverterResult = {
                amount: this.state.amount,
                currencyFrom: this.state.currencyFromLatestValue,
                currencyTo: this.state.currencyToLatestValue,
                calculetedValue: (parseFloat(this.state.amount) * (fromCurrency.bid / toCurrency.bid)).toFixed(2),
            }

            this.setState({
                displayConvertResult: true,    
            });
        }

        
    }

    openCurrencyChooser = name =>{

        switch(name){
            case 'FROM':{
                console.log('in');
                this.setState({openCurrencyChooserForFrom: true});
                break;
            }

            case 'TO':{
                this.setState({openCurrencyChooserForTo:true});
                break;
            }
            
            
        }
    }
    closeCurrencyChooser = name =>{

        switch(name){
            case 'FROM':{
                console.log('in');
                this.setState({openCurrencyChooserForFrom: false});
                break;
            }

            case 'TO':{
                this.setState({openCurrencyChooserForTo:false});
                break;
            }
            
            
        }
    }
    onChosenCurrencyFrom = name =>{
       
        this.setState({currencyFromLatestValue: name, currencyFrom: name});
        this.closeCurrencyChooser('FROM');
     
        
    }

    

    onFocusFrom = e =>{
        
        this.setState({currencyFrom: ''});
         this.openCurrencyChooser('FROM');
    }

    onBlurFrom = e =>{
        
     
        this.setState({currencyFrom: this.state.currencyFromLatestValue});
      
        this.closeCurrencyChooser('FROM');
     
      
    }


    onChosenCurrencyTo = name =>{
       
        this.setState({currencyToLatestValue: name, currencyTo: name});
        this.closeCurrencyChooser('TO');
     
        
    }

    
    onFocusTo = e =>{
        
        this.setState({currencyTo: ''});
         this.openCurrencyChooser('TO');
    }

    onBlurTo = e =>{
        
     
        this.setState({currencyTo: this.state.currencyToLatestValue});
      
        this.closeCurrencyChooser('TO');
     
      
    }

    swapChosenCurrencies = e =>{
        e.preventDefault();

        const  fromLatestValue = this.state.currencyFromLatestValue;
        const  fromValue = this.state.currencyFrom;



        this.setState({
            currencyFromLatestValue: this.state.currencyToLatestValue,
            currencyFrom: this.state.currencyTo,
            currencyToLatestValue: fromLatestValue,
            currencyTo: fromValue,
        
        });
    }


    exitCurrencyConverterResult = e=>{
        e.preventDefault();
        this.setState({displayConvertResult: false});
    }
    render(){
        return(
            <div className="xd2">

          
                <div className="container ">
                    <div className="row">
                        <div className="col-12">

                            <h1>Aktualne kursy walut - 24/7</h1>
                            <div className="currency-converter">
                                    <h3 className="currency-converter__title">Przelicznik walut:</h3>

                                    <form 
                                        autocomplete="off"
                                        className="currency-converter__form"
                                        onSubmit={this.onFormSubmit} 
                                        >

                                        <div className="currency-converter__form-field currency-converter__form-field--amount">
                                            <label className="currency-converter__form-field__title " htmlFor="amount">
                                                 Ilość:
                                            </label>
                                    
                                            <input  onChange={this.setAmount} value={this.state.amount} className={`currency-converter__form-field__input  ${this.state.amountError ? `is-error` : '' } `} type="text" name="amount"  id="amount"/>
                                            { this.state.amountError ? <span className="error">Niepoprawna wartość</span> : ''}
                                        </div>
                                            <div className="currency-converter__form-field currency-converter__form-field--from">
                                                <label className="currency-converter__form-field__title " htmlFor="from">
                                                    Jaką walutę?:
                                                </label>
                                                <div className="currency-chooser-wrapper" > 
                                        
                                                <input className={`currency-converter__form-field__input `} onBlur={this.onBlurFrom}  onChange={this.setCurrencyFrom} value={this.state.currencyFrom} onClick={this.onFocusFrom}   type="text" name="from" id="from"/>

                                                { this.state.openCurrencyChooserForFrom ? <CurrencyChooser externalInput={true} externalInputValue={this.state.currencyFrom} chosenCurrency={this.onChosenCurrencyFrom} list={this.props.allCurrencies}/> : '' } 
                                                </div>
                                            </div>

                                   
                           
                 
                                        <button className="currency-converter__field-swapper" onClick={this.swapChosenCurrencies}>
                                            <i class="fas fa-exchange-alt"></i>
                                        </button>
                                        <div className="currency-converter__form-field currency-converter__form-field--to">
                                            <label className="currency-converter__form-field__title " htmlFor="to">
                                                 Na jaką?:
                                            </label>
                                    
                                            <div className="currency-chooser-wrapper" > 
                                        
                                        <input className={`currency-converter__form-field__input `} onBlur={this.onBlurTo}  onChange={this.setCurrencyTo} value={this.state.currencyTo} onClick={this.onFocusTo}   type="text" name="to" id="tp"/>

                                        { this.state.openCurrencyChooserForTo ? <CurrencyChooser externalInput={true} externalInputValue={this.state.currencyTo} chosenCurrency={this.onChosenCurrencyTo} list={this.props.allCurrencies}/> : '' } 
                                        </div>
                                            
                                        </div>
                                   
                                          

                                        <button className="btn btn--secondary currency-converter__form__submit-button">Oblicz</button>
                                    </form>


                                { this.state.displayConvertResult ?
                                    <div className="currency-converter__result">
                                        <button className="currency-converter__result__exit" onClick={this.exitCurrencyConverterResult}>X</button>
                                            <span className="currency-converter__result__title">
                                                Już obliczyliśmy!
                                            </span>
                                             <span className="currency-converter__result__from">
                                             {this.dataForConverterResult.amount} {this.dataForConverterResult.currencyFrom} to
                                                </span> 
                                        
                                            <span className="currency-converter__result__to">
                                            {this.dataForConverterResult.calculetedValue}  {this.dataForConverterResult.currencyTo} 
                                                </span> 
                                    </div>

                                 : ''   
                                }
                            </div>


                        </div>
                    </div>
                </div>

            </div>
           
        );
    }
}

export default CurrencyConverter;