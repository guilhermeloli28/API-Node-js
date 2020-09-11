const request = require('supertest');
const app = require('../../src/app');

// test('Receber token ao logar', () => {
//     const email = `${Date.now()}@mail.com`;

//     return app.services.users.save( 
//         {name: 'ADM', email, password: '123456'}
//     )
//     .then(() => request(app).post('/auth/signin')
//         .send( {email , password: '123456'} ))
//     .then((res) => {
//         expect(res.status).toBe(200);
//         expect(res.body).toHaveProperty('token'); 
//     });
// });

// test('Não deve autenticar usuário com senha errada', () => {
//     const email = `${Date.now()}@mail.com`;

//     return app.services.users.save( 
//         {name: 'ADM', email, password: '123456'}
//     )
//     .then(() => request(app).post('/auth/signin')
//         .send( {email , password: '2805'} ))
//     .then((res) => {
//         expect(res.status).toBe(400);
//         expect(res.body.error).toBe('Usuário ou senha incorreta'); 
//     });
// });

// test('Nao deve autenticar usuario com email incorreto', ()=> {
//     return request(app).post('/auth/signin')
//         .send( {email: 'naoexiste@gmail.com', password: '2805'} )
//         .then((res) => {
//             expect(res.status).toBe(400);
//             expect(res.body.error).toBe('Usuário ou senha incorreta'); 
//         });
// });

test('não deve acessar rota sem token', () => {
    return request(app).get('/users')
        .then((res) => {
            expect(res.status).toBe(401);
        });
});

test('Deve criar o usuário via signup', () => {
    const email = `${Date.now()}@mail.com`;

    return request(app).post('/auth/signup')
        .send( {name: 'gui', email, password: '1234'} )
        .then((res) => {
            expect(res.status).toBe(201);
            expect(res.body.name).toBe('gui');
            expect(res.body).toHaveProperty('email');
            expect(res.body).not.toHaveProperty('password');
        });
});;