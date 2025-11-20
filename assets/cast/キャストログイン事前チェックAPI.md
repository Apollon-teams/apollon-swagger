
# **ログイン事前チェック API**

---

## **エンドポイント**

```
/auth/precheck

```

## **HTTPメソッド**

```
POST

```

---

## **リクエスト**

### **パスパラメータ**

なし

### **クエリパラメータ**

なし

### **リクエストボディ**

| パラメータ名 | 型 | 説明 | null許容 |
| --- | --- | --- | --- |
| storeId | string | 店舗ID | ✕ |
| emailAddress | string | ログイン用メールアドレス | ◯ |
| castId | string | キャストID（メールの代替として使用） | ◯ |

**補足**

- `emailAddress` と `castId` は **どちらか必須（OR 条件）**

### **リクエスト例**

```json
{
  "storeId": "1001",
  "emailAddress": "test@example.com"
}

```

または

```json
{
  "storeId": "1001",
  "castId": "cst-00032"
}

```

---

## **正常系レスポンス**

| フィールド名 | 型 | 説明 | null許容 |
| --- | --- | --- | --- |
| isSuccess | boolean | 成功フラグ | ✕ |
| userId | string | Supabase Auth のユーザーID | ✕ |
| exists | boolean | 該当店舗にユーザーが存在するか | ✕ |

### **レスポンス例**

```json

{
  "isSuccess": true,
}

```

---

## **エラーレスポンス**

### **400 Bad Request（入力不足）**

```json
{
  "error": "emailAddress or castId is required"
}

```

### **404 Not Found（店舗にユーザが存在しない）**

```json
{
  "error": "User not found for the store"
}

```

### **500 Internal Server Error**

```json
{
  "error": "Internal server error"
}

```

---

