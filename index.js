'use strict';

/*
 * Toki Reference Implementation using Hapi
 *
 * We need to first setup a Hapi server as normal. We can use tools like Glue here as well,
 * but for ease we're going to do it manually.
 *
 * Then we import our webserver appropriate bridge module.
 * It's important that we still install toki locally, even though we don't explicitly require it in.
 * This lets us have version control over it while still letting the bridge module do the actual work.
 *
 * We setup a logger here as well (using winston). This isn't required, but it provides a lot more visibility.
 * We can pass any log4j compliant logger (ie an object that exposes at least info/error methods) here.
 * If we don't pass a logger, Toki will still work, just silently.
**/
const hapi = require('hapi'); //our webserver
//we bring in the bridge, not toki. The bridge will setup toki as needed for our webserver.
const toki = require('toki-hapi-bridge');
const logger = require('winston'); //we're going to use this for a logger, but any standard one will do

const server = new hapi.Server(); //we create a new hapi server just like normal

server.connection({ //and we're going to give it an explicit configuraton here
    host: 'localhost',
    port: 5000
});

//here we connect our toki bridge just like any other server plugin,
//and we can optionally pass in our logger instance
server.register({register: toki, options: { logger } });

server
.start() //start our server
.then( () => logger.info('Server up!')) //let us know it's up
.catch( (e) => logger.error(e) ); //or if things don't go well
