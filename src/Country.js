import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import TABox from './TABox.js';
import {latLong} from './global.js';
import axios from 'axios';


function Country({url}) {
    
  let { city, country } = useParams();
  
  const [locationId, setLocationId] = useState(null)
  
  useEffect( () => {

    let cityParam = latLong.filter( cityItem => cityItem.city === city)
    let countryParam = latLong.filter( countryItems => countryItems.country === country) 

    let abortController = new AbortController()

    if (window.location.href.split("/").length > 5){
      const options = {method: 'GET', url: `http://localhost:8000/nearby-back`, params: {lat: cityParam[0].lat, long:cityParam[0].long}, headers: {Accept: 'application/json'}};

      axios.request(options).then((response) => {
        setLocationId(response.data)
      })  
      .catch(err => console.error(err));
    }
    else {
      const options = {method: 'GET', url: `http://localhost:8000/nearby-back`, params: {lat: countryParam[0].lat, long:countryParam[0].long}, headers: {Accept: 'application/json'}};

      axios.request(options).then((response) => {
        setLocationId(response.data)
      })  
      .catch(err => console.error(err));
    }
    return () => {  
      abortController.abort();  
    }
  }, [url, city, country])

  return (
    <>
    
      {locationId === null ? null : locationId.data.map( item => <TABox key={item.location_id} locationId={item.location_id} />) } 
      
    </>
  );
}

export default Country;