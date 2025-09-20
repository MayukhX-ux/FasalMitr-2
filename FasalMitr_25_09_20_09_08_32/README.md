# Small Farmers App

A React-based web application designed for small farmers in India to assist with registration, crop photo uploads for AI-based plant and soil health analysis, current weather information, crop market trends, government agricultural schemes, and multilingual regional support.

---

## Features

- **Farmer Registration**: Simple landing page with registration queries for existing and new farmers.
- **Multilingual Interface**: Auto detects language based on location or browser and supports English, Hindi, Tamil.
- **Crop Photo Upload & Capture**: Farmers can upload or capture photos of their crop to build a historical database.
- **AI Analysis (Mocked)**: Analyzes photos to provide soil type, plant health status, and recommendations.
- **Soil & Plant Health Checks**: View soil characteristics and plant disease alerts with actionable tips.
- **Weather Information**: Fetches current weather data for detected or manually selected location using OpenWeatherMap API.
- **Crop Trends**: Displays trending crops, prices, and advisory news based on region.
- **Government Schemes**: Shows relevant agriculture schemes for the detected region with links to official government resources.
- **User Session & Language Management**: Local session persistence and language preferences saved.
- **Mobile Friendly & Accessible UI**: Simple and easy to navigate interface with accessibility considerations.

---

## Tech Stack

- React 18
- React Router DOM for routing
- i18next + react-i18next for multilingual support and language detection
- Axios for API calls
- react-webcam for capturing photos
- react-image-file-resizer for image compression
- OpenStreetMap (Nominatim) for geocoding and reverse geocoding
- OpenWeatherMap API for weather data (requires your own API key)

---

## Setup Instructions

### Prerequisites

- [Node.js](https://nodejs.org/) (Version 16 or above recommended)
- npm (comes with Node) or yarn for package management

### Getting Started

1. **Clone or Download the Repository**

