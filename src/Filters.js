import React, {useState} from 'react'
import {countries, latLong} from './global.js'

function Filters({url, onFilterSubmit}) {
  
  const [dropdownCountry, setDropdownCountry] = useState("")
  const [dropdownCity, setDropdownCity] = useState("")
  const [clickCategory, setClickCategory] = useState("")
  
  function handleCountry(e){
    setDropdownCountry(e.target.value)
  }
  function handleCity(e){
    setDropdownCity(e.target.value)
  }
  function handleClick (e){
    e.preventDefault()
    if (e.target.value === "hotels" || e.target.value === "restaurants" ||e.target.value === "attractions" || e.target.value === "geos"){
      setClickCategory(e.target.value)
    }
    else{
      if(e.target.parentNode.parentNode.value !== undefined){
        setClickCategory(e.target.parentNode.parentNode.value)
      }
      else{
        setClickCategory(e.target.parentNode.parentNode.parentNode.value)
      }
    }
    
  }
  function getCities (){
    let cities = latLong.filter( country => country.country === dropdownCountry)
    return cities;
  }
  function handleSubmit (e){
    e.preventDefault()
    if(dropdownCountry && dropdownCity && clickCategory){
      onFilterSubmit(dropdownCountry, dropdownCity, clickCategory)
    }
    else{
      alert("Please fill in all fields before continuing.")
    } 
  }
  
  const dropdownSelectedCity = (<><option hidden selected>{`Select a City...`}</option> {getCities().map( (city, index) => <option key={index} value={city.city}>{city.city}</option>).slice(0,20)}</>)
  const dropdownUnselectedCity =  <option hidden selected>Please Select a Country First...</option>
  
  return (
    <form className="filter" onSubmit={handleSubmit}>
        <div className="popular">Select from popular destinations</div>
        <div className="filter-container">
            
            <label htmlFor="country"></label>
            <select defaultValue={dropdownCountry} onChange={handleCountry} placeholder="Select a Country..." name="country" id="country">
                <option>Select a Country...</option>
                {countries.map((country, index) => <option key={index} value={country}>{country}</option>)}
            </select>
          
            <label htmlFor="city"></label>
            <select defaultValue={dropdownCity} onChange={handleCity} name="city" id="city">
                {dropdownCountry ? dropdownSelectedCity : dropdownUnselectedCity} 
            </select>
            
            <div className="middle-container">
                <button  onClick={handleClick} value="hotels" className="hotels">Hotels
                    <svg value="hotels" viewBox="0 0 24 24" width="36px" height="36px" className="d Vb UmNoP"><path value="hotels" d="M20.587 12.139V4.144H3.424v7.986A3.805 3.805 0 002 15.097v4.755h1.906v-1.905h16.188v1.91H22v-4.76a3.804 3.804 0 00-1.413-2.958zm-1.906-6.09V8.83a5.048 5.048 0 00-2.865-.876c-1.565 0-2.952.69-3.816 1.749-.864-1.059-2.252-1.749-3.818-1.749-1.07 0-2.056.324-2.851.866V6.049h13.35zm-.258 5.248c-.077-.005-.155-.012-.234-.012h-4.971c.438-.838 1.437-1.426 2.598-1.426 1.168 0 2.173.593 2.607 1.438zm-7.643-.012H5.812c-.081 0-.159.007-.238.012.434-.844 1.438-1.438 2.606-1.438 1.163 0 2.163.588 2.6 1.426zM3.906 16.04v-.943c0-1.051.855-1.905 1.906-1.905h12.376c1.051 0 1.905.854 1.905 1.905v.943H3.906z"></path></svg>
                </button>
                <button onClick={handleClick} value="restaurants" className= "restaurants">Restaurants
                    <svg value="restaurants" viewBox="0 0 24 24" width="36px" height="36px" className="d Vb UmNoP"><path value="restaurants" d="M18.753 21.459l-5.502-5.504-2.85 2.851-1.663-1.662-4.315 4.315-1.343-1.344 4.316-4.316-4.004-4.003A4.718 4.718 0 012 8.438c0-1.269.494-2.461 1.392-3.358l.834-.835 7.362 7.362.866-.866c-1.099-1.719-.777-3.972.912-5.661l2.538-2.538 1.343 1.344-2.538 2.537c-.785.787-1.254 1.903-.852 2.916l4.423-4.422 1.343 1.344-4.429 4.428c.31.13.64.188.977.164.646-.043 1.299-.364 1.838-.904a630.937 630.937 0 002.642-2.653L22 8.631s-1.241 1.255-2.647 2.66c-.865.865-1.951 1.383-3.057 1.456a4.027 4.027 0 01-2.501-.66l-.864.862 7.166 7.166-1.344 1.344zM4.291 6.995A2.835 2.835 0 003.9 8.438c0 .762.296 1.478.835 2.015l5.666 5.667 1.506-1.507-7.616-7.618z"></path></svg>
                </button>
                <button onClick={handleClick} value="attractions" className="activities">Activities
                    <svg value="attractions" viewBox="0 0 24 24" width="36px" height="36px" className="d Vb UmNoP" x="0" y="0"><circle cx="12" cy="8.5" r="1"></circle><circle cx="12" cy="12" r="1"></circle><circle cx="12" cy="15.5" r="1"></circle><path value="attractions" d="M20 6.5V8c-1.5.7-2.5 2.3-2.5 4 0 1.8 1 3.3 2.5 4v1.5H4V16c1.5-.7 2.5-2.3 2.5-4 0-1.8-1-3.3-2.5-4V6.5h16m2-2H2v5c1.4 0 2.5 1.1 2.5 2.5S3.4 14.5 2 14.5v5h20v-5c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5v-5z"></path></svg>
                </button>
                <button onClick={handleClick} value="geos" className="geography">Geography
                    <svg value="geos" xmlns="http://www.w3.org/2000/svg" version="1.0" width="36px" height="36px" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet">
                        <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="black" strokeWidth="100">
                            <path value="geos" d="M4310 3994 c-274 -41 -253 -33 -978 -357 l-502 -225 -538 165 c-689 211 -694 212 -827 220 -134 7 -183 -2 -326 -63 -148 -64 -185 -108 -167 -203 15 -82 14 -81 501 -376 306 -185 327 -200 305 -211 -13 -6 -202 -91 -420 -188 l-397 -177 -43 27 c-24 15 -139 98 -255 185 -117 87 -225 165 -240 172 -144 73 -358 20 -409 -102 -8 -18 -14 -58 -14 -89 0 -50 17 -93 181 -461 219 -491 217 -486 271 -537 91 -88 193 -118 393 -117 339 2 762 124 1446 418 93 39 169 71 169 70 0 -2 -55 -290 -121 -641 -133 -698 -141 -762 -101 -825 28 -46 82 -73 131 -66 20 3 86 26 146 53 102 45 117 55 201 138 51 52 107 119 128 155 21 35 210 438 421 895 357 774 386 832 417 849 18 9 189 93 379 186 456 221 692 351 867 474 148 105 192 161 192 245 0 104 -95 208 -265 291 -102 51 -176 73 -300 91 -67 9 -193 11 -245 4z m299 -234 c46 -11 111 -34 145 -50 60 -29 136 -84 136 -99 0 -12 -173 -131 -280 -193 -176 -103 -423 -230 -774 -399 l-349 -168 -404 -873 c-400 -866 -454 -971 -529 -1038 -29 -25 -114 -76 -114 -68 0 2 69 370 154 818 85 448 152 817 151 818 -2 2 -106 -42 -232 -98 -597 -268 -915 -390 -1228 -470 -363 -93 -636 -92 -698 4 -31 46 -368 816 -362 826 12 19 81 11 116 -13 19 -13 130 -94 247 -181 254 -188 296 -210 390 -204 63 5 157 45 1557 670 820 366 1520 675 1556 687 166 55 369 67 518 31z m-3049 -191 c60 -13 943 -281 953 -289 6 -5 -413 -198 -459 -212 -6 -2 -190 105 -408 237 -396 239 -396 239 -369 254 52 27 183 32 283 10z"/>
                        </g>
                    </svg>
                </button>
            </div>
            <button className="filter-submit" type="submit">
              <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
        </div>
      
    </form>
  );
}

export default Filters;