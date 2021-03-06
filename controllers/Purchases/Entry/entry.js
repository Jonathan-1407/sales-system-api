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
      const reg = await models.Entry.create(req.body);

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
      const reg = await models.Entry.findOne({ _id: req.query._id })
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

      const reg = await models.Entry.find({
        $or: [
          { voucher_number: new RegExp(value, "i") },
          { voucher_series: new RegExp(value, "i") }
        ]
      })
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
      const reg = await models.Entry.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 1 }
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
  },
  cancel: async (req, res, next) => {
    try {
      const reg = await models.Entry.findByIdAndUpdate(
        { _id: req.body._id },
        { state: 0 }
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
  last_year_chart: async (req, res, next) => {
    try {
      const reg = await models.Entry.aggregate([
        {
          $group: {
            _id: {
              month: { $month: "$created_at" },
              year: { $year: "$created_at" }
            },
            total: { $sum: "$total" },
            number: { $sum: 1 }
          }
        },
        {
          $sort: {
            "_id.year": -1,
            "_id.month": -1
          }
        }
      ]).limit(12);

      res.status(200).json(reg);
    } catch (e) {
      res.status(500).send({
        message: "Ocurrio un error"
      });

      next(e);
    }
  },
  search_between_dates: async (req, res, next) => {
    try {
      let start = req.body.start;
      let end = req.body.end;

      const reg = await models.Entry.find({
        created_at: { $gte: start, $lt: end }
      })
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
  }
};
