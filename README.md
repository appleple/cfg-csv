# cfg-csv

[![GitHub license](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://raw.githubusercontent.com/appleple/document-outliner/master/LICENSE)

A utility that allows you to enter csv file data into a web form.

## Usage
Include the csvDownloa.js/csvImport.js/csvImport.css file in your site.
```html
<script src="/path/to/js/csvDownload.js"></script>
```
```html
<script src="/path/to/js/csvImport.js"></script>
```
```html
<link rel="stylesheet" href="/path/to/css/csvImport.css">
```

### Basic Standalone Usage
Below is a sample of the text form only.
Here are some notes. When creating the form you want to apply, create one form for display and one form for addition. Please describe 「class =" sortable-item item-template "style =" display: none; 」in the td tag of the form to be added. Also, prepare an add button and write 「class =" item-insert "」 in the input tag of that button.

Example (Text form only)
```html
<table>
        <thead>
            <tr>
                <th> </th>
                <th>xxx</th>
                <th>yyy</th>
                <th>zzz</th>
            </tr>
        </thead>
        <tbody>
            <!-- Please prepare a form to display -->
            <tr class="sortable-item">
                <td>
                    <i></i>
                </td>
                <td>
                    <input type="text" name="xxx[]"/>
                </td>
                <td>
                    <input type="text" name="yyy[]"/>
                </td>
                <td>
                    <input type="text" name="zzz[]"/>
                </td>
            </tr>
            <!-- Add the additional form like this. -->
            <tr class="sortable-item item-template" style="display:none;">
                <td>
                    <i></i>
                </td>
                <td>
                    <input type="text" name="xxx[]" value="" />
                </td>
                <td>
                    <input type="text" name="yyy[]" value="" />
                </td>
                <td>
                    <input type="text" name="zzz[]" value="" />
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
              <!--Prepare an additional button and describe the 「class="item-insert"」 in input type = "button"-->
                <td colspan="3">
                    <input type="button" class="item-insert" value="追加" />
                </td>
            </tr>
        </tfoot>
</table>
```

### Others
This feature also adapts to radio buttons, select boxes and text areas.

Example (For radio buttons, select boxes and text areas)
```html
<table>
  <thead>
    <tr>
      <th> </th>
      <th>Name</th>
      <th>Birthplace</th>
      <th>fee</th>
      <th>Option</th>
      <th>削除</th>
    </tr>
  </thead>
  <tbody>
    <tr class="sortable-item">
      <td>
        <i></i>
      </td>
      <td>
        <input type="text" name="name[]" value="" />
      </td>
      <td>
        <input type="text" name="from[]" value="" />
      </td>
      <td>
        <div>
          <input type="radio" name="fee[]" value="fee" id="input-radio-fee-fee" />
          <label for="input-radio-fee-fee">
            <i></i>交通費</label>
        </div>
      </td>
      <td>
        <textarea name="option[]"></textarea>
      </td>
      <td>
        <input type="button" class="item-delete" value="削除" />
      </td>
    </tr>
    <tr class="sortable-item item-template" style="display:none;">
      <td>
        <i></i>
      </td>
      <td>
        <input type="text" name="name[]" value="" />
      </td>
      <td>
        <input type="text" name="from[]" value="" />
      </td>
      <td>
        <div>
          <input type="radio" name="fee[]" value="fee" id="input-radio-fee-fee" />
          <label for="input-radio-fee-fee">
            <i></i>交通費</label>
        </div>
      </td>
      <td>
        <textarea name="option[]"></textarea>
      </td>
      <td>
        <input type="button" class="item-delete" value="削除" />
      </td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colSpan="6">
        <input type="button" class="item-insert" value="追加" />
      </td>
    </tr>
  </tfoot>
</table>
```
