export const fetchCats = async (count: number) => {
  const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=${count}`, {
    headers: {
      'x-api-key': 'live_fHrUNHA96CMXDTbia9Xw4eSfJAovSZ0LWw5NPslMT79piyDM4IsdzPNJz5ktlzO3'
    }
  });
  return response.json();
};
