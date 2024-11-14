const tf = require('@tensorflow/tfjs-node');
const InputError = require('../exceptions/InputError');

async function predictCancer(model, image) {
    try {
        const data = tf.node
        .decodeJpeg(image)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .expandDims();

        const prediction = model.predict(data);
        const score = await prediction.data();
        const value = Math.max(...score) * 100;


        let suggestion, result;

        if (value > 50) {
            result = 'Cancer';
            suggestion = 'Segera periksa ke dokter!';
        }

        if (value < 50) {
            result = 'Non-cancer';
            suggestion = 'Penyakit kanker tidak terdeteksi.';
        }

    return { suggestion, result };
    } 
    catch (error) {
        throw new InputError('Terjadi kesalahan dalam melakukan prediksi');
    }
}

module.exports = predictCancer;