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
      req.body = validCar;
    });

    it("should return a status 201 when a car go created", async () => {
      await carController.create(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(201)).to.be.true;
    });

    it("should return the created car when the create method is called", async () => {
      await carController.create(req, res);
      expect((res.json as Sinon.SinonStub).calledWith(validCarWithId)).to.be.true;
    });
  });

  describe("Tests for the read method", () => {
    const allCars = [validCarWithId];

    beforeEach(() => {
      Sinon.stub(carService, "read").resolves(allCars);
    });

    it("should return a status 200 when a car go created", async () => {
      await carController.read(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
    });

    it("should return the created car when the create method is called", async () => {
      await carController.read(req, res);
      expect((res.json as Sinon.SinonStub).calledWith(allCars)).to.be.true;
    });
  });

  describe("Tests for the readOne method", () => {
    beforeEach(() => {
      Sinon.stub(carService, "readOne").resolves(validCarWithId);
      req.params = { id: validCarWithId._id };
    });

    it("should return a status 200 when a car go created", async () => {
      await carController.readOne(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
    });

    it("should return the created car when the create method is called", async () => {
      await carController.readOne(req, res);
      expect((res.json as Sinon.SinonStub).calledWith(validCarWithId)).to.be.true;
    });
  });

  describe("Tests for the update method", () => {
    beforeEach(() => {
      Sinon.stub(carService, "update").resolves(validCarWithId);
      req.params = { id: validCarWithId._id };
      req.body = validCar;
    });

    it("should return a status 200 when a car go updated", async () => {
      await carController.update(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(200)).to.be.true;
    });

    it("should return the updated car when the update method is called", async () => {
      await carController.update(req, res);
      expect((res.json as Sinon.SinonStub).calledWith(validCarWithId)).to.be.true;
    });
  });

  describe("Tests for the delete method", () => {
    beforeEach(() => {
      Sinon.stub(carService, "delete").resolves(true);
      res.end = Sinon.stub().returns(res);
      req.params = { id: validCarWithId._id };
    });

    it("should return a status 204 when a car go deleted", async () => {
      await carController.delete(req, res);
      expect((res.status as Sinon.SinonStub).calledWith(204)).to.be.true;
    });

    it("should return an empty body when the delete method is called", async () => {
      await carController.delete(req, res);
      expect((res.end as Sinon.SinonStub).called).to.be.true;
    });
  });
});
