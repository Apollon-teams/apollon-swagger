# **ユーザー情報取得 API**

## **エンドポイント**

```
/auth/me

```

## **HTTPメソッド**

```
GET

```

---

## **リクエスト**

### **リクエストボディ**

なし（GET のため）

### **ヘッダー**

| ヘッダー名 | 説明 |
| --- | --- |
| Authorization | `Bearer <accessToken>`（必須） |

---

## **正常系レスポンス（200 OK）**

| フィールド名 | 型 | 説明 | null許容 |
| --- | --- | --- | --- |
| isSuccess | boolean | 成功フラグ | ✕ |
| userId | string | Supabase Auth のユーザーID | ✕ |
| storeId | string | 店舗ID | ✕ |
| castId | string | キャストID | ✕ |
| emailAddress | string | メールアドレス（Auth プロバイダから取得） | ◯ |
| authProvider | string | `email` / `google` / `apple` | ✕ |

### **レスポンス例**

```json
{
  "isSuccess": true,
  "userId": "ae93f1c2-xxxx-xxxx-xxxx-f0e85c4dd111",
  "storeId": "1001",
  "castId": "cst-00123",
  "emailAddress": "test@example.com",
  "authProvider": "email"
}

```

---

## **エラーレスポンス**

### **401 Unauthorized（トークン無効）**

```json
{
  "error": "Invalid or expired token"
}

```

### **404 Not Found（紐づくユーザーデータがない）**

```json
{
  "error": "User mapping not found"
}

```

### **500 Internal Server Error**

```json
{
  "error": "Internal server error"
}

```