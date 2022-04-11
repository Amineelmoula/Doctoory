const { Role } = require("../helpers/constants");
const User = require("../models/user");
const Appointment = require("../models/appointment");

exports.getUser = (req, res) => {
	res.status(200).json({ success: true, data: req.user });
};
exports.getAppointments = (req, res, next) => {
	const id = req.user.id;
	// we can add filtering on approved appointments only
	try {
		const appointments = Appointment.find({ requester: id });
	} catch (error) {}
};

exports.getDoctors = async (req, res, next) => {
	try {
		const doctors = await User.find({ role: Role.DOCTOR });
		res.status(200).json({ success: true, data: doctors });
	} catch (error) {
		next(error);
	}
};

exports.requestAppointment = (req, res, next) => {};
exports.approveAppointment = (req, res, next) => {};
