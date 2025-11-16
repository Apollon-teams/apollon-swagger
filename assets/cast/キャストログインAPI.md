# **キャストログイン API**

## **エンドポイント**

```
/auth/login

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
| password | string | パスワード | ✕ |

**補足**

- `emailAddress` と `castId` は **どちらか必須（OR 条件）**

### **リクエスト例**

```json
{
  "storeId": "1001",
  "emailAddress": "test@example.com",
  "password": "abc12345"
}

```

または

```json
{
  "storeId": "1001",
  "castId": "cst-00032",
  "password": "abc12345"
}

```

---

## **正常系レスポンス（200 OK）**

| フィールド名 | 型 | 説明 | null許容 |
| --- | --- | --- | --- |
| isSuccess | boolean | ログイン成功フラグ | ✕ |
| accessToken | string | アクセストークン（JWT） | ✕ |
| refreshToken | string | リフレッシュトークン | ✕ |
| userId | string | Supabase Auth のユーザーID | ✕ |

### **レスポンス例**

```json
{
  "isSuccess": true,
  "accessToken": "xxxxx.yyyyy.zzzzz",
  "refreshToken": "rrrrr.sssss.ttttt",
  "userId": "a1b2c3d4e5"
}

```

---

## **エラーレスポンス**

### **400 Bad Request（必須入力不足）**

```json
{
  "error": "storeId and (emailAddress or castId) and password are required"
}

```

### **401 Unauthorized（パスワード不一致）**

```json
{
  "error": "Invalid password"
}

```

### **404 Not Found（ユーザが存在しない）**

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

## **備考（実装上のポイント）**

- Supabase Auth を使うので、内部では
    
    `supabase.auth.signInWithPassword({ email, password })` または
    
    `signInWithPassword({ email: castIdToEmail(castId), password })` の形。
    
- **storeId との整合性チェックはログイン時に行う**。
    
    → ただし要件より、
    
    **storeId と email / castId が一致していなくてもパスワードは出す**（= ログイン事前チェックをしない）
    
    ため、ここでは
    
    - ユーザーが存在するか
    - パスワードが正しいか
        
        を判断するのみ。