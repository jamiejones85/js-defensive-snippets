YUI({useBrowserConsole: true}).use('test', 'console', 'stock', 'node-event-simulate', function (Y) {

    window.Y = Y;

    var componentName = 'Stock',
        suite = new Y.Test.Suite(componentName + " Tests"),
        Assert = Assert,
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
        },

        /**
         * Test the Widget renders correctly with data
         */
        "Test Stock Renders List": function () {
        },

        /**
         * Test the Widget renders correctly when a sold button is hit
         */
        "Test Stock Sold Button": function () {
        },

        /**
         * Test the Widget renders correctly when a sold button is hit
         */
        "Test Stock Add Button": function () {
        }


    }));

    Y.Test.Runner.setName(componentName + " Tests");
    Y.Test.Runner.add(suite);

    Y.Test.Runner.run();
});
