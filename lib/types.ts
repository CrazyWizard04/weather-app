export type Units = {
  temperature: "celsius" | "fahrenheit";
  windSpeed: "kmh" | "mph";
  precipitation: "mm" | "inch";
};

export type Weather = {
  currentWeather: CurrentWeather;
  airQuality: AirQuality;
  dailyWeather: DailyWeather[];
  hourlyWeather: HourlyWeather[];
};

export type CurrentWeather = {
  time: Date;
  weatherCode: number;
  isDay: boolean;
  temp: number;
  apparentTemp: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  rainChance: number;
  pressure: number;
  cloudCover: number;
  uvIndex: number;
  visibility: number;
};

export type DailyWeather = {
  time: Date;
  weatherCode: number;
  maxTemp: number;
  minTemp: number;
  sunset: Date;
  sunrise: Date;
};

export type HourlyWeather = {
  time: Date;
  weatherCode: number;
  isDay: boolean;
  temp: number;
};

export type AirQuality = {
  time: Date;
  us_index: number;
  pm2_5: number;
  pm10: number;
  carbonMonoxide: number;
  ozone: number;
};

export type City = {
  name: string;
  country: string;
  region: string;
  countryCode: string;
  latitude: number;
  longitude: number;
};

export type RainMap = {
  version: string;
  generated: number;
  host: string;
  radar: {
    past: RadarInfo[];
    nowcast: RadarInfo[];
  };
};

export type RadarInfo = {
  time: number;
  path: string;
};

export type ForwardGeocodingResults = {
  name: string;
  country: string;
  admin1: string;
  country_code: string;
  latitude: number;
  longitude: number;
};

export type ReverseGeocodingResults = {
  city: string;
  countryName: string;
  principalSubdivision: string;
  countryCode: string;
  latitude: number;
  longitude: number;
};

export type CurrentCard = {
  key: string;
  desc: string;
  img: string;
  value: number | string;
};

export type AqCard = {
  key: string;
  desc: string;
  img: string;
  value: number;
};
