const getFetchConfigure = (method, data) => {
	switch (method) {
		case "POST":
			return {
				method,
				body: JSON.stringify(data),
				headers: {
					"Content-Type": "application/json"
				}
			};
		case "GET":
		default:
			return {
				method
			};
	}
};

const request = async (url, method = "GET", body = {}) => {
	const configuration = getFetchConfigure(method, body);

	try {
		const response = await fetch(url, configuration);
		const result = await response.json();
		return {
			response: result,
			error: false,
			errorMessage: ""
		};
	} catch (e) {
		return {
			response: null,
			error: true,
			errorMessage: e.message
		};
	}
};

export default request;
