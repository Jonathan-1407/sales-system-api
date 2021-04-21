import models from "../../models";
import bcrypt from "bcryptjs";

export default {
  add: async (req, res, next) => {
    try {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const reg = await models.User.create(req.body);

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
      const reg = await models.User.findOne({
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
      let value = req.query.value;

      const reg = await models.User.find(
        {
          $or: [
            { name: new RegExp(value, "i") },
            { email: new RegExp(value, "i") }
          ]
        },
        { created_at: 0 }
      ).sort({ created_at: -1 });

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
      let password = req.body.password;
      const _reg = await models.User.findOne({ _id: req.body._id });

      if (password != _reg.password) {
        req.body.password = await bcrypt.hash(req.body.password, 10);
      }
      const reg = await models.User.findByIdAndUpdate(
        { _id: req.body._id },
        {
          rol: req.body.rol,
          name: req.body.name,
          document_type: req.body.document_type,
          document_number: req.body.document_number,
          address: req.body.address,
          phone: req.body.phone,
          email: req.body.email,
          password: req.body.password
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
      const reg = await models.User.findByIdAndDelete({
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
      const reg = await models.User.findByIdAndUpdate(
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
      const reg = await models.User.findByIdAndUpdate(
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
  },
  login: async (req, res, next) => {
    try {
      let user = await models.User.findOne({ email: req.body.email });

      if (user) {
        let match = await bcrypt.compare(req.body.password, user.password);

        if (match) {
          res.status(200).json("User Correct");
        } else {
          res.status(404).json("Thes credentials do not match ours");
        }
      } else {
        res.status(404).send({
          message: "Thes credentials do not match ours"
        });
      }
    } catch (e) {
      res.status(500).send({
        message: "Internal server error"
      });

      next(e);
    }
  }
};
