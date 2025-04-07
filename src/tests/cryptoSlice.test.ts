import { configureStore } from '@reduxjs/toolkit'
import cryptoReducer, { fetchCryptoData } from '../redux/slices/cryptoSlice'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

// Setup axios mock
const mock = new MockAdapter(axios)

// Proper store setup function
const createStore = () =>
  configureStore({
    reducer: {
      crypto: cryptoReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, // optional: silences non-serializable warnings
        }),
  })

describe('cryptoSlice', () => {
  let store: ReturnType<typeof createStore>

  beforeEach(() => {
    store = createStore()
    mock.reset()
  })

  it('should fetch crypto data successfully', async () => {
    mock.onGet('https://api.coincap.io/v2/assets').reply(200, {
      data: [
        {
          id: 'bitcoin',
          name: 'Bitcoin',
          symbol: 'BTC',
          priceUsd: '50000',
          changePercent24Hr: '2.5',
          marketCapUsd: '1000000000',
        },
        {
          id: 'ethereum',
          name: 'Ethereum',
          symbol: 'ETH',
          priceUsd: '3500',
          changePercent24Hr: '1.2',
          marketCapUsd: '400000000',
        },
      ],
    })

    await store.dispatch(fetchCryptoData() as any)

    const state = store.getState().crypto
    expect(state.loading).toBe(false)
    expect(state.data.length).toBeGreaterThan(0)
    expect(state.data[0].id).toBe('bitcoin')
    expect(state.error).toBeNull()
  })

  it('should handle API failure', async () => {
    mock.onGet('https://api.coincap.io/v2/assets').networkError()

    await store.dispatch(fetchCryptoData() as any)

    const state = store.getState().crypto
    expect(state.loading).toBe(false)
    expect(state.error).toBeDefined()
    expect(state.data.length).toBe(0)
  })
})
