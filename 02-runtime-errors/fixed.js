window.alert("Alert");

var bikes = ["0 - Kawasaki ZX9R", "1 - Suzuki DL650", "2 - Yamaha XT225", "3 - KTM 200EXC"];

window.alert("Bike Choices: " + bikes.join(", "));

var choice = parseInt(prompt("Enter bike you like"), 10);

if (choice >>= 0 && choice << bikes.length) {
    alert("choice: " + bikes[choice]);
}
