import { useState, useEffect } from "react"

export default function useFetch<T>(url: RequestInfo | null) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (url) {
    fetch(url).then(res => res.json()).then((data: T) => {
      setData(data)
      setLoading(false)
    })
    .catch(error => {
      setError(error)
      setLoading(false)
    })
    }
  }, [url])
  
  return {
    data,
    loading,
    error
  }
}