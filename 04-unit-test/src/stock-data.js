'use strict';
YUI.add('stock-data', function(Y) {

/**
 * Stock data
 * A very simple module that provides data, along with a couple of method to manipulate it.
 */
(function (Y) {

    var CLASS_NAME = 'stock-data';

    /**
     * @constructor
     */
    function StockData() {
        StockData.superclass.constructor.apply(this, arguments);
    }

    Y.mix(StockData, {

        NAME: CLASS_NAME,

        ATTRS : {
            /**
             * Simple hard-coded array of objects for the stock
             * @type Array of objects
             */
            data: { value: [
                {
                    manufacturer: 'Suzuki',
                    model: 'DL650',
                    price: 4750.00,
                    year: 2013,
                    miles: 12200
                },
                {
                    manufacturer: 'Kawasaki',
                    model: 'ZX6R',
                    price: 2999.00,
                    year: 2003,
                    miles: 11000
                },
                {
                    manufacturer: 'Yamaha',
                    model: 'Tracer 900',
                    price: 8999.00,
                    year: 2016,
                    miles: 0
                },
                {
                    manufacturer: 'KTM',
                    model: '300 EXC',
                    price: 6000.00,
                    year: 2016,
                    miles: 2
                },
                {
                    manufacturer: 'KTM',
                    model: '200 EXC',
                    price: 5000.00,
                    year: 2016,
                    miles: 0
                },
                {
                    manufacturer: 'Yamaha',
                    model: 'XT225',
                    price: 800.00,
                    year: 1995,
                    miles: 11000
                }
            ] }
        }
    });

    Y.extend(StockData, Y.Base, {
        /**
         * get the data array
         * @return Array, the stock data
         */
        getData: function() {
            return this.get('data');
        },

        /**
         * Remove the bike at the specified index from stock
         * @param  integer index to remove
         * @return the updated data array
         */
        remove: function(index) {
            var data = this.get('data');
            if (!Y.Lang.isNumber(index)) {
                throw "Bad Argument (stock-data.remove): index is not a number";
            }

            if (index < 0) {
                throw "Bad Argument (stock-data.remove): index is a negative number";
            }

            if (index >= data.length) {
                throw "Bad Argument (stock-data.remove): index is a higher than the data length";
            }

            data = data.splice(index, 1);
            this.set('data', data);

            return data;
        },

        /**
         * Remove the bike at the specified index from stock
         * @param  integer index to remove
         * @return the updated data array
         */
        add: function(bike) {
            var data = this.get('data');
            if (!Y.Lang.isObject(bike)) {
                throw "Bad Argument (stock-data.add): bike is not an object";
            }

            if (!Y.Lang.isString(bike.manufacturer) || bike.model.manufacturer == 0) {
                throw "Bad Argument (stock-data.add): manufacturer is not a string";
            }

            if (!Y.Lang.isString(bike.model) || bike.model.length == 0) {
                throw "Bad Argument (stock-data.add): model is not a string";
            }

            if (!Y.Lang.isNumber(bike.year)) {
                throw "Bad Argument (stock-data.add): year is not a number";
            }

            if (!Y.Lang.isNumber(bike.miles)) {
                throw "Bad Argument (stock-data.add): miles is not a number";
            }
            if (!Y.Lang.isNumber(bike.price)) {
                throw "Bad Argument (stock-data.add): price is not a number";
            }

            data = data.push(data, 1);
            this.set('data', data);

            return data;
        }
    });

    Y.StockData = StockData;

}(Y));


}, '@VERSION@' ,{"requires":["base"]});
