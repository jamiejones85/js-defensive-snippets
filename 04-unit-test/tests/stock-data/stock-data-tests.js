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
        },

        "Remove called with negative index": function() {
        },

        "Remove called with no index": function() {
        },

        "Remove called with object index": function() {
        },

        "Remove called with index too high": function() {
        },

        "Remove called with success": function() {
        }

    }));

    Y.Test.Runner.setName(componentName + " Tests");
    Y.Test.Runner.add(suite);

    Y.Test.Runner.run();
});
