import { useState, useEffect } from 'react'

interface FetchState<T> {
  data: null | T
  loading: boolean
  error: Error | null
}

export default function useFetch <T,>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        console.log(data)
        setState({ data, loading: false, error: null })
      } catch (error) {
        setState({ data: null, loading: false, error: error as Error })
      }
    }

    fetchData()
  }, [url])

  return state
}