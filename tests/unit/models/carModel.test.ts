import { expect } from 'chai';
import Sinon from 'sinon';
import CarModel from '../../../src/models/Car';
import { Model } from 'mongoose';
import { validCar, validCarWithId } from '../../mocks/carsMock';

describe('Tests for the CarModel class', () => {
  const carModel = new CarModel();
  const validId = '635495a97e1e13e479011e2d';
  const invalidId = 'INVALID_ID_123';
  let error: any;

  const getError = async (method: unknown) => {
    try {
      await method;
    } catch (err) {
      error = err;
    }
  }

  afterEach(() => Sinon.restore());

  describe('Tests for the create method', () => {
    it('should return a car when the create method is called', async () => {
      Sinon.stub(Model, 'create').resolves(validCarWithId);
      const car = await carModel.create(validCar);
      expect(car).to.be.deep.equal(validCarWithId);
    });
  });

  describe('Tests for the read method', () => {
    it('should return a list of cars when the read method is called', async () => {
      const allCars = [validCarWithId];
      Sinon.stub(Model, 'find').resolves(allCars);
      const cars = await carModel.read();
      expect(cars).to.be.deep.equal(allCars);
    });
  });

  describe('Tests for the readOne method', () => {
    it('should return a car when the readOne method is called', async () => {
      Sinon.stub(Model, 'findOne').resolves(validCarWithId);
      const car = await carModel.readOne(validId);
      expect(car).to.be.deep.equal(validCarWithId);
    });

    it('should throw an error when the readOne method is called with an invalid id', async () => {
      await getError(carModel.readOne(invalidId));
      expect(error).to.be.an('error');
      expect(error.message).to.be.equal('INVALID_MONGO_ID');
    });
  });

  describe('Tests for the update method', () => {
    it('should return a car when the update method is called', async () => {
      Sinon.stub(Model, 'findOneAndUpdate').resolves(validCarWithId);
      const car = await carModel.update(validId, validCar);
      expect(car).to.be.deep.equal(validCarWithId);
    });

    it('should throw an error when the update method is called with an invalid id', async () => {
      await getError(carModel.update(invalidId, validCar));
      expect(error).to.be.an('error');
      expect(error.message).to.be.equal('INVALID_MONGO_ID');
    });
  });

  describe('Tests for the delete method', () => {
    it('should return a car when the delete method is called', async () => {
      Sinon.stub(Model, 'findByIdAndDelete').resolves(true);
      const car = await carModel.delete(validId);
      expect(car).to.be.deep.equal(true);
    });

    it('should throw an error when the delete method is called with an invalid id', async () => {
      await getError(carModel.delete(invalidId));
      expect(error).to.be.an('error');
      expect(error.message).to.be.equal('INVALID_MONGO_ID');
    });
  });
});
