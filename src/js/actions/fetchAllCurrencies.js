
import NbpAPI from '../nbp_api/nbpAPI';

export  function fetchAllCurrencies (){
    return async dispatch =>{
    

        var nbpresult =  await NbpAPI.getAllCurrencies();

      
        dispatch({
            type: 'ALL_CURRENCIES',
            payload:  nbpresult
        });
    }
}