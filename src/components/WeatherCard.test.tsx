import React from 'react';
import { render, screen } from '@testing-library/react';
import WeatherCard, { getWeatherInfo } from './WeatherCard';

describe('getWeatherInfo', () => {
  test('should return correct info for clear sky (code 0)', () => {
    const { description, icon } = getWeatherInfo(0);
    expect(description).toBe('快晴');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-warning');
    }
  });

  test('should return correct info for mainly clear (code 1)', () => {
    const { description, icon } = getWeatherInfo(1);
    expect(description).toBe('主に晴れ');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-warning');
    }
  });

  test('should return correct info for partly cloudy (code 2)', () => {
    const { description, icon } = getWeatherInfo(2);
    expect(description).toBe('一部曇り');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-secondary');
    }
  });

  test('should return correct info for cloudy (code 3)', () => {
    const { description, icon } = getWeatherInfo(3);
    expect(description).toBe('曇り');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-secondary');
    }
  });

  test('should return correct info for fog (code 45)', () => {
    const { description, icon } = getWeatherInfo(45);
    expect(description).toBe('霧');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-muted');
    }
  });

  test('should return correct info for freezing fog (code 48)', () => {
    const { description, icon } = getWeatherInfo(48);
    expect(description).toBe('霧氷');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-muted');
    }
  });

  test('should return correct info for light drizzle (code 51)', () => {
    const { description, icon } = getWeatherInfo(51);
    expect(description).toBe('霧雨: 軽い');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-info');
    }
  });

  test('should return correct info for moderate drizzle (code 53)', () => {
    const { description, icon } = getWeatherInfo(53);
    expect(description).toBe('霧雨: 中程度');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-info');
    }
  });

  test('should return correct info for dense drizzle (code 55)', () => {
    const { description, icon } = getWeatherInfo(55);
    expect(description).toBe('霧雨: 激しい');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-info');
    }
  });

  test('should return correct info for light freezing drizzle (code 56)', () => {
    const { description, icon } = getWeatherInfo(56);
    expect(description).toBe('着氷性の霧雨: 軽い');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-info');
    }
  });

  test('should return correct info for dense freezing drizzle (code 57)', () => {
    const { description, icon } = getWeatherInfo(57);
    expect(description).toBe('着氷性の霧雨: 激しい');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-info');
    }
  });

  test('should return correct info for light rain (code 61)', () => {
    const { description, icon } = getWeatherInfo(61);
    expect(description).toBe('雨: 軽い');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-primary');
    }
  });

  test('should return correct info for moderate rain (code 63)', () => {
    const { description, icon } = getWeatherInfo(63);
    expect(description).toBe('雨: 中程度');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-primary');
    }
  });

  test('should return correct info for heavy rain (code 65)', () => {
    const { description, icon } = getWeatherInfo(65);
    expect(description).toBe('雨: 激しい');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-primary');
    }
  });

  test('should return correct info for light freezing rain (code 66)', () => {
    const { description, icon } = getWeatherInfo(66);
    expect(description).toBe('着氷性の雨: 軽い');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-primary');
    }
  });

  test('should return correct info for heavy freezing rain (code 67)', () => {
    const { description, icon } = getWeatherInfo(67);
    expect(description).toBe('着氷性の雨: 激しい');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-primary');
    }
  });

  test('should return correct info for light snow (code 71)', () => {
    const { description, icon } = getWeatherInfo(71);
    expect(description).toBe('雪: 軽い');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-info');
    }
  });

  test('should return correct info for moderate snow (code 73)', () => {
    const { description, icon } = getWeatherInfo(73);
    expect(description).toBe('雪: 中程度');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-info');
    }
  });

  test('should return correct info for heavy snow (code 75)', () => {
    const { description, icon } = getWeatherInfo(75);
    expect(description).toBe('雪: 激しい');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-info');
    }
  });

  test('should return correct info for snow grains (code 77)', () => {
    const { description, icon } = getWeatherInfo(77);
    expect(description).toBe('雪の粒');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-info');
    }
  });

  test('should return correct info for light rain showers (code 80)', () => {
    const { description, icon } = getWeatherInfo(80);
    expect(description).toBe('にわか雨: 軽い');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-primary');
    }
  });

  test('should return correct info for moderate rain showers (code 81)', () => {
    const { description, icon } = getWeatherInfo(81);
    expect(description).toBe('にわか雨: 中程度');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-primary');
    }
  });

  test('should return correct info for violent rain showers (code 82)', () => {
    const { description, icon } = getWeatherInfo(82);
    expect(description).toBe('にわか雨: 激しい');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-primary');
    }
  });

  test('should return correct info for light snow showers (code 85)', () => {
    const { description, icon } = getWeatherInfo(85);
    expect(description).toBe('雪のにわか雨: 軽い');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-info');
    }
  });

  test('should return correct info for heavy snow showers (code 86)', () => {
    const { description, icon } = getWeatherInfo(86);
    expect(description).toBe('雪のにわか雨: 激しい');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-info');
    }
  });

  test('should return correct info for thunderstorm (code 95)', () => {
    const { description, icon } = getWeatherInfo(95);
    expect(description).toBe('雷雨: 軽いまたは中程度');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-warning');
    }
  });

  test('should return correct info for thunderstorm with slight hail (code 96)', () => {
    const { description, icon } = getWeatherInfo(96);
    expect(description).toBe('雷雨: 軽い雹を伴う');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-warning');
    }
  });

  test('should return correct info for thunderstorm with heavy hail (code 99)', () => {
    const { description, icon } = getWeatherInfo(99);
    expect(description).toBe('雷雨: 激しい雹を伴う');
    expect(icon).not.toBeNull();
    if (icon) {
      expect((icon.props as any).className).toContain('text-warning');
    }
  });

  test('should return "不明" for unknown code', () => {
    const { description, icon } = getWeatherInfo(999);
    expect(description).toBe('不明');
    expect(icon).toBeNull();
  });
});

