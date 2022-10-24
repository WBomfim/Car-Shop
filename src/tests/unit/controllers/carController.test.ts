import { expect } from "chai";
import Sinon from "sinon";
import { Request, Response } from 'express';
import CarController from "../../../controllers/Car";
import CarService from "../../../services/Car";
import CarModel from "../../../models/Car";
import { carZodSchema } from "../../../interfaces/ICar";
import { validCar, validCarWithId } from '../../mocks/carsMock';

describe("Tests for the CarController class", () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel, carZodSchema);
  const carController = new CarController(carService);
  const req = {} as Request;
  const res = {} as Response;

  beforeEach(() => {
    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(res);
  });

  afterEach(() => Sinon.restore());

  describe("Tests for the create method", () => {
    beforeEach(() => {
      Sinon.stub(carService, "create").resolves(validCarWithId);
    });

    it("should return a status 201 when a car go created", async () => {
      req.body = validCar;
      await carController.create(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(201)).to.be.true;
    });

    it("should return the created car when the create method is called", async () => {
      req.body = validCar;
      await carController.create(req, res);
      expect((res.json as Sinon.SinonStub).calledWith(validCarWithId)).to.be.true;
    });
  });
});
