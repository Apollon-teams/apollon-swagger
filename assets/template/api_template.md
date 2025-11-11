# [API名]

## エンドポイント

```
/[path]
```

## HTTPメソッド

```
POST
```

---

## リクエスト

### パスパラメータ

| パラメータ名 | 型 | 説明 |
| --- | --- | --- |
| id | string | リソースを特定するためのID |

### クエリパラメータ

| パラメータ名 | 型 | 説明 | null許容(◯ / ✕) |
| --- | --- | --- | --- |
| param1 | string | パラメータ1 | ✕ |
| param2 | integer | パラメータ2 | ◯ |

例：

```
/api/v1/[path]?param1=value1
```

---

### リクエストボディ

| フィールド名 | 型 | 説明 | null許容(◯ / ✕) |
| --- | --- | --- | --- |
| field_1 | string | フィールド1 | ✕ |
| field_2 | integer | フィールド2 | ✕ |
| field_3 | boolean | フィールド3 | ◯ |
| field_4 | array<string> | フィールド4 | ◯ |

---

### リクエスト例

```json
{
  "field_1": "value1",
  "field_2": 123,
  "field_3": true,
  "field_4": ["a", "b", "c"]
}
```

---

## 正常系レスポンス（201 Created）

| フィールド名 | 型 | 説明 | null許容(◯ / ✕) |
| --- | --- | --- | --- |
| data | object | 登録結果 | ✕ |
| id | string | 作成されたリソースのID | ✕ |
| status | string | 登録結果（`created`, `updated`など） | ✕ |
| created_at | string | 登録日時 | ✕ |

### レスポンス例

```json
{
  "data": {
    "id": "res_12345",
    "status": "created",
    "created_at": "2025-11-10T18:00:00+09:00"
  }
}
```

---

## エラーレスポンス

| ステータスコード | 内容 |
| --- | --- |
| 400 | Bad Request: 必須項目の未入力、形式エラーなど |
| 401 | Unauthorized: 認証エラー |
| 403 | Forbidden: 権限なし |
| 404 | Not Found: リソースが存在しない |
| 409 | Conflict: データが競合している（重複など） |
| 500 | Internal Server Error: サーバー内部エラー |

### 例

```json
{
  "error": {
    "code": "400",
    "message": "不正なリクエストです。"
  }
}
```

---
