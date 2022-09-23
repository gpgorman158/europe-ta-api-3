import React from 'react'
import MiddleMenu from './MiddleMenu.js';
import TABox from './TABox.js'


function TopMid( {url, searchValue} ) {

  return (
    <>
            
        { url  ? <MiddleMenu /> : searchValue.map( item => <TABox locationId={item.location_id}/>) }
            
    </>
  );
}

export default TopMid;