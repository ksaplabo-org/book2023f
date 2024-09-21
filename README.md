# サーバーレスアーキテクチャーによるサイト構築​


## 環境準備
- 下記をPCにインストール  
   - Node.js
   - VSCode
   - Git
- コマンドで下記を実行
   - npm install -g @aws-amplify/cli (aws amplifyを使うためのライブラリ)
   - npm install -g @vue/cli （Vueで使うコマンドラインのツール群）  
   - git config --global user.name "XXXX"  
   - git config --global user.email "XXXX@hogehoge.com" 

## ①.WEBページ配信
### VSCodeのコマンドラインからAWSを操作し、WEBページを配信する環境を構築する
### コマンドラインとAWSを連携する
- ターミナルで下記コマンドを実行。
  ``` 
  amplify configure
  ```
- ターミナル上でリージョンを設定。
  - 「ap-noutheast-1」：東京のAWS  
※一番近い地域のAWSを使用するのが一般的(レスポンスタイムが短い) 
- ブラウザで開いたAWSコンソールのユーザー作成画面で  
  AWS amplifyのユーザーを新規作成
  - ユーザー名を設定して次へ  
    ※ユーザー名は任意  
  - 権限の設定
    - 以下の作成済みの権限グループを使用  
    「usergrm-aws-traning」 
  - 登録内容を確認してユーザー作成をクリック  
  →新規ユーザの作成が完了する  

- 作成したユーザーとコマンドラインを紐づけるためのアクセスキーを作成
  - アクセスキーの用途「コマンドラインインターフェイス(CLI)」を選択
  - 確認のチェックボックスをクリックして次へ
  - 説明のタグ値は未入力でOK
  - アクセスキーを作成をクリックで作成完了  
  ※csvファイルは保存する（シークレットアクセスキーが見れなくなる）  

- コマンドプロンプトでアクセスキーを入力  

- Profile Nameはデフォルトのままで次へ　　  
→AWSとコマンドラインを紐づけ完了


### プロジェクトのひな形を作成
#### 公開する画面を作成
- ターミナルで下記コマンドを実行。  
「books」という名前でVeu.jsのプロジェクトのひな形を作成
  ``` 
  vue create books
  ```
- Default ([Vue 2] babel, eslint)を選択して次へ  
→新規プロジェクトの作成が完了する  


### プロジェクトを外に向けて公開 
#### 公開するプロジェクトとAWSを紐づける
  - cd booksで移動
  - ターミナルで下記コマンドを実行。  
    公開するプロジェクトとAWSを紐づける設定を行う
  ``` 
  amplify init
  ```
  - AWS amplifyで認識するプロジェクト名を入力して次へ  
  　※プロジェクト名は任意  

  - amplifyと紐づけるための認証方法を選択
    - AWS access keysを選択して次へ
    - アクセスキーを入力して次へ
    - リージョン「ap-noutheast-1」を選択して次へ  
  →プロジェクトとAWSの紐づけが完了する  

#### 外に向けて公開する設定
  - ターミナルで下記コマンドを実行。  
    外に向けて公開する設定を行う
  ``` 
  amplify add hosting
  ```
  - 公開する方法は以下を選択（amplifyを使用）  
  「Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)」
  - デプロイの方法は「マニュアル」を選択  
  →プロジェクトを外に向けて公開する設定が完了

#### 動作確認
  - ターミナルで下記コマンドを実行。  
    ローカルのソースをAWSに反映する
  ``` 
  amplify publish 
  ```  
 　  →自動でデプロイされる
  - URLにアクセスして画面が公開されていることを確認

### アプリのソースは置き換えで対応
- amplify、dist、node_modules以外のファイルを作成済みのソースに置き換える
- ターミナルで下記コマンド実行  
  ソースで使用しているライブラリをインストール
  ``` 
  npm install 
  ``` 

- ターミナルで下記コマンド実行  
  AWSに反映
  ``` 
  amplify publish
  ``` 

## ②.Cognitoでユーザ管理
### 認証機能を作成する 
#### コマンドラインから認証機能の設定を作成する
  - ターミナルで以下のコマンドを実行。  
   amplify に追加する認証機能を作成
  ``` 
  amplify add auth
  ```  
  - デフォルトの設定「Default configuration」を選択   
  - 認証の詳細を設定  
    - メインの認証のキーは「Email」を選択して次へ
    - 認証のパラメータを追加するため下記を選択  
    「Yes, I want to make some additional changes.」
    - 追加の認証キーを以下で設定  
    「name」
    - 機能の追加を設定（今回は何も追加しないで次へ）  
    →認証機能が作成できた  

  - ターミナルで下記コマンドを実行。  
   認証機能をAWSに反映する
  ``` 
  amplify push 
  ```  
