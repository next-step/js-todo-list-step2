export default function (model) {
	return function (url, options) {
		model.isLoading = true;

		return fetch(url, options)
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error(res.error);
				}
			})
			.catch((err) => console.error(err))
			.finally(() => setTimeout(() => (model.isLoading = false), 500));
	};
}
