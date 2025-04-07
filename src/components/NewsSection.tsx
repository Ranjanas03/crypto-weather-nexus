'use client'

import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNewsData } from '../redux/slices/newsSlice'
import { AppDispatch, RootState } from '../redux/store'

export default function NewsSection() {
  const dispatch = useDispatch<AppDispatch>()
  const { articles, loading, error } = useSelector((state: RootState) => state.news)

  useEffect(() => {
    dispatch(fetchNewsData())
  }, [dispatch])

  return (
    <section className="">
      <h2 className="text-2xl font-bold mb-4">📰 Crypto News</h2>

      {loading && <p className="text-white">Loading news...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article, idx) => (
          <a
            key={idx}
            href={article.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 rounded bg-gray-900 hover:bg-gray-700 transition"
          >
            <h3 className="text-lg font-semibold text-white">{article.title}</h3>
            <p className="text-sm text-gray-400 mt-2">{article.pubDate}</p>
            {article.image_url && (
              <img src={article.image_url} alt="" className="mt-2 max-h-48 w-full object-cover rounded" />
            )}
          </a>
        ))}
      </div>
    </section>
  )
}
