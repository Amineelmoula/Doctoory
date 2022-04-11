const mongoose = require("mongoose");
const { Role } = require("../helpers/constants");
const CategoriesEnum = require("./category");

const UserSchema = new mongoose.Schema({
	firstName: { type: String, require: true },
	lastName: { type: String, require: true },
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		select: false,
		required: true,
	},
	role: {
		type: String,
		enum: [Role.DOCTOR, Role.PATIENT],
		default: Role.PATIENT,
	},
	categories: [{ type: String, refs: CategoriesEnum }],
});

UserSchema.pre("find", function (next) {
	if (this.role == Role.DOCTOR) {
		this.populate("categories", "-password");
	}
	next();
});

module.exports = mongoose.model("user", UserSchema);
