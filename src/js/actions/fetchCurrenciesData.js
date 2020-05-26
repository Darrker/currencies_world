
import NbpAPI from '../nbp_api/nbpAPI';

export  function fetchCurrenciesData (currency, range){
    return async dispatch =>{
    
           

        var nbpresult = await new NbpAPI(currency).getDateRange(range.start,range.end);;

     
        dispatch({
            type: 'CURRENCIES_DATA',
            payload:  nbpresult.data
        });
    }
}