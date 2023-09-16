import { CREATE_TOPIC, GET_ALL_TOPICS, GET_TOPIC_DETAILS } from "../utils/consts";
import AxiosInstance from "./axiosInstance";

export const create = async (data: any) => {
	const response = await AxiosInstance.post(CREATE_TOPIC, data);
	return response.data;
};

export const getAll = async () => {
	const response = await AxiosInstance.get(GET_ALL_TOPICS)
	return response.data;
};

export const getDetails = async (data: any) => {
	const response = await AxiosInstance.post(GET_TOPIC_DETAILS, data)
	return response.data;
};
