const express = require("express")
const { adminDashboardFileGetter, addFlightFileGetter, flightsFileGetter, deleteflightController, addFlightPostController, bookingsFileGetter, bookingsPostContoller, logoutController } = require("../controllers/adminControllers")
const Router = express.Router()

Router.route("/admindashboard").get(adminDashboardFileGetter)

Router.route("/flights").get(flightsFileGetter)

Router.route("/addflight").get(addFlightFileGetter).post(addFlightPostController)

Router.route("/deleteflight/:id").delete(deleteflightController)

Router.route("/bookings").get(bookingsFileGetter).post(bookingsPostContoller)

Router.route("/logout").get(logoutController)

module.exports = Router