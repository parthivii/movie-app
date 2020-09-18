import React, { useState } from 'react';
import axios from 'axios';

import Search from './components/Search';
import Results from './components/Results';


function App() {
    const [state, setState] = useState({  //default values
        s: "", //search query
        results: [],  // empty array
        selected: {}  // empty object relating to movie clicked on Pop-up
    });
    const apiurl="http://www.omdbapi.com/?i=tt3896198&apikey=5bbd57cd";

    const search= (e) =>{
        if (e.key ==="Enter") //listen for a key
        {
            axios(apiurl + "&s=" + state.s).then(({data}) => {
                let results= data.Search;

                setState(prevState => {
                    return { ...prevState, results: results}
                });
            });

        }

    }

    const handleInput= (e) => {
        let s = e.target.value;

        setState(prevState => {       //we don't wanna overwrite the state
            return { ...prevState, s: s}     // getting the spread notation prev state and changing the s value only that's created by the target value
        });
    }

  return (
    <div className="App">
      <header>
        <h1> Movie Database </h1>
      </header>
      <main>
        <Search handleInput={handleInput} search={search}/>
        <Results results={state.results} />
      </main>
    </div>
  );
}

export default App;
