import { DailyWeather, HourlyWeather, Units } from "@/lib/types";

type DateFormats = "Hour" | "Weekday" | "Detailed";

export function formatDate(date: Date | string, type: DateFormats): string {
  const d = typeof date === "string" ? new Date(date) : date;

  switch (type) {
    case "Detailed":
      return d.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    case "Weekday":
      return d.toLocaleDateString("en-US", { weekday: "short" });
    case "Hour":
      return d.toLocaleTimeString("en-US", {
        hour: "numeric",
        hour12: true,
        minute: "2-digit",
      });
  }
}

// Checks if both given dates are the same day
export function isSameDay(d1: Date, d2: Date) {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
}

// Fuses the sun events (sunrise/sunset) with hourly forecast data for visualization
export function getNext24Hours(
  hourly: HourlyWeather[],
  daily: DailyWeather[],
  selectedDate: Date,
) {
  const now = new Date(); // Today

  // If the selected day is today
  if (isSameDay(selectedDate, now)) {
    // Find the first hourly entry that matches the current hour
    const startIndex = hourly.findIndex(
      (h) =>
        new Date(h.time).getHours() === now.getHours() &&
        isSameDay(new Date(h.time), now),
    );

    // Extract the next 24 hourly entries starting from the current hour
    const next24 = hourly.slice(startIndex, startIndex + 24);

    // Retrieve today's and tomorrow's daily data to access sunrise/sunset times
    const today = daily.find((d) => isSameDay(new Date(d.time), now));
    const tomorrow = daily.find((d) =>
      isSameDay(new Date(d.time), new Date(now.getTime() + 86400000)),
    );

    // Fuses the sunEvent and the hourly data together
    return {
      hours: next24,
      sunEvents: [
        today?.sunrise,
        today?.sunset,
        tomorrow?.sunrise,
        tomorrow?.sunset,
      ].filter(Boolean) as Date[], // Remove undefined values
    };
  }

  // Else get all hourly entries for that specific date
  const fullDay = hourly.filter((h) =>
    isSameDay(new Date(h.time), selectedDate),
  );
  // Get that day’s sunrise and sunset from the daily forecast
  const day = daily.find((d) => isSameDay(new Date(d.time), selectedDate));

  return {
    hours: fullDay,
    sunEvents: [day?.sunrise, day?.sunset].filter(Boolean) as Date[],
  };
}

// Gets the Beaufort Number by using the wind speed
export function getBeaufort(speedKmh: number) {
  if (speedKmh < 1) return 0;
  if (speedKmh <= 5) return 1;
  if (speedKmh <= 11) return 2;
  if (speedKmh <= 19) return 3;
  if (speedKmh <= 28) return 4;
  if (speedKmh <= 38) return 5;
  if (speedKmh <= 49) return 6;
  if (speedKmh <= 61) return 7;
  if (speedKmh <= 74) return 8;
  if (speedKmh <= 88) return 9;
  if (speedKmh <= 102) return 10;
  if (speedKmh <= 117) return 11;
  return 12;
}

// Gets the correct wind icon based on the winds beaufort
export const windIcon = (beaufort: number) =>
  `weather-details/wind-beaufort/wind-${beaufort}.svg`;

// Gets the correct UV icon based on the UV Index
export const uvIcon = (uvIndex: number) => {
  return `weather-details/uv-index/uv-${uvIndex < 1 ? 1 : uvIndex}.svg`;
};

// Formats the temperature from Celsius to Fahrenheit and reverse
export function formatTemp(temp: number, unit: Units["temperature"]) {
  const celsiusToFahrenheit = (c: number) => (c * 9) / 5 + 32;
  const rounded = (c: number) => Math.round(c * 10) / 10;

  return unit === "celsius"
    ? `${rounded(temp)}°`
    : `${rounded(celsiusToFahrenheit(temp))}°`;
}

// Formats the wind speed from k/h to mph and reverse
export function formatWind(speed: number, unit: Units["windSpeed"]) {
  const kmhToMph = (c: number) => c / 1.609344;
  const rounded = (c: number) => Math.round(c * 10) / 10;

  return unit === "kmh"
    ? `${rounded(speed)} km/h`
    : `${rounded(kmhToMph(speed))} mph`;
}

// Formats the precipitation from Millimeter to Inch and reverse
export function formatPrecip(mm: number, unit: Units["precipitation"]) {
  const mmToInch = (c: number) => c / 25.4;
  const rounded = (c: number) => Math.round(c * 10) / 10;

  return unit === "mm" ? `${rounded(mm)} mm` : `${rounded(mmToInch(mm))} inch`;
}

// Sets the status of the Air Quality with the right colors based on the Air Quality Index
export function formatAirQuality(index: number) {
  let status;
  let color;
  if (index <= 50) {
    status = "Good";
    color =
      "border-green-500 bg-green-500 dark:bg-green-500/30 text-white dark:text-green-500";
  }
  if (index > 50) {
    status = "Moderate";
    color =
      "border-yellow-500 bg-yellow-500 dark:bg-yellow-500/30 text-white dark:text-yellow-500";
  }
  if (index > 100) {
    status = "Unhealthy (fsG)";
    color =
      "border-red-500 bg-red-500 dark:bg-red-500/30 text-white dark:text-red-500";
  }
  if (index > 150) {
    status = "Unhealthy";
    color =
      "border-orange-500 bg-orange-500 dark:bg-orange-500/30 text-white dark:text-orange-500";
  }
  if (index > 200) {
    status = "Very Unhealthy";
    color =
      "border-purple-500 bg-purple-500 dark:bg-purple-500/30 text-white dark:text-purple-500";
  }
  if (index > 300) {
    status = "Hazardous";
    color =
      "border-red-900 bg-red-900 dark:bg-red-900/30 text-white dark:text-red-900";
  }

  return { status, color };
}

// Gets the name of the Moon phases based on a number (0 = New Moon, 0.5 Full Moon,...)
export function formatMoonPhases(phase: number) {
  if (phase < 0.03 || phase > 0.97) return "New Moon";
  if (phase < 0.22) return "Waxing Crescent";
  if (phase < 0.28) return "First Quarter";
  if (phase < 0.47) return "Waxing Gibbous";
  if (phase < 0.53) return "Full Moon";
  if (phase < 0.72) return "Waning Gibbous";
  if (phase < 0.78) return "Last Quarter";
  return "Waning Crescent";
}

// Gets the correct weather icons for day or night based on the weather code
export const formatWeatherCode = (code: number, isDay: boolean) => {
  let imgUrl;

  if (code === 0) imgUrl = "clear";
  if ([1, 2, 3].includes(code)) imgUrl = "partly-cloudy";
  if ([45, 48].includes(code)) imgUrl = "fog";
  if ([51, 53, 55, 56, 57].includes(code)) imgUrl = "drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) imgUrl = "rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) imgUrl = "snow";
  if ([95, 96, 99].includes(code)) imgUrl = "storm";

  if (!imgUrl) imgUrl = "overcast.webp";
  return `weather-icons/${isDay ? "day" : "night"}/${imgUrl}.webp`;
};
