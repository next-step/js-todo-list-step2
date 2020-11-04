import { requestFetch } from "../../shared/utils/repository.js";
import { BASE_URL } from "../../shared/utils/constants.js";

class Api {
  static requestUser() {
    return requestFetch({
      url: BASE_URL,
      method: "GET",
      uri: "/api/users"
    });
  }
}

export default Api;
