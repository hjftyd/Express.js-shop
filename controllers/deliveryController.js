const Delivery = require('../models/delivery');
const ApiError = require('../error/ApiError');

class deliveryController {
  // List of all deliveries
  async allDeliveries(req, res) {
    try {
      const delivery = await Delivery.find();
      res.status(200).json(delivery);
    } catch (err) {
      return next(ApiError.badRequest);
    }
  }

  // Info about delivery by id
  async currentDelivery(req, res) {
    try {
      const delivery = await Delivery.findById(req.params.id);
      res.status(200).json(delivery);
    } catch (err) {
      return next(ApiError.badRequest);
    }
  }

  // Change delivery
  async modifyDelivery(req, res) {
    try {
      const delivery = await Delivery.findById(req.params.id);
      Object.assign(delivery, req.body);
      delivery.save();
      res.status(200).json(delivery);
    } catch (err) {
      return next(ApiError.badRequest);
    }
  }

  // Delete delivery by id
  async deleteDelivery(req, res) {
    try {
      const delivery = await Delivery.findById(req.params.id);
      await delivery.remove();
      res.status(200).json(delivery);
    } catch (err) {
      return next(ApiError.badRequest);
    }
  }

  // Add new delivery
  async newDelivery(req, res, next) {
    try {
      const newDelivery = new Delivery(req.body);
      const savedDelivery = await newDelivery.save();
      return res.json(savedDelivery);
    } catch (err) {
      return next(ApiError.badRequest);
    }
  }
}

module.exports = new deliveryController();
