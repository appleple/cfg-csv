(function () {
  //ファイル選択ボタンを追加
  function csvButtonAdded(dom) {
    const refBtn = dom.querySelector('.item-insert');
    const parentTd = refBtn.parentElement;
    const label = document.createElement("label");
    //input type=fileタグ編集
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("name", "cfgCsv");
    input.setAttribute("class", "uploadFile");
    //inputタグにつけるlabel編集
    label.appendChild(input);
    label.setAttribute("class", "csvUpload");
    label.innerHTML += "CSVアップロード";
    parentTd.insertBefore(label, refBtn.nextSibling);
  }

  function uploadCsvEvent(dom) {
    // ファイルが選択されたら実行
    dom.querySelector(".uploadFile").addEventListener('change', function (e) {

      //ファイルを選択したときのファイル情報のオブジェクト
      const fileReader = new FileReader();
      const file = dom.querySelector(".uploadFile").files[0];
      const fileExtension = dom.querySelector(".uploadFile").value.split(".").pop();
      if (fileExtension !== "csv") {
        window.alert("選択されたファイルの形式が間違っています");
        return;
      }

      // ファイルの読み込みを行ったら実行
      fileReader.addEventListener('load', function (e) {
        //csvデータの中身を整えて配列にする関数
        function arrayCSV() {
          const fileDatas = e.target.result.split(/\r\n|\n/); // 改行を区切り文字として行を要素とした配列を生成
          const noEmptyFileDatas = fileDatas.filter(function (s) { // 空要素削除
            return s !== '';
          });
          return noEmptyFileDatas;
        }
        // arrayCSV関数の返り値を代入
        const noEmptyFileDatas = arrayCSV();
        // オブジェクトのkey要素取得
        const keys = noEmptyFileDatas[0].split(',');
        //name属性と比較するためcsvデータに[]を付与
        for (let i = 0; i < keys.length; i++) {
          keys[i] += "[]";
        }
        //csvデータ配列をオブジェクトにする
        function objectCSV() {
          //カンマごとに要素を区切って配列に格納
          const csvDatas = noEmptyFileDatas.map(rowOfFileData => rowOfFileData.split(','));
          //オブジェクトのkey要素削除
          csvDatas.splice(0, 1);
          //csvデータのオブジェクト生成
          const csvInfos = [];
          csvDatas.forEach((data, csvNumber) => {
            let csvGroup = {};
            keys.forEach((key, index) => {
              csvGroup[key] = csvDatas[csvNumber][index];
            })
            csvInfos.push(csvGroup);
          })
          return csvInfos;
        }
        // objectCSV関数の返り値を代入
        const csvInfos = objectCSV();
        const result = window.confirm(`選択した${file.name}のデータ${csvInfos.length}件を読み込みますか？`);
        //ファイル選択をクリア
        dom.querySelector(".uploadFile").value = "";
        if (result === false) {
          return;
        }
        //editingクラス削除
        function deleteClass() {
          const targetClassName = Array.from(dom.getElementsByClassName("editing"));
          if (!targetClassName === null) {
            targetClassName[0].classList.remove("editing");
          }
        }
        deleteClass();
        //複製元参照
        const contentArea = Array.from(dom.getElementsByClassName("item-template"));
        csvInfos.forEach((csvElement) => {
          //元々あったフォームの数情報
          const prevTd = Array.from(dom.getElementsByClassName("sortable-item"))
          prevTd.pop();
          //複製元の値操作と複製実行
          function CopySourceOperation() {
            //複製要素にitem-templateクラスをつけたくないため削除
            contentArea[0].classList.remove("item-template");
            //複製
            const cloneElement = contentArea[0].cloneNode(true);
            //item-templateを複制元に付与
            contentArea[0].classList.add("item-template");
            // 複製した要素の属性を編集
            return cloneElement;
          }
          // CopySourceOperation関数の返り値を代入
          const cloneElement = CopySourceOperation();
          //複製要素のdisplay:noneを削除
          cloneElement.removeAttribute("style");
          //複製した階層の値編集
          function EditFormAttribute() {
            //複製した要素の子孫要素編集
            const formElement = Array.from(cloneElement.querySelectorAll("input,select,textarea"));
            keys.forEach((key, index) => {
              formElement.forEach((form) => {
                form.removeAttribute("disabled");
                if (form.name === key) {
                  form.name = key.replace('[]', '[' + prevTd.length + ']');
                  if (form.nodeName === "INPUT") {
                    if (form.type === "text") {
                      form.value = Object.values(csvElement)[index];
                    } else if (form.type === "radio" || form.type === "checkbox") {
                      if (form.value === Object.values(csvElement)[index]) {
                        form.checked = true;
                      }
                    }
                  } else if (form.nodeName === "SELECT") {
                    //optionタグにselectedをつける編集
                    const optionElement = form.querySelectorAll("option");
                    optionElement.forEach((option) => {
                      if (option.value === Object.values(csvElement)[index]) {
                        option.selected = true;
                      }
                    })
                  } else if (form.nodeName === "TEXTAREA") {
                    form.value = Object.values(csvElement)[index];
                  }
                }
              })
            })
          }
          EditFormAttribute();
          contentArea[0].before(cloneElement);
        });
      });
      //指定されたファイルの内容を読み取り、完了後csvDatasプロパティにファイルの内容を文字列として格納
      fileReader.readAsText(e.target.files[0]);
    });
  }

  window.addEventListener('DOMContentLoaded', function () {
    const groups = document.querySelectorAll('.js-import-csv');
    if (groups.length > 0) {
      [].forEach.call(groups, function (group) {
        csvButtonAdded(group);
        uploadCsvEvent(group);
      });
    }
  });
})();
