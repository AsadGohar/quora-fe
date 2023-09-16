import {
	SIGNUP,
	LOGIN,
	UPLOAD_USER_PROFILE_PIC,
	FOLLOW_TOPIC,
} from "../utils/consts";
import AxiosInstance from "./axiosInstance";
import { AxiosError } from "axios";
import { ILogin, ISignup } from "../utils/interfaces";

export const signup = async (data: ISignup) => {
	const response = await AxiosInstance.post(SIGNUP, data);
	if (response instanceof AxiosError) {
		localStorage.setItem("user", JSON.stringify(response.data.user));
		return response.response?.data;
	}
	return response.data;
};

export const login = async (data: ILogin) => {
	try {
		const response = await AxiosInstance.post(LOGIN, data);
		return response.data;
	} catch (error) {
		return error;
	}
};

export const followTopic = async (data: any) => {
	const response = await AxiosInstance.post(FOLLOW_TOPIC, data);
	return response.data;
};

export const uploadProfilePic = async (picture: any, id: string) => {
	const response = await AxiosInstance.post(UPLOAD_USER_PROFILE_PIC, {
		picture,
		id,
	});
	return response.data;
};
