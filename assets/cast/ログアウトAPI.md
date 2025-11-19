## **ログアウト API**

### **エンドポイント**

```
/auth/logout

```

### **HTTPメソッド**

```
POST

```

### **リクエストボディ**

| パラメータ名 | 型 | 説明 | null許容 |
| --- | --- | --- | --- |
| accessToken | string | JWT アクセストークン | ✕ |
| refreshToken | string | リフレッシュトークン | ✕ |

### **正常系レスポンス（200 OK）**

```json
{
  "isSuccess": true}

```

### **エラーレスポンス**

```json
{
  "error": "Invalid token or already logged out"
}

```