const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server'); // Asegúrate de exportar la app en server.js
const should = chai.should();

chai.use(chaiHttp);

describe('Events', () => {
    // Aquí se agregan los tests para cada función del controlador
});
