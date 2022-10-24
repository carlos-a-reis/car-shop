import { expect } from 'chai';
import sinon from 'sinon';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../../mocks/carMock';

describe('Car Model', () => {
  const carModel = new CarModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
    sinon.stub(Model, 'findById').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndUpdate').resolves(carMockWithId);
    sinon.stub(Model, 'findByIdAndDelete').resolves(carMockWithId);
  });

  after(() => {
    sinon.restore();
  })

  describe('creating a car', () => {
    it('successfully created', async () => {
      const newCar = await carModel.create(carMock);

      expect(newCar).to.be.deep.equal(carMockWithId);
    });
  });

  describe('searching all cars', () => {
    it('successfully searched', async () => {
      const carsFound = await carModel.read();

      expect(carsFound).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('searching a car', () => {
    it('successfully searched', async () => {
      const carFound = await carModel.readOne(carMockWithId._id);

      expect(carFound).to.be.deep.equal(carMockWithId);
    });

    it('invalid _id', async () => {
      let error;
      try {
        await carModel.readOne('WRONGID');
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.not.undefined;
      expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
    });
  });

  describe('updating a car', () => {
    it('successfully updated', async () => {
      const carUpdated = await carModel.update(carMockWithId._id, carMock);

      expect(carUpdated).to.be.deep.equal(carMockWithId);
    });

    it('invalid _id', async () => {
      let error;
      try {
        await carModel.update('WRONGID', carMock);
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.not.undefined;
      expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
    });
  });

  describe('deleting a car', () => {
    it('successfully deleted', async () => {
      const carDeleted = await carModel.delete(carMockWithId._id);

      expect(carDeleted).to.be.deep.equal(carMockWithId);
    });

    it('invalid _id', async () => {
      let error;
      try {
        await carModel.delete('WRONGID');
      } catch (err: any) {
        error = err;
      }

      expect(error).to.be.not.undefined;
      expect(error.message).to.be.equal(ErrorTypes.InvalidMongoId);
    });
  });
});