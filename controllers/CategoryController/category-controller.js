import models from "../models";

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Category.create(req.body);

      return res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Internal server error"
      });

      return next(e);
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.Category.findOne({ _id: req.query._id });

      if (!reg) {
        return res.status(404).send({
          message: "The requested record does not exist"
        });
      } else {
        return res.status(200).json(reg);
      }
    } catch (e) {
      res.status(500).send({
        message: "Internal server error"
      });

      return next(e);
    }
  },
  list: async (req, res, next) => {
    try {
      const reg = await models.Category.find({});

      return res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Internal server error"
      });

      return next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const reg = models.Category.findByIdAndUpdate(
        { _id: req.body._id },
        { name: req.body.name, description: req.body.description }
      );

      return es.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Internal server error"
      });

      return next(e);
    }
  },
  remove: async (req, res, next) => {
    try {
      const reg = models.Category.findByIdAndDelete({ _id: req.body._id });

      return res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Internal server error"
      });

      return next(e);
    }
  },
  enable: async (req, res, next) => {
    try {
      const reg = models.Category.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 1 }
      );

      return es.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Internal server error"
      });

      return next(e);
    }
  },
  disable: async (req, res, next) => {
    try {
      const reg = models.Category.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 0 }
      );

      return es.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Internal server error"
      });

      return next(e);
    }
  }
};
