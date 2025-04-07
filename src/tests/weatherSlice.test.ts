import { configureStore } from '@reduxjs/toolkit'
import weatherReducer, { fetchWeatherData, fetchCityWeather } from '../redux/slices/weatherSlice'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)

describe('weatherSlice', () => {
  const createTestStore = () =>
    configureStore({
      reducer: { weather: weatherReducer },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
    })

  let store = createTestStore()

  beforeEach(() => {
    store = createTestStore()
    mock.reset()
  })

  it('should fetch weather data for default cities', async () => {
    const mockData = {
      id: 1,
      name: 'New York',
      main: { temp: 25, humidity: 60 },
      weather: [{ description: 'Clear sky' }],
    }

    mock
      .onGet(/weather\?q=New York/)
      .reply(200, mockData)
      .onGet(/weather\?q=London/)
      .reply(200, { ...mockData, id: 2, name: 'London' })
      .onGet(/weather\?q=Tokyo/)
      .reply(200, { ...mockData, id: 3, name: 'Tokyo' })

    await store.dispatch(fetchWeatherData() as any)

    const state = store.getState().weather
    expect(state.loading).toBe(false)
    expect(state.data.length).toBe(3)
    expect(state.data[0].name).toBe('New York')
  })

  it('should fetch weather data for a specific city', async () => {
    const city = 'Berlin'
    const mockCityData = {
      id: 4,
      name: 'Berlin',
      main: { temp: 20, humidity: 55 },
      weather: [{ description: 'Cloudy' }],
    }

    mock.onGet(new RegExp(`weather\\?q=${city}`)).reply(200, mockCityData)

    await store.dispatch(fetchCityWeather(city) as any)

    const state = store.getState().weather
    expect(state.loading).toBe(false)
    expect(state.data.some((d) => d.name === 'Berlin')).toBe(true)
  })

  it('should handle weather API failure', async () => {
    mock.onGet(/weather\?q=New York/).networkError()
    mock.onGet(/weather\?q=London/).networkError()
    mock.onGet(/weather\?q=Tokyo/).networkError()

    await store.dispatch(fetchWeatherData() as any)

    const state = store.getState().weather
    expect(state.loading).toBe(false)
    expect(state.error).toBeDefined()
    expect(state.data.length).toBe(0)
  })
})
