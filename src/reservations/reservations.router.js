const router = require("express").Router();
const reservationsServices = require("./reservations.http");
//Pasport
const passport = require("passport");
require("../middleware/auth.middleware")(passport);

router.route("/").get(reservationsServices.getAll);

router
  .route("/my-reservations")
  .get(
    passport.authenticate("jwt", { session: false }),
    reservationsServices.getAllMyReservations
  );

router
  .route("/my-reservations/:id")
  .get(passport.authenticate("jwt", { session: false }));

module.exports = {
  router,
};
