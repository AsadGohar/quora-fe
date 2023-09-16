import { AxiosError } from "axios";

type EnqueueSnackbar = (message: string, options: { variant: string }) => void;

export const handleFormSubmission = async (
	submissionFunction: (values: any) => Promise<any>,
	values: any,
	enqueueSnackbar: EnqueueSnackbar,
	errorMessage = "Failed to perform the action"
): Promise<void> => {
	try {
		const result = await submissionFunction(values);
		if (result) {
			enqueueSnackbar(result.message, {
				variant: "success",
			});
		}
	} catch (error) {
		console.log(error);
		if (error instanceof AxiosError) {
			enqueueSnackbar(error.response?.data.message, {
				variant: "error",
			});
		} else {
			enqueueSnackbar(errorMessage, {
				variant: "error",
			});
		}
	}
};
