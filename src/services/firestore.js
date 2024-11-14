const { Firestore  } = require('@google-cloud/firestore');
const ClientError = require('../exceptions/ClientError');


async function storeData(id, data) {
    try {
        const db = new Firestore();
        const predictCollection = db.collection('predictions');
        return predictCollection.doc(id).set(data);
    } catch (error) {
        throw new ClientError('unable save data');
    }
}

const getData = async (request, h) => {
    const database = new Firestore();
    const collection = await database.collection('predictions').get();

    if (!collection) {
        throw new ClientError('gagal memuat database');
    }

    const data = collection.docs.map(doc => ({
        ...doc.data()
    }));

    return h.response({
        status: 'success',
        data: data
    });
}

module.exports = { storeData, getData };