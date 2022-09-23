import React from 'react'
import { Link } from "react-router-dom";
import {latLong} from './global.js'

function Footer({url, onFooterClick}) {

    function handleClick(e){
        onFooterClick(e.target.href)
    }
    let countries = latLong.slice(0,24)
    const uniqueValuesSet = new Set();
    const filteredArr = countries.filter((obj) => {
        const isPresentInSet = uniqueValuesSet.has(obj.country);
        uniqueValuesSet.add(obj.country);
        return !isPresentInSet;
    });
  return (
    <div className="footer">
        
        {filteredArr.map((country, index) => {
            let counter = 0;
            
            let bigthing = <div key={index} className='footer-item'>
                <p>Top Cities in {country.country}</p>
                <ul>
                
                {latLong.slice(0,790).map((city, index) => {
                    
                    if (city.country === country.country && counter < 5){
                            let thing = <Link to={`/country/${city.country}/${city.city}`} key={index} onClick={handleClick}><li>{city.city}</li></Link>
                            counter++;
                            return thing;
                    }
                    })
                }
                </ul>
            </div>
            return bigthing;
        })
        }
    </div>
  );
}

export default Footer;