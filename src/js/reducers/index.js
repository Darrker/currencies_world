import {combineReducers} from 'redux';
import {currenciesData} from '../reducers/currenciesData';
import {allCurrencies} from '../reducers/allCurrencies';

export default combineReducers({
  currenciesData, allCurrencies
});