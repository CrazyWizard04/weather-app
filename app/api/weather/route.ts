import { NextResponse } from "next/server";
import { fetchWeatherApi } from "openmeteo";
import {
  buildAirQuality,
  buildCurrentWeather,
  buildDailyWeather,
  buildHourlyWeather,
} from "@/lib/utils/buildWeatherData";

// API for combining other APIs to one and formatting data to compatible types
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lon");

  // API Links
  const weatherApi = process.env.WEATHER_FORECAST_API!;
  const airQualityApi = process.env.AIR_QUALITY_API!;

  // If no coords are given in the request
  if (!latitude || !longitude) {
    return NextResponse.json(
      { error: `Missing coords (lat,lon) parameter` },
      { status: 400 },
    );
  }

  // Setting the params for the OpenMeteo forecast API
  const weatherParams = {
    latitude,
    longitude,
    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "sunrise",
      "sunset",
    ],
    hourly: ["weather_code", "is_day", "temperature_2m"],
    current: [
      "weather_code",
      "is_day",
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "wind_speed_10m",
      "precipitation",
      "precipitation_probability",
      "surface_pressure",
      "cloud_cover",
      "uv_index",
      "visibility",
    ],
    timezone: "auto",
  };

  // Setting the params for the OpenMeteo Air Quality API
  const aqParams = {
    latitude,
    longitude,
    current: ["us_aqi", "pm2_5", "pm10", "carbon_monoxide", "ozone"],
    timezone: "auto",
  };

  // Fetching the Forecast and the Air Quality data
  const weatherRes = await fetchWeatherApi(weatherApi, weatherParams);
  const aqRes = await fetchWeatherApi(airQualityApi, aqParams);

  // Getting the first response of both APIs
  const weatherResponse = weatherRes[0];
  const aqResponse = aqRes[0];

  // Splitting the data to CurrentWeather, DailyWeather, HourlyWeather and Air Quality
  const currentData = weatherResponse.current();
  const dailyData = weatherResponse.daily();
  const hourlyData = weatherResponse.hourly();
  const aqData = aqResponse.current();

  // Building the data to map them later and make them compatible to our types
  const currentWeather = buildCurrentWeather(currentData);
  const airQuality = buildAirQuality(aqData);
  const dailyWeather = buildDailyWeather(dailyData);
  const hourlyWeather = buildHourlyWeather(hourlyData);

  // Return constructed data to the frontend
  return NextResponse.json({
    currentWeather,
    airQuality,
    dailyWeather,
    hourlyWeather,
  });
}
