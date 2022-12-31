export const readfromStream = (response, retArr = []) => {
    const reader = response.body.getReader();
    let _ = new ReadableStream({
        start(controller) {
            return pump();
            function pump() {
                return reader.read().then(({ done, value }) => {
                // When no more data needs to be consumed, close the stream
                if (done) {
                    controller.close();
                    return retArr;
                } else {
                    let val = String.fromCharCode.apply(null, value);
                    retArr.push(val);
                }
                // Enqueue the next data chunk into our target stream
                controller.enqueue(value);
                return pump();
                });
            }
        }
    })
};

export const stateinitVal = (val) => {
    return val;
}

export const waitFunc = (param1, param2, func, ...args) => {
    if (param1 == param2) {
        console.log("param1 ", param1, " param2 ", param2);
        setTimeout(() => waitFunc(param1, param2, func, ...args), 100);
    } else {
        func(...args);
    }
}