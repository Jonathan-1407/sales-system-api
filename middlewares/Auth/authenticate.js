import tokenService from "../../services/JWT/token";

export default {
  verifyUser: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "There is no token"
      });
    }

    const response = await tokenService.decode(req.headers.token);

    if (
      response.role == "Administrator" ||
      response.role == "Grocer" ||
      response.role == "Seller"
    ) {
      next();
    } else {
      return res.status(403).send({
        message: "Not authorized"
      });
    }
  },
  verifyAdministrator: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "There is no token"
      });
    }

    const response = await tokenService.decode(req.headers.token);

    if (response.role == "Administrator") {
      next();
    } else {
      return res.status(403).send({
        message: "Not authorized"
      });
    }
  },
  verifyGrocer: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "There is no token"
      });
    }

    const response = await tokenService.decode(req.headers.token);

    if (response.role == "Administrator" || response.role == "Grocer") {
      next();
    } else {
      return res.status(403).send({
        message: "Not authorized"
      });
    }
  },
  verifySeller: async (req, res, next) => {
    if (!req.headers.token) {
      return res.status(404).send({
        message: "There is no token"
      });
    }

    const response = await tokenService.decode(req.headers.token);

    if (response.role == "Administrator" || response.role == "Seller") {
      next();
    } else {
      return res.status(403).send({
        message: "Not authorized"
      });
    }
  }
};
