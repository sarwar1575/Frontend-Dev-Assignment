import { useState, useEffect } from 'react'
import axios, { AxiosError } from 'axios'

interface UseFetchResult<T> {
  data: T | null
  loading: boolean
  error: string | null
  refetch: () => void
}

export const useFetch = <T>(url: string | null): UseFetchResult<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    if (!url) {
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await axios.get<T>(url)
      setData(response.data)
    } catch (err) {
      const axiosError = err as AxiosError
      setError(axiosError.message || 'An error occurred while fetching data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [url])

  return { data, loading, error, refetch: fetchData }
}
