import models from "../../models";

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Article.create(req.body);

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
      const reg = await models.Article.findOne({
        _id: req.query._id
      }).populate("category", { name: 1 });

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
  search: async (req, res, next) => {
    try {
      const reg = await models.Article.findOne({
        code: req.query.code
      }).populate("category", { name: 1 });

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
      let value = req.query.value;

      const reg = await models.Article.find(
        {
          $or: [
            { name: new RegExp(value, "i") },
            { description: new RegExp(value, "i") }
          ]
        },
        { created_at: 0 }
      )
        .populate("category", { name: 1 })
        .sort({ created_at: -1 });

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
      const reg = await models.Article.findByIdAndUpdate(
        { _id: req.body._id },
        {
          category: req.body.category,
          code: req.body.code,
          name: req.body.name,
          description: req.body.description,
          sale_price: req.body.sale_price,
          stock: req.body.stock
        }
      );

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Internal server error"
      });

      next(e);
    }
  },
  remove: async (req, res, next) => {
    try {
      const reg = await models.Article.findByIdAndDelete({
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
      const reg = await models.Article.findByIdAndUpdate(
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
      const reg = await models.Article.findByIdAndUpdate(
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
