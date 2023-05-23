const express = require("express")
const { addFlightPostController, dashboardController, getFlightsController, addFlightGetController, deleteflightController, bookingsGetController, bookingsPostContoller, logoutController } = require("../controllers/adminControllers")
const Router = express.Router()

Router.route("/dashboard").get(dashboardController)

Router.route("/flights").get(getFlightsController)

Router.route("/addflight").get(addFlightGetController).post(addFlightPostController)

Router.route("/deleteflight/:id").delete(deleteflightController)

Router.route("/bookings").get(bookingsGetController).post(bookingsPostContoller)

Router.route("/logout").get(logoutController)

module.exports = Router