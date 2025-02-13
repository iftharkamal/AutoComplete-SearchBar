import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [cache,setCache] = useState({})

  const fetchData = async () => {
    
    if(cache[input]){
      console.log("CACHE RETURNED:", input)
      setResults(cache[input])
      return
    }


    console.log("API CALL", input);
    const data = await fetch("https://dummyjson.com/recipes/search?q=" + input);
    const json = await data.json();
    setResults(json.recipes);
    setCache((prev) => ({...prev, [input] : json.recipes}))
  };

  useEffect(() => {
    // debouncing 
    const timer = setTimeout(fetchData, 300);
    return () => clearTimeout(timer)
    }, [input]);

  return (
    <div>
      <h1 className="heading">AutoComplete Search Bar</h1>
      <input
        className="search-input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
        type="text"
      />
      {showResults && (
        <div className="search-container">
          {results.map((r) => (
            <span className="search-items" key={r.id}>
              {r.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
