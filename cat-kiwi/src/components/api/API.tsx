import axios from 'axios';
import { IBreedCats } from '../../types/breed-cats.typing';

const API_BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'YOUR_API_KEY_HERE';

axios.defaults.headers.common['x-api-key'] = API_KEY; 

const getStoredBreedImages = () => {
  const storedImages = localStorage.getItem('breedImages');
  return storedImages ? JSON.parse(storedImages) : {};
};

const setStoredBreedImages = (images: { [key: string]: string }) => {
  localStorage.setItem('breedImages', JSON.stringify(images));
};

export const fetchAllBreeds = async (): Promise<IBreedCats[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/breeds`);
    return response.data;
  } catch (error) {
    console.error('Error fetching all breeds:', error);
    throw error;
  }
};

export const searchBreeds = async (query: string): Promise<IBreedCats[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/breeds/search?q=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching breeds:', error);
    throw error;
  }
};

export const fetchBreedDetails = async (breedId: string): Promise<IBreedCats> => {
  try {
    const breedResponse = await axios.get(`${API_BASE_URL}/breeds/${breedId}`);
    const breed = breedResponse.data;

    const storedImages = getStoredBreedImages();

    if (storedImages[breed.id]) {
      breed.image = { id: breed.id, url: storedImages[breed.id] };
    } else {
      try {
        const imageResponse = await axios.get(`${API_BASE_URL}/images/search?breed_ids=${breed.id}&limit=1`);
        const imageUrl = imageResponse.data.length > 0 ? imageResponse.data[0].url : '';
        storedImages[breed.id] = imageUrl;
        breed.image = { id: breed.id, url: imageUrl };
      } catch (imageError) {
        console.error(`Error fetching image for breed ${breed.id}:`, imageError);
        breed.image = null;
      }
    }

    setStoredBreedImages(storedImages);

    return breed;
  } catch (error) {
    console.error('Error fetching breed details:', error);
    throw error;
  }
};

export const fetchTopBreeds = async (): Promise<IBreedCats[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/breeds`);
    const data = response.data;

    const storedImages = getStoredBreedImages();
    const breedsWithImages = await Promise.all(
      data.map(async (breed: IBreedCats) => {
        if (storedImages[breed.id]) {
          return { ...breed, image: { id: breed.id, url: storedImages[breed.id] } };
        } else {
          try {
            const imageResponse = await axios.get(`${API_BASE_URL}/images/search?breed_ids=${breed.id}&limit=1`);
            const imageUrl = imageResponse.data.length > 0 ? imageResponse.data[0].url : '';
            storedImages[breed.id] = imageUrl;
            return { ...breed, image: { id: breed.id, url: imageUrl } };
          } catch (imageError) {
            console.error(`Error fetching image for breed ${breed.id}:`, imageError);
            return { ...breed, image: null };
          }
        }
      })
    );

    setStoredBreedImages(storedImages);

    const sortedBreeds = breedsWithImages
      .filter(breed => breed.affection_level !== undefined)
      .sort((a, b) => b.affection_level - a.affection_level)
      .slice(0, 10); 

    return sortedBreeds; 

  } catch (error) {
    console.error('Error fetching top breeds:', error);
    throw error;
  }
};

export const fetchBreedPhotos = async (breedId: string, limit: number = 10): Promise<{ id: string; url: string }[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/images/search?breed_ids=${breedId}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching breed photos:', error);
    throw error;
  }
};
