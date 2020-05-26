import React from 'react';

class CurrenciesTable extends React.Component{
    filterType = {
        'NAME': 'NAME',
        'BID': 'BID',
        'ASK': 'ASK',
    };

    filterPosition = {
        'MIN': 'MIN',
        'MAX': 'MAX',
    };

    state = {filteredCurrencies: this.props.allCurrencies, filterType: this.filterType.NAME, filterPosition: this.filterPosition.MIN}

  


    
    renderTableData(){
        return(
            this.state.filteredCurrencies.map((item,index) =>{
                return (
                    <tr className="currencies-table__row" key={index}>
                        <td className="currencies-table__cell">{item.code}</td>
                        <td className="currencies-table__cell">{item.bid}</td>
                        <td className="currencies-table__cell">{item.ask}</td>

                    </tr>
                );

            })
        );
    }

    tableSorter(type) {

        let currenciesData = this.state.filteredCurrencies ;

        switch(type){

            case this.filterType.NAME :{
                if(this.state.filterPosition === this.filterPosition.MIN){
                   
                    currenciesData = this.state.filteredCurrencies.sort((a,b) => {

                        return b.code.localeCompare(a.code)
                             
                     });

                     this.setState({filterType: this.filterType.NAME,filterPosition: this.filterPosition.MAX});
                }
                else{
                    currenciesData = this.state.filteredCurrencies.sort((a,b) => {
                        return a.code.localeCompare(b.code)
                             
                     });

                     this.setState({filterType: this.filterType.NAME,filterPosition: this.filterPosition.MIN});
                }
                
               

                break;
            }

            case this.filterType.BID :{

         
                if(this.state.filterPosition === this.filterPosition.MIN){
                    currenciesData = this.state.filteredCurrencies.sort((a,b) => a.bid - b.bid );

                     this.setState({filterType: this.filterType.BID,filterPosition: this.filterPosition.MAX});
                }
                else{
                    currenciesData = this.state.filteredCurrencies.sort((a,b) => b.bid - a.bid );

                     this.setState({filterType: this.filterType.BID,filterPosition: this.filterPosition.MIN});
                }
            
                break;
            }

            
            case this.filterType.ASK :{

        
                if(this.state.filterPosition === this.filterPosition.MIN){
                    currenciesData = this.state.filteredCurrencies.sort((a,b) => a.ask - b.ask );

                     this.setState({filterType: this.filterType.ASK,filterPosition: this.filterPosition.MAX});
                }
                else{
                    currenciesData = this.state.filteredCurrencies.sort((a,b) => b.ask - a.ask );

                     this.setState({filterType: this.filterType.ASK,filterPosition: this.filterPosition.MIN});
                }
            
                break;
            }
            default: {
                break;
            }

        }

        this.setState({filteredCurrencies: currenciesData});    
    }

    render(){
        return(
            <div>
                <div className="responsive-table">
                    <table className="currencies-table currencies-table--miniS">
                        <thead>

                            <tr className="currencies-table__row">
                    
                            <th className={`currencies-table__header ${this.state.filterType === this.filterType.NAME ? `is-${this.state.filterPosition}` : ''} `}
                                onClick={e => {this.tableSorter('NAME')}}
                               
                                >Waluta <i className="currencies-table__header__sorter-icon fas fa-caret-up"></i>
                                
                            </th>
                            <th
                                className={`currencies-table__header ${this.state.filterType === this.filterType.BID ? `is-${this.state.filterPosition}` : ''} `}
                                onClick={e => {this.tableSorter('BID')}}
                                
                                >Kupno <i className="currencies-table__header__sorter-icon fas fa-caret-up"></i></th>
                            <th
                                className={`currencies-table__header ${this.state.filterType === this.filterType.ASK ? `is-${this.state.filterPosition}` : ''} `}
                                onClick={e => {this.tableSorter('ASK')}}
                                
                                >Sprzedaż <i className="currencies-table__header__sorter-icon fas fa-caret-up"></i></th>
                            
                

                            </tr>
                        </thead>

                        <tbody>
                         {this.renderTableData()}
                      


                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default CurrenciesTable;