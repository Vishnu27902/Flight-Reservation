const flightModel = require("../models/flightModel")
const bookingModel = require("../models/bookingModel")
const path = require("path")
const publicPath = path.join(__dirname, "..", "public")

const dashboardController = (req, res) => {
    res.status(200).sendFile(path.join(publicPath, "admindashboard.html"))
}

const addFlightGetController = (req, res) => {
    res.status(200).sendFile(path.join(publicPath, "addflight.html"))
}

const bookingsGetController = async (req, res) => {
    const bookingData = await bookingModel.find({}).exec()
    console.log("Booking Data fetched")
    if (bookingData) {
        console.log("Booking Data Fetched")
        res.status(200).json({ success: true, message: "Booking Data Fetched", bookingData: bookingData })
        return
    }
    res.status(200).json({ success: false, message: "No Bookings till date" })
}

const getFlightsController = async (req, res) => {
    const flightData = await flightModel.find({}).exec()
    console.log("flight Data fetched")
    if (flightData) {
        console.log("flight Data Fetched")
        res.status(200).json({ success: true, message: "flight Data Fetched", flightData: flightData })
        return
    }
    res.status(200).json({ success: false, message: "No flight till date" })
}


const bookingsPostContoller = async (req, res) => {
    const { flightnumber, timing } = req.body
    const bookingData = await bookingModel.find({ flightnumber: flightnumber, timing: timing }).exec()
    if (bookingData.length == 0) {
        console.log("No Result Found")
        res.status(200).json({ success: false, message: "No Bookings Available" })
    }
    else {
        console.log("Booking Data Fetched")
        res.status(200).json({ success: true, message: "Booking Data Fetched", bookingData: bookingData })
    }
}

const deleteflightController = async (req, res) => {
    const id = req.params.id
    await flightModel.deleteOne({ _id: id }).then(() => {
        console.log("Flight Deleted Successfully")
        res.status(200).json({ success: true, message: "Flight Deleted Successfully" })
    }).catch((err) => {
        console.log("Error Occured")
        res.status(200).json({ success: false, message: `Error occured : ${err.message}` })
    })
}

const addFlightPostController = async (req, res) => {
    let { flightnumber, from, to, timing } = req.body
    from = from.charAt(0).toUpperCase() + from.slice(1).toLowerCase()
    to = to.charAt(0).toUpperCase() + to.slice(1).toLowerCase()
    await flightModel.create({ _id: flightnumber, from: from, to: to, timing, }).then(() => {
        console.log("Flight Added Successfully")
        res.status(200).json({ success: true, message: "Flight Added Successfully" })
    }).catch((err) => {
        console.log("Error Occured")
        res.status(200).json({ success: false, message: `Error occured : ${err.message}` })
    })
}

const logoutController = (req, res) => {
    req.session.destroy()
    res.status(302).redirect("/home")
}

module.exports = { addFlightPostController, deleteflightController, bookingsPostContoller, bookingsGetController, getFlightsController, logoutController, addFlightGetController, dashboardController, addFlightPostController }