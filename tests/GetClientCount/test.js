'use strict';

const test = require('tape');
const lambda = require('../../functions/GetClientCount/index.js');


test('lambda response', (t) => {

    const event = {
        foo: 'bar'
    };

    const callback = (err, response) => {

        console.log(response)
        t.equals(response, '10238 clients for site 2058');
    };

    lambda.handler(event, null, callback);
    t.end();
});
