const bcrypt = require('bcrypt');
const User = require('../models/user');
const { BadRequest, NotFound } = require('../utils/errorResponse');
const { generateToken } = require('../helpers/helperFunctions');
const { Role } = require('../helpers/constants');
exports.signUp = async (req, res, next) => {
	console.log('signup');
	const { email, password } = req.body;

	try {
		const user = new User(req.body);
		const found = await User.findOne({ email });
		if (found) {
			throw new BadRequest('Email already exists');
		}
		const salt = 10;
		const hashedpassword = await bcrypt.hash(password, salt);
		user.password = hashedpassword;
		await user.save();

		const accessToken = generateToken(
			user.id,
			process.env.ACCESS_TOKEN_KEY,
			'15m'
		);
		const refreshToken = generateToken(
			user.id,
			process.env.REFRESH_TOKEN_KEY,
			'7d'
		);

		res.cookie('jid', refreshToken, {
			httpOnly: true,
			path: '/api/auth/refresh-token',
		});
		res.status(200).send({ success: true, data: { user, accessToken } });
	} catch (error) {
		next(error);
	}
};

exports.getAccessToken = async (req, res) => {
	const user = req.user;
	const newAccessToken = generateToken(
		user.id,
		process.env.REFRESH_TOKEN_KEY,
		'15m'
	);
	const refreshToken = generateToken(
		user.id,
		process.env.REFRESH_TOKEN_KEY,
		'7d'
	);
	res.cookie('jid', refreshToken, {
		httpOnly: true,
		path: '/api/auth/refresh-token',
	});
	return res
		.status(200)
		.json({ success: true, data: { accessToken: newAccessToken, user } });
};
exports.signIn = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		console.log(email, password);
		const user = await User.findOne({ email }).select('+password');
		if (!user) {
			throw new NotFound('wrong email or password');
		}
		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			throw new BadRequest('wrong email or password');
		}
		const accessToken = generateToken(
			user.id,
			process.env.ACCESS_TOKEN_KEY,
			'15m'
		);

		const refreshToken = generateToken(
			user.id,
			process.env.REFRESH_TOKEN_KEY,
			'7d'
		);
		res.cookie('jid', refreshToken, {
			httpOnly: true,
			path: '/api/auth/refresh-token',
		});

		res.status(200).json({ success: true, data: { user, accessToken } });
	} catch (error) {
		next(error);
	}
};

exports.logout = async (_req, res, _next) => {
	res.cookie('jid', '', {
		httpOnly: true,
		path: '/api/auth/refresh-token',
	});

	res.status(200).json({ success: true, data: null });
};
