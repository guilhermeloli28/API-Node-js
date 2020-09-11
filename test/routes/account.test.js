const request = require('supertest');
const app = require('../../src/app');
const jwt = require('jwt-simple');
const MAIN_ROUTE = '/accounts';
let user;

// beforeAll(async () => {
//     const res = await app.services.users.save({name: 'Teste', email: `${Date.now()}@mail.com`, password: '1234'})
//     user = { ...res[0]};
//     user.token = jwt.encode(user, 'Segredo!');
// });

// test('Deve inserir uma conta com sucesso', () => {
//     return request(app).post(MAIN_ROUTE)
//         .send( {name: 'ADM', user_id: user.Id})
//         .then((result) => {
//             expect(result.status).toBe(200);
//             expect(result.body.name).toBe('ADM');
//         });
// });

// test('Deve listar todas as contas', () => {
//     return app.db('accounts')
//         .insert({ name: 'Acc list', user_id: user.Id})
//         .then(() => request(app).get(MAIN_ROUTE).set('authorization', `bearer ${user.token}`))
//         .then((res) => {
//             expect(res.status).toBe(200);
//             expect(res.body.length).toBeGreaterThan(0);
//         });
// });

// test('Deve retornar uma conta pelo Id', () => {
//     return app.db('accounts')
//         .insert({ name: 'User By Id', user_id: user.Id}, ['id'])
//         .then(acc => request(app).get(`${MAIN_ROUTE}/${acc[0].id}`))
//         .then((res) => {
//             expect(res.status).toBe(200);
//             expect(res.body.name).toBe('User By Id');
//             expect(res.body.user_id).toBe(user.Id);
//         }); 
// });

// test('Deve alterar uma conta', () => {
//     return app.db('accounts')
//         .insert({ name: 'User teste', user_id: user.Id}, ['id'])
//         .then(acc => request(app).put(`${MAIN_ROUTE}/${acc[0].id}`)
//         .send({ name: 'User teste funfou'}))
//         .then((res) => {
//             expect(res.status).toBe(200);
//             expect(res.body.name).toBe('User teste funfou');
//         });
// });

// test('Não deve inserir conta sem nome', () => {
//     return request(app).post(MAIN_ROUTE)
//         .send( {user_id: user.Id})
//         .then((result) => {
//             expect(result.status).toBe(400);
//             expect(result.body.error).toBe('Nome é um atributo obrigatório');
//         });
// });