YUI.add('stock', function(Y) {

/**
 * A widget for stock
 */
(function (Y) {

    var CLASS_NAME = 'stock',
        CONTENT_BOX = 'contentBox',
        ROW_TEMPLATE = (function () {
            return [
                '<tr>',
                    '<td>{manufacturer}</td>',
                    '<td>{model}</td>',
                    '<td>{year}</td>',
                    '<td>{miles}</td>',
                    '<td>{price}</td>',
                    '<td><button value="{index}" class="sold">Sold</button></td>',
                '</tr>'
            ].join("\n");
        }()),
        TEMPLATE = (function () {
            return [
                '<div class="stock">',
                    '<table>',
                        '<thead>',
                        '<tr>',
                            '<th>Manufacturer</th>',
                            '<th>Model</th>',
                            '<th>Year</th>',
                            '<th>Miles</th>',
                            '<th>Price</th>',
                            '<th>&nbsp;</th>',
                        '</tr>',
                        '</thead>',
                        '<tbody>',
                        '</tbody>',
                        '<tfoot>',
                            '<tr>',
                                '<th><input type="text" id="manufacturer" /></th>',
                                '<th><input type="text" id="model" /></th>',
                                '<th><input type="text" id="year" /></th>',
                                '<th><input type="text" id="miles" /></th>',
                                '<th>&pound;<input type="text" id="price" /></th>',
                                '<th><button class="add">Add</button></th>',

                            '</tr>',
                        '</tfoot>',
                    '</table>',
                '</div>'
            ].join("\n");
        }());

    /**
     * @constructor
     */
    function Stock() {
        Stock.superclass.constructor.apply(this, arguments);
    }

    Y.mix(Stock, {

        NAME: CLASS_NAME,

        ATTRS : {
            stockDataSource: { value: null }
        }
    });

    Y.extend(Stock, Y.Widget, {


        renderUI: function () {
            var html = TEMPLATE ;
            this.get(CONTENT_BOX).setHTML(html);
            this._renderTableContents();
        },

        bindUI: function() {
            var table = this.get(CONTENT_BOX).one('table');

            table.delegate('click', Y.bind(this._soldClickHandler, this), '.sold');
            table.delegate('click', Y.bind(this._addClickHandler, this), '.add');

        },

        _renderTableContents: function() {
            var data = this.get('stockDataSource').getData(),
            tbodyNode = this.get(CONTENT_BOX).one('table tbody');
            tbodyNode.get('childNodes').destroy(true);

            Y.Array.each(data, function(item, index) {
                this._addTableRow(item, index);
            }, this);
        },

        _addTableRow: function(bike, index) {
            var html = ROW_TEMPLATE,
            tbodyNode = this.get(CONTENT_BOX).one('table tbody'),
            rowNode;

            html = Y.Lang.sub(html, bike);
            html = Y.Lang.sub(html, { index: index })
            rowNode = Y.Node.create(html);
            tbodyNode.appendChild(rowNode);
        },

        _soldClickHandler: function(e) {
            var index = parseInt(e.currentTarget.get('value'), 10);
            try {
                this.get('stockDataSource').remove(index);
                e.currentTarget.ancestors('tr').remove();
            } catch(ex) {
                //show error message
                alert(ex);
            }
        },

        _addClickHandler: function() {
            var stockDataSource = this.get('stockDataSource'),
                contentBox = this.get(CONTENT_BOX),
                newIndex,
                bike = {
                    manufacturer: contentBox.one('input#manufacturer').get('value'),
                    model: contentBox.one('input#model').get('value'),
                    year: parseInt(contentBox.one('input#year').get('value'), 10),
                    miles: parseInt(contentBox.one('input#miles').get('value'), 10),
                    price: parseInt(contentBox.one('input#price').get('value'), 10)
                };

            try {
                newIndex = stockDataSource.add(bike).length;
                this._addTableRow(bike, newIndex);
                contentBox.one('input#manufacturer').set('value', '');
                contentBox.one('input#model').set('value', '');
                contentBox.one('input#year').set('value', '');
                contentBox.one('input#miles').set('value', '');
                contentBox.one('input#price').set('value', '');
            } catch(ex) {
                alert(ex);
            }
        }
    });

    Y.Stock = Stock;

}(Y));


}, '@VERSION@', {"requires":["widget", "node", "oop"]});
