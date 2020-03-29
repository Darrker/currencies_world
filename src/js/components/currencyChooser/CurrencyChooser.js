import React from 'react';

import ListOfCurrencies from '../listOfCurrencies/ListOfCurrencies';


class CurrencyChooser extends React.Component{

    state = {inputValue: '', filteredList: this.props.list}


   

    filterListOfCurrencies = e =>{
        

        const filteredList = this.props.list.filter(item => {
           const re = new RegExp(e.target.value, 'gi');
           const codeMatch = re.test(item.code);
           const nameMatch =  re.test(item.currency);
           return codeMatch || nameMatch;
        });
     
        this.setState(
            {
                inputValue: e.target.value,
                filteredList: filteredList
            }
            
            );


    }

    static getDerivedStateFromProps(props, state) {
        
        if(props.externalInputValue !== state.inputValue){
            const filteredList = props.list.filter(item => {
                const re = new RegExp(props.externalInputValue, 'gi');
                const codeMatch = re.test(item.code);
                const nameMatch =  re.test(item.currency);
                return codeMatch || nameMatch;
             });
          
             return(
                 {
                     inputValue: props.externalInputValue,
                     filteredList: filteredList
                 }
                 
                 );
        }

        return false;   


    }

    onChosenCurrency = id =>{
        this.props.chosenCurrency(id);
    }

    render(){

       
        return(
            <div className="currency-chooser">

            {!this.props.externalInput ? 
            
     
               <input 
                    onChange={this.filterListOfCurrencies}
                    value={this.state.inputValue}
                    className="currency-chooser__input"
                    placeholder="Wyszukaj walutę"
                    type="text"/>
                    
                    : ''

                }
                <ListOfCurrencies list={this.state.filteredList} chosenCurrency={this.onChosenCurrency}/>
            </div>
        );
    }
}

export default CurrencyChooser;