import React from 'react';

class PopularCurrency extends React.Component{

    render(){
        return(
         
                    <li className="popular-currency">
                        <span className="popular-currency__name"> EUR</span>
                        <span className="popular-currency__value"> 4.31</span>
                    </li>
         
        );
    }
}

export default PopularCurrency;