// const jwt = require("jsonwebtoken");
// const AppError = require("../utils/AppError");

// const auth = {
//   checkToken: (req, res, next) => {
//     const bearerToken = req.headers.authorization;
//     const jwtToken = bearerToken && bearerToken.split(" ")[1];
//     if (!jwtToken) {
//       const error = new AppError(401, "No token available");
//       return next(error);
//     }
//     const jwtPayload = jwt.verify(jwtToken, "secretword");
//     req.user = jwtPayload;
//     next();
//   },
//   checkUserType: (userType, courierType) => (req, res, next) => {
//     const user = req.user;
//     const haspermission =
//       user.userType === userType || user.courierType === courierType;
//     if (!haspermission) {
//       const err = new AppError(403, "user has no permissions");
//       return next(err);
//     }
//     next();
//   },
// };
// module.exports = auth;
