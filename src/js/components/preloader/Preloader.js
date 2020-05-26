import React from 'react'


class Preloader extends React.Component{

    render(){

        if(this.props.loading){
            return(

                <div className="preloader">
                    <div className="preloader__circle"></div>
                   
                </div>
            );
        }
        else if(this.props.error){
            return(

                <div className="preloader">
                    <span className="preloader__error">
                        Wystąpił problem - spróbuj ponownie później!
                    </span>
                </div>
            );
        }
        else{
            return null;
        }

      
    }
}

export default Preloader;