// export const baseAPI = "https://js-todo-list-9ca3a.df.r.appspot.com";
import { baseAPI } from "../config/config.js";

// export function app () {
// 	const getFetch = async () => {
// 		try {
// 			const data = await fetch(`${baseAPI}/api/users`).then((response) => response.json())
// 			console.log(data)
// 			return data;
// 		}
// 		catch (e) {
// 			console.log("err :: ", e);
// 		}
// 	}
// }



export async function getFetch (url) {
		try {
			const data = await fetch(`${baseAPI}${url}`).then((response) => response.json());

			return data;
		}
		catch (e) {
			console.log("err :: ", e);
		}
}