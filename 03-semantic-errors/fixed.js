function add(x, y) {
    if (typeof(x) != "number" || typeof(y) != "number") {
        return(Number.NaN)
    }
    return x + y;
}

function getUserValue() {
    var amount = prompt("Enter a number to add to 10");
    return parseInt(amount, 10);
}
var amount = getUserValue();
var sum = add(amount, 10);
document.getElementById("info").innerHTML = "10 + " + amount + " = " + sum;
