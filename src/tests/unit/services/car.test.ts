import { expect } from 'chai';
import sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/Car';
import CarService from '../../../services/Car';
import { carMock, carMockWithId } from '../../mocks/carMock';

describe('Car Service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'read').resolves([carMockWithId]);
    sinon.stub(carModel, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(carModel, 'update')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
    sinon.stub(carModel, 'delete')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);
  });

  after(() => {
    sinon.restore();
  });

  describe('creating a car', () => {
    it('successfully created', async () => {
      const carCreated = await carService.create(carMock);

      expect(carCreated).to.be.equal(carMockWithId);
    });

    it('creation failed', async () => {
      let error;
      try {
        await carService.create({});
      } catch (err: any) {
        error = err;
      }
      
      expect(error).to.be.not.undefined;
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('searching all cars', () => {
    it('successfully searched', async () => {
      const carsFound = await carService.read();

      expect(carsFound).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('searching a car', () => {
    it('sucessfully searched', async () => {
      const carFound = await carService.readOne(carMockWithId._id);

      expect(carFound).to.be.deep.equal(carMockWithId);
    });

    it('search failed', async () => {
      let error;
      try {
        await carService.readOne(carMockWithId._id);
      } catch (err: any) {
        error = err
      }

      expect(error).to.be.not.undefined;
      expect(error.message).to.be.equal('EntityNotFound');
    });
  });

  describe('updating a car', () => {
    it('successfuly updated', async () => {
      const carUpdated = await carService.update(carMockWithId._id, carMock);

      expect(carUpdated).to.be.deep.equal(carMockWithId);
    });

    it('update failed', async () => {
      let error;
      try {
        await carService.update(carMockWithId._id, carMock);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.not.undefined;
      expect(error.message).to.be.equal('EntityNotFound');
    });
  });

  describe('deleting a car', () => {
    it('successfuly deleted', async () => {
      const carDeleted = await carService.delete(carMockWithId._id);

      expect(carDeleted).to.be.deep.equal(carMockWithId);
    });

    it('delete failed', async () => {
      let error;
      try {
        await carService.delete(carMockWithId._id);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.not.undefined;
      expect(error.message).to.be.equal('EntityNotFound');
    });
  });
});