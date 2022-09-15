const router = require("express").Router();
const passport = require("passport");
const accommodationsHttp = require("./accommodations.http");
const reservationHttp = require("../reservations/reservations.http");
const { roleHostMiddleware } = require("../middleware/role.middleware");
require("../middleware/auth.middleware")(passport);

router.route("/").get(accommodationsHttp.getAll);

router.route("/:id").get(accommodationsHttp.getById);

router
  .route("/my-accommodations/:hostId")
  .get(
    passport.authenticate("jwt", { session: false }),
    roleHostMiddleware,
    accommodationsHttp.getMyAccommodations
  )
  .post(
    passport.authenticate("jwt", { session: false }),
    roleHostMiddleware,
    accommodationsHttp.create
  );

router
  .route("/my-accommodations/:hostId/del-put/:accommodationId/")
  .delete(
    passport.authenticate("jwt", { session: false }),
    roleHostMiddleware,
    accommodationsHttp.remove
  )
  .put(
    passport.authenticate("jwt", { session: false }),
    roleHostMiddleware,
    accommodationsHttp.edit
  );

router
  .route("/:id/reservations")
  .get(
    passport.authenticate("jwt", { session: false }),
    roleHostMiddleware,
    reservationHttp.getByAccommodation
  )
  .post(
    passport.authenticate("jwt", { session: false }),
    reservationHttp.postReservation
  );

router
  .route("/:id/cancel-reservation/:reservationId")
  .delete(
    passport.authenticate("jwt", { session: false }),
    reservationHttp.removeReservation
  );

router
  .route("/:id/change-score/:reservationId")
  .put(
    passport.authenticate("jwt", { session: false }),
    reservationHttp.editScoreReservation
  );

module.exports = {
  router,
};
