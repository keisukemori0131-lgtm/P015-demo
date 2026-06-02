import { useEffect, useRef, useState } from 'react'
import { fetchContents, fetchContentById } from './upnote.js'

const SIGNED_URL_REFRESH_MS = 30 * 60 * 1000 // 30分 (署名付きURLは1時間で失効)

/**
 * コンテンツ一覧フック
 * @param {string} contentTypeSlug
 * @param {{page?: number, limit?: number, q?: string, refreshIntervalMs?: number}} [options]
 */
export function useContentList(contentTypeSlug, options = {}) {
  const { page, limit, q, refreshIntervalMs = SIGNED_URL_REFRESH_MS } = options
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const aliveRef = useRef(true)

  useEffect(() => {
    aliveRef.current = true
    let timer

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
    timer = setInterval(load, refreshIntervalMs)

    return () => {
      aliveRef.current = false
      clearInterval(timer)
    }
  }, [contentTypeSlug, page, limit, q, refreshIntervalMs])

  return { data, error, loading }
}

/**
 * コンテンツ詳細フック
 * @param {number|string|null|undefined} id null/undefined のときは fetch しない
 */
export function useContentById(id, options = {}) {
  const { refreshIntervalMs = SIGNED_URL_REFRESH_MS } = options
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(id != null)
  const aliveRef = useRef(true)

  useEffect(() => {
    aliveRef.current = true
    if (id == null) {
      setLoading(false)
      return
    }
    let timer

    const load = async () => {
      try {
        const res = await fetchContentById(id)
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
    timer = setInterval(load, refreshIntervalMs)

    return () => {
      aliveRef.current = false
      clearInterval(timer)
    }
  }, [id, refreshIntervalMs])

  return { data, error, loading }
}
