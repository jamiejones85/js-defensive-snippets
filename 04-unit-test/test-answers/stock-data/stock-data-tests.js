YUI({useBrowserConsole: true}).use('test', 'console', 'stock-data', function (Y) {

    window.Y = Y;

    var componentName = 'Stock Data',
        suite = new Y.Test.Suite(componentName + " Tests"),
        Assert = Y.Assert;
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

        _should: {
            error: {
                "Remove called with negative index": "Bad Argument (stock-data.remove): index is a negative number",
                "Remove called with no index": "Bad Argument (stock-data.remove): index is not a number",
                "Remove called with object index": "Bad Argument (stock-data.remove): index is not a number",
                "Remove called with index too high": "Bad Argument (stock-data.remove): index is a higher than the data length"
            }
        },

        "Get Data": function() {
            var stockData = new Y.StockData();
            var data = stockData.getData();
            Assert.areEqual("Suzuki", data[0].manufacturer);
        },

        "Remove called with negative index": function() {
            var stockData = new Y.StockData();
            stockData.remove(-1);
        },

        "Remove called with no index": function() {
            var stockData = new Y.StockData();
            stockData.remove();
        },

        "Remove called with object index": function() {
            var stockData = new Y.StockData();
            stockData.remove({ t: 4});
        },

        "Remove called with index too high": function() {
            var stockData = new Y.StockData();
            stockData.remove(50);
        },

        "Remove called with success": function() {
            var stockData = new Y.StockData();
            var dataSize = stockData.getData().length;
            var data = stockData.remove(1);

            Assert.areEqual(dataSize - 1, data.length);
        }


    }));

    Y.Test.Runner.setName(componentName + " Tests");
    Y.Test.Runner.add(suite);

    Y.Test.Runner.run();
});
