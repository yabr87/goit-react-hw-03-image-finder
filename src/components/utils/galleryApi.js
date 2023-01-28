import axios from 'axios';

export const getGalleryItems = async (search, page) => {
  const URL = `https://pixabay.com/api/?q=${search}&page=${page}&key=31865177-941795f6a9b4b09e4f4c303b4&image_type=photo&orientation=horizontal&per_page=12`;
  const { data } = await axios.get(URL);
  console.log('Єтомоя дата', data);
  return data;
};
