'use strict';

var Service = require('mindbody-client').DataService;


exports.handler = (event, context, callback) => {

    var site = process.env.MB_SOURCE_SITE,     // MB site id
        keys = process.env.MB_SOURCE_KEYS;     // MB credentials

    var service = new Service(site, keys);

    console.log(`getting total client count for site ${site}`);

    service.getClientTotal()
        .then((total) => {
            callback(null, `${total} clients for site ${site}`);
        })
        .catch(callback);
};
