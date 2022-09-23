import React from 'react'
import TABox from './TABox.js';


function SearchResults( {searchValue, filterValue} ) {
    
  return (
    <>
        {searchValue !== null 
          ? searchValue.data.map( item => <TABox key={item.location_id} locationId={item.location_id}/>) 
          : filterValue !== null 
            ? filterValue.data.map( item => <TABox key={item.location_id} locationId={item.location_id}/>) 
            : null}
    </>
  );
}

export default SearchResults;