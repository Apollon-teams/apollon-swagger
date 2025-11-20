# 売上サマリ取得 API

## エンドポイント

```jsx
/casts/{castId}/sales/summary

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
| castId | string | ログインキャストのID | ✕ |

---

### クエリパラメータ

（なし）

---

### リクエストボディ

GET のため **なし**

```jsx
{}

```

---

## 正常系レスポンス

### 追加要件への対応ポイント

- **今日の売上 → 前回出勤の売上との差分＆対比率**
- **今週の売上 → 先週売上との差分＆対比率**
- **今月の売上 → 先月売上との差分＆対比率**

差分・対比率の定義（一般的な仕様を採用）

- 差分：`current - previous`
- 対比率：`(current - previous) / previous`
    - previous が 0 または null の場合 → `null` を返す（割れないため）

※ 対比率はフロントで `%` 変換できるよう **0.0〜1.0 などの小数値**で返す

---

### 正常系フィールド定義

| フィールド名 | 型 | 説明 | null許容 |
| --- | --- | --- | --- |
| today.current | number | 今日の売上 | ✕ |
| today.previous | number | 前回出勤日の売上 | ◯ |
| today.diff | number | 今日 − 前回出勤 の差分 | ◯ |
| today.ratio | number | 前回比（比率） | ◯ |
| thisWeek.current | number | 今週の売上 | ✕ |
| thisWeek.previous | number | 先週の売上 | ◯ |
| thisWeek.diff | number | 今週 − 先週 の差分 | ◯ |
| thisWeek.ratio | number | 先週比（比率） | ◯ |
| thisMonth.current | number | 今月の売上 | ✕ |
| thisMonth.previous | number | 先月の売上 | ◯ |
| thisMonth.diff | number | 今月 − 先月 の差分 | ◯ |
| thisMonth.ratio | number | 先月比（比率） | ◯ |

---

### 正常系レスポンス例

```json
{
  "today": {
    "current": 25000,
    "previous": 20000,
    "diff": 5000,
    "ratio": 0.25
  },
  "thisWeek": {
    "current": 120000,
    "previous": 100000,
    "diff": 20000,
    "ratio": 0.2
  },
  "thisMonth": {
    "current": 320000,
    "previous": 300000,
    "diff": 20000,
    "ratio": 0.0667
  }
}

```

---

## エラーレスポンス

```json
{
  "error": {
    "message": "売上情報の取得に失敗しました",
    "code": "SALES_SUMMARY_FETCH_FAILED"
  }
}

```