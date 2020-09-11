const request = require('supertest');
const jwt = require('jwt-simple');
const app = require('../../src/app');

let user;

beforeAll(async () => {
    const res = await app.services.users.save({name: 'User Account', email: `${Date.now()}@mail.com`, password: '1234'})
    user = { ...res[0]};
    user.token = jwt.encode(user, 'Segredo!');
});

test('Deve listar todos os usuários', () => {
    return request(app).get('/users') 
    .set('authorization', `bearer ${user.token}`)
    .then((res) => {
        expect(res.status).toBe(200);
        expect(res.body.length).toBeGreaterThan(0);
    });
});

// test('Deve inserir usuário com sucesso', () => {
//     return request(app).post('/users')
//     .send( { name: 'testehash' , email: 'loli@gmail.com', password: '123456'})
//     .then((res) => {
//         expect(res.status).toBe(201);
//     });
// });

// test('Deve armazenar senha criptografada', async() => {
//     const res = await request(app).post('/users')
//         .send( { name: 'lolii' , email: 'lolii@gmail.com', password: '123'})
//         expect(res.status).toBe(201);

//         const { Id } = res.body;
//         const userDB = await app.services.users.findOne({Id});
//         expect(userDB.password).not.toBeUndefined();
//         expect(userDB.password).not.toBe('123');
// });    

// test('Não deve inserir usuario sem nome', () => {
//     return request(app).post('/users')
//         .send( { email: 'walter@gmail.com', password: '123456'})
//         .then((res) => {
//             expect(res.status).toBe(400);
//             // expect(res.body.error).toBe('Nome é uma propriedade obrigatória.');
//         });
// });

// test('nao deve inserir usuario sem senha', (done) => {
//     request(app).post('/users')
//         .send({name: 'walter', email: 'ola@gmail.com'})
//         .then((res) => {
//             expect(res.status).toBe(400);
//             expect(res.body.error).toBe('Senha é uma propriedade obrigatória');
//             done();
//         });
// });

// test('nao deve inserir usuario com email existente', () => {
//     const email = `${Date.now()}@gmail.com`;
//     request(app).post('/users')
//         .send( {name: 'loli', email: 'gui@gmail.com', password: '1234'})
//         .then((res) => {
//             expect(res.status).toBe(400);
//             expect(res.body.error).toBe('Email já existe');
//         });
// });