import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamsModel from '../database/models/TeamsModel';
import { allTeams, teams } from '../mocks/mocksTeams';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

  it('Should return all teams', async () => {
    sinon.stub(TeamsModel, 'findAll').resolves(allTeams as any);
    const { status, body } = await chai.request(app).get('/teams');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(allTeams);
  });

  it('Should return teams by id', async () => {
    sinon.stub(TeamsModel, 'findByPk').resolves(teams as any);
    const { status, body } = await chai.request(app).get('/teams/1');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(teams);
  });

  it('should return not found if the book doesn\'t exists', async () =>{
    sinon.stub(TeamsModel, 'findByPk').resolves(null);

    const { status, body } = await chai.request(app).get('/teams/1000');

    expect(status).to.equal(404);
    expect(body.message).to.equal('team 1000 not found');
  });

  afterEach(sinon.restore);
});
