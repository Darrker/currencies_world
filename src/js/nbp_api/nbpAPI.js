import axios from 'axios';
import Moment from 'moment';



class NbpAPI {

  constructor(currency){
    this.axios =  axios.create({
      baseURL: `http://api.nbp.pl/api/exchangerates/rates/c/${currency}`,

    });
   
  }


 static getAllCurrencies(){
    return(
      axios.get(`http://api.nbp.pl/api/exchangerates/tables/c?format=json`)
    );
  }

  async getAsk(){
   const response = await this.axios.get(`today?format=json`);
  
    return response.data.rates[0].ask;
  }

  async getBid(){
    const response = await this.axios.get(`today?format=json`);
    return response.data.rates[0].bid;
  }


  getLast7Days(){
    return  this.axios.get(`last/7/?format=json`);
  }
  getLastMonth(){
    let dateFrom = Moment(new Date()).subtract(1,'months').format('YYYY-MM-DD');

   
    return  this.getDateRange(dateFrom, Moment(new Date()).format('YYYY-MM-DD') );
  }
  getLast3Months(){
    let dateFrom = Moment(new Date()).subtract(3,'months').format('YYYY-MM-DD');
    
    return this.getDateRange(dateFrom, Moment(new Date()).format('YYYY-MM-DD') );;
  }
  getLastHalfYear(){
    let dateFrom = Moment(new Date()).subtract(6,'months').format('YYYY-MM-DD');
    
    return this.getDateRange(dateFrom, Moment(new Date()).format('YYYY-MM-DD') );;
  }

  getLastYear(){
  
    let dateFrom = Moment(new Date()).subtract(12,'months').format('YYYY-MM-DD');
    return this.getDateRange(dateFrom, Moment(new Date()).format('YYYY-MM-DD') );

  }
  getDateRange(from, to){

    return  this.axios.get(`/${from}/${to}?format=json`);
  }


}



export default NbpAPI;