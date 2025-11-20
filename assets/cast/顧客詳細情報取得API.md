# **顧客情報詳細取得 API**

## エンドポイント

```jsx
/casts/customers/{customerId}

```

## HTTPメソッド

```jsx
GET

```

---

## リクエスト

### パスパラメータ

| パラメータ名 | 型 | 説明 | null許容(◯ / ✕) |
| --- | --- | --- | --- |
| customerId | string | 顧客ID | ✕ |

### クエリパラメータ

なし

### リクエストボディ

なし

```jsx
{}

```

---

## 正常系レスポンス（200 OK）

| フィールド名 | 型 | 説明 | null許容(◯ / ✕) |
| --- | --- | --- | --- |
| customerId | string | 顧客ID | ✕ |
| name | string | 名前 | ✕ |
| furigana | string | フリガナ | ◯ |
| phoneNumber | string | 電話番号 | ◯ |
| emailAddress | string | メールアドレス | ◯ |
| castMemo | string | キャスト用メモ | ◯ |
| visitCount | number | 利用回数 | ✕ |
| status | string | ステータス | ✕ |
| registeredAt | string | 登録日時（ISO8601） | ✕ |

### レスポンス例

```json
{
  "customerId": "cus-00123",
  "name": "山田 太郎",
  "furigana": "ヤマダ タロウ",
  "phoneNumber": "09012345678",
  "emailAddress": "taro@example.com",
  "castMemo": "肩こりが強い。強めの施術を希望。",
  "visitCount": 12,
  "status": "active",
  "registeredAt": "2025-01-12T14:23:09Z"
}

```

---

## エラーレスポンス

### 401 Unauthorized

```json
{
  "error": "Unauthorized"
}

```

### 404 Not Found

```json
{
  "error": "Customer not found"
}

```

### 500 Internal Server Error