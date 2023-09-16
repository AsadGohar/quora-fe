import * as Yup from "yup";

export const SignUpSchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.when("isSignup", {
			is: true,
			then: () => Yup.string().trim().required("name is required"),
		}),
	age: Yup.string()
		.trim()
		.when("isSignup", {
			is: true,
			then: () => Yup.string().trim().required("age is required"),
		}),
	gender: Yup.string()
		.trim()
		.when("isSignup", {
			is: true,
			then: () => Yup.string().trim().required("gender is required"),
		}),
	username: Yup.string()
		.trim()
		.when("isSignup", {
			is: true,
			then: () => Yup.string().trim().required("username is required"),
		}),
	email: Yup.string()
		.trim()
		.email("invalid email")
		.required("email is Required"),
	password: Yup.string()
		.trim()
		.min(8, "password too short")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&*])(?=.{8,})/,
			"password isn't strong enough"
		)
		.required("password is required"),
});

export const LoginSchema = Yup.object().shape({
	name: Yup.string()
		.trim()
		.when("isSignup", {
			is: true,
			then: () => Yup.string().trim().required("name is required"),
		}),
	email: Yup.string()
		.trim()
		.email("invalid email")
		.required("email is Required"),
	consituency: Yup.string()
		.trim()
		.when("isSignup", {
			is: true,
			then: () => Yup.string().trim().required("name is required"),
		}),
	password: Yup.string().trim().required("password is required"),
});

export const AddTopicSchema = Yup.object().shape({
	title: Yup.string().trim().required("title is required"),
	description: Yup.string().trim().required("description is required")
});

export const CreateQuestionSchema = Yup.object().shape({
	body: Yup.string().trim().required("title is required"),
});

