export const fetchRestaurants = async () => {
  try {
    const options = {
      headers: {
        Authorization: 'Api-Key q3MNxtfep8Gt'
      }
    }
    const response = await fetch(
      'https://code-challenge.spectrumtoolbox.com/api/restaurants', options);
      if(!response.ok) {
        throw new Error ('Unable to get restaurants');
      }
      const result = await response.json();
      return result
  } catch (error) {
    throw new Error(error.message)
  }
}
