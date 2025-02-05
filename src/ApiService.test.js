import { fetchFuelData } from './ApiService';

describe('fetchFuelData', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: async () => ([]),
      })
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should send a token in the fetch headers', async () => {
    await fetchFuelData();
    expect(fetch).toHaveBeenCalledWith(
      'https://api.fuelpricesqld.gov.au/fueldata',
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: 'Bearer your-token'
        })
      })
    );
  });
}); 