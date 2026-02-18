/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from '@google/genai';

const API_KEY = process.env.API_KEY;

// --- SVG Weather Icons --- //
const SunnyIcon = () => (
  <svg viewBox="0 0 64 64" className="weather-icon">
    <g>
      <circle cx="32" cy="32" r="11" fill="#fbb03b" />
      <path d="M32 15V9" fill="none" stroke="#fbb03b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" />
      <path d="M32 55v-6" fill="none" stroke="#fbb03b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" />
      <path d="M43.87 20.13l4.24-4.24" fill="none" stroke="#fbb03b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" />
      <path d="M15.89 48.11l4.24-4.24" fill="none" stroke="#fbb03b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" />
      <path d="M49 32h6" fill="none" stroke="#fbb03b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" />
      <path d="M9 32h6" fill="none" stroke="#fbb03b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" />
      <path d="M43.87 43.87l4.24 4.24" fill="none" stroke="#fbb03b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" />
      <path d="M15.89 15.89l4.24 4.24" fill="none" stroke="#fbb03b" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="3" />
    </g>
  </svg>
);

const CloudyIcon = () => (
    <svg viewBox="0 0 64 64" className="weather-icon">
        <path d="M46.67,26.46a14,14,0,0,0-27.34-4,11,11,0,0,0-3.41,21.57H46.67a10.4,10.4,0,0,0,.08-20.79Z" fill="none" stroke="#e6e7e8" strokeLinejoin="round" strokeWidth="3"/>
    </svg>
);

const PartlyCloudyIcon = () => (
    <svg viewBox="0 0 64 64" className="weather-icon">
        <path d="M46.67,26.46a14,14,0,0,0-27.34-4,11,11,0,0,0-3.41,21.57H46.67a10.4,10.4,0,0,0,.08-20.79Z" fill="#e6e7e8"/>
        <circle cx="30" cy="24" r="9" fill="#fbb03b"/>
    </svg>
);

const RainIcon = () => (
  <svg viewBox="0 0 64 64" className="weather-icon">
    <g>
      <path d="M46.67 26.46a14 14 0 00-27.34-4 11 11 0 00-3.41 21.57h29.34" fill="none" stroke="#e6e7e8" strokeLinejoin="round" strokeWidth="3" />
      <path d="M28.08 49.33l-4.08 6.13" fill="none" stroke="#4285f4" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
      <path d="M36.08 49.33l-4.08 6.13" fill="none" stroke="#4285f4" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
      <path d="M44.08 49.33l-4.08 6.13" fill="none" stroke="#4285f4" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
    </g>
  </svg>
);

const SnowIcon = () => (
    <svg viewBox="0 0 64 64" className="weather-icon">
        <path d="M46.67,26.46a14,14,0,0,0-27.34-4,11,11,0,0,0-3.41,21.57H46.67a10.4,10.4,0,0,0,.08-20.79Z" fill="none" stroke="#e6e7e8" strokeLinejoin="round" strokeWidth="3"/>
        <g>
            <path d="M31.25,48.25V41.75" fill="none" stroke="#4285f4" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
            <path d="M34.51,46.5l-3.26-1.88-3.26,1.88" fill="none" stroke="#4285f4" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
            <path d="M28,43.5l3.26,1.88L34.51,43.5" fill="none" stroke="#4285f4" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
        </g>
        <g>
            <path d="M44.25,48.25V41.75" fill="none" stroke="#4285f4" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
            <path d="M47.51,46.5l-3.26-1.88L41,46.5" fill="none" stroke="#4285f4" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
            <path d="M41,43.5l3.26,1.88L47.51,43.5" fill="none" stroke="#4285f4" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2"/>
        </g>
    </svg>
);

const StormIcon = () => (
    <svg viewBox="0 0 64 64" className="weather-icon">
        <path d="M46.67,26.46a14,14,0,0,0-27.34-4,11,11,0,0,0-3.41,21.57H46.67a10.4,10.4,0,0,0,.08-20.79Z" fill="#e6e7e8"/>
        <polygon points="36 43 28 49 32 49 30 55 38 49 34 49 36 43" fill="#fbb03b"/>
    </svg>
);


