import { useEffect, useRef, useState } from 'react'
import { fetchContents, fetchContentById } from './upnote.js'

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

/**
 * コンテンツ詳細フック（記事詳細ページ用・R14-3）
 * S3 署名付き URL の失効対策として 30 分ごとに自動再フェッチする（R9 §6）。
 * @param {string|null} id null のときは fetch しない
 * @param {{ localSlug?: string }} [options] ローカルモードで読む contentTypeSlug
 */
export function useContentById(id, options = {}) {
  const { localSlug } = options
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

    const load = async (initial) => {
      try {
        const res = await fetchContentById(id, { localSlug })
        if (!aliveRef.current) return
        setData(res)
        setError(null)
      } catch (e) {
        if (aliveRef.current && initial) setError(e)
      } finally {
        if (aliveRef.current) setLoading(false)
      }
    }

    setLoading(true)
    setData(null)
    setError(null)
    load(true)
    const timer = setInterval(() => load(false), 30 * 60 * 1000)

    return () => {
      aliveRef.current = false
      clearInterval(timer)
    }
  }, [id, localSlug])

  return { data, error, loading }
}
