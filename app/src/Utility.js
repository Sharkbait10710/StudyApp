export const readfromStream = (response) => {
    const reader = response.body.getReader();
    return new ReadableStream({
        start(controller) {
            return pump();
            function pump() {
                return reader.read().then(({ done, value }) => {
                // When no more data needs to be consumed, close the stream
                if (done) {
                    controller.close();
                    return;
                } else {
                    console.log(String.fromCharCode.apply(null, value));
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