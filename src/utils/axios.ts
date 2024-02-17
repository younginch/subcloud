import axios from "axios";

const Axios = axios.create();

Axios.defaults.transformResponse = [
  (data, headers) => {
    if (headers) {
      // eslint-disable-next-line no-param-reassign
      headers["Content-Type"] = "application/json";
    }
    return JSON.stringify(this, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    );
  },
];

export default Axios;
