import Moment from 'moment';


class Range {

    constructor(start, end){
        this.cacheStart = new Moment(start).format('YYYY-MM-DD');
        this.cacheEnd = new Moment(end).format('YYYY-MM-DD');

    }

    setRange(start, end){
        start = new Moment(start).format('YYYY-MM-DD');
        end = new Moment(end).format('YYYY-MM-DD');
      var range = {
            start: '',
            end: ''
        };


        if(this.cacheStart <= start && this.cacheEnd >= end){
            return false;
        }
        if(this.cacheStart <= start){
            range.start = new Moment(this.cacheEnd).add(1,'day').format('YYYY-MM-DD');
          
           
        }else{
            range.start = start;
        }

        if(this.cacheEnd >= end){
            range.end = new Moment(this.cacheStart).subtract(1,'day').format('YYYY-MM-DD'); 
            
        
        }else{
            range.end = end;
        }


        return range;

    }


}

export default Range;