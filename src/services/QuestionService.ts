import { CREATE_QUESTION, GET_ALL_USER_QUESTIONS } from "../utils/consts";
import AxiosInstance from "./axiosInstance";

export const create = async (data: any) => {
	const response = await AxiosInstance.post(CREATE_QUESTION, data);
	return response.data;
};

export const getAllUserFollowedTopicQuestions = async (data: any) => {
	const response = await AxiosInstance.get(
		`${GET_ALL_USER_QUESTIONS}/${data}`,
		data
	);
	return response.data;
};
