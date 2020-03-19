import React from 'react';



class SectionSwitcher extends React.Component{
    render(){
        return(
            <ul className="section-switcher">
                <li className="section-switcher__item">Kupno </li>
                <li className="section-switcher__item section-switcher__item--is-active">Sprzedaż</li>
              </ul>
        );
    }
}

export default SectionSwitcher;