# 給与レポート取得 API

## エンドポイント

```jsx
/casts/report

```

## HTTPメソッド

```jsx
GET

```

## リクエスト

### パスパラメータ

なし

### クエリパラメータ

| パラメータ名 | 型 | 説明 | null許容 |
| --- | --- | --- | --- |
| startDate | string | 任意期間の開始日（YYYY-MM-DD） | ◯ |
| endDate | string | 任意期間の終了日（YYYY-MM-DD） | ◯ |

> startDate / endDate が無い場合、"当月の売上" として集計
> 

> 
> castId / storeId は送らない → JWT でサーバー側取得
> 

---

## 正常系レスポンス

| フィールド名 | 型 | 説明 | null許容 |
| --- | --- | --- | --- |
| todaySales | number | 今日の売上 | ✕ |
| lastSales | number | 前回の売上（前営業日 or 前シフト日） | ✕ |
| lastWeekSales | number | 先週の売上 | ✕ |
| thisMonthSales | number | 今月の売上 | ✕ |
| periodSales | number | 任意期間の売上（startDate/endDate 指定時） | ◯ |

```json
{
  "todaySales": 32000,
  "lastSales": 28000,
  "lastWeekSales": 160000,
  "thisMonthSales": 540000,
  "periodSales": 120000
}

```

---

## エラーレスポンス

### 401 Unauthorized

- JWT が無効 / 期限切れ
- 未ログイン

```json
{
  "error": "unauthorized",
  "message": "Authentication is required."
}

```

### 400 Bad Request

- 日付フォーマットが不正など

```json
{
  "error": "invalid_request",
  "message": "startDate or endDate format is invalid."
}

```

---

# 💡 集計ロジック（BE側イメージ）

JWT → `castId` を取得し、以下を集計：

- 今日：`reservation.date = today` かつ `cast_id = castId`
- 前回売上：直近日の売上
- 先週：`reservation.date BETWEEN last_week_start AND last_week_end`
- 今月：`reservation.date BETWEEN first_day_of_month AND today`
- 任意期間：`BETWEEN startDate AND endDate`

売上 → Reservation × Course × Options など