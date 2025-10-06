import axios from "axios";
import {
  City,
  ForwardGeocodingResults,
  RainMap,
  ReverseGeocodingResults,
  Weather,
} from "@/lib/types";

const BASE_URL = "/api";
const forwardGeocodingUrl = process.env.NEXT_PUBLIC_FORWARD_GEOCODING_API!;
const reverseGeocodingURl = process.env.NEXT_PUBLIC_REVERSE_GEOCODING_API!;
const rainMapUrl = process.env.NEXT_PUBLIC_RAIN_MAP_API!;

// Fetch the weather of the given location using coords
export async function getWeatherData(lat: number, lon: number) {
  const res = await axios.get<Weather>(`${BASE_URL}/weather`, {
    params: { lat, lon },
  });
  return res.data;
}

// Fetch the rainLayer for the Rain Map
export async function getRainMap() {
  const res = await axios.get(rainMapUrl);
  return res.data as RainMap;
}

// Fetch the first 10 matching cities of the query
export async function getMatchingCities(name: string) {
  const res = await axios.get(forwardGeocodingUrl, {
    params: { name },
  });

  // Making the data compatible for our type
  const results = res.data.results;
  return results.map(
    (city: ForwardGeocodingResults): City => ({
      name: city.name,
      country: city.country,
      region: city.admin1,
      countryCode: city.country_code,
      latitude: Math.round(city.latitude * 100) / 100, // Rounded to 2 decimals
      longitude: Math.round(city.longitude * 100) / 100, // Rounded to 2 decimals
    }),
  );
}

// Fetch the users current city by using the devices coords
export async function getReverseCityData(lat: number, lon: number) {
  const res = await axios.get(reverseGeocodingURl, {
    params: { latitude: lat, longitude: lon },
  });

  const data: ReverseGeocodingResults = res.data;
  return {
    name: data.city,
    country: data.countryName,
    region: data.principalSubdivision,
    countryCode: data.countryCode,
    latitude: Math.round(data.latitude * 100) / 100,
    longitude: Math.round(data.longitude * 100) / 100,
  } as City;
}
