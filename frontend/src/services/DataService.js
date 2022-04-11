import axios from "../config/http-client";
import { authHeader } from "../utils/helpers";

export class DataService {
	static async getUser(accessToken) {
		const { data } = await axios.get("/me", authHeader(accessToken));
		return data?.data;
	}

	async getDoctorsList(accessToken) {
		const { data } = await axios.get("/doctors", authHeader(accessToken));
	}

	async getAppointments(role, accessToken) {
		const { data } = await axios.get(
			`/${role}/appointments`,
			authHeader(accessToken)
		);
	}

	async requestAppointment(accessToken) {
		const { data } = await axios.post(
			"/patient/appointments",
			{},
			authHeader(accessToken)
		);
	}

	async approveAppointment(accessToken) {
		const { data } = await axios.post(
			"/doctor/appointments",
			{},
			authHeader(accessToken)
		);
	}
}
