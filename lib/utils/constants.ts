import {
  AirQuality,
  AqCard,
  CurrentCard,
  CurrentWeather,
  Units,
} from "@/lib/types";
import {
  formatPrecip,
  formatTemp,
  formatWind,
  getBeaufort,
  uvIcon,
  windIcon,
} from "@/lib/utils/formatting";

export function getCurrentCards(
  currentWeather: CurrentWeather,
  units: Units,
): CurrentCard[] {
  const {
    apparentTemp,
    humidity,
    windSpeed,
    precipitation,
    rainChance,
    pressure,
    cloudCover,
    uvIndex,
    visibility,
  } = currentWeather;

  return [
    {
      key: "apparent-temperature",
      desc: "Feels like",
      img: "weather-details/thermometer-cold.svg",
      value: formatTemp(apparentTemp, units.temperature),
    },
    {
      key: "humidity",
      desc: "Humidity",
      img: "weather-details/humidity.svg",
      value: humidity + "%",
    },
    {
      key: "wind",
      desc: "Wind",
      img: windIcon(getBeaufort(windSpeed)),
      value: formatWind(windSpeed, units.windSpeed),
    },
    {
      key: "precipitation",
      desc: "Precipitation",
      img: "weather-details/raindrop.svg",
      value: formatPrecip(precipitation, units.precipitation),
    },
    {
      key: "rain-chance",
      desc: "Rain Chance",
      img: "weather-details/multiple-raindrops.svg",
      value: rainChance + "%",
    },
    {
      key: "pressure",
      desc: "Pressure",
      img: "weather-details/pressure-up.svg",
      value: Math.floor(pressure) + " hPa",
    },
    {
      key: "cloud-cover",
      desc: "Clouds",
      img: "weather-details/humidity.svg",
      value: cloudCover + "%",
    },
    {
      key: "uv-index",
      desc: "UV Index",
      img: uvIcon(Math.floor(uvIndex)),
      value: Math.floor(uvIndex),
    },
    {
      key: "visibility",
      desc: "Visibility",
      img: "weather-details/horizon.svg",
      value: visibility + " km",
    },
  ];
}

export function getAqCard(aqData: AirQuality): AqCard[] {
  const { pm2_5, pm10, carbonMonoxide, ozone } = aqData;

  return [
    {
      key: "pm2_5",
      desc: "PM2_5",
      img: "weather-details/smoke-particles.svg",
      value: pm2_5,
    },
    {
      key: "pm10",
      desc: "PM10",
      img: "weather-details/dust.svg",
      value: pm10,
    },
    {
      key: "carbon_monoxide",
      desc: "CO",
      img: "weather-details/cloudy-smoke.svg",
      value: carbonMonoxide,
    },
    {
      key: "ozone",
      desc: "O₃",
      img: "weather-details/sun-hot.svg",
      value: ozone,
    },
  ];
}
