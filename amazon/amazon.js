import axios from 'axios';

const API_KEY = 'dd87f09ed3mshee0b2f36f365be3p1b4f72jsnb149958c7626';

export const fetchAmazonProducts = async (query = 'Phone') => {
  const options = {
    method: 'GET',
    url: 'https://real-time-amazon-data.p.rapidapi.com/search',
    params: {
      query,
      page: '1',
      country: 'US',
      sort_by: 'RELEVANCE',
      product_condition: 'ALL',
      is_prime: 'false',
      deals_and_discounts: 'NONE',
    },
    headers: {
      'x-rapidapi-key': 'd53e16b26fmshb0c79e088cd8997p19fe19jsn1f080e78740b',
    'x-rapidapi-host': 'real-time-amazon-data.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.data.products || [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};
