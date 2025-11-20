# **パスワード再設定API**

## **エンドポイント**

```
/auth/password/update
```

## **HTTPメソッド**

```
POST
```

---

## **リクエスト**

### **ヘッダー**

| 名称 | 値 | 説明 |
| --- | --- | --- |
| Authorization | Bearer {accessToken} | ログイン済みユーザーのアクセストークン |

### **リクエストボディ**

| パラメータ名 | 型 | 説明 | null許容 |
| --- | --- | --- | --- |
| currentPassword | string | 現在のパスワード | ✕ |
| newPassword | string | 新しいパスワード | ✕ |
| confirmPassword | string | 新しいパスワード（確認） | ✕ |

**補足**

- `newPassword` と `confirmPassword` が一致している必要あり
- `newPassword` は最低 8 文字以上、英数字記号のみ
- バリデーションは FE / BE 両方で実施推奨

---

## **正常系レスポンス（200 OK）**

| フィールド名 | 型 | 説明 | null許容 |
| --- | --- | --- | --- |
| isSuccess | boolean | パスワード変更成功フラグ | ✕ |
| message | string | メッセージ | ✕ |

### **レスポンス例**

```json
{
  "isSuccess": true,
  "message": "Password updated successfully"
}

```

---

## **エラーレスポンス**

### **400 Bad Request（入力エラー）**

```json
{
  "error": "newPassword and confirmPassword must match"
}

```

### **401 Unauthorized（アクセストークン無効 or 現在のパスワード不一致）**

```json
{
  "error": "Invalid current password"
}

```

### **422 Unprocessable Entity（パスワード強度要件未達）**

```json
{
  "error": "Password must be at least 8 characters"
}

```

### **500 Internal Server Error**

```json
{
  "error": "Internal server error"
}

```

---

## **実装考慮ポイント**

- Supabase Auth のパスワード更新は「再認証」が必要なため、
    
    BE は以下を行う：
    

```
① 現在のパスワードで signIn（再認証）
② 成功したら auth.updateUser({ password: newPassword })
```

- 認証に失敗した場合は 401 を返却する
- 再ログインは不要（Supabase はトークンを維持）
- 変更後にセキュリティ向上のため、
    
    任意で **refresh token の再発行**も可能
    

---