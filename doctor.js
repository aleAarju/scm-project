document.getElementById("appointmentForm").addEventListener("submit", function(e){

    e.preventDefault();

    alert("Appointment Booked Successfully!");

    document.getElementById("appointmentForm").reset();

});