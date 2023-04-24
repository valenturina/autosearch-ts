import { useState, useEffect } from 'react';
import { IData, TUseFetchData } from '../types/types';
import useDebounce from './useDebounce';


export async function fetchData(url: string, query: string): Promise<IData[]> {
  const response = await fetch(`${url}${query}`)
  if (response.ok) {
    const data = await response.json()
    const results = data?.results?.map((item: any) => {
      return {
        name: item.name,
        id: item.id
      }
    })
    return results
  } else {
    throw new Error(response.statusText)
  }
}

const useFetchData:TUseFetchData = (query) => {
  const API_URL = 'https://rickandmortyapi.com/api/character/?name=';
  const [data, setData] = useState<IData[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | boolean>(false)
  const debouncedQuery = useDebounce(query, 200)

  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      fetchData(API_URL, debouncedQuery)
        .then(data => {
          setData(data)
          setLoading(false)
          setError(false)
        })
        .catch(err => {
          setLoading(false)
          setError(err.message)
          setData([])
        })
    } else {
      setData([])
      setError(false)
    }
  }, [debouncedQuery])

  return {data, loading, error}
}

export default useFetchData