import React from 'react';
import { Card } from 'react-bootstrap';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaSmog, FaBolt, FaCloudShowersHeavy } from 'react-icons/fa';

// 天気コードから説明とアイコンを取得するヘルパー関数
export const getWeatherInfo = (code) => {
  let description = '不明';
  let icon = null;

  switch (code) {
    case 0: description = '快晴'; icon = <FaSun className="text-warning" />; break;
    case 1: description = '主に晴れ'; icon = <FaSun className="text-warning" />; break;
    case 2: description = '一部曇り'; icon = <FaCloud className="text-secondary" />; break;
    case 3: description = '曇り'; icon = <FaCloud className="text-secondary" />; break;
    case 45: description = '霧'; icon = <FaSmog className="text-muted" />; break;
    case 48: description = '霧氷'; icon = <FaSmog className="text-muted" />; break;
    case 51: description = '霧雨: 軽い'; icon = <FaCloudRain className="text-info" />; break;
    case 53: description = '霧雨: 中程度'; icon = <FaCloudRain className="text-info" />; break;
    case 55: description = '霧雨: 激しい'; icon = <FaCloudRain className="text-info" />; break;
    case 56: description = '着氷性の霧雨: 軽い'; icon = <FaCloudRain className="text-info" />; break;
    case 57: description = '着氷性の霧雨: 激しい'; icon = <FaCloudRain className="text-info" />; break;
    case 61: description = '雨: 軽い'; icon = <FaCloudRain className="text-primary" />; break;
    case 63: description = '雨: 中程度'; icon = <FaCloudRain className="text-primary" />; break;
    case 65: description = '雨: 激しい'; icon = <FaCloudRain className="text-primary" />; break;
    case 66: description = '着氷性の雨: 軽い'; icon = <FaCloudRain className="text-primary" />; break;
    case 67: description = '着氷性の雨: 激しい'; icon = <FaCloudRain className="text-primary" />; break;
    case 71: description = '雪: 軽い'; icon = <FaSnowflake className="text-info" />; break;
    case 73: description = '雪: 中程度'; icon = <FaSnowflake className="text-info" />; break;
    case 75: description = '雪: 激しい'; icon = <FaSnowflake className="text-info" />; break;
    case 77: description = '雪の粒'; icon = <FaSnowflake className="text-info" />; break;
    case 80: description = 'にわか雨: 軽い'; icon = <FaCloudShowersHeavy className="text-primary" />; break;
    case 81: description = 'にわか雨: 中程度'; icon = <FaCloudShowersHeavy className="text-primary" />; break;
    case 82: description = 'にわか雨: 激しい'; icon = <FaCloudShowersHeavy className="text-primary" />; break;
    case 85: description = '雪のにわか雨: 軽い'; icon = <FaSnowflake className="text-info" />; break;
    case 86: description = '雪のにわか雨: 激しい'; icon = <FaSnowflake className="text-info" />; break;
    case 95: description = '雷雨: 軽いまたは中程度'; icon = <FaBolt className="text-warning" />; break;
    case 96: description = '雷雨: 軽い雹を伴う'; icon = <FaBolt className="text-warning" />; break;
    case 99: description = '雷雨: 激しい雹を伴う'; icon = <FaBolt className="text-warning" />; break;
    default: description = '不明'; icon = null;
  }
  return { description, icon };
};

const WeatherCard = ({ date, weatherInfo, maxTemp, minTemp, precipitation, windSpeed, isLarge = false }) => {
  return (
    <Card className={`mb-4 shadow-sm ${isLarge ? '' : 'h-100'}`}>
      <Card.Body className="text-center">
        <Card.Title>{date}</Card.Title>
        <div className="d-flex justify-content-center align-items-center mb-2">
          {weatherInfo.icon && <span style={{ fontSize: isLarge ? '3rem' : '1.5rem', marginRight: isLarge ? '10px' : '5px' }}>{weatherInfo.icon}</span>}
          <p className="mb-0">{weatherInfo.description}</p>
        </div>
        {isLarge ? (
          <>
            <p className="display-4 mb-0">{maxTemp}°C</p>
            <p className="text-muted">最高: {maxTemp}°C / 最低: {minTemp}°C</p>
          </>
        ) : (
          <p className="fw-bold">{maxTemp}°C / {minTemp}°C</p>
        )}
        <p className="text-muted">降水量: {precipitation} mm</p>
        <p className="text-muted">風速: {windSpeed} km/h</p>
      </Card.Body>
    </Card>
  );
};

export default WeatherCard;