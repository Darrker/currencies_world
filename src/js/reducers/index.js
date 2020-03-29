export  function currencyData(state = [], action) {
    switch (action.type) {
      case 'FETCH_DATA':
        console.log(action.payload);
        return Object.assign({}, state, action.payload);

      default:
        return state
    }
  }