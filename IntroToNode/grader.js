function average(scores) {
    var sumTotal = 0;
    for (var i = 0; i < scores.length; i++) {
        sumTotal += scores[i];
    }
    return sumTotal / scores.length;
}

var scores = [90, 98, 89, 100, 100, 86, 94];
var scores2 = [40, 65, 77, 82, 80, 54, 73, 63, 95, 49];

console.log(Math.round(average(scores)));
console.log(Math.round(average(scores2)));