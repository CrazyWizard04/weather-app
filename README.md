# 🌦️ Frontend Mentor - Weather App Solution

This is my solution for the **Weather App challenge** on [Frontend Mentor](https://www.frontendmentor.io/).  
I built this project during a **30-Day Hackathon**, and it was quite a journey — full of learning, caffeine, and fun. ☕💻

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Preview](#preview)
- [Links](#links)
- [My Process](#my-process)
- [Development Workflow](#development-workflow)
- [What I Learned](#what-i-learned)
- [What I Still Should Learn](#what-i-still-should-learn)
- [Future Plans](#future-plans)
- [Author](#author)
- [Acknowledgements](#acknowledgements)

---

## 🌍 Overview

This weather app provides **detailed, accurate, and interactive weather information** for any location worldwide.  
It includes everything from temperature and air quality to moon phases and live rain radar maps.

---

## ✨ Features

- **🌡️ Current Weather:** Temperature, “feels like,” humidity, wind speed, and more.
- **📆 Daily Forecast:** 7-day forecast with max/min temperatures.
- **🕒 Hourly Forecast:** 24-hour breakdown for the next 7 days.
- **🌫️ Air Quality:** Index values, fine dust, ozone, and carbon monoxide.
- **🌕 Moon Phases:** Draws moon phases with Canvas and shows illumination, distance, and more.
- **🌧️ Rain Radar Map:** Animated precipitation radar using Leaflet and RainViewer API.
- **⚖️ Unit Toggle:** Switch between metric (°C, km/h, mm) and imperial (°F, mph, in).
- **⭐ Favourites:** Save your favourite cities for later.
- **🌙 Dark/Light Mode:** Seamlessly switches between light and dark themes.
- **🔍 Location Search:** Find any city worldwide.
- **📍 Geolocation:** Automatically fetches weather for your current location.

---

## 🧰 Tech Stack

| Category | Tools |
|-----------|-------|
| Framework | **Next.js 15** with **TypeScript** |
| Styling | **Tailwind CSS v4** |
| Data Fetching | **Axios**, **OpenMeteo TypeScript** |
| APIs | **Open-Meteo API** (weather, air quality, geocoding) |
| Geolocation | **BigDataCloud API** |
| Map | **Leaflet** + **RainViewer API** |
| Graphics | **Canvas** (moon phases), **SunCalc** (moon data) |
| UI | **react-circle-flags**, custom icons |

---

## 🖼️ Preview

[Dark Mode](./preview/design-dark.png)  
[Light Mode](./preview/design-light.png)

---

## 🔗 Links

- 💡 **Solution URL:** [Frontend Mentor Submission](https://www.frontendmentor.io/solutions/weather-app-hackathon-solution-a492zx3_eE)
- 🌐 **Live Site URL:** [Live Demo](https://crazy-weather-app-delta.vercel.app/)

---

## 🛠️ My Process

My first step was setting up the project with **Next.js**, **Tailwind CSS**, and **TypeScript**.  
I started small — with the header and logo — and gradually expanded to the main weather components.  
Throughout development, I kept improving the design, adding night icons, and displaying more data than required by the challenge.

Every iteration made the app feel more alive — from the moon canvas to the animated rain radar.

---

## 🧩 Development Workflow

### 🧱 Local Setup

1. **Install dependencies**
   ```bash
   npm install
2. **Run the development server**
    ```bash
   npm run dev
Then open http://localhost:3000 to view it in your browser

---

## 🧠 What I Learned

- Structuring reusable React components (e.g., forecast cards)
- Managing global state with Context Providers
- Handling theme toggle and favourites using LocalStorage
- Deepening my React knowledge and starting my Next.js journey

---

## What I still have to learn

- Proper version control: rebasing, clean commits (and not committing everything at once like me... im sry 😅)

---

## 🚀 Future Plans

No, this isn't end yet! I already have a few ideas in mind:
- ⚖️ Compare Mode: Compare weather between two cities
- 🎙️ Mic Support: Search for cities using your voice
- 🌤️ Animated Backgrounds: Change visuals dynamically based on weather
- ⚡ Performance Tweaks: General optimizations and visual improvements

---

## 👨‍💻 Author

Frontend Mentor: [CrazyWizard04](https://github.com/CrazyWizard04)

GitHub: [CrazyWizard04](https://www.frontendmentor.io/profile/CrazyWizard04)

---

## 💖 Big thank you!

I was planning to start coding again after a long break - and this challenge came at the perfect time.
A big thank you to Frontend Mentor for creating such a beautiful project! This challenge not only refreshed and expanded my knowledge — it also increased my caffeine intake. ☕💪

Thank you <3
