import axios from "axios";

export default axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "9b52f58c9fee38484acbc1e6d1de5888",
  },
});