describe('WeatherCard', () => {
  const defaultProps = {
    date: '7月1日',
    weatherInfo: getWeatherInfo(0),
    maxTemp: 25,
    minTemp: 15,
    precipitation: 0,
    windSpeed: 10,
  };

  test('renders correctly with default props', () => {
    render(<WeatherCard {...defaultProps} />);
    expect(screen.getByText('7月1日')).toBeInTheDocument();
    expect(screen.getByText('快晴')).toBeInTheDocument();
    expect(screen.getByText('25°C / 15°C')).toBeInTheDocument();
    expect(screen.getByText('降水量: 0 mm')).toBeInTheDocument();
    expect(screen.getByText('風速: 10 km/h')).toBeInTheDocument();
  });

  test('renders large card correctly when isLarge is true', () => {
    render(<WeatherCard {...defaultProps} isLarge={true} />);
    expect(screen.getByText('最高: 25°C / 最低: 15°C')).toBeInTheDocument();
    expect(screen.queryByText('25°C / 15°C')).not.toBeInTheDocument(); // 通常表示の温度は表示されない
    expect(screen.getByText('25°C')).toHaveClass('display-4');
  });

  test('renders with different weather info', () => {
    const rainProps = { ...defaultProps, weatherInfo: getWeatherInfo(61), maxTemp: 20, minTemp: 10, precipitation: 5, windSpeed: 15 };
    render(<WeatherCard {...rainProps} />);
    expect(screen.getByText('雨: 軽い')).toBeInTheDocument();
    expect(screen.getByText('20°C / 10°C')).toBeInTheDocument();
    expect(screen.getByText('降水量: 5 mm')).toBeInTheDocument();
    expect(screen.getByText('風速: 15 km/h')).toBeInTheDocument();
  });

  test('does not render icon if weatherInfo.icon is null', () => {
    const noIconProps = { ...defaultProps, weatherInfo: getWeatherInfo(999) }; // Unknown code returns null icon
    render(<WeatherCard {...noIconProps} />);
    expect(screen.queryByRole('img')).not.toBeInTheDocument(); // Assuming icons are rendered as img or have a specific role
  });

  test('renders with different date formats for large and small cards', () => {
    const largeCardProps = { ...defaultProps, isLarge: true, date: '本日 (6/28)' };
    render(<WeatherCard {...largeCardProps} />);
    expect(screen.getByText('本日 (6/28)')).toBeInTheDocument();

    const smallCardProps = { ...defaultProps, isLarge: false, date: '6/29(月)' };
    render(<WeatherCard {...smallCardProps} />);
    expect(screen.getByText('6/29(月)')).toBeInTheDocument();
  });
});