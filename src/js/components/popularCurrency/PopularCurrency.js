import React from 'react';

class PopularCurrency extends React.Component{

    render(){
        return(
         
                    <li className="popular-currency">
                        <span className="popular-currency__name"> {this.props.name}</span>
                        <span className="popular-currency__value"> {this.props.value.toFixed(2)}</span>
                    </li>
         
        );
    }
}

export default PopularCurrency;