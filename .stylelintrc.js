module.exports = {
  extends: [
    // standardだと縛りがうるさすぎるのでrecommendedぐらいにしておく
    'stylelint-config-recommended-scss',
    // VUE特有のルールがあればそいつを適応
    'stylelint-config-recommended-vue/scss',
    // cssプロパティを整列。アルファベット順ではなく視覚順に近い。旧twitterのRECESSやbootstrapに準拠との事
    'stylelint-config-recess-order',
  ],
  rules: {
    // #ffffff => #fff
    'color-hex-length': 'short',
    'rule-empty-line-before': [
      // セレクタ同士は1行開ける
      'always-multi-line',
      // 例外
      { ignore: ['after-comment', 'first-nested'] },
    ],
  },
};
