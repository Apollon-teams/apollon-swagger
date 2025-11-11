# 予約情報送信API
## エンドポイント

```
/cast/reservations
```

## HTTPメソッド

```jsx
POST
```

---

## リクエスト

### パスパラメータ

なし

### クエリパラメータ

| パラメータ名 | 型 | 説明 | null許容(◯ / ✕) |
| --- | --- | --- | --- |
| store_id | string | 店舗ID | ✕ |
| cast_id | string | キャストID（ログイン済みでも送信） | ✕ |

例：

```
/api/v1/cast/reservations?store_id=1&cast_id=12

```

---


### リクエストボディ

| フィールド名 | 型 | 説明 | null許容(◯ / ✕) |
| --- | --- | --- | --- |
| reservation_datetime | string | 予約日時（ISO8601形式） | ✕ |
| shimei_type | string | 指名種別（`photo` or `regular`） | ✕ |
| extension | string | 延長時間（`30`, `60`, `90`） | ◯ |
| discount | string | 店舗割引（店舗設定に応じる） | ◯ |
| payment_method | string | 支払い方法（`unknown`, `cash`, `card`） | ✕ |
| reservation_method | string | 予約方法（`line`, `x`, `instagram`, `other`） | ✕ |
| reservation_status | string | ステータス（`new`, `draft`） | ✕ |
| advertisement | array<string> | 広告媒体（複数選択可） | ✕<br />※選択無しの場合は空配列`[]`で送る |
| treatment_note | string | 施術メモ | ◯ |
| request | string | ご要望 | ◯ |

---

### リクエスト例

```json
{
  "reservation_datetime": "2025-11-15T20:00:00+09:00",
  "shimei_type": "photo",
  "extension": "60",
  "discount": "A",
  "payment_method": "cash",
  "reservation_method": "line",
  "reservation_status": "new",
  "advertisement": ["x", "instagram"],
  "memo": "常連様です。VIPルーム希望。",
  "treatment_note": "いい人",
  "request": "静かに過ごしたい",
}

```

---


## 正常系レスポンス（201 Created）

| フィールド名 | 型 | 説明 | null許容(◯ / ✕) |
| --- | --- | --- | --- |
| data | object | 登録結果 | ✕ |
| reservation_id | string | 予約ID | ✕ |
| store_id | string | 店舗ID | ✕ |
| cast_id | string | キャストID | ✕ |
| reservation_datetime | string | 予約日時（ISO8601） | ✕ |
| status | string | 登録結果（`created`, `updated`など） | ✕ |
| created_at | string | 登録日時 | ✕ |

### レスポンス例

```json
{
  "data": {
    "reservation_id": "res_98231",
    "store_id": "1",
    "cast_id": "12",
    "reservation_datetime": "2025-11-15T20:00:00+09:00",
    "status": "created",
    "created_at": "2025-11-10T18:00:00+09:00"
  }
}

```

---

## エラーレスポンス

| ステータスコード | 内容 |
| --- | --- |
| 400 | 必須項目の未入力、形式エラー |
| 401 | 認証エラー（トークン不正） |
| 403 | 店舗またはキャスト権限なし |
| 409 | 重複予約（同時刻に既存予約あり） |
| 500 | サーバーエラー |

### 例

```json
{
  "error": {
    "code": "409",
    "message": "同じ時間帯に予約が存在します。"
  }
}

```

---