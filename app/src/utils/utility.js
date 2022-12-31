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