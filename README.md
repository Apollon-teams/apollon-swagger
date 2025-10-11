# Apollon API Swagger

このリポジトリは、Apollon サービスの API 仕様を OpenAPI 3.0 で管理します。

## 基本方針

API の定義は、可読性と一覧性を重視し、原則としてメインの`openapi.yaml`ファイルに集約します。
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
    ├── parameters/        # パラメータ定義
    │   └── admin/
    ├── results/           # APIのレスポンスとして加工されたデータ構造
    │   ├── admin/
    │   └── web/
    └── securitySchemes/   # 認証スキーマ定義
```

- **`openapi.yaml`**: API の全エンドポイント、`summary`、`description`、レスポンスコードなど、仕様のほぼすべてをこのファイルに記述します。
- **`components/`**: API 全体で再利用されるコンポーネントを格納します。
  - `models/`: リクエストボディで利用するデータ構造や、システムのコアとなるデータモデルを定義します。
  - `results/`: API のレスポンスとして返却するために加工・整形されたデータモデルを定義します。
  - `parameters/`: パスパラメータなどをリソースごとに定義します。
  - `securitySchemes/`: 認証方式を定義します。

## 運用ルール

### エンドポイントの追加・修正

1.  **`openapi.yaml`** を直接編集します。
2.  `summary`, `description`, `tags`, `parameters`, `responses`などを記述します。
3.  リクエストボディやレスポンスで新しいデータモデルが必要な場合は、以下の「スキーマの追加」の手順に従ってスキーマファイルを作成し、`schema`セクションから`$ref`で参照します。

### スキーマの追加

1.  スキーマの役割に応じて、**`components/models/`** または **`components/results/`** ディレクトリを選択します。
    - `models/`: リクエストボディや、DB モデルのようなコアなデータ構造の場合。
    - `results/`: API のレスポンスとして整形されたデータ構造の場合。
2.  選択したディレクトリ以下で、適切なコンテキスト（例: `admin/`）にモデル名（例: `NewStaff.yaml`）で新しい YAML ファイルを作成します。
3.  作成したファイルに、OpenAPI の `Schema Object`（`type`, `properties`など）を記述します。
4.  **`openapi.yaml`** の`requestBody`や`responses`内の`schema`から、作成したスキーマファイルを`$ref`で直接参照します。（例: `$ref: './components/models/admin/NewStaff.yaml'`）

### パラメータの追加

1.  **`components/parameters/`** ディレクトリ以下で、適切なコンテキスト（例: `admin/`）にパラメータ名（例: `CastId.yaml`）で新しい YAML ファイルを作成します。
2.  作成したファイルに、OpenAPI の `Parameter Object`（`name`, `in`, `description`, `required`, `schema`など）を記述します。
3.  **`openapi.yaml`** の`parameters`セクションから、作成したパラメータファイルを`$ref`で参照します。（例: `$ref: './components/parameters/admin/CastId.yaml'`）
