// このスクリプトはWorkFlowyのグローバルスコープで実行されます。
// ページ自身のコードと同じようにWFオブジェクトにアクセス可能です。

console.log("グローバルスクリプト: ショートカットキーリスナーをWorkFlowyに追加します。");

(function() {
    document.body.addEventListener('keydown', event => {

        // 自分の親を閉じて、親にフォーカスを移動
        if (event.metaKey && event.key === 'ArrowRight') {
            event.preventDefault();
            console.log("カスタムショートカット（Meta+AR）が押されました");
            var s = WF.focusedItem();
            if (s.isExpanded()) {
                WF.collapseItem(s);
            } else {
                var t = s.getParent();
                WF.editItemName(t);
                WF.collapseItem(t);
                if (t.getParent().getParent() == null) {
                    //特定の項目にズームしているときにうまくいかない？
                    console.log("ズームアウトしたいです");
                    WF.zoomOut();
                }
            }
        }
        
        //日付戻るボタンを押す
        if (event.altKey && event.metaKey && event.key === '‘') {
            event.preventDefault();
            console.log("カスタムショートカット（[+Meta+alt）が押されました");
            const btset = document.querySelector(".pb-m");
            if (btset){
                btset.querySelectorAll(".iconButton")[0]?.click();
          }
        }
        //日付進むボタンを押す
        if (event.altKey && event.metaKey && event.key === '«') {
            event.preventDefault();
            console.log("カスタムショートカット（]+Meta+alt）が押されました");
            const btset = document.querySelector(".pb-m");
            if (btset){
                btset.querySelectorAll(".iconButton")[1]?.click();
            }
        }
        //選択項目をグループ化する
        if (event.shiftKey && event.metaKey && event.key === 'g') {
            event.preventDefault(); // ブラウザのデフォルト動作をキャンセル

            console.log("カスタムショートカット: 新しい親項目を作成し、選択項目を移動します。");

            // 1. 現在選択されている項目を取得する
            var targetItem = WF.getSelection();
            ""==targetItem&&targetItem.push(WF.focusedItem());

            // 2. 現在選択されている項目の上に新しい項目を作成する
            const t = WF.createItem(targetItem[0].getParent(),targetItem[0].getPriority())

            // 3. 現在選択されている項目を作成された項目の子項目い移動する
            WF.moveItems(targetItem, t, 0);
            WF.expandItem(t);
            WF.editItemName(t);

            console.log("処理完了: 選択された項目が新しい親項目の子として移動しました。");
        }
        
    });
})();

console.log("グローバルスクリプト: ショートカットキーのセットアップが完了しました。");