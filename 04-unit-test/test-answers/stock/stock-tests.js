YUI({useBrowserConsole: true}).use('test', 'console', 'stock', 'node-event-simulate', function (Y) {

    window.Y = Y;

    var componentName = 'Stock',
        suite = new Y.Test.Suite(componentName + " Tests"),
        Assert = Y.Assert,
        stockWidget = null,
        mockDataSource = null;
    // ... tests happen

    new Y.Console({
        id: "console",
        width: "95%",
        height: "90%",
        verbose: true,
        printTimeout: 0,
        newestOnTop: false,
        useBrowserConsole: true
    }).render(Y.Node.one('#consoleContainer'));

    suite.add(new Y.Test.Case({
        name: componentName + " Tests",

        setUp: function() {
             mockDataSource = Y.Mock();
             stockWidget = new Y.Stock({ stockDataSource: mockDataSource });
        },

        tearDown: function() {
            // Empty
            stockWidget.destroy();
        },

        /**
         * Test the Widget renders correctly with no data
         */
        "Test Stock Renders No Stock": function () {

            Y.Mock.expect(mockDataSource, {
                method: "getData",
                returns: []
            });

            //render the stock widget
            stockWidget.render(Y.Node.one('#stock'));

            //check the no stock message
            Y.Assert.isNotNull(Y.Node.one('tr.no-stock'));
            //verify the expectations were met
            Y.Mock.verify(mockDataSource);
        },

        /**
         * Test the Widget renders correctly with data
         */
        "Test Stock Renders List": function () {
            var firstRowNode;

            Y.Mock.expect(mockDataSource, {
                method: "getData",
                returns: [{
                    manufacturer: 'Suzuki',
                    model: 'DL650',
                    price: 4750.00,
                    year: 2013,
                    miles: 12200
                }]
            });

            //render the stock widget
            stockWidget.render(Y.Node.one('#stock'));

            firstRowNode = Y.Node.one('tbody tr:first-child')

            //check the rendering
            Y.Assert.areEqual("Suzuki", firstRowNode.one('.manufacturer').get('text'));
            Y.Assert.areEqual("DL650", firstRowNode.one('.model').get('text'));
            Y.Assert.areEqual(2013, firstRowNode.one('.year').get('text'));
            Y.Assert.areEqual(4750.00, firstRowNode.one('.price').get('text'));
            Y.Assert.areEqual(12200, firstRowNode.one('.miles').get('text'));

            //verify the expectations were met
            Y.Mock.verify(mockDataSource);
        },

        /**
         * Test the Widget renders correctly when a sold button is hit
         */
        "Test Stock Sold Button": function () {
            var soldButton;

            Y.Mock.expect(mockDataSource, {
                method: "getData",
                returns: [{
                    manufacturer: 'Suzuki',
                    model: 'DL650',
                    price: 4750.00,
                    year: 2013,
                    miles: 12200
                }]
            });

            //expect remove to be called on the mock with argument 0
            Y.Mock.expect(mockDataSource, {
                method: "remove",
                args: [0],
                returns: []
            });

            //render the stock widget
            stockWidget.render(Y.Node.one('#stock'));

            soldButton = Y.Node.one('tbody tr:first-child .sold');
            soldButton.simulate("click");

            //check the no stock message
            Y.Assert.isNotNull(Y.Node.one('tr.no-stock'));

            //verify the expectations were met
            Y.Mock.verify(mockDataSource);
        },

        /**
         * Test the Widget renders correctly when a sold button is hit
         */
        "Test Stock Add Button": function () {
            var footerRowNode, firstRowNode, addButton;

            Y.Mock.expect(mockDataSource, {
                method: "getData",
                returns: []
            });

            //expect remove to be called on the mock with argument 0
            Y.Mock.expect(mockDataSource, {
                method: "add",
                args: [Y.Mock.Value.Object],
                returns: [{
                    manufacturer: 'Suzuki',
                    model: 'DL650',
                    price: 4750.00,
                    year: 2013,
                    miles: 12200
                }]
            });

            //render the stock widget
            stockWidget.render(Y.Node.one('#stock'));

            footerRowNode = Y.Node.one('tfoot tr:first-child');

            footerRowNode.one('#manufacturer').set('value', 'Suzuki');
            footerRowNode.one('#model').set('value', 'DL650');
            footerRowNode.one('#price').set('value', 4750.00);
            footerRowNode.one('#year').set('value', 2013);
            footerRowNode.one('#miles').set('value', 12200);

            addButton= footerRowNode.one('.add');
            addButton.simulate('click');

            firstRowNode = Y.Node.one('tbody tr:first-child')

            //check the rendering
            Y.Assert.areEqual("Suzuki", firstRowNode.one('.manufacturer').get('text'));
            Y.Assert.areEqual("DL650", firstRowNode.one('.model').get('text'));
            Y.Assert.areEqual(2013, firstRowNode.one('.year').get('text'));
            Y.Assert.areEqual(4750.00, firstRowNode.one('.price').get('text'));
            Y.Assert.areEqual(12200, firstRowNode.one('.miles').get('text'));

            //verify the expectations were met
            Y.Mock.verify(mockDataSource);
        },


    }));

    Y.Test.Runner.setName(componentName + " Tests");
    Y.Test.Runner.add(suite);

    Y.Test.Runner.run();
});
