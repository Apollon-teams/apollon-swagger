## エンドポイント

```
/cast/reservation-items
```

## HTTPメソッド

```jsx
GET
```

## リクエスト

### パスパラメータ

なし

### クエリパラメータ

| パラメータ名 | 型 | 説明 | null許容(◯ / ✕) |
| --- | --- | --- | --- |
| cast_id | string | キャストID | ✕ |
| store_id | string | 店舗ID | ✕ |

### リクエストボディ

なし

```jsx

```

## 正常系レスポンス

| フィールド名 | 型 | 説明 | null許容(◯ / ✕) |
| --- | --- | --- | --- |
| data | array | フォーム項目リスト | ✕ |
| data[].key | string | 項目識別子（例: discount） | ✕ |
| data[].label | string | 表示ラベル | ✕ |
| data[].type | string | 入力タイプ（text, radio, select, datetime, image等） | ✕ |
| data[].value | string |  | ◯ |
| data[].required | boolean | 必須かどうか | ✕ |
| data[].options | array | 選択肢リスト（radio/selectの場合のみ） | ◯ |
| data[].options[].label | string | 選択肢表示名 | ✕ |
| data[].options[].value | string | 選択肢値 | ✕ |

| key | label | type | required | options | 説明 |
| --- | --- | --- | --- | --- | --- |
| reservation_datetime | 予約可能日時 | datetime | true | 配列 | 5分単位で予約可能な日時リスト。キャストシフト・営業時間・既存予約を加味 |
| extension | 延長料金 | radio | false | [{label: "30分", value: "30"}, {label: "60分", value: "60"}, {label: "90分", value: "90"}] | 延長料金の選択（店舗ごとに設定可能） |
| discount | 店舗割引 | radio | false | [{label: "割引A", value: "A"}, {label: "割引B", value: "B"}, {label: "割引C", value: "C"}] | 割引の選択肢（店舗ごとに設定可能） |
| payment_method | 支払い方法 | radio | true | [{label: "現金", value: "cash"}, {label: "カード", value: "card"}] | 支払い方法の選択（店舗毎に設定可能） |
| reservation_method | 予約方法 | radio | true | [{label: "LINE", value: "line"}, {label: "X", value: "x"}, {label: "Instagram", value: "instagram"}] | 予約方法の選択（店舗毎に設定可能） |
| advertisement | 広告 | select | false | [{label: "X", value: "x"}, {label: "Instagram", value: "instagram"}, {label: "TikTok", value: "tiktok"}, ...] | 複数選択可能な広告項目（店舗毎に設定可能） |

### レスポンス例

```json
{
  "data": [
  
    {
      "key": "reservation_datetime",
      "label": "予約可能日時",
      "type": "datetime",
      "required": true,
      "options": [
        "2025-11-10T10:00:00Z",
        "2025-11-10T10:05:00Z",
        "2025-11-10T10:10:00Z",
        "2025-11-10T10:15:00Z"
      ]
    },
    {
      "key": "extension",
      "label": "延長料金",
      "type": "radio",
      "required": false,
      "options": [
        { "label": "30分", "value": "30" },
        { "label": "60分", "value": "60" },
        { "label": "90分", "value": "90" }
      ]
    },
    {
      "key": "discount",
      "label": "店舗割引",
      "type": "radio",
      "required": false,
      "options": [
        { "label": "割引A", "value": "A" },
        { "label": "割引B", "value": "B" },
        { "label": "割引C", "value": "C" }
      ]
    },
    {
      "key": "payment_method",
      "label": "支払い方法",
      "type": "radio",
      "required": true,
      "options": [
        { "label": "現金", "value": "cash" },
        { "label": "カード", "value": "card" }
      ]
    },
    {
      "key": "reservation_method",
      "label": "予約方法",
      "type": "radio",
      "required": true,
      "options": [
        { "label": "LINE", "value": "line" },
        { "label": "X", "value": "x" },
        { "label": "Instagram", "value": "instagram" }
      ]
    },
    {
      "key": "advertisement",
      "label": "広告",
      "type": "select"      
      "required": false,
      "options": [
        { "label": "X", "value": "x" },
        { "label": "Instagram", "value": "instagram" },
        { "label": "TikTok", "value": "tiktok" },
        { "label": "HP", "value": "hp" },
        { "label": "GoogleMaps", "value": "google_maps" },
        { "label": "エステ魂", "value": "estetama" }
      ]
    }
  ]
}

```

## エラーレスポンス

一旦ここは仮にしておく 2025年11月8日 

```json
{
  "status": 400,
  "message": "Bad Request: パラメータ不正"
}

```

```json
{
  "status": 401,
  "message": "Unauthorized: トークン不正または期限切れ"
}

```

```json
{
  "status": 404,
  "message": "Not Found: 店舗が存在しない、またはフォーム項目未設定"
}

```

```json
{
  "status": 500,
  "message": "Internal Server Error"
}

```

---