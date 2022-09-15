const reservationsControllers = require("./reservations.controllers");

const postReservation = (req, res) => {
  const accommodationId = req.params.id;
  const userId = req.user.id;
  const data = req.body;

  console.log("accommodationId", accommodationId);
  reservationsControllers
    .createReservation(userId, accommodationId, data)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((error) => {
      res.status(400).json({ status: 400, message: error.message });
    });
};

const getAll = (req, res) => {
  reservationsControllers
    .getAllReservations()
    .then((response) => {
      res.status(200).json({ items: response.length, items: response });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

const getAllMyReservations = (req, res) => {
  const userId = req.user.id;

  reservationsControllers
    .getAllReservationsByUserId(userId)
    .then((response) => {
      if (response) {
        return res.status(200).json(response);
      }
      return res
        .status(404)
        .json({ message: `The user with id ${userId} doesn't exist` });
    })
    .catch((error) => {
      res.status(404).json({ status: 404, message: error.message });
    });
};

const getMyReservation = (req, res) => {
  const userId = req.user.id;
  const reservationId = req.params.id;
};

const getByAccommodation = (req, res) => {
  const accommodationId = req.params.id;

  reservationsControllers
    .getReservByAccomm(accommodationId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const removeReservation = (req, res) => {
  const reservationId = req.params.reservationId;

  reservationsControllers
    .cancelReservation(reservationId)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const editScoreReservation = (req, res) => {
  const reservationId = req.params.reservationId;
  const score = req.body;

  reservationsControllers
    .editQualification(reservationId, score.score)
    .then((response) => {
      if (response) {
        return res.status(200).json({ message: "Score edited succesfully" });
      } else {
        return res
          .status(400)
          .json({ message: "The reservation has not finished yet" });
      }
    })
    .catch((err) => {
      return res.status(400).json(err);
    });
};

module.exports = {
  postReservation,
  getAll,
  getAllMyReservations,
  getMyReservation,
  getByAccommodation,
  removeReservation,
  editScoreReservation,
};
