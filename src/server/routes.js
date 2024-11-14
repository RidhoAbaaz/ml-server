const { getData } = require("../services/firestore");
const postImageHandler = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/predict',
        handler: postImageHandler,
        options: {
            payload: {
                maxBytes: 1000000,
                allow: 'multipart/form-data',
                multipart: true
            }
        }
    },
    {
        method: 'GET',
        path: '/predict/histories',
        handler: getData
    }
];

module.exports = routes;