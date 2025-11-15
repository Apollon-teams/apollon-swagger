# 今日の出勤情報取得 API

## エンドポイント

```jsx
/casts/{castId}/shifts/today
```

## HTTPメソッド

```jsx
GET

```

## リクエスト

### パスパラメータ

| パラメータ名 | 型 | 説明 | null許容(◯ / ✕) |
| --- | --- | --- | --- |
| castId | string | ログインキャストのID | ✕ |

### クエリパラメータ

（なし）

### リクエストボディ

GET のため **なし**

```jsx
{}

```

---

## 正常系レスポンス

※ 今日が「休み」の場合は **HTTP 200 で null を返す** または **404 Not Found** のどちらか運用を選べる

（デフォルトは 200 + null を採用しています）

| フィールド名 | 型 | 説明 | null許容(◯ / ✕) |
| --- | --- | --- | --- |
| startTime | string (ISO8601) | 出勤開始時刻 | ✕ |
| endTime | string (ISO8601) | 出勤終了時刻 | ✕ |
| status | string | 出勤ステータス（"通常" / "遅番" など） | ✕ |

```json
{
  "startTime": "2025-11-15T12:00:00+09:00",
  "endTime": "2025-11-15T20:00:00+09:00",
  "status": "通常出勤"
}

```

---

## エラーレスポンス

```json
{
  "error": {
    "message": "出勤情報の取得に失敗しました",
    "code": "SHIFT_TODAY_FETCH_FAILED"
  }
}

```

---