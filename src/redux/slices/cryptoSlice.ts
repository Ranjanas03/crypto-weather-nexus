import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

// Define each crypto item
interface CryptoItem {
  id: string
  name: string
  symbol: string
  priceUsd: string
  changePercent24Hr: string
  marketCapUsd: string
}

// Define slice state
interface CryptoState {
  data: CryptoItem[]
  loading: boolean
  error: string | null
}

// Initial state
const initialState: CryptoState = {
  data: [],
  loading: false,
  error: null,
}

// Throttle logic
let lastFetched = 0
const FETCH_INTERVAL = 60 * 1000 // 60 seconds

// Async thunk with throttle to avoid 429 error
export const fetchCryptoData = createAsyncThunk(
  'crypto/fetchCryptoData',
  async (_, { rejectWithValue }) => {
    const now = Date.now()
    if (now - lastFetched < FETCH_INTERVAL) {
      return rejectWithValue('⏳ Request throttled to avoid API rate limit.')
    }

    try {
      const ids = ['bitcoin', 'ethereum', 'dogecoin']
      const response = await axios.get(`https://api.coincap.io/v2/assets`)
      const filtered = response.data.data.filter((coin: any) => ids.includes(coin.id))
      lastFetched = now
      return filtered as CryptoItem[]
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch crypto data')
    }
  }
)

// Slice
const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCryptoData.fulfilled, (state, action: PayloadAction<CryptoItem[]>) => {
        state.loading = false
        state.data = action.payload
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string || 'Something went wrong'
      })
  },
})

export default cryptoSlice.reducer
