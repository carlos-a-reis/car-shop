import { expect } from 'chai';
import sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import MotorcycleModel from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/Motorcycle';
import { motorcycleMock, motorcycleMockWithId } from '../../mocks/motorcycleMock';

describe('Motorcycle Service', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);

  before(() => {
    sinon.stub(motorcycleModel, 'create').resolves(motorcycleMockWithId);
    sinon.stub(motorcycleModel, 'read').resolves([motorcycleMockWithId]);
    sinon.stub(motorcycleModel, 'readOne')
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(motorcycleModel, 'update')
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(motorcycleModel, 'delete')
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).resolves(null);
  });

  after(() => {
    sinon.restore();
  });

  describe('creating a motorcycle', () => {
    it('successfully created', async () => {
      const motorcycleCreated = await motorcycleService.create(motorcycleMock);

      expect(motorcycleCreated).to.be.equal(motorcycleMockWithId);
    });

    it('creation failed', async () => {
      let error;
      try {
        await motorcycleService.create({});
      } catch (err: any) {
        error = err;
      }
      
      expect(error).to.be.not.undefined;
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('searching all motorcycles', () => {
    it('successfully searched', async () => {
      const motorcyclesFound = await motorcycleService.read();

      expect(motorcyclesFound).to.be.deep.equal([motorcycleMockWithId]);
    });
  });

  describe('searching a motorcycle', () => {
    it('sucessfully searched', async () => {
      const motorcycleFound = await motorcycleService.readOne(motorcycleMockWithId._id);

      expect(motorcycleFound).to.be.deep.equal(motorcycleMockWithId);
    });

    it('search failed', async () => {
      let error;
      try {
        await motorcycleService.readOne(motorcycleMockWithId._id);
      } catch (err: any) {
        error = err
      }

      expect(error).to.be.not.undefined;
      expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
    });
  });

  describe('updating a motorcycle', () => {
    it('successfuly updated', async () => {
      const motorcycleUpdated = await motorcycleService.update(motorcycleMockWithId._id, motorcycleMock);

      expect(motorcycleUpdated).to.be.deep.equal(motorcycleMockWithId);
    });

    it('update failed', async () => {
      let error;
      try {
        await motorcycleService.update(motorcycleMockWithId._id, motorcycleMock);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.not.undefined;
      expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
    });
  });

  describe('deleting a motorcycle', () => {
    it('successfuly deleted', async () => {
      const motorcycleDeleted = await motorcycleService.delete(motorcycleMockWithId._id);

      expect(motorcycleDeleted).to.be.deep.equal(motorcycleMockWithId);
    });

    it('delete failed', async () => {
      let error;
      try {
        await motorcycleService.delete(motorcycleMockWithId._id);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.not.undefined;
      expect(error.message).to.be.equal(ErrorTypes.EntityNotFound);
    });
  });
});