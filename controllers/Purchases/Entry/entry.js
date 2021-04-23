import models from "../../models";

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Entry.create(req.body);

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
      const reg = await models.Entry.findOne({_id: req.query._id})
        .populate("user", {name: 1})
        .populate("person", {name: 1});

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

      const reg = await models.Entry.find(
        {
          $or: [
            {voucher_number: new RegExp(value, "i")},
            {voucher_series: new RegExp(value, "i")}
          ]
        },
        {created_at: 0}
      )
        .populate("user", {name: 1})
        .populate("person", {name: 1})
        .sort({created_at: -1});

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Internal server error"
      });

      next(e);
    }
  },
  approve: async (req, res, next) => {
    try {
      const reg = await models.Entry.findByIdAndUpdate(
        {_id: req.body._id},
        {state: 1}
      );

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Internal server error"
      });

      next(e);
    }
  },
  cancel: async (req, res, next) => {
    try {
      const reg = await models.Entry.findByIdAndUpdate(
        {_id: req.body._id},
        {state: 0}
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
