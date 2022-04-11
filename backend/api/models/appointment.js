const mongoose = require("mongoose");
const { RequestState } = require("../helpers/constants");

const AppointmentSchema = new mongoose.Schema({
	date: { type: Date, required: true },
	description: { type: String, required: false },
	target: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "user",
	},
	requester: { type: String, required: true, unique: true },
	state: {
		type: Number,
		enum: Object.values(RequestState),
		default: RequestState.Pending,
	},
});

AppointmentSchema.pre("find", function (next) {
	this.populate("target").populate("requester");
	next();
});

AppointmentSchema.pre("findOne", function (next) {
	this.populate("target").populate("requester");
	next();
});
module.exports = mongoose.model("appointment", AppointmentSchema);
