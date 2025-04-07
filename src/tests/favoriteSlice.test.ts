import favoriteReducer, {
    toggleFavoriteCity,
    toggleFavoriteCrypto,
} from '../redux/slices/favoriteSlice'

describe('favoriteSlice reducer', () => {
    it('should return the initial state', () => {
        expect(favoriteReducer(undefined, { type: undefined })).toEqual({
            cities: [],
            cryptos: [],
        })
    })

    it('should add a city to favorites', () => {
        const initialState = { cities: [], cryptos: [] }
        const nextState = favoriteReducer(initialState, toggleFavoriteCity('London'))
        expect(nextState.cities).toContain('London')
    })

    it('should remove a city if already in favorites', () => {
        const initialState = { cities: ['London'], cryptos: [] }
        const nextState = favoriteReducer(initialState, toggleFavoriteCity('London'))
        expect(nextState.cities).not.toContain('London')
    })

    it('should add a crypto to favorites', () => {
        const initialState = { cities: [], cryptos: [] }
        const nextState = favoriteReducer(initialState, toggleFavoriteCrypto('Bitcoin'))
        expect(nextState.cryptos).toContain('Bitcoin')
    })

    it('should remove a crypto if already in favorites', () => {
        const initialState = { cities: [], cryptos: ['Bitcoin'] }
        const nextState = favoriteReducer(initialState, toggleFavoriteCrypto('Bitcoin'))
        expect(nextState.cryptos).not.toContain('Bitcoin')
    })
})
