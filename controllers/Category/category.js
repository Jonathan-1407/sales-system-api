import models from "../../models";

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Category.create(req.body);

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Internal server error"
      });

      next(e);
    }
  },
  query: async (req, res, next) => {
    try {
      const reg = await models.Category.findOne({ _id: req.query._id });

      if (!reg) {
        res.status(404).send({
          message: "The requested record does not exist"
        });
      } else {
        res.status(200).json(reg);
      }
    } catch (e) {
      res.status(500).send({
        message: "Internal server error"
      });

      next(e);
    }
  },
  list: async (req, res, next) => {
    try {
      const reg = await models.Category.find({});

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Internal server error"
      });

      next(e);
    }
  },
  update: async (req, res, next) => {
    try {
      const reg = await models.Category.findByIdAndUpdate(
        { _id: req.body._id },
        { name: req.body.name, description: req.body.description }
      );

      es.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Internal server error"
      });

      next(e);
    }
  },
  remove: async (req, res, next) => {
    try {
      const reg = await models.Category.findByIdAndDelete({
        _id: req.body._id
      });

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Internal server error"
      });

      next(e);
    }
  },
  enable: async (req, res, next) => {
    try {
      const reg = await models.Category.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 1 }
      );

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Internal server error"
      });

      next(e);
    }
  },
  disable: async (req, res, next) => {
    try {
      const reg = await models.Category.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 0 }
      );

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Internal server error"
      });

      next(e);
    }
  }
};
