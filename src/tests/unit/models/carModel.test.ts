import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import { validCar, validCarWithId } from '../../mocks/carsMock';

describe('Tests for the CarModel class', () => {
  const carModel = new CarModel();

  describe('Tests for the create method', () => {
    before(() => {
      sinon.stub(Model, 'create').resolves(validCarWithId);
    });

    after(() => sinon.restore());

    it('should return a car when the create method is called', async () => {
      const car = await carModel.create(validCar);
      expect(car).to.be.deep.equal(validCarWithId);
    });
  });

});
