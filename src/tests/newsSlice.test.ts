import { configureStore } from '@reduxjs/toolkit';
import newsReducer, { fetchNewsData } from '../redux/slices/newsSlice';
import mockAxios from 'jest-mock-axios';

jest.mock('axios');

describe('newsSlice', () => {
  let store: any;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        news: newsReducer,
      },
    });
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should handle initial state', () => {
    const state = store.getState().news;
    expect(state).toEqual({
      articles: [],
      loading: false,
      error: null,
    });
  });

  it('should handle fetchNewsData.pending', async () => {
    store.dispatch(fetchNewsData.pending());
    const state = store.getState().news;
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchNewsData.fulfilled', async () => {
    const mockArticles = [
      {
        title: 'Crypto news article',
        link: 'https://news.com/crypto',
        pubDate: '2025-04-07',
        source_id: 'news1',
        image_url: 'https://image.com/crypto.jpg',
      },
    ];

    // Mock the Axios response
    mockAxios.get.mockResolvedValueOnce({ data: { results: mockArticles } });

    await store.dispatch(fetchNewsData.fulfilled(mockArticles, ''));
    const state = store.getState().news;

    expect(state.loading).toBe(false);
    expect(state.articles).toEqual(mockArticles);
  });

  it('should handle fetchNewsData.rejected', async () => {
    const errorMessage = 'Failed to fetch news';
    
    // Mock the Axios rejection
    mockAxios.get.mockRejectedValueOnce(new Error(errorMessage));

    await store.dispatch(fetchNewsData.rejected(new Error(errorMessage), ''));
    const state = store.getState().news;

    expect(state.loading).toBe(false);
    expect(state.error).toBe(errorMessage);
  });
});
