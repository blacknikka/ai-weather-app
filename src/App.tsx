import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import './App.css';
import WeatherCard, { getWeatherInfo } from './components/WeatherCard';

interface DailyWeatherData {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_sum: number[];
  wind_speed_10m_max: number[];
}

interface WeatherData {
  daily: DailyWeatherData;
}

function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const latitude = 35.69; // 東京都千代田区の緯度
  const longitude = 139.75; // 東京都千代田区の経度

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=Asia%2FTokyo`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: WeatherData = await response.json();
        setWeatherData(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>天気データを読み込み中...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          天気データの取得中にエラーが発生しました: {error}
        </Alert>
      </Container>
    );
  }

  if (!weatherData || !weatherData.daily) {
    return (
      <Container className="my-5">
        <Alert variant="warning">
          天気データが利用できません。
        </Alert>
      </Container>
    );
  }

  const today = weatherData.daily;
  const todayDate = new Date(today.time[0]);
  const tomorrowDate = new Date(today.time[1]);

  const todayWeather = getWeatherInfo(today.weather_code[0]);
  const tomorrowWeather = getWeatherInfo(today.weather_code[1]);

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">東京都千代田区の天気予報</h1>

      {/* 本日の天気 */}
      <WeatherCard
        date={`本日 (${todayDate.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })})`}
        weatherInfo={todayWeather}
        maxTemp={today.temperature_2m_max[0]}
        minTemp={today.temperature_2m_min[0]}
        precipitation={today.precipitation_sum[0]}
        windSpeed={today.wind_speed_10m_max[0]}
        isLarge={true}
      />

      {/* 明日の天気 */}
      <WeatherCard
        date={`明日 (${tomorrowDate.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })})`}
        weatherInfo={tomorrowWeather}
        maxTemp={today.temperature_2m_max[1]}
        minTemp={today.temperature_2m_min[1]}
        precipitation={today.precipitation_sum[1]}
        windSpeed={today.wind_speed_10m_max[1]}
        isLarge={true}
      />

      {/* 1週間先までの天気 */}
      <h2 className="mb-3">週間予報</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {today.time.slice(2, 9).map((dateString: string, index: number) => {
          const date = new Date(dateString);
          const dayIndex = index + 2; // 本日と明日を除いたインデックス
          const dailyWeather = getWeatherInfo(today.weather_code[dayIndex]);

          return (
            <Col key={dateString}>
              <WeatherCard
                date={date.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric', weekday: 'short' })}
                weatherInfo={dailyWeather}
                maxTemp={today.temperature_2m_max[dayIndex]}
                minTemp={today.temperature_2m_min[dayIndex]}
                precipitation={today.precipitation_sum[dayIndex]}
                windSpeed={today.wind_speed_10m_max[dayIndex]}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default App;