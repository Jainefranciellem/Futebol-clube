import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UsersModel from '../database/models/UsersModel';
import { loginBody, user } from '../mocks/mocksUsers';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  beforeEach(sinon.restore);

  it('should return token', async () =>{
    sinon.stub(UsersModel, 'findOne').resolves(user as any);

    const { status, body } = await chai.request(app).post('/login').send(loginBody);

    expect(status).to.equal(401);
    expect(body).to.have.property('token');
  });

});
