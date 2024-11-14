const ts = require('@tensorflow/tfjs-node');

async function loadModel() {
    return ts.loadGraphModel(process.env.MODEL_URL);
}

module.exports = loadModel;