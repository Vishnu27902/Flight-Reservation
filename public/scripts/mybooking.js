const sessionData = async () => {
    const res = await axios.get("localhost:5000/home/login/booking")
    return res.data
}

const appendBooking = (myBookings) => {
    if (document.getElementById("bookings").innerHTML == "No Bookings Available") {
        document.getElementById("bookings").innerHTML = ""
    }
    const bookingsDOM = document.getElementById("bookings")
    for (const i in myBookings) {
        const template = `<div class="flight-container">
    <div class="flight">
      <h3>Plane No :${i.flightnumber}</h3>
      <div class="points">
        <h5>First Name:${i.firstname}</h5>
        <h5>Last Name:${i.lastname}</h5>
      </div>
      <div class="points">
        <h5>Email:${i.email}</h5>
        <h5>Phone Number:${i.phnumber}</h5>
      </div>
      <div class="points">
        <h5>Boarding Point:${i.from}</h5>
        <h5>Destination Point:${i.to}</h5>
      </div>
      <div class="points">
        <h5>Timing :${i.timing}</h5>
      </div>
    </div>
  </div>`
        bookingsDOM.innerHTML += template
    }
}

const res = sessionData()
document.getElementById("user-info").innerHTML = res.firstname
if (res.success) {
    appendBooking(res.bookingData)
} else {
    document.getElementById("bookings").innerHTML = "No Bookings Available"
}