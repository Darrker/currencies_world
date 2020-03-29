export  function allCurrencies(state = [], action) {
    switch (action.type) {
      case 'ALL_CURRENCIES':
  
      let currencies = [...action.payload.data[0].rates];
      currencies.push({
          currency: "polski złoty",
          code: "PLN",
          bid: 1,
          ask: 1,
          
      });


      currencies.sort((a,b) => {
        if (a.code < b.code) return -1;
        else if (a.code > b.code) return 1;
        return 0;
        
        });
     
        return Object.assign({}, state, {
            currencies: currencies
            });

      default:
        return state
    }
  }