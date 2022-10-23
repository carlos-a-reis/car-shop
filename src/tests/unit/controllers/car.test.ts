import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';
import { carMock, carMockWithId } from '../../mocks/carMock';
import CarController from '../../../controllers/Car';
import CarService from '../../../services/Car';
import CarModel from '../../../models/Car';

describe('Car Controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('creating a car', () => {
    it('successfully created', async () => {
      sinon.stub(carService, 'create').resolves(carMockWithId);
      req.body = carMock;
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('searching all cars', () => {
    it('successfully searched', async () => {
      sinon.stub(carService, 'read').resolves([carMockWithId]);
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMockWithId])).to.be.true;
    });
  });
});