const app = require('../src/app');
const session = require('supertest');
const agent = session(app);
const { Videogame } = require('../src/DB_connection');

describe("Testear RUTAS", () => {
    it("Responde con status: 200", async () => {
        let response = '';
        response = await session(app).get('/videogames/');
        expect(response.statusCode).toBe(200);
        response = await session(app).get('/videogames/videogames/?source=1');
        expect(response.statusCode).toBe(200);
    });
});

describe("Obtener videojuego por nombre", () => {
    it("Responde con status: 200", async () => {
        const response = await session(app).get('/videogames/videogames/?source=1')
            .query({ search: "Marvel's Spider-Man Remastered" });
        expect(response.statusCode).toBe(200);
    });
    it('Responde un array de objetos con las propiedades del videojuego de la API', async () => {
        const response = await session(app).get('/videogames/videogames/?source=2')
            .query({ search: "Marvel's Spider-Man Remastered" });
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toBeInstanceOf(Array);
    });
    it('Responde un array vacío cuando no hay coincidencias de nombre', async () => {
        const response = await session(app).get('/videogames/videogames/?source=2')
            .query({ search: "qwz" });
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toEqual([]);
    });
});

describe("Obtener videojuego por ID", () => {
    it("Responde con status: 200", async () => {
        const response = await session(app).get('/videogames/videogames/3498');
        expect(response.statusCode).toBe(200);
    });
    it('Responde un array de objetos con las propiedades del videojuego de la API', async () => {
        const response = await session(app).get('/videogames/videogames/3498');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toBeInstanceOf(Array);
    });
    it('Responde un array vacío cuando no hay coincidencias de ID', async () => {
        const response = await session(app).get('/videogames/videogames/22222222');
        expect(response.statusCode).toBe(200);
        const responseBody = JSON.parse(response.text);

        expect(responseBody).toBe("Request failed with status code 404");
    });
});


describe('Crear un videojuego', () => {
    it('Crea un registro en la tabla Videogames', async () => {
        const nuevoVideogame = {
            name: "Juego nuevo de prueba",
            description: "Descripción del juego",
            image: "https://res.cloudinary.com/dvptbowso/image/upload/v1699135564/PI_Videogames/Face_pv1j2j.jpg",
            released_date: "2023-11-06",
            rating: "4.5",
            genre: ["Action", "Racing"],
            platform: ["macOS", "PC", "Nintendo Switch", "Wii"],
        };
        const response = await session(app)
            .post('/videogames/videogames')
            .send(nuevoVideogame);
        expect(response.status).toBe(200);
    });
    it('Responde un array de objetos con las propiedades del videojuego creado en la BD', async () => {
        const response = await session(app).get('/videogames/videogames/?source=1')
            .query({ search: "Juego nuevo de prueba" });
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toBeInstanceOf(Array);
    });

});
