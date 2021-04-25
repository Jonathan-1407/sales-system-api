import models from "../../../models";

async function increaseStock(_id, amount) {
  let { stock } = await models.Article.findOne({ _id: _id });
  let _stock = parseInt(stock) + parseInt(amount);
  const reg = await models.Article.findByIdAndUpdate(
    { _id: _id },
    { stock: _stock }
  );
}

async function decreaseStock(_id, amount) {
  let { stock } = await models.Article.findOne({ _id: _id });
  let _stock = parseInt(stock) - parseInt(amount);
  const reg = await models.Article.findByIdAndUpdate(
    { _id: _id },
    { stock: _stock }
  );
}

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Sale.create(req.body);

      /* Update Stock */
      let details = req.body.details;
      details.map(item => {
        increaseStock(item._id, item.amount);
      });

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
      const reg = await models.Sale.findOne({ _id: req.query._id })
        .populate("user", { name: 1 })
        .populate("person", { name: 1 });

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

      const reg = await models.Sale.find(
        {
          $or: [
            { voucher_number: new RegExp(value, "i") },
            { voucher_series: new RegExp(value, "i") }
          ]
        }
      )
        .populate("user", { name: 1 })
        .populate("person", { name: 1 })
        .sort({ created_at: -1 });

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
      const reg = await models.Sale.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 1 }
      );

      /* Update Stock */
      let details = reg.details;
      details.map(item => {
        decreaseStock(item._id, item.amount);
      });

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
      const reg = await models.Sale.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 0 }
      );

      /* Update Stock */
      let details = reg.details;
      details.map(item => {
        increaseStock(item._id, item.amount);
      });

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Internal server error"
      });

      next(e);
    }
  }
};
