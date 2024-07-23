import axios from 'axios';

type Place = {
  name: string;
  rating: number;
};

type Params = {
  searchFilter: string;
};

export const fetchPlaces = async ({
  searchFilter,
}: Params): Promise<Place[]> => {
  const KEY = import.meta.env.VITE_GOOGLE_API_KEY as string;
  const BASE_URL = 'https://places.googleapis.com/v1/places:searchNearby';
  const res = await axios.post(
    BASE_URL,
    {
      includedTypes: [searchFilter],
      maxResultCount: 10,
      locationRestriction: {
        circle: {
          center: {
            latitude: 50.0755,
            longitude: 14.4378,
          },
          radius: 500.0,
        },
      },
    },
    {
      headers: {
        'X-Goog-Api-Key': KEY,
        'Content-Type': 'application/json',
        'X-Goog-FieldMask': 'places.displayName,places.rating',
      },
    },
  );

  // eslint-disable-next-line
  return res.data.places.map((item: any) => ({
    name: item.displayName.text,
    rating: item.rating,
  }));
};
