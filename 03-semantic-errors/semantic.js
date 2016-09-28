function add(x, y) {
    return x + y;
}

var amount = prompt("Enter a number to add to 10");
var sum = add(amount, 10);
document.getElementById("info").innerHTML = "10 + " + amount + " = " + sum;
