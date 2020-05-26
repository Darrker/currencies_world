import React from 'react';

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

class ListOfCurrencies extends React.Component{

    renderListItems(){

    
            return(
                this.props.list.map((item,index) =>{
    
                    return    <li 
                                onMouseDown={ e => { this.chooseCurrency(e,item.code) }} 
                                className="list-of-currencies__item"
                                key={index}>{item.code} - {capitalize(item.currency)}
                            </li>
                })
           ); 
      

      

       
    }

    chooseCurrency = (e, id) =>{
        e.preventDefault();

        this.props.chosenCurrency(id);
    }

    render(){
        if(this.props.list.length){ 

            return(
     
                <ul className="list-of-currencies">
                    {this.renderListItems()}
                 
                  
                </ul>
         
            );

        }

        else{
            return(
                <div className="list-of-currencies__empty">
                    Nie znaleziono
                </div>
            );
        }

    }
}

export default ListOfCurrencies;