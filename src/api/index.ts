import { API_KEY } from "../components/constants";

const BASE_URL = 'https://api.thecatapi.com/v1'


export const fetchCats = async (count: number) => {
  const response = await fetch(`${BASE_URL}/images/search?limit=${count}`, {
    headers: {
      'x-api-key': API_KEY
    }
  });
  return response.json();
};
