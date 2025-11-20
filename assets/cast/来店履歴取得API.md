# 来店履歴取得API

## エンドポイント

```jsx
/casts/customers/{customerId}/visits

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

| パラメータ名 | 型 | 説明 | null許容(◯ / ✕) |
| --- | --- | --- | --- |
| limit | number | 取得件数（固定値可） | ◯ |
| offset | number | ページング用オフセット | ◯ |

### リクエストボディ

なし

```jsx
{}

```

---

## 正常系レスポンス（200 OK）

| フィールド名 | 型 | 説明 | null許容(◯ / ✕) |
| --- | --- | --- | --- |
| visits | array<Visit> | 来店履歴一覧 | ✕ |

### Visit 型

| フィールド名 | 型 | 説明 | null許容 |
| --- | --- | --- | --- |
| visitDate | string | 利用日時（ISO8601） | ✕ |
| visitCount | number | 利用回数 | ✕ |
| course | string | コース名 | ✕ |
| castName | string | 担当キャスト名 | ✕ |
| nomination | string | 指名（あり/なし） | ✕ |
| options | string | オプション | ◯ |
| reservationMethod | string | 予約方法（WEB/電話/店舗） | ✕ |
| paymentMethod | string | 決済方法 | ◯ |
| treatmentMemo | string | 施術メモ | ◯ |

### レスポンス例

```json
{
  "visits": [
    {
      "visitDate": "2025-11-10T14:00:00Z",
      "visitCount": 5,
      "course": "60分コース",
      "castName": "佐藤 花子",
      "nomination": "指名あり",
      "options": "オプションA, オプションB",
      "reservationMethod": "WEB",
      "paymentMethod": "クレジット",
      "treatmentMemo": "肩こりが強め。"
    }
  ]
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
  "error": "Visits not found for customer"
}

```

### 500 Internal Server Error

```json
{
  "error": "Internal server error"
}

```

---

💡 **補足**

- キャストは **自分の店舗の顧客だけ閲覧可能**
- FE から customerId 以外は送らず、BE が JWT → storeId / castId を元に権限を解決
- ページングは固定件数でも可（limit/offset）