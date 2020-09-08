let i = 0;
setInterval(function () {
    i++;
    console.log(this._onTimeout.toString());
    if (i === 5) {
        clearInterval(this);
    }
}, 2000);