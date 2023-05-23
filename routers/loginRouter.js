const express = require("express")
const { dashboardController, searchFlightsController, reservationController, logoutController, mybookingsController } = require("../controllers/loginControllers")
const Router = express.Router()

Router.route("/dashboard").get(dashboardController)

Router.route("/searchflights").post(searchFlightsController)

Router.route("/searchflights/:id").post(reservationController)

Router.route("/mybookings").get(mybookingsController)

Router.route("/logout").get(logoutController)

module.exports = Router