import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '19977012-bcc25ed08849b0efd207c01db';

axios.defaults.baseURL = BASE_URL;
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
};

const fetchImages = async ({
  searchQuery = '',
  currentPage = 1,
  perPage = 12,
}) => {
  const response = await axios.get('/', {
    params: { q: searchQuery, page: currentPage, per_page: perPage },
  });

  return response.data.hits;
};

const imageFinderApi = { fetchImages };

export default imageFinderApi;
