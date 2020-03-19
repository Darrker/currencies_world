import React from 'react';


class CurrencyConverter extends React.Component{

    render(){
        return(
            <div className="xd2">

          
                <div className="container ">
                    <div className="row">
                        <div className="col-12">

                            <h1>Aktualne kursy walut - 24/7</h1>
                            <div className="currency-converter">
                                    <h3 className="currency-converter__title">Przelicznik walut:</h3>

                                    <form className="currency-converter__form">

                                        <div className="currency-converter__form-field currency-converter__form-field--amount">
                                            <label className="currency-converter__form-field__title " htmlFor="amount">
                                                 Ilość:
                                            </label>
                                    
                                            <input  type="number" name="amount" id="amount"/>
                                        </div>

                                        <div className="currency-converter__form-field currency-converter__form-field--from">
                                            <label className="currency-converter__form-field__title " htmlFor="from">
                                                 Jaką walutę?:
                                            </label>
                                    
                                            <input  type="text" name="from" id="from"/>

                                           

                                        </div>
                                        <button className="currency-converter__field-swapper">
                                            <i class="fas fa-exchange-alt"></i>
                                        </button>
                                        <div className="currency-converter__form-field currency-converter__form-field--to">
                                            <label className="currency-converter__form-field__title " htmlFor="to">
                                                 Na jaką?:
                                            </label>
                                    
                                            <input  type="text" name="to" id="to"/>
                                        </div>
                                   
                                          

                                        <button className="btn btn--secondary currency-converter__form__submit">Oblicz</button>
                                    </form>


                                    <div className="currency-converter__result">
                                            <span className="currency-converter__result__title">
                                                Już obliczyliśmy!
                                            </span>
                                             <span className="currency-converter__result__from">
                                                 230 EUR to
                                                </span> 
                                        
                                            <span className="currency-converter__result__to">
                                               3432133 USD 
                                                </span> 
                                    </div>
                            </div>


                        </div>
                    </div>
                </div>

            </div>
           
        );
    }
}

export default CurrencyConverter;