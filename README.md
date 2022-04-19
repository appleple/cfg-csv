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
Create a file to apply to the html file as follows. Prepare two forms to display and two forms for addition, and add the description 「class =" sortable-item item-template "style =" display: none; 」to the form for addition. Also, prepare an add button and add 「class =" item-insert "」.
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
            <!-- 表示されているフォーム -->
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
            <!-- 追加用のフォーム -->
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
                <td colspan="3">
                    <input type="button" class="item-insert" value="追加" />
                </td>
            </tr>
        </tfoot>
</table>
```
