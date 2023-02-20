(function () {
  function csvButtonAdded(target) {
    const refBtn = target.querySelector('.item-insert');
    const parentTd = refBtn.parentElement;
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("type", "button");
    deleteButton.setAttribute("class", "csvDelete");
    deleteButton.innerHTML += "登録情報削除";
    parentTd.insertBefore(deleteButton, refBtn.nextElementSibling);
    deleteButton.addEventListener('click', function (e) {
      e.preventDefault();
      deleteCSV(target);
    });
  }

  function deleteCSV(target) {
    if (window.confirm(`登録している情報を削除しますか？`)) {
      const sortableItems = target.querySelectorAll('.sortable-item:not(.item-template)');
      for (let index = 0; index < sortableItems.length; index += 1) {
        sortableItems[index].remove();
      }
    }
  }

  window.addEventListener('DOMContentLoaded', function () {
    const groups = document.querySelectorAll('.js-import-csv');
    if (groups.length > 0) {
      [].forEach.call(groups, function (group) {
        csvButtonAdded(group);
      });
    }
  });  
})();