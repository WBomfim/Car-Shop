import { ZodError } from 'zod';
import { expect } from 'chai';
import Sinon from 'sinon';
import CarService from '../../../src/services/Car';
import { carZodSchema } from '../../../src/interfaces/ICar';
import CarModel from '../../../src/models/Car';
import { validCar, invalidCar, validCarWithId } from '../../mocks/carsMock';

describe('Tests for the CarService class', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel, carZodSchema);
  const validId = '635495a97e1e13e479011e2d';
  const notFoundId = '000000a00e1e13e479011e2d';
  let error: any;

  const getError = async (method: unknown) => {
    try {
      await method;
    } catch (err) {
      error = err;
    }
  }

  afterEach(()=> Sinon.restore());

  describe('Tests for the create method', () => {
    it('should return a car when the create method is called', async () => {
      Sinon.stub(carModel, 'create').resolves(validCarWithId);
      const car = await carService.create(validCar);
      expect(car).to.be.deep.equal(validCarWithId);
    });

    it('should return an error when the create method is called with invalid data', async () => {
      await getError(carService.create(invalidCar));
      expect(error).to.be.an('error');
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('Tests for the read method', () => {
    it('should return an array of cars when the read method is called', async () => {
      const allCars = [validCarWithId];
      Sinon.stub(carModel, 'read').resolves(allCars);
      const cars = await carService.read();
      expect(cars).to.be.an('array');
      expect(cars).to.be.deep.equal(allCars);
    });
  });

  describe('Tests for the readOne method', () => {
    it('should return a car when the readOne method is called', async () => {
      Sinon.stub(carModel, 'readOne').resolves(validCarWithId);
      const car = await carService.readOne(validId);
      expect(car).to.be.deep.equal(validCarWithId);
    });

    it('should return an error when the readOne method is called with nonexistent id', async () => {
      Sinon.stub(carModel, 'readOne').resolves(null);
      await getError(carService.readOne(notFoundId));
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.equal('NOT_FOUND');
    });
  });

  describe('Tests for the update method', () => {
    it('should return a car when the update method is called', async () => {
      Sinon.stub(carModel, 'update').resolves(validCarWithId);
      const car = await carService.update(validId, validCar);
      expect(car).to.be.deep.equal(validCarWithId);
    });

    it('should return an error when the update method is called with nonexistent id', async () => {
      Sinon.stub(carModel, 'update').resolves(null);
      await getError(carService.update(notFoundId, validCar));
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.equal('NOT_FOUND');
    });

    it('should return an error when the update method is called with invalid data', async () => {
      await getError(carService.update(validId, invalidCar));
      expect(error).to.be.an('error');
      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('Tests for the delete method', () => {
    it('should return true when the delete method is called', async () => {
      Sinon.stub(carModel, 'delete').resolves(validCarWithId);
      const result = await carService.delete(validId);
      expect(result).to.be.equal(true);
    });

    it('should return an error when the delete method is called with nonexistent id', async () => {
      Sinon.stub(carModel, 'delete').resolves(null);
      await getError(carService.delete(notFoundId));
      expect(error).to.be.instanceOf(Error);
      expect(error.message).to.be.equal('NOT_FOUND');
    });
  });
});
