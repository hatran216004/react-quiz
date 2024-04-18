import axios from "../utils/axiosCustomize";

export const postCreateNewUser = (email, password, username, role, avatar) => {
    // submit data
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", avatar);

    return axios.post("v1/participant", data);
};

export const getAllUser = () => {
    return axios.get("v1/participant/all");
};
