import React, {useState, useEffect} from 'react'
import './App.css';
import Header from './Header.js'
import { Route, Routes, useNavigate} from "react-router-dom";
import Footer from './Footer';
import Home from './Home';
import Country from './Country';
import Activity from './Activity';
import SearchResults from './SearchResults';
import Filters from './Filters';
import {latLong} from './global.js'

import axios from 'axios';

function App() {
  
  const [url, setUrl] = useState("http://localhost:8000/")
  const [search, setSearch] = useState("")
  const [searchValue, setSearchValue] = useState(null)
  const [filterValue, setFilterValue] = useState(null)

  let navigate = useNavigate();

  useEffect(() => {
        setUrl(window.location.href)
        
        if (url.includes("search") && url.split('/').slice(4)[0].includes('-')){
          let filterVars = url.split('/').slice(4)[0].split('-')
          let countryVar = filterVars[0]
          let cityVar = filterVars[1]
          let categoryVar = filterVars[2]
          onFilterSubmit(countryVar, cityVar, categoryVar)
        }
        else if (url.includes("search")){
          onSearch(url.split('/').slice(4))
        }
  }, [url])

  function onSearch (search) {
    setSearch(search)
    let abortController = new AbortController();
    const options = {method: 'GET', url: `http://localhost:8000/search-back`, params: {search: search}, headers: {Accept: 'application/json'}};

    axios.request(options).then((response) => {
      setSearchValue(response.data)
      navigate(`/search/${search}`)
    })  
    .catch(err => console.error(err));
    return () => {  
      abortController.abort();  
    }
  }

  function onCountryClick(newURL){
  }
  function onFooterClick (newUrl){
  }

  function onFilterSubmit(country, city, category){ 
    setSearchValue(null)
    let coordinates = latLong.filter( item => item.city === city)

    let abortController = new AbortController();
    const options = {method: 'GET', url: `http://localhost:8000/nearby-category-back`, params: {lat: coordinates[0].lat, long:coordinates[0].long, category:category}, headers: {Accept: 'application/json'}};

    axios.request(options).then((response) => {
      setFilterValue(response.data)
      navigate(`search/${country}-${city}-${category}`)
    })  
    .catch(err => console.error(err));
    return () => {  
      abortController.abort();  
    }
  }

  return (
    <div className="App">
      <Header onSearch={onSearch} />
      <Filters onFilterSubmit={onFilterSubmit} />
      <Routes>
        <Route exact path="/" element={<Home onCountryClick={onCountryClick} url={url} searchValue={searchValue}/>}></Route>
        <Route path="/country/">
            <Route path=":country" element={<Country url={url}/>}>
                <Route path=":city" element={<Country url={url}/>}/>
            </Route>
        </Route>
        <Route path="/search/:results" element={<SearchResults searchValue={searchValue} filterValue={filterValue}/>}></Route>
        <Route path="/:activities" element={<Activity url={url} />}></Route>
      </Routes>
      <Footer url={url} onFooterClick={onFooterClick}/>
    </div>
  );
}

export default App;
