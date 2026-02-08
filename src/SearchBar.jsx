import React from 'react';
import './App.css';


{/*searchbar/Input*/}
function SearchBar({ input, setInput, onSearch }) {
  return (
    <div className="search-input">
      <input
        type="text"
        className="city-search"
        placeholder="Enter City/Town Name.."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={onSearch}
      />
    </div>
  );
}

export default SearchBar;
