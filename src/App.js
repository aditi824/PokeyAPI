import React, {useState,useEffect} from 'react';
import Card from './components/Card/Card'
import {getAllPokeymon,getPokeymon} from './fetching/fetch.js';
import './App.css';

import Header from './components/Header/Header';

function App() {
  const [pokeyData, setPokeyData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [loading, setLoading] = useState(true);
  const beginURL = 'https://pokeapi.co/api/v2/pokemon';

    useEffect(()=>{
    async function fetchData(){
        let response =await getAllPokeymon(beginURL)
        console.log(response);
        setNextURL(response.next);
        setPrevURL(response.previous);
        let pokeymon=await loadingPokeymon(response.results);
        console.log(pokeymon);
   setLoading(false);
    }
    fetchData();
},[]);

const next = async () => {
  setLoading(true);
  let data = await getAllPokeymon(nextURL);
  await loadingPokeymon(data.results);
  setNextURL(data.next);
  setPrevURL(data.previous);
  setLoading(false);
}

const prev = async () => {
  if (!prevURL) return;
  setLoading(true);
  let data = await getAllPokeymon(prevURL);
  await loadingPokeymon(data.results);
  setNextURL(data.next);
  setPrevURL(data.previous);
  setLoading(false);
}


const loadingPokeymon= async(data)=>{
let pokeymonData= await Promise.all(data.map(async pokeymon=>{
  let pokeymonRecord = await getPokeymon(pokeymon.url)
  return pokeymonRecord
}))
setPokeyData(pokeymonData);
}

  return (
    <div className="App">
      <Header/>
      {loading?<h1>Loading...</h1>:(<>
        <div className="btn">
              <button onClick={prev}>Prev</button>
              <button onClick={next}>Next</button>
            </div>

      <div className="grid-container">
              {pokeyData.map((pokeymon, i) => {
                return <Card key={i} pokeymon={pokeymon} />
              })}
            </div>
           
      </>)}
     
     
     
     </div>
     
  );
}

export default App;
