# Apollon API Swagger

このリポジトリは、ApollonサービスのAPI仕様をOpenAPI 3.0で管理します。

## 基本方針

APIの定義は、可読性と一覧性を重視し、原則としてメインの`openapi.yaml`ファイルに集約します。
ただし、再利用されるデータモデル（スキーマ）やコンポーネントは、`components`ディレクトリ以下に分割して管理し、`openapi.yaml`から参照（`$ref`）します。

## ディレクトリ構成

```
apollon-swagger/
├── README.md
├── openapi.yaml         # API定義のすべてを記述するメインファイル
└── components/            # 再利用可能なコンポーネント
    ├── models/            # コアなデータ構造（リクエストボディやDBモデルなど）
    │   ├── admin/
    │   ├── common/
    │   └── web/
    ├── parameters/        # 共通パラメータ定義
    │   └── common/
    ├── results/           # APIのレスポンスとして加工されたデータ構造
    │   ├── admin/
    │   └── web/
    └── securitySchemes/   # 認証スキーマ定義
```

- **`openapi.yaml`**: APIの全エンドポイント、`summary`、`description`、レスポンスコードなど、仕様のほぼすべてをこのファイルに記述します。
- **`components/`**: API全体で再利用されるコンポーネントを格納します。
  - `models/`: リクエストボディで利用するデータ構造や、システムのコアとなるデータモデルを定義します。
  - `results/`: APIのレスポンスとして返却するために加工・整形されたデータモデルを定義します。
  - `parameters/`: パスパラメータなど、共通で利用するパラメータを定義します。
  - `securitySchemes/`: 認証方式を定義します。

## 運用ルール

### エンドポイントの追加・修正

1.  **`openapi.yaml`** を直接編集します。
2.  `paths`セクションに新しいエンドポイントを追加するか、既存のエンドポイントを修正します。
3.  `summary`, `description`, `tags`, `parameters`, `responses`などを記述します。
4.  リクエストボディやレスポンスで新しいデータモデルが必要な場合は、以下の「スキーマ（モデル）の追加」の手順に従ってスキーマファイルを作成し、`schema`セクションから`$ref`で参照します。

### スキーマ（モデル）の追加

1.  **`components/schemas/`** ディレクトリ以下で、適切な場所（例: `admin/`）にモデル名（例: `NewStaff.yaml`）で新しいYAMLファイルを作成します。
2.  作成したファイルに、OpenAPIの `Schema Object`（`type`, `properties`など）を記述します。
3.  **`openapi.yaml`** の`requestBody`や`responses`内の`schema`から、作成したスキーマファイルを`$ref`で直接参照します。（例: `$ref: './components/schemas/admin/NewStaff.yaml'`）

