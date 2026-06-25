import { useEffect, useRef, useState } from 'react'
import { fetchContents } from './upnote.js'

/**
 * コンテンツ一覧フック
 * @param {string|null} contentTypeSlug null のときは fetch しない
 * @param {{page?: number, limit?: number, q?: string}} [options]
 */
export function useContentList(contentTypeSlug, options = {}) {
  const { page, limit, q } = options
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(contentTypeSlug != null)
  const aliveRef = useRef(true)

  useEffect(() => {
    aliveRef.current = true
    if (contentTypeSlug == null) {
      setLoading(false)
      return
    }

    const load = async () => {
      try {
        const res = await fetchContents(contentTypeSlug, { page, limit, q })
        if (!aliveRef.current) return
        setData(res)
        setError(null)
      } catch (e) {
        if (aliveRef.current) setError(e)
      } finally {
        if (aliveRef.current) setLoading(false)
      }
    }

    setLoading(true)
    load()

    return () => {
      aliveRef.current = false
    }
  }, [contentTypeSlug, page, limit, q])

  return { data, error, loading }
}
