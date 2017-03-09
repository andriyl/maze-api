const models = require('../../../src/models/index');
const destroy = require('../../helpers/destroy');

describe('/profiles', () => {
  let markelog;
  let viestat;

  beforeEach(() => {
    markelog = {
      id: 1,
      bossId: 2,
      name: 'Oleg Gaidarenko',
      title: 'Kinda cool developer',
      handle: 'markelog',
      about: 'Killa gorilla',
      createdAt: new Date(),
      updatedAt: new Date(),
      birthday: new Date('2017-03-08'),
    };

    viestat = {
      id: 2,
      bossId: 1,
      name: 'Andrés C. Viesca Ruiz',
      title: 'Taco developer',
      about: 'Sexy turtle',
      handle: 'Viestat',
      createdAt: new Date(),
      updatedAt: new Date(),
      birthday: new Date('1992-05-28'),
    };
  });

  beforeEach(destroy);
  afterEach(destroy);

  beforeEach(async () => {
    await models.Profiles.bulkCreate([markelog, viestat]);
  });

  describe('GET /profiles', () => {
    it('respond with all profiles', () => {
      return request(app)
        .get('/profiles')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.data[0].about).to.equal('Killa gorilla');
          expect(res.body.data[0].birthday).to.equal('2017-03-07T23:00:00.000Z');
        });
    });
  });

  describe('GET /profiles/:handle', () => {
    it('respond with specific profile', () => {
      return request(app)
        .get('/profiles/markelog')
        .expect(200)
        .expect('Content-Type', /json/)
        .then((res) => {
          expect(res.body.data.handle).to.equal('markelog');
          expect(res.body.data.birthday).to.equal('2017-03-07T23:00:00.000Z');
        });
    });

    it('responds with 404 for non-existent profile', () => {
      return request(app).get('/profiles/non-existent').expect(404);
    });
  });

  describe('DELETE /profiles', () => {
    it('deletes profile', async () => {
      await request(app).delete('/profiles/markelog').expect(204);
      await request(app).get('/profiles/markelog').expect(404);
    });
  });

  describe('POST /profiles', () => {
    beforeEach(destroy);

    it('creates profile', async () => {
      await request(app)
        .post('/profiles')
        .send(markelog)
        .expect('Content-Type', /json/)
        .expect(201);

      return request(app).get('/profiles/markelog').expect(200);
    });

    it('throws validation error', async () => {
      const response = await request(app)
        .post('/profiles')
        .send({})
        .expect('Content-Type', /json/)
        .expect(400);

      const firstMessage = response.body.data[0].message;

      expect(firstMessage).to.equal('name cannot be null');
    });
  });

  describe('PUT /profiles/:handle', () => {
    it('updates profile', async () => {
      markelog.name = 'test';

      await request(app)
        .put('/profiles/markelog')
        .send(markelog)
        .expect(204);

      return request(app)
        .get('/profiles/markelog')
        .expect(200)
        .then((res) => {
          expect(res).to.have.deep.property('body.data.name', 'test');
        });
    });

    it('creates profile when it doesn\'t exist', async () => {
      markelog.handle = 'test';

      return request(app)
        .put('/profiles/test')
        .send(markelog)
        .expect('Content-Type', /json/)
        // .expect(201)
          .then(data => console.log(data));
    });

    it('throws validation error', async () => {
      // Fail validation
      markelog.name = 't';

      const response = await request(app)
        .put('/profiles/markelog')
        .send(markelog)
        .expect('content-type', /json/)
        .expect(400);

      expect(response).to.have.deep.property('body.data[0].message', 'Validation len failed');
    });
  });
});