function getWeatherIcon(condition: string) {
    const lowerCaseCondition = condition.toLowerCase();
    if (lowerCaseCondition.includes('sun') || lowerCaseCondition.includes('clear')) {
        return <SunnyIcon />;
    }
    if (lowerCaseCondition.includes('partly cloudy')) {
        return <PartlyCloudyIcon />;
    }
    if (lowerCaseCondition.includes('cloud') || lowerCaseCondition.includes('overcast')) {
        return <CloudyIcon />;
    }
    if (lowerCaseCondition.includes('rain') || lowerCaseCondition.includes('shower')) {
        return <RainIcon />;
    }
    if (lowerCaseCondition.includes('snow') || lowerCaseCondition.includes('flurr')) {
        return <SnowIcon />;
    }
    if (lowerCaseCondition.includes('storm') || lowerCaseCondition.includes('thunder')) {
        return <StormIcon />;
    }
    return <CloudyIcon />;
}

// --- Dynamic Background Component --- //
const WeatherBackground = ({ condition }: { condition: string }) => {
    const lowerCaseCondition = condition.toLowerCase();

    if (lowerCaseCondition.includes('rain') || lowerCaseCondition.includes('shower')) {
        const drops = Array.from({ length: 100 }).map((_, i) => (
            <div
                key={i}
                className="rain-drop"
                style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${0.5 + Math.random() * 0.5}s`,
                    animationDelay: `${Math.random() * 5}s`,
                }}
            />
        ));
        return <div className="weather-background rain">{drops}</div>;
    }

    if (lowerCaseCondition.includes('snow') || lowerCaseCondition.includes('flurr')) {
        const flakes = Array.from({ length: 100 }).map((_, i) => (
            <div
                key={i}
                className="snowflake"
                style={{
                    left: `${Math.random() * 100}%`,
                    animationDuration: `${5 + Math.random() * 5}s`,
                    animationDelay: `${Math.random() * 10}s`,
                    opacity: Math.random(),
                }}
            />
        ));
        return <div className="weather-background snow">{flakes}</div>;
    }

    if (lowerCaseCondition.includes('storm') || lowerCaseCondition.includes('thunder')) {
        return <div className="weather-background storm"><div className="lightning"></div></div>;
    }

    if (lowerCaseCondition.includes('sun') || lowerCaseCondition.includes('clear')) {
        return <div className="weather-background sun"></div>;
    }

    if (lowerCaseCondition.includes('cloud') || lowerCaseCondition.includes('overcast') || lowerCaseCondition.includes('fog') || lowerCaseCondition.includes('mist')) {
        return (
            <div className="weather-background clouds">
                <div className="cloud x1"></div>
                <div className="cloud x2"></div>
                <div className="cloud x3"></div>
                <div className="cloud x4"></div>
                <div className="cloud x5"></div>
            </div>
        );
    }
    
    return null; // Default to no background
};


interface WeatherData {
    location: string;
    current: {
        temp: number;
        condition: string;
        high: number;
        low: number;
        humidity: number;
        windSpeed: number;
        feelsLike: number;
    };
    forecast: {
        day: string;
        condition: string;
        high: number;
        low: number;
    }[];
}


function App() {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedDayIndex, setSelectedDayIndex] = useState<number | null>(null);
    // FIX: Add state to store grounding chunks from the API response.
    const [groundingChunks, setGroundingChunks] = useState<any[] | null>(null);

    const fetchWeather = async () => {
        if (!city) {
            setError('Please enter a city name.');
            return;
        }
        setLoading(true);
        setError(null);
        setWeatherData(null);
        setSelectedDayIndex(null);
        // FIX: Reset grounding chunks on new fetch.
        setGroundingChunks(null);

        try {
            const ai = new GoogleGenAI({ apiKey: API_KEY });
            const prompt = `Get the current weather and a 10-day forecast for ${city}. Respond in JSON format with "location", "current" (temp, condition, high, low, humidity, windSpeed, feelsLike), and "forecast" (an array of 10 objects with day, condition, high, low). Only provide the JSON object in your response.`;
            
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: prompt,
                config: {
                    tools: [{ googleSearch: {} }],
                },
            });

            // FIX: Store grounding chunks to display sources, as required by guidelines.
            setGroundingChunks(response.candidates?.[0]?.groundingMetadata?.groundingChunks || null);
            let text = response.text.trim();
            
            // The model can sometimes wrap the JSON in a markdown code block.
            // This removes the wrapping '```json' and '```' if it exists.
            if (text.startsWith('```json')) {
              text = text.slice(7, -3);
            } else if (text.startsWith('```')) {
              text = text.slice(3, -3);
            }

            const weather = JSON.parse(text);
            setWeatherData(weather);
        } catch (e) {
            console.error(e);
            setError('Could not fetch weather data. Please check the city name and try again.');
        } finally {
            setLoading(false);
        }
    };

    const isForecastSelected = selectedDayIndex !== null && weatherData?.forecast[selectedDayIndex];
    const displayData = isForecastSelected
        ? weatherData.forecast[selectedDayIndex]
        : weatherData?.current;

    return (
        <>
            {weatherData && displayData && <WeatherBackground condition={displayData.condition} />}
            <main className="container">
                <h1>Weather Forecast</h1>
                <div className="search-bar">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Enter city name..."
                        aria-label="City Name"
                        onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
                    />
                    <button onClick={fetchWeather} disabled={loading} aria-label="Get Weather">
                        {loading ? '...' : 'Search'}
                    </button>
                </div>

                {loading && <div className="loader" aria-label="Loading weather data"></div>}
                {error && <p className="error-message" role="alert">{error}</p>}

                {weatherData && displayData && (
                    <div className="weather-display">
                        <section className="current-weather" aria-labelledby="current-weather-heading">
                            <div className="current-weather-main">
                                <div>
                                    <h2 
                                        id="current-weather-heading"
                                        onClick={() => setSelectedDayIndex(null)}
                                        title="Show current weather"
                                    >
                                        {weatherData.location}
                                    </h2>
                                    {isForecastSelected ? (
                                        // FIX: Use `isForecastSelected.day` directly. In this truthy branch, 
                                        // TypeScript knows `isForecastSelected` is a forecast object and has a 'day' property,
                                        // resolving the type error with `displayData`.
                                        <p className="current-day-header">{isForecastSelected.day}</p>
                                    ) : (
                                        <p className="current-temp">{Math.round(weatherData.current.temp)}&deg;C</p>
                                    )}
                                    <p className="current-condition">{displayData.condition}</p>
                                </div>
                                <div className="current-weather-icon">
                                    {getWeatherIcon(displayData.condition)}
                                </div>
                            </div>
                            <div className="current-weather-details">
                                <p>High: {Math.round(displayData.high)}&deg; / Low: {Math.round(displayData.low)}&deg;</p>
                                {!isForecastSelected && (
                                    <>
                                        <p>Feels like: {Math.round(weatherData.current.feelsLike)}&deg;C</p>
                                        <p>Humidity: {weatherData.current.humidity}%</p>
                                        <p>Wind: {weatherData.current.windSpeed} km/h</p>
                                    </>
                                )}
                            </div>
                        </section>

                        <section className="forecast" aria-labelledby="forecast-heading">
                            <h3 id="forecast-heading">10-Day Forecast</h3>
                            <div className="forecast-grid">
                                {weatherData.forecast.map((day, index) => (
                                    <div 
                                        className={`forecast-card ${selectedDayIndex === index ? 'selected' : ''}`}
                                        key={index}
                                        onClick={() => setSelectedDayIndex(index)}
                                    >
                                        <p className="forecast-day">{day.day}</p>
                                        <div className="forecast-icon">
                                            {getWeatherIcon(day.condition)}
                                        </div>
                                        <p className="forecast-temps">
                                            <span>{Math.round(day.high)}&deg;</span>
                                            <span>{Math.round(day.low)}&deg;</span>
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* FIX: Display grounding chunks as sources, which is required when using googleSearch tool. */}
                        {groundingChunks && groundingChunks.length > 0 && (
                            <section className="sources" aria-labelledby="sources-heading">
                                <h3 id="sources-heading">Sources</h3>
                                <ul>
                                    {groundingChunks.map((chunk, index) => (
                                        chunk.web?.uri && (
                                            <li key={index}>
                                                <a href={chunk.web.uri} target="_blank" rel="noopener noreferrer">
                                                    {chunk.web.title || chunk.web.uri}
                                                </a>
                                            </li>
                                        )
                                    ))}
                                </ul>
                            </section>
                        )}
                    </div>
                )}
            </main>
        </>
    );
}

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);