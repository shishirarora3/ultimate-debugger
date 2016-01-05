function runningFormatter(value, row, index) {
    return index;
}
(function ($) {
    /**
     * data - array of record
     * hidecolumns, array of fields to hide
     * usage : $("selector").generateTable(json, ['field1', 'field5']);

     */
    'use strict';
    $.fn.generateTable = function (data, showColumns) {
        if ($.isArray(data) === false) {
            console.log('Invalid Data');
            return;
        }
        var container = $(this),
            table = $('<table data-toggle="table" data-sort-order="desc" data-show-refresh="true" data-show-toggle="true" data-show-columns="true" data-toolbar="#toolbar">'),
            tableHead = $('<thead>'),       
            tblHeaderRow = $('<tr>');       
        tblHeaderRow.append($('<th data-formatter="runningFormatter">Index</th>'));
        $.each(data, function (index, value) {
            var tableRow = $('<tr>').addClass(index%2 === 0 ? 'even' : 'odd');

            $.each(value, function (key, val) {
                if (index == 0 && $.inArray(key, showColumns) !== -1 ) { 
                    var jTh = $('<th data-sortable="true">');
                    jTh.attr('data-field', key.toLowerCase())
                    var theaddata = jTh.text(key);

                     tblHeaderRow.append(theaddata); 
                }
                /*if ($.inArray(key, hidecolumns) <= -1 ) {
                    var tbodydata = $('<td>').text(val);
                    tableRow.append(tbodydata);     
                }*/
            });
            //$(tableBody).append(tableRow);  
        });
        $(tblHeaderRow).appendTo(tableHead);
        tableHead.appendTo(table);      
        //tableBody.appendTo(table);
        $(this).append(table);
        
        return this;
    };

})(jQuery);