import { ZodError } from 'zod';
import { expect } from 'chai';
import sinon from 'sinon';
import CarService from '../../../services/Car';
import { carZodSchema } from '../../../interfaces/ICar';
import CarModel from '../../../models/Car';
import { validCar, invalidCar, validCarWithId } from '../../mocks/carsMock';

describe('Tests for the CarService class', () => {
  let error: any;
  const carModel = new CarModel();
  const carService = new CarService(carModel, carZodSchema);

  describe('Tests for the create method', () => {
    before(() => {
      sinon.stub(carModel, 'create').resolves(validCarWithId);
    });

    after(()=> sinon.restore());

    it('should return a car when the create method is called', async () => {
      const car = await carService.create(validCar);
      expect(car).to.be.deep.equal(validCarWithId);
    });

    it('should return an error when the create method is called with invalid data', async () => {
      try {
        await carService.create(invalidCar);
      } catch (err: any) {
        error = err;
      }
      expect(error).to.be.an('error');
      expect(error).to.be.instanceOf(ZodError);
    });
  });
});