### 認証機能とプロジェクトを紐づける
 
#### WebアプリにCognito情報を設定(Visual Studio Code)
- 自クライアントPCでVsCodeのソースから、「.env」ファイルを開き、以下の情報を設定して保存する。
``` js
VUE_APP_AWS_COGNITO_ID_POOL_ID=ap-northeast-1:xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxx  #2 
VUE_APP_AWS_COGNITO_USERPOOL_ID=ap-northeast-1_xxxxxxxx  #3
VUE_APP_AWS_COGNITO_USERPOOL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxx #4 
```
- 「IDプールのID」を設定
- 「ユーザープールID」を設定
- 「クライアントID」を設定
- ターミナルで下記コマンドを実行。  

 認証機能をAWSに反映する
  ``` 
  amplify publish 
  ```  

→プロジェクトに認証機能を追加できた

##### 動作確認
- AWSコンソールの「AWS Amplify」から配信した画面にアクセス
- ログイン画面で「Register an Account」を選択する。
- ログインに使用するためのメールアドレス、パスワードを入力して「Register」ボタンをクリック。
- しばらくすると登録したメールアドレスに検証コード（6桁）が送付されてくる。
- ページに表示されている「Verify Key」に6桁の検証コードを入力して「Verify」ボタンをクリックする。
- ログイン画面から、登録したメールアドレスとパスワードを入力して「Login」をクリック  
→トップ画面が開く（認証機能が動作していることを確認）

## ソース管理サーバでソース管理（CICD環境の構築）
- 「CodeCommit」というサービスを使用する  
- リポジトリを作成  
   - リポジトリ名を設定
   　※名前は任意
   - リポジトリ作成をクリック  
    →リポジトリがCodecommit上に作成される

- CodeCommitを使うためのユーザー情報を作成
   - 作成したユーザー情報のセキュリティ認証情報タブからAWS CodeCommit の HTTPS Git 認証情報 欄の認証情報を生成  
   ※必ずダウンロードする

- Gitリポジトリをローカルにクローン
   - ターミナルでクローンしたいディレクトリに移動  
    ``` 
    cd 〇〇 
    ``` 
   - クローン作製のコマンドを実行  
   CodeCommitのステップ３にクローン作製のコマンドがある  
   - ダウンロードしたGit認証情報を入力  

- Codecommit上のソースで画面を公開する環境を作成  
   - マスターブランチを作成 (空のままコミット)
    ``` 
    git commit --allow-empty -m "first commit"
    ``` 
   - Codecommitに反映　（AWSに反映） 
    ``` 
    git push origin master 
    ``` 
   - 下記コマンドで現在のブランチを確認できる  
    ``` 
    git branch 
    ``` 
   - 開発用のブランチを作成  
   新しいブランチを作成して移動 
    ``` 
    git checkout -b develop 
    ``` 
   - ソースを開発ブランチに置く  
   　※amplify、dist、node_modules以外
    ``` 
    git add .
    ```  
   - ローカルリポジトリにソースを反映 
    ``` 
    git commit -m 1st.
    ```  
   - リモートリポジトリに反映　（AWSに反映） 
   リモートリポジトリにはdevelopのブランチはないので設定して反映 
    ``` 
    git push --set-upstream origin develop
    ``` 
  →Codecommitに反映されていることを確認

- 自動デプロイ設定（CICD）
   - AWS Amplifyで新しいアプリケーションを作成をクリック  
   - ウェブアプリケーションをホストを選択  
   - AWS CodeCommitを選択して続行  
   - リポジトリの選択で作成したリポジトリを選択する  
   - ブランチの選択で開発用のブランチを選択  
   - IAMロールで既存のロールを選択  
     ※新しく作るでもOK
    ``` 
    amplifyconsole-backend-role 
    ```  

- ソースをAWSに反映
　→自動デプロイされることを確認

## ③書籍データ配信／更新
### DynamoDBに書籍情報を管理するテーブルを作成

