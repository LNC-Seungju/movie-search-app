import React, { useState, MouseEvent } from 'react';

type SearchProps = {
  search: Function;
}
const Search = ( {search}: SearchProps) => {
  const [searchValue, setSearchValue] = useState('');
  
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.currentTarget.value)
  }
  const resetInputField = () => {
    setSearchValue('');
  }
  const callSearchFunction = (event: MouseEvent<HTMLInputElement>) => {
    event.preventDefault();
    {search(searchValue)};
    resetInputField();
  }
  
  return (
    <form className="search">
      <input
        value={searchValue}
        onChange={handleSearchInputChange}
        type="text"
      />  
      <input onClick={callSearchFunction} type="submit" value="SEARCH"/>
    </form>
  );
}

export default Search;