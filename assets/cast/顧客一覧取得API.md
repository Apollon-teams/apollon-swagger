# **顧客情報一覧取得 API**

## エンドポイント

```jsx
/casts/customers

```

## HTTPメソッド

```jsx
GET

```

---

## リクエスト

### パスパラメータ

なし

### クエリパラメータ

| パラメータ名 | 型 | 説明 | null許容(◯ / ✕) |
| --- | --- | --- | --- |
| keyword | string | 名前・電話番号・メールの部分一致検索 | ◯ |
| status | string | 顧客ステータス（active / inactive など） | ◯ |
| date_from | string | 登録日の絞り込み（開始） | ◯ |
| date_to | string | 登録日の絞り込み（終了） | ◯ |
| sort | string | asc / desc | ◯ |

> ※ castId / storeId は送らない（JWT で BE が解決）
> 

### リクエストボディ

なし

```jsx
{}

```

---

## 正常系レスポンス（200 OK）

| フィールド名 | 型 | 説明 | null許容(◯ / ✕) |
| --- | --- | --- | --- |
| customers | array<Customer> | 顧客一覧 | ✕ |

### **Customer 型**

| フィールド名 | 型 | 説明 | null許容 |
| --- | --- | --- | --- |
| customerId | string | 顧客ID | ✕ |
| name | string | 名前 | ✕ |
| registeredAt | string | 登録日（ISO8601） | ✕ |
| visitCount | number | 利用回数 | ✕ |
| phoneNumber | string | 電話番号 | ◯ |
| emailAddress | string | メールアドレス | ◯ |
| status | string | ステータス（active / inactive） | ✕ |
| treatmentMemo | string | 施術メモ | ◯ |

---

### **レスポンス例**

```json
{
  "customers": [
    {
      "customerId": "cus-00123",
      "name": "山田 太郎",
      "registeredAt": "2025-01-12T14:23:09Z",
      "visitCount": 12,
      "phoneNumber": "09012345678",
      "emailAddress": "taro@example.com",
      "status": "active",
      "treatmentMemo": "肩こりが強い。強めの施術を希望。"
    },
    {
      "customerId": "cus-00456",
      "name": "佐藤 花子",
      "registeredAt": "2024-12-03T10:12:30Z",
      "visitCount": 5,
      "phoneNumber": null,
      "emailAddress": "hanako@example.com",
      "status": "inactive",
      "treatmentMemo": null
    }
  ]
}

```

---

## エラーレスポンス

### **401 Unauthorized（未ログイン / トークン不正）**

```json
{
  "error": "Unauthorized"
}

```

### **500 Internal Server Error**

```json
{
  "error": "Internal server error"
}

```

---

# 🔍 補足

### ■ **キャストが閲覧できる顧客の範囲**

BE のロジックで制御：

- **userId → castId を取得**
- castId に紐づく storeId を取得
- storeId の顧客一覧を返す
    
    ※セキュリティ的に FE から storeId を送らせない
    

### ■ 予約一覧と同様に BE 側で権限制御

FE 側は何も意識しなくて OK。