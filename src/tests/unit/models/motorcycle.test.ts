import { expect } from 'chai';
import sinon from 'sinon';
import MotorcycleModel from '../../../models/Motorcycle';
import { Model } from 'mongoose';
import { motorcycleMock, motorcycleMockWithId } from '../../mocks/motorcycleMock';

describe('Motorcycle Model', () => {
  const motorcycleModel = new MotorcycleModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'find').resolves([motorcycleMockWithId]);
    sinon.stub(Model, 'findById').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(motorcycleMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(motorcycleMockWithId);
  });

  after(() => {
    sinon.restore();
  })

  describe('creating a motorcycle', () => {
    it('successfully created', async () => {
      const newMotorcycle = await motorcycleModel.create(motorcycleMock);

      expect(newMotorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
  });

  describe('searching all motorcycles', () => {
    it('successfully searched', async () => {
      const motorcyclesFound = await motorcycleModel.read();

      expect(motorcyclesFound).to.be.deep.equal([motorcycleMockWithId]);
    });
  });

  describe('searching a motorcycle', () => {
    it('successfully searched', async () => {
      const motorcycleFound = await motorcycleModel.readOne(motorcycleMockWithId._id);

      expect(motorcycleFound).to.be.deep.equal(motorcycleMockWithId);
    });

    it('invalid _id', async () => {
      let error;
      try {
        await motorcycleModel.readOne('WRONGID');
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.not.undefined;
      expect(error.message).to.be.equal('InvalidMongoId');
    });
  });

  describe('updating a motorcycle', () => {
    it('successfully updated', async () => {
      const motorcycleUpdated = await motorcycleModel.update(motorcycleMockWithId._id, motorcycleMock);

      expect(motorcycleUpdated).to.be.deep.equal(motorcycleMockWithId);
    });

    it('invalid _id', async () => {
      let error;
      try {
        await motorcycleModel.update('WRONGID', motorcycleMock);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.not.undefined;
      expect(error.message).to.be.equal('InvalidMongoId');
    });
  });

  describe('deleting a motorcycle', () => {
    it('successfully deleted', async () => {
      const motorcycleDeleted = await motorcycleModel.delete(motorcycleMockWithId._id);

      expect(motorcycleDeleted).to.be.deep.equal(motorcycleMockWithId);
    });

    it('invalid _id', async () => {
      let error;
      try {
        await motorcycleModel.delete('WRONGID');
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.not.undefined;
      expect(error.message).to.be.equal('InvalidMongoId');
    });
  });
});