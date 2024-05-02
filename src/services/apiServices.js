import axios from "../utils/axiosCustomize";

export const postCreateNewUser = (email, password, username, role, image) => {
    // submit data
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);

    return axios.post("v1/participant", data);
};

export const getAllUser = () => {
    return axios.get("v1/participant/all");
};

export const putUpdateUser = (id, username, role, image) => {
    // update data
    const data = new FormData();
    data.append("id", id);
    data.append("username", username);
    data.append("role", role);
    data.append("userImage", image);

    return axios.put("v1/participant", data);
};

export const deleteUser = (id) => {
    return axios.delete("v1/participant", { data: { id } });
};

export const getUserWithPaginate = (page, limit) => {
    return axios.get(`v1/participant?page=${page}&limit=${limit}`);
};

export const postLogin = (email, password) => {
    return axios.post("v1/login", { email, password, delay: 2000 });
};

export const postSignup = (email, username, password) => {
    return axios.post("v1/register", { email, username, password });
};

export const getQuizByUser = () => {
    return axios.get("v1/quiz-by-participant");
};

export const getDataQuiz = (id) => {
    return axios.get(`v1/questions-by-quiz?quizId=${id}`);
};

export const postSubmitQuiz = (data) => {
    return axios.post(`v1/quiz-submit`, { ...data });
};

export const postCreateNewQuiz = (desc, name, difficulty, image) => {
    // submit data
    const data = new FormData();
    data.append("description", desc);
    data.append("name", name);
    data.append("difficulty", difficulty);
    data.append("quizImage", image);

    return axios.post("v1/quiz", data);
};

export const getAllQuizForAdmin = () => {
    return axios.get(`v1/quiz/all`);
};

export const deleteQuiz = (id) => {
    return axios.delete(`v1/quiz/${id}`);
};

export const putUpdateQuiz = (id, name, desc, difficulty, image) => {
    // update data
    const data = new FormData();
    data.append("id", id);
    data.append("description", desc);
    data.append("name", name);
    data.append("difficulty", difficulty);
    data.append("quizImage", image);

    return axios.put("v1/quiz", data);
};
