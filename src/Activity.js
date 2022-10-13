import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import TABox from './TABox.js';
import axios from 'axios';
import {urlBack} from './global.js'


function Activity({url}) {
    
  let { activities } = useParams();
  const [locationId, setLocationId] = useState(null)

  useEffect( () => {

    if (activities === "hotels-paris"){
      const options = {method: 'GET', url: `${urlBack}/hotels-paris-back`, headers: {Accept: 'application/json'}};

      axios.request(options).then((response) => {
        setLocationId(response.data)
      })  
      .catch(err => console.error(err));
    }
    else if (activities === "hotels-barcelona"){
      const options = {method: 'GET', url: `${urlBack}/hotels-barcelona-back`, headers: {Accept: 'application/json'}};

      axios.request(options).then((response) => {
        setLocationId(response.data)
      })  
      .catch(err => console.error(err));
    }
    else if (activities === "restaurants-rome"){
      const options = {method: 'GET', url: `${urlBack}/restaurants-rome-back`, headers: {Accept: 'application/json'}};

      axios.request(options).then((response) => {
        setLocationId(response.data)
      })  
      .catch(err => console.error(err));
    }
  }, [url, activities])

  return (
    <>
        {locationId === null ? null : locationId.data.map( item => <TABox key={item.location_id} locationId={item.location_id}/>) }
    </>
  );
}

export default Activity;