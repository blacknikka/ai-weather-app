import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { FaSun, FaCloud, FaCloudRain, FaSnowflake, FaSmog, FaBolt, FaCloudShowersHeavy } from 'react-icons/fa';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const latitude = 35.69; // 東京都千代田区の緯度
  const longitude = 139.75; // 東京都千代田区の経度

  // 天気コードから説明とアイコンを取得するヘルパー関数
  const getWeatherInfo = (code) => {
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

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=Asia%2FTokyo`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (e) {
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
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h2 className="card-title text-center">本日 ({todayDate.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })})</h2>
          <Row className="align-items-center text-center">
            <Col>
              <div className="d-flex justify-content-center align-items-center mb-2">
                {todayWeather.icon && <span style={{ fontSize: '3rem', marginRight: '10px' }}>{todayWeather.icon}</span>}
                <h3>{todayWeather.description}</h3>
              </div>
              <p className="display-4 mb-0">{today.temperature_2m_max[0]}°C</p>
              <p className="text-muted">最高: {today.temperature_2m_max[0]}°C / 最低: {today.temperature_2m_min[0]}°C</p>
              <p>降水量: {today.precipitation_sum[0]} mm</p>
              <p>最大風速: {today.wind_speed_10m_max[0]} km/h</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* 明日の天気 */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h2 className="card-title text-center">明日 ({tomorrowDate.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' })})</h2>
          <Row className="align-items-center text-center">
            <Col>
              <div className="d-flex justify-content-center align-items-center mb-2">
                {tomorrowWeather.icon && <span style={{ fontSize: '3rem', marginRight: '10px' }}>{tomorrowWeather.icon}</span>}
                <h3>{tomorrowWeather.description}</h3>
              </div>
              <p className="display-4 mb-0">{today.temperature_2m_max[1]}°C</p>
              <p className="text-muted">最高: {today.temperature_2m_max[1]}°C / 最低: {today.temperature_2m_min[1]}°C</p>
              <p>降水量: {today.precipitation_sum[1]} mm</p>
              <p>最大風速: {today.wind_speed_10m_max[1]} km/h</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* 1週間先までの天気 */}
      <h2 className="mb-3">週間予報</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {today.time.slice(2, 9).map((dateString, index) => {
          const date = new Date(dateString);
          const dayIndex = index + 2; // 本日と明日を除いたインデックス
          const dailyWeather = getWeatherInfo(today.weather_code[dayIndex]);

          return (
            <Col key={dateString}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  <Card.Title>{date.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric', weekday: 'short' })}</Card.Title>
                  <div className="d-flex justify-content-center align-items-center mb-1">
                    {dailyWeather.icon && <span style={{ fontSize: '1.5rem', marginRight: '5px' }}>{dailyWeather.icon}</span>}
                    <p className="mb-0">{dailyWeather.description}</p>
                  </div>
                  <p className="fw-bold">{today.temperature_2m_max[dayIndex]}°C / {today.temperature_2m_min[dayIndex]}°C</p>
                  <p className="text-muted">降水量: {today.precipitation_sum[dayIndex]} mm</p>
                  <p className="text-muted">風速: {today.wind_speed_10m_max[dayIndex]} km/h</p>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default App;
