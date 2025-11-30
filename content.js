// 【重要】windowオブジェクトを操作するためのスクリプト（workflowy-hook.js）をDOMに挿入する
console.log("Content Script: workflowy-hook.jsをページに挿入します。");

const script = document.createElement('script');

// browser.runtime.getURL() は、WARとして登録したリソースへの完全なURLを取得するAPIです。
// これにより、CSPに関係なくファイルを読み込めます。
script.src = browser.runtime.getURL('workflowy-hook.js');

// スクリプトをドキュメントのヘッドまたはルート要素に追加して実行させます
(document.head || document.documentElement).appendChild(script);

// スクリプトの読み込みが完了したら、DOMをクリーンアップするために削除します（オプション）
script.onload = function() {
    this.remove();
};

console.log("Content Script: 挿入完了。ショートカット処理はグローバルスコープで実行されます。");