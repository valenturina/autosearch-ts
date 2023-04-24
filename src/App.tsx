import React, {useState} from 'react';
import './App.css';
import useFetchData from './hooks/useFetchData';
import {AiOutlineSearch, AiOutlineLoading3Quarters, AiOutlineCloseCircle } from 'react-icons/ai'


function App()  {

  const [query, setQuery] = useState<string>('')
  const [openSuggestions, setOpenSuggestions] = useState<boolean>(false)

  const {data, loading, error} = useFetchData(query)

  const handleClickQuery = (query: string) => {
    setQuery(query)
    setOpenSuggestions(false)
  }

  const handleClearSearch = () => {
    setOpenSuggestions(false)
    setQuery('')
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    setOpenSuggestions(true)
  }

  return (
    <div className='container'>
      <header className='app-header'>
        <h1>Search Rick&Morty characters</h1>
      </header>
      <div className='app-search'>
        <div className='input-wrapper'>
          {loading
            ? <AiOutlineLoading3Quarters className='input-icon' />
            : <AiOutlineSearch className='input-icon' />
          }
          <input
            className='input'
            type="search"
            placeholder='type to search'
            value={query}
            onChange={handleInputChange}
          />
          <button
            className='input-button icon-close'
            onClick={handleClearSearch}
          >
            <AiOutlineCloseCircle/>
          </button>
      
        </div>
        {data?.length && openSuggestions ? (
          <div className='suggestions-wrapper'>
            <ul className='suggestion-list' aria-label='autocomplete'>
              {data.map((item) => (
                <li
                  key={item.id}
                  className='suggestion-item'
                  onClick={() => handleClickQuery(item.name)}
                >
                  {item.name}
                </li>
              ))}
            </ul>
          </div>
          ) 
          : null
        } 
        {error
          ? <span className='error-message'>По запросу ничего не найдено</span>
          : null}
      </div>
    </div>
  );
}

export default App;
