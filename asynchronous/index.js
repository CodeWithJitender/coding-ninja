function timer() {
  for (let i = 1; i <= 5; i++) {
    let time = i * 1000;
    setTimeout(function () {
      console.log(i);
    }, time);
  }
}
timer();

// Do not edit the rest of the code
