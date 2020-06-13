'use strict';

let {server} = require('../src/server');
let supergoose = require('@code-fellows/supergoose');
let mockRequest = supergoose(server);

describe('auth-server', ()=> {
  let user = {
    username: 'testing',
    password: 'testing123',
    role: 'user',
  };

  it('can sign up using token', ()=> {
    return mockRequest.post('/signup')
      .send(user)
      .then(data => {         
        expect(data.status).toBe(200);
      });
  });

  it('can signin using token', ()=> {
    return mockRequest.post('/signup')
      .send(user)
      .then(data => {              
        return mockRequest.post('/signin')
          .set('Content-Type', 'application/json')
          .set('authorization', 'Basic dGVzdGluZzp0ZXN0aW5nMTIz')
          .then( data => {
            console.log(data.header['set-cookie']);        
          });
      });
 
  });
});