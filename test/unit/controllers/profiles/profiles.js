const Profiles = require('../../../../src/controllers/profiles');
const models = require('../../../../src/models');

describe('Profiles controller', () => {
  let instance;

  beforeEach(() => {
    instance = new Profiles({});
  });

  describe('all method', () => {
    let stub;

    beforeEach(() => {
      stub = sinon.stub(models.Profiles, 'findAll', () => 'test');
    });

    afterEach(() => {
      stub.restore();
    });

    it('executes search for all profiles', async () => {
      const result = await instance.all();
      const arg = stub.firstCall.args[0];

      expect(arg.where).to.deep.equal({});
      expect(result).to.equal('test');
    });

    it('executes search for all profiles with query arguments', async () => {
      const result = await instance.all('oleg');
      const arg = stub.firstCall.args[0];

      expect(arg.where).to.deep.equal({
        $or: [
          {
            name: {
              $ilike: '%oleg%'
            }
          },
          {
            title: {
              $ilike: '%oleg%'
            }
          }
        ]
      });
      expect(result).to.equal('test');
    });
  });

  describe('get method', () => {
    let stub;

    beforeEach(() => {
      stub = sinon.stub(models.Profiles, 'findOne', () => 'test');
    });

    afterEach(() => {
      stub.restore();
    });

    it('gets specifc profile', async () => {
      const result = await instance.get('markelog');

      expect(result).to.equal('test');

      const arg = stub.firstCall.args[0];

      expect(arg).to.have.deep.property('where.handle', 'markelog');
      expect(arg).to.have.deep.property('include[0].as', 'boss');
      expect(arg.attributes.exclude).to.contain('id', 'bossId', 'deletedAt');
    });
  });

  describe('delete method', () => {
    let stub;

    beforeEach(() => {
      stub = sinon.stub(models.Profiles, 'destroy', () => {});
    });

    afterEach(() => {
      stub.restore();
    });

    it('"deletes" the profile', async () => {
      const result = await instance.delete('markelog');

      expect(result).to.equal(true);
      expect(stub).to.have.been.calledWith({
        where: {
          deletedAt: null,
          handle: 'markelog'
        }
      });
    });
  });

  describe('create method', () => {
    const stubs = {};
    const fixture = {
      bossId: 1,
      name: 'Andrés C. Viesca Ruiz',
      title: 'Taco developer',
      about: 'Sexy turtle',
      handle: 'Viestat',
      createdAt: new Date(),
      updatedAt: new Date(),
      addresses: {
        home: {
          country: 'USA',
          state: 'Texas',
          city: 'Paris'
        },
        current: {
          country: 'The Netherlands',
          province: 'Gelderland',
          city: 'Bronkhorst'
        }
      },
      joinedAt: new Date('2017-05-28'),
      birthday: new Date('1992-05-28'),
    };

    beforeEach(() => {
      stubs.create = sinon.stub(models.Profiles, 'create', () => {});
    });

    afterEach(() => {
      for (const stub in stubs) {
        stubs[stub].restore();
      }
    });

    it('creates profile', async () => {
      const result = await instance.create(fixture);

      expect(result).to.equal(true);
      expect(stubs.create).to.have.been.calledWith(fixture);
    });
  });

  describe('update method', () => {
    const stubs = {};
    const handle = 'Viestat';
    let fixture;

    beforeEach(() => {
      const update = sinon
        .stub()
        .returns('update called');

      stubs.profile = {
        update
      };

      stubs.create = sinon
        .stub(Profiles.prototype, 'create')
        .returns('create called');

      fixture = {
        bossId: 1,
        name: 'Andrés C. Viesca Ruiz',
        title: 'Taco developer',
        about: 'Sexy turtle',
        handle: 'Viestat',
        createdAt: new Date(),
        updatedAt: new Date(),
        addresses: {
          home: {
            country: 'USA',
            state: 'Texas',
            city: 'Paris'
          },
          current: {
            country: 'The Netherlands',
            province: 'Gelderland',
            city: 'Bronkhorst'
          }
        },
        joinedAt: new Date('2017-05-28'),
        birthday: new Date('1992-05-28'),
      };
    });

    afterEach(() => {
      for (const stub in stubs) {
        if ('restore' in stubs[stub] === false) {
          continue;
        }

        stubs[stub].restore();
      }
    });

    it('updates profile without "handle" property', async () => {
      stubs.findOrCreate = sinon
        .stub(models.Profiles, 'findOrCreate')
        .returns(new Promise((res) => {
          res([stubs.profile, false]);
        }));

      const result = await instance.update(handle, fixture);
      const arg = stubs.profile.update.getCall(0).args[0];

      // // "handle" should not be present
      expect(result).to.not.have.property('handle');

      // // Whereas other properties should be present
      expect(arg).to.have.property('name');

      // // This method shouldn't be destructive
      expect(arg).to.not.equal(fixture);

      expect(result).to.equal('updated');
    });

    it('updates profile and ignores new handle property', async () => {
      stubs.findOrCreate = sinon
        .stub(models.Profiles, 'findOrCreate')
        .returns(new Promise((res) => {
          res([stubs.profile, false]);
        }));

      fixture.handle = 'new one!';

      const result = await instance.update(handle, fixture);
      const arg = stubs.profile.update.getCall(0).args[0];

      // "handle" should not be present
      expect(result).to.equal('updated');

      // Whereas other properties should be present
      expect(arg).to.have.property('name');
    });

    it('creates new profile if the old one doesn\'t exist', async () => {
      stubs.findOrCreate = sinon
        .stub(models.Profiles, 'findOrCreate')
        .returns(new Promise((res) => {
          res([stubs.profile, true]);
        }));

      stubs.profile = {
        update: sinon.stub().returns('test')
      };

      const result = await instance.update(handle, fixture);

      expect(result).to.equal('created');
      expect(stubs.profile.update).to.not.have.been.called;
    });
  });
});
