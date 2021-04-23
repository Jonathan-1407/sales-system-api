import models from "../../models";

export default {
  add: async (req, res, next) => {
    try {
      const reg = await models.Person.create(req.body);

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
      const reg = await models.Person.findOne({
        _id: req.query._id
      });

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
      let type = req.query.type;
      let value = req.query.value;

      if (type != "") {
        const reg = await models.Person.find(
          {
            $or: [
              { name: new RegExp(value, "i") },
              { email: new RegExp(value, "i") }
            ],
            person_type: type
          },
          { created_at: 0 }
        ).sort({ created_at: -1 });
      } else {
        const reg = await models.Person.find(
          {
            $or: [
              { name: new RegExp(value, "i") },
              { email: new RegExp(value, "i") }
            ]
          },
          { created_at: 0 }
        ).sort({ created_at: -1 });
      }

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
      const reg = await models.Person.findByIdAndUpdate(
        { _id: req.body._id },
        {
          person_type: req.body.person_type,
          name: req.body.name,
          document_type: req.body.document_type,
          document_number: req.body.document_number,
          address: req.body.address,
          phone: req.body.phone,
          email: req.body.email,
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
      const reg = await models.Person.findByIdAndDelete({
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
      const reg = await models.Person.findByIdAndUpdate(
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
      const reg = await models.Person.findByIdAndUpdate(
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
