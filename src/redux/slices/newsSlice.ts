import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

interface NewsArticle {
  title: string
  link: string
  pubDate: string
  source_id: string
  image_url: string
}

interface NewsState {
  articles: NewsArticle[]
  loading: boolean
  error: string | null
}

const initialState: NewsState = {
  articles: [],
  loading: false,
  error: null,
}

const API_KEY = process.env.NEXT_PUBLIC_NEWSDATA_API_KEY

export const fetchNewsData = createAsyncThunk(
  'news/fetchNewsData',
  async () => {
    const res = await axios.get(`https://newsdata.io/api/1/news`, {
      params: {
        apikey: API_KEY,
        q: 'cryptocurrency',
        category: 'business',
        language: 'en',
      },
    })
    return res.data.results.slice(0, 5) // Get top 5 articles
  }
)

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchNewsData.fulfilled, (state, action: PayloadAction<NewsArticle[]>) => {
        state.loading = false
        state.articles = action.payload
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'Failed to fetch news'
      })
  },
})

export default newsSlice.reducer
