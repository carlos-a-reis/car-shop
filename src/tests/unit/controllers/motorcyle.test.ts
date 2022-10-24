import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';
import { motorcycleMock, motorcycleMockWithId } from '../../mocks/motorcycleMock';
import MotorcycleController from '../../../controllers/Motorcycle';
import MotorcycleService from '../../../services/Motorcycle';
import MotorcycleModel from '../../../models/Motorcycle';

describe('Motorcycle Controller', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);
  const motorcycleController = new MotorcycleController(motorcycleService);

  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('creating a motorcycle', () => {
    it('successfully created', async () => {
      sinon.stub(motorcycleService, 'create').resolves(motorcycleMockWithId);
      req.body = motorcycleMock;
      await motorcycleController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  });

  describe('searching all motorcycles', () => {
    it('successfully searched', async () => {
      sinon.stub(motorcycleService, 'read').resolves([motorcycleMockWithId]);
      await motorcycleController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([motorcycleMockWithId])).to.be.true;
    });
  });

  describe('seraching a motorcycle', () => {
    it('successfully serached', async () => {
      sinon.stub(motorcycleService, 'readOne').resolves(motorcycleMockWithId);
      req.params = { id: motorcycleMockWithId._id };
      await motorcycleController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  });

  describe('updating a motorcycle', () => {
    it('successfully updated', async () => {
      sinon.stub(motorcycleService, 'update').resolves(motorcycleMockWithId);
      req.params = { id: motorcycleMockWithId._id };
      req.body = { motorcycleMock };
      await motorcycleController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  });

  describe('deleting a motorcycle', () => {
    it('successfully deleted', async () => {
      sinon.stub(motorcycleService, 'delete').resolves(motorcycleMockWithId);
      res.end = sinon.stub().returns(res);
      req.params = { id: motorcycleMockWithId._id };
      await motorcycleController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
    });
  });
});