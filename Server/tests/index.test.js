const app = require('../src/app');
const session = require('supertest');
const agent = session(app);

const arr = {
    id: 1,
    name: 'Rick Sanchez',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: {
        name: 'Earth (C-137)',
        url: 'https://rickandmortyapi.com/api/location/1',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
};

const arr2 = {
    id: 2,
    name: 'Morty Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Male',
    origin: {
        name: 'unknown',
        url: '',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/2.jpeg',
}

const arr3 = {
    id: 3,
    name: 'Summer Smith',
    status: 'Alive',
    species: 'Human',
    gender: 'Female',
    origin: {
        name: 'Earth (Replacement Dimension)',
        url: 'https://rickandmortyapi.com/api/location/20',
    },
    image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
}

describe("Test de RUTAS", () => {
    it("Responde con status: 200", async () => {
        let response = '';
        response = await session(app).get('/rickandmorty/login/');
        expect(response.statusCode).toBe(200);

        response = await session(app).post('/rickandmorty/fav/');
        expect(response.statusCode).toBe(200);

        response = await session(app).get('/rickandmorty/character/1');
        expect(response.statusCode).toBe(200);
    });
});

describe("GET /rickandmorty/character/:id", () => {
    it("Responde con status: 200", async () => {
        const response = await session(app).get('/rickandmorty/character/1');
        expect(response.statusCode).toBe(200);
    });
    it('Responde un objeto con las propiedades: "id", "name", "species", "gender", "status", "origin" e "image"', async () => {
        const response = await session(app).get('/rickandmorty/character/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(arr);
    });
    it("Si hay un error responde con status: 500", async () => {
        const response = await session(app).get('/rickandmorty/character/pepe');
        expect(response.statusCode).toBe(500);
    });
});

describe("GET /rickandmorty/login", () => {
    it('Responde un objeto con la propiedad: "access" = TRUE', async () => {
        const response = await session(app).get('/rickandmorty/login')
            .query({ user: 'erraticless@gmail.com', pass: '123456' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('access');
        expect(response.body.access).toBe(true);
    });

    it('Responde un objeto con la propiedad: "access" = FALSE', async () => {
        const response = await session(app).get('/rickandmorty/login')
            .query({ user: 'erraticless@gmail.om', pass: '123456' });
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('access');
        expect(response.body.access).toBe(false);
    });

});

describe("POST /rickandmorty/fav", () => {
    it('Debería devolver un arreglo con el elemento enviado en el body', async () => {
        const elementoEnviado = arr2;
        const response = await session(app)
            .post('/rickandmorty/fav')
            .send(elementoEnviado);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toContainEqual(elementoEnviado);
    });

    it('Debería devolver un arreglo que incluye un elemento enviado previamente', async () => {
        const primerElemento = arr;
        await session(app)
            .post('/rickandmorty/fav')
            .send(primerElemento);
        const segundoElemento = arr2;
        const response = await session(app)
            .post('/rickandmorty/fav')
            .send(segundoElemento);
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).toContainEqual(primerElemento);
        expect(response.body).toContainEqual(segundoElemento);
    });
});


describe("DELETE /rickandmorty/fav/:id", () => {
    it('Debería devolver un arreglo con los elementos existentes en caso de no encontrar el id', async () => {
        const nuevoFav1 = arr;
        const nuevoFav2 = arr2;
        const nuevoFav3 = arr3;
        let response = '';
        response = await session(app)
            .post('/rickandmorty/fav')
            .send(nuevoFav1);
        response = await session(app)
            .post('/rickandmorty/fav')
            .send(nuevoFav2);
        response = await session(app)
            .post('/rickandmorty/fav')
            .send(nuevoFav3);
        response = await session(app)
            .delete('/rickandmorty/fav/4')

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it('Debería devolver un arreglo con los elementos existentes, menos el eliminado', async () => {
        const nuevoFav1 = arr;
        const nuevoFav2 = arr2;
        const nuevoFav3 = arr3;
        let response = '';
        response = await session(app)
            .post('/rickandmorty/fav')
            .send(nuevoFav1);
        response = await session(app)
            .post('/rickandmorty/fav')
            .send(nuevoFav2);
        response = await session(app)
            .post('/rickandmorty/fav')
            .send(nuevoFav3);
        response = await session(app)
            .delete('/rickandmorty/fav/2')

        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        expect(response.body).not.toContainEqual(2);
    });
});
