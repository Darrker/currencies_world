import React from 'react';

class CurrenciesTable extends React.Component{

    render(){
        return(
            <div>
                <div class="responsive-table">
                    <table className="currencies-table currencies-table--mini">
                        <thead>

                            <tr className="currencies-table__row">
                    
                            <th className="currencies-table__header">Waluta</th>
                            <th className="currencies-table__header">Ostatni kurs</th>
                            <th className="currencies-table__header">Zmiana</th>
                           

                            </tr>
                        </thead>

                        <tbody>
                            <tr className="currencies-table__row" >
                                <td className="currencies-table__cell">USD</td>
                                <td className="currencies-table__cell">4.34</td>
                                <td className="currencies-table__cell">0.3434</td>

                            </tr>
                            <tr className="currencies-table__row">
                            <td className="currencies-table__cell">EUR</td>
                            <td className="currencies-table__cell">4.32</td>
                            <td className="currencies-table__cell">0.3434</td>
                    
                        
                            </tr>


                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default CurrenciesTable;