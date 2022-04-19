window.addEventListener('DOMContentLoaded', function () {
    //ファイル選択ボタンを追加
    function CsvButtonAdded() {
      const refBtn = document.getElementsByClassName("item-insert")[0];
      const parentTd = refBtn.parentElement;
      const downloadButton = document.createElement("button");
      downloadButton.setAttribute("type", "button");
      downloadButton.setAttribute("class", "csvDownload");
      downloadButton.setAttribute("id", "download");
      downloadButton.innerHTML += "CSVダウンロード";
      parentTd.insertBefore(downloadButton, refBtn.nextElementSibling);
    }
    CsvButtonAdded();
    //ACMS.addListener("acmsDispatch", function() {
      function perseFormDatas() {
        const preElement = Array.from(document.querySelectorAll(".sortable-item"));
        preElement.pop();
        //すべてを格納する配列
        const prevFormDatas = [];
        //もともとのフォームのキー
        const keys = [];
        preElement.forEach((prev, i) => {
          const preform = prev.querySelectorAll("input,select,textarea");
          //一つのフォームごとの入力値を格納する配列
          const formValue = [];
          preform.forEach((form) => {
            const attribute = form.getAttribute("name")
            if (attribute != null) {
              //[]削除、キー格納
              const key = attribute.replace(`[]`, '');
              keys.push(key);
              if (form.nodeName === "INPUT") {
                if (form.type === "radio") {
                  if (form.checked === true) {
                    formValue.push(form.value);
                  }
                } else if (form.type === "checkbox") {
                  if (form.checked === true) {
                    formValue.push(form.value);
                  } else {
                    formValue.push("");
                  }
                } else {
                  formValue.push(form.value)
                }
              } else if (form.nodeName === "SELECT") {
                const optionElement = form.querySelectorAll("option");
                optionElement.forEach((option) => {
                  if (option.selected) {
                    formValue.push(option.value);
                  }
                })
              } else if (form.nodeName === "TEXTAREA") {
                formValue.push(form.value);
              }
            }
          })
          prevFormDatas.push(formValue)
        })
        const items = keys.filter(function (x, i, self) {
          return self.indexOf(x) === i;
        });
        prevFormDatas.unshift(items);
        return prevFormDatas;
      }
      const items = perseFormDatas();
      function downloadCSV() {
        //ダウンロードするCSVファイル名を指定する
        const filename = "download.csv";
        //CSVデータ
        const data = `${items.join('\n')}`;
        //BOMを付与する（Excelでの文字化け対策）
        const bom = new Uint8Array([0xef, 0xbb, 0xbf]);
        //Blobでデータを作成する
        const blob = new Blob([bom, data], { type: "text/csv" });
  
        //IE10/11用(download属性が機能しないためmsSaveBlobを使用）
        if (window.navigator.msSaveBlob) {
          window.navigator.msSaveBlob(blob, filename);
          //その他ブラウザ
        } else {
          //BlobからオブジェクトURLを作成する
          const url = (window.URL || window.webkitURL).createObjectURL(blob);
          //ダウンロード用にリンクを作成する
          const download = document.createElement("a");
          //リンク先に上記で生成したURLを指定する
          download.href = url;
          //download属性にファイル名を指定する
          download.download = filename;
          //作成したリンクをクリックしてダウンロードを実行する
          download.click();
          //createObjectURLで作成したオブジェクトURLを開放する
          (window.URL || window.webkitURL).revokeObjectURL(url);
        }
      }
      //ボタンを取得する
      const download = document.getElementById("download");
      //ボタンがクリックされたら「downloadCSV」を実行する
      download.addEventListener("click", downloadCSV, false);
  
    //});
  });
  