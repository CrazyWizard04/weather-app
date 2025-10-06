import {
  AirQuality,
  CurrentWeather,
  DailyWeather,
  HourlyWeather,
} from "@/lib/types";
/* eslint-disable  @typescript-eslint/no-explicit-any */

// Builds the current weather object from raw API data
export function buildCurrentWeather(current: any): CurrentWeather {
  // Mapping of CurrentWeather fields to their index positions in the data array
  const currentVarMap: Record<keyof Omit<CurrentWeather, "time">, number> = {
    weatherCode: 0,
    isDay: 1,
    temp: 2,
    apparentTemp: 3,
    humidity: 4,
    windSpeed: 5,
    precipitation: 6,
    rainChance: 7,
    pressure: 8,
    cloudCover: 9,
    uvIndex: 10,
    visibility: 11,
  };

  // Extract each variable’s value from the API data using the index map above
  const values = Object.fromEntries(
    Object.entries(currentVarMap).map(([key, index]) => [
      key,
      current.variables(index)?.value(),
    ]),
  ) as Omit<CurrentWeather, "time">;

  // Combine the extracted values with the current timestamp
  return {
    time: new Date(Number(current.time()) * 1000),
    ...values,
  };
}

// Builds an array of daily weather objects from the raw API data
export function buildDailyWeather(daily: any): DailyWeather[] {
  const end = Number(daily.timeEnd()); // End timestamp
  const start = Number(daily.time()); // Start timestamp
  const interval = daily.interval(); // Interval in seconds between days
  const totalDays = (end - start) / interval; // Total number of daily entries

  // Generate an array of Date objects representing each day in the dataset
  const times = [...Array(totalDays)].map(
    (_, i) => new Date((start + i * interval) * 1000),
  );

  // Extract data arrays from the dataset variables
  const weatherCodes = daily.variables(0).valuesArray(); // Weather condition codes
  const tempMax = daily.variables(1).valuesArray(); // Maximum daily temperatures
  const tempMin = daily.variables(2).valuesArray(); // Minimum daily temperatures

  // Extract sunrise and sunset times as arrays of Date objects
  const sunrise = [...Array(daily.variables(3).valuesInt64Length())].map(
    (_, i) => new Date(Number(daily.variables(3).valuesInt64(i)) * 1000),
  );

  const sunset = [...Array(daily.variables(4).valuesInt64Length())].map(
    (_, i) => new Date(Number(daily.variables(4).valuesInt64(i)) * 1000),
  );

  // Map all extracted data into a structured array of DailyWeather objects
  return times.map((time, i) => ({
    time,
    weatherCode: weatherCodes[i],
    maxTemp: tempMax[i],
    minTemp: tempMin[i],
    sunrise: sunrise[i],
    sunset: sunset[i],
  }));
}

// Builds an array of hourly weather objects from the raw API data
export function buildHourlyWeather(hourly: any): HourlyWeather[] {
  const end = Number(hourly.timeEnd());
  const start = Number(hourly.time());
  const interval = hourly.interval();
  const totalHours = (end - start) / interval;

  // Generate Date objects for each hourly interval
  const times = [...Array(totalHours)].map(
    (_, i) => new Date((start + i * interval) * 1000),
  );

  const weatherCodes = hourly.variables(0).valuesArray(); // Weather codes
  const isDay = hourly.variables(1).valuesArray(); // Day/Night indicator
  const temperatures = hourly.variables(2).valuesArray(); // Hourly temperatures

  // Map all hourly data into structured HourlyWeather objects
  return times.map((time, i) => ({
    time,
    weatherCode: weatherCodes[i],
    isDay: isDay[i],
    temp: temperatures[i],
  }));
}

// Builds an air quality object from raw API data
export function buildAirQuality(airQuality: any): AirQuality {
  // Mapping of Air Quality fields to their index positions in the data array
  const aqMap: Record<keyof Omit<AirQuality, "time">, number> = {
    us_index: 0,
    pm2_5: 1,
    pm10: 2,
    carbonMonoxide: 3,
    ozone: 4,
  };

  // Extract and round air quality variable values
  const values = Object.fromEntries(
    Object.entries(aqMap).map(([key, index]) => [
      key,
      Math.round(airQuality.variables(index)?.value() * 100) / 100, // Rounded to 2 decimals
    ]),
  ) as Omit<AirQuality, "time">;

  // Return a structured AirQuality object with timestamp
  return {
    time: new Date(Number(airQuality.time()) * 1000),
    ...values,
  };
}
