const { storeData } = require("../services/firestore");
const predictCancer = require("../services/inference");
const crypto = require('crypto');

async function postImageHandler(request, h) {
    const { image } = request.payload;
    const createAt = new Date().toISOString();
    const { model } = request.server.app;
    const id = crypto.randomUUID();

    const { result, suggestion } = await predictCancer(model, image);

    const data = {
        id, result, suggestion, createAt,
    }

    await storeData(id, data);

    return h.response({
        status: 'success',
        message: 'Model is predicted successfully',
        data,
    }).code(201); 
}

module.exports = postImageHandler;