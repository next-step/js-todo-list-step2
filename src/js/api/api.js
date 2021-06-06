import {baseAPI} from "../config/config.js";

export default {
	getFetch: async function (url) {
		try {
			const data = await fetch(`${baseAPI}${url}`).then((response) => response.json());
			return data;
		} catch (e) {
			console.log("[err] ", e);
		}
	},

	postFetch: async function (url, obj) {
		try {
			const res = await fetch(`${baseAPI}${url}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(obj)
			})
			.then((response) => response.json());
		} catch (e) {
			console.log("[err] ", e);
		}
	},

	putFetch: async function (url, obj) {
		try {
			const res = await fetch(`${baseAPI}${url}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(obj)
			})
			.then((response) => response.json());
		} catch (e) {
			console.log("[err] ", e);
		}
	},

	deleteFetch: async function (url) {
		try {
			const res = await fetch(`${baseAPI}${url}`, {
				method: "DELETE"
			})
			.then((response) => response.json());
		} catch (e) {
			console.log("[err] ", e);
		}
	}

}
