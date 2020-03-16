import axios from 'axios';

export  async function NbpApi(url){
  
  const response =  await axios.get(`http://api.nbp.pl/api/exchangerates/${url}?format=json`);
   
    console.log('await',response);
  
      return response;
}