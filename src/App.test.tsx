import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import App from './App';

describe('App', () => {
  // 各テストの前にfetchモックをリセットし、フェイクタイマーを使用
  beforeEach(() => {
    jest.useFakeTimers();
    global.fetch = jest.fn((url: RequestInfo, init?: RequestInit) =>
      Promise.resolve(new Response(JSON.stringify({
        daily: {
          time: ["2025-06-28", "2025-06-29", "2025-06-30", "2025-07-01", "2025-07-02", "2025-07-03", "2025-07-04", "2025-07-05", "2025-07-06"],
          weather_code: [0, 1, 2, 3, 45, 51, 61, 71, 80],
          temperature_2m_max: [25, 26, 24, 23, 22, 21, 20, 19, 18],
          temperature_2m_min: [15, 16, 14, 13, 12, 11, 10, 9, 8],
          precipitation_sum: [0, 0, 0.1, 0.5, 1.0, 2.0, 5.0, 0, 0],
          wind_speed_10m_max: [10, 12, 8, 9, 11, 13, 15, 7, 6],
        },
      }), {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
      }))
    ) as jest.MockedFunction<typeof global.fetch>;
  });

  // 各テストの後にフェイクタイマーをクリア
  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('renders loading spinner initially', () => {
    render(<App />);
    const loadingText = screen.getByText(/天気データを読み込み中.../i);
    expect(loadingText).toBeInTheDocument();
  });

  test('renders weather data after fetching', async () => {
    render(<App />);
    await act(async () => {
      jest.runAllTimers(); // fetchの解決を待つ
    });
    // ローディングが消え、データが表示されるのを待つ
    await waitFor(() => expect(screen.queryByText(/天気データを読み込み中.../i)).not.toBeInTheDocument());

    expect(screen.getByText('東京都千代田区の天気予報')).toBeInTheDocument();
    expect(screen.getByText(/本日/)).toBeInTheDocument();
    expect(screen.getByText(/明日/)).toBeInTheDocument();
    expect(screen.getByText('週間予報')).toBeInTheDocument();
    expect(screen.getByText('快晴')).toBeInTheDocument();
    expect(screen.getByText('主に晴れ')).toBeInTheDocument();
    expect(screen.getByText('一部曇り')).toBeInTheDocument();
    expect(screen.getByText('曇り')).toBeInTheDocument();
    expect(screen.getByText('霧')).toBeInTheDocument();
    expect(screen.getByText('霧雨: 軽い')).toBeInTheDocument();
    expect(screen.getByText('雨: 軽い')).toBeInTheDocument();
    expect(screen.getByText('雪: 軽い')).toBeInTheDocument();
    expect(screen.getByText('にわか雨: 軽い')).toBeInTheDocument();

    // 温度や降水量などの具体的なデータも確認
    expect(screen.getByText('最高: 25°C / 最低: 15°C')).toBeInTheDocument();
    // 明日の天気はisLargeがtrueなので、この形式で表示される
    expect(screen.getByText('最高: 26°C / 最低: 16°C')).toBeInTheDocument();
  });

  test('renders error message on fetch failure', async () => {
    // fetchがエラーを返すようにモックを設定
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(new Response(null, { status: 500, statusText: 'Internal Server Error' }))
    );

    render(<App />);
    await act(async () => {
      jest.runAllTimers(); // fetchの解決を待つ
    });
    await waitFor(() => expect(screen.queryByText(/天気データを読み込み中.../i)).not.toBeInTheDocument());

    expect(screen.getByText(/天気データの取得中にエラーが発生しました: HTTP error! status: 500/i)).toBeInTheDocument();
  });

  test('renders warning message when weather data is not available', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() =>
      Promise.resolve(new Response(JSON.stringify({}), { status: 200, headers: { 'Content-Type': 'application/json' } }))
    );

    render(<App />);
    await act(async () => {
      jest.runAllTimers(); // fetchの解決を待つ
    });
    await waitFor(() => expect(screen.queryByText(/天気データを読み込み中.../i)).not.toBeInTheDocument());

    expect(screen.getByText(/天気データが利用できません。/i)).toBeInTheDocument();
  });
});
