import axios from "axios";

export default ()=>{
    return axios.create({
        baseURL: "https://picsum.photos/v2/list",
    })
}