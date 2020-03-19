import React from 'react';
import PopularCurrency from '../popularCurrency/PopularCurrency';
class PopularCurrencies extends React.Component{

    render(){
        return(
            <div className="popular-currencies">
                <h3 className="popular-currencies__title">Kursy popularnych walut</h3>
                <header className="popular-currencies__compared-to">
                    Porównujesz waluty do: 
                        <span className="popular-currencies__compared-to__currency">PLN</span>
                        <button className="btn btn--light btn--only-border ">Zmień walutę</button>
                </header>

                <ul className="popular-currencies__list">
                    <PopularCurrency/>
                    <PopularCurrency/>
                    <PopularCurrency/>
                    <PopularCurrency/>
                    <PopularCurrency/>
                </ul>
            </div>
        );
    }
}

export default PopularCurrencies;