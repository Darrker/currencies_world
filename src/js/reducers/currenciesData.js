export  function currenciesData(state = [], action) {
  switch (action.type) {
    case 'CURRENCIES_DATA':
    
    var currenciesData = {};

     
     
  
        
        let data =  action.payload.rates.map(currency =>{
            return {
                date: currency.effectiveDate,
                 value: currency.bid
            }
        });

     
        currenciesData[action.payload.code] =  data;
        

    


    let tempState ={} ;


      for (const currency in currenciesData) {

        if(typeof state[currency] != 'undefined'){
          tempState[currency] = [...currenciesData[currency], ...state[currency]];
        }

        else{
          tempState[currency] = [...currenciesData[currency]];
        }
       
      }

      for (const currency in state) {

        if(typeof tempState[currency] == 'undefined'){
          tempState[currency] = [...state[currency]];
        }

        
      }

      for (const currency in tempState) {
        tempState[currency].sort((a,b)=>{
          return new Date (a.date) - new Date(b.date);
        });
      }

  

    return tempState;

    default:
      return state
  }
}