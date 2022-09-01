window.addEventListener('DOMContentLoaded', function () {

  function deleteCSV() {
    if (window.confirm(`登録している情報を削除しますか？`)) {
      const sortableItems = document.querySelectorAll('.sortable-item:not(.item-template)');
      for (let index = 0; index < sortableItems.length; index += 1) {
        sortableItems[index].remove();
      }
    }
  }
  function CsvButtonAdded() {
    const refBtn = document.getElementsByClassName("item-insert")[0];
    const parentTd = refBtn.parentElement;
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("class", "csvDownload");
    deleteButton.setAttribute("id", "delete");
    deleteButton.innerHTML += "登録情報削除";
    parentTd.insertBefore(deleteButton, refBtn.nextElementSibling);
    deleteButton.addEventListener("click", deleteCSV, false);
  }
  CsvButtonAdded();
});
