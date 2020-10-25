/**
 * 認証情報を示す State.
 *
 * 永続化されます。
 */
export default {
  /**
   * ログイン日時
   *
   * この State が null の場合、ログイン手続きがなされていないものとして、ログインフォームを表示します。
   */
  authorizedAt: null,
  // アクセストークン
  accessToken: null,
  // リフレッシュトークン
  refreshToken: null,
  /**
   * アクセストークンの有効期限
   *
   * 有効期限が切れる5分前以降になると自動的に再認証します。
   */
  expiresIn: null,
};