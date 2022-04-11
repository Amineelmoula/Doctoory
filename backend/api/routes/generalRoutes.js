const express = require("express");
const {
	getAppointments,
	getDoctors,
	requestAppointment,
	approveAppointment,
	getUser,
} = require("../controllers/appointment");
const { Role } = require("../helpers/constants");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

router.get("/me", authMiddleware(), getUser);
router.get("/doctors", authMiddleware(Role.PATIENT), getDoctors);

router
	.route("/patient/appointments")
	.all(authMiddleware(Role.PATIENT))
	.get(getAppointments)
	.post(requestAppointment);

router
	.route("/doctor/appointments")
	.all(authMiddleware(Role.DOCTOR))
	.get(getAppointments)
	.post(approveAppointment);

module.exports = router;