- AWSコンソールで「DynamoDB」のサービスにアクセス
- 「テーブルの作成」をクリック
- テーブル名を設定  
※名前は任意  
- パーテーションキーに「title」(文字列)を設定  
- テーブル設定で「設定のカスタマイズ」を選択  
- 読み込みキャパシティでAuto Scalingをオフにする  
- 書き込みキャパシティでAuto Scalingをオフにする
- 「テーブルを作成」ボタンをクリック

### バックエンドの環境を自動作成 
#### 「AWS CodeStar」で環境を自動作成
- 「新規プロジェクトの作成」をクリックする。
  - プロジェクトのテンプレートから「Express.js」を選択
  - プロジェクト名を設定  
    ※名前は任意
  - 「レポジトリ」は「AWS CodeCommit」を選択
  - そのまま「次へ」をクリックし、「プロジェクトを作成する」をクリックする。  
  →下記が自動で作成される  
  ```
  ・アプリの処理のソースを管理するリポジトリ（CodeCommit）  
  ・処理のひな形のソース  
  ・コミットされたら自動デプロイする設定を作成（パイプライン）  
  ※コミット(CodeCommit)→ビルド（CodeBild）→デプロイ (Cloud Formation)  
  ・処理呼び出しの窓口を作成（APIゲートウェイ）
  ```  

- プロジェクトの権限を設定
  - 「IAM」サービスでロールを検索
  - 下記のロールに「AdministratorAccess」を追加  
    「CodeStarWorker-（作成したプロジェクト名）-CloudFormation 」   
  - 下記のロールの「許可の境界を削除」を行う  
  「CodeStar-（作成したプロジェクト名）-Execution」  

#### 開発環境をクラウド上に作成
- 「AWS Cloud9を設定」を選択
- 環境名を設定  
※名前は任意
- 「続行」をクリック  
→環境が作成される  

- cloud9でgitを使用するための初期設定を行う  
  - ターミナルで下記コマンドを実行。  
  ``` 
  git config --global user.name test 
  git config --global user.email test@test 
  ``` 

#### バックエンドの処理を作成

- 以下３つのファイルの内容をコピーし、同名のファイルに上書きする。
  - package.json
  - template.yml
  - app.js   

- 画面下のコンソールを選択し、以下のコマンドを実行する。
  ``` 
  git add .
  git commit -m 1st.
  git push
  ```
- これにより、githubにソースがPushされ、自動的にビルド、デブプロイが実行される。
- CodeStar画面に切り替えると、右下に実行状況が表示される。デプロイが「成功」と表示されればOK。

#### アプリと連携
- 自動で作成されたAPIゲートウェイでアプリの要求を受け取る
- APIゲートウェイのサービスから「URLの呼び出しのURL」を取得
- フロントの「.env」ファイルにURLの呼び出しのURL」を設定  
- AWSに反映
  ``` 
  git add .
  git commit -m 2nd.
  git push
  ```

#### 動作確認  
- 画面上で書籍を追加
- 書籍のレンタル・返却を行う
- 作成したDynamoDBのテーブル情報が書き換わっていることを確認

## ④書籍貸出通知
### AWS Lambdaにメール通知の処理を作成する。
#### AWS Lambdaに関数を追加し、dynamoDBのレコード更新イベント(つまり、貸出・返却の操作)に応じて、管理者へメール通知が送られるような自動処理を追加します。
- サービスから「DynamoDB」を選択し、「テーブル」から前述の手順で作成したテーブルをクリックする。
- 「ストリームの管理」ボタンをクリックする。「表示タイプ」では「新旧イメージ」を選択して「有効化」をクリック。  
  これにより、テーブルのデータ更新が行われたタイミングで AWS lambda への通知が発信されるようになる。
- 次に、サービスから「AWS lambda」を選択し、「関数の作成」をクリックする。
- 「関数の作成」画面では、「一から作成」を選択する。関数名は任意。ランタイムは「Node.js 16.x」を選択して、「関数の作成」ボタンをクリックする。
- 「Desinger」エリアで「トリガーを追加」をクリックし、「トリガーの設定」画面で「DynamoDB」を選択する。「DynamoDB」テーブルには、前述の手順で「ストリームの管理を有効化したテーブル名が自動で表示されるので、「追加」をクリックする。
- `index.js` を作成済みの処理に置き換える
- `moment.js` を追加し、作成済みのソースに置き換える  

→デプロイをして完了  

#### 動作確認  
- 画面上で書籍のレンタル・返却を行う
- メールが送信されていることを確認
