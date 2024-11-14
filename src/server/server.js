const Hapi = require('@hapi/hapi');
const routes = require('./routes');
const InputError = require('../exceptions/InputError');
const loadModel = require('../services/loadModel');
require('dotenv').config();

const init = async () => {
    const server = Hapi.Server({
        port: 3000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
                origin: ['*']
            }
        },
    });

    const model = await loadModel();
    server.app.model = model;

    server.route(routes);
    server.ext('onPreResponse', function (request, h) {
        const response = request.response;

        if (response instanceof InputError) {
            const newResponse = h.response({
                status: 'fail',
                message: response.message
            })
            newResponse.code(response.statusCode);
            return newResponse;
        }

        if (response.isBoom) {
            const newResponse = h.response({
                status: 'fail',
                message: response.message
            })
            newResponse.code(response.output.statusCode);
            return newResponse;
        }

        return h.continue;
    });

    await server.start();
    console.log(`server berjalan pada ${server.info.uri}`);
}


init();