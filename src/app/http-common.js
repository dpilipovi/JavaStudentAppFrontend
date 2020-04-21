import axios from "axios-observable";

export default axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-type": "application/json"/*,
    "Authorization": store.state.token*/
  }
});
