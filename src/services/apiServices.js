import axios from '../utils/axiosCustomize';

export const postCreateNewUser = (email, password, username, role, image) => {
    // submit data
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.post('v1/participant', data);
};

export const getAllUser = () => {
    return axios.get('v1/participant/all');
};

export const putUpdateUser = (id, username, role, image) => {
    // update data
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);

    return axios.put('v1/participant', data);
};

export const deleteUser = (id) => {
    return axios.delete('v1/participant', { data: { id } });
};

export const getUserWithPaginate = (page, limit) => {
    return axios.get(`v1/participant?page=${page}&limit=${limit}`);
};

export const postLogin = (email, password) => {
    return axios.post('v1/login', { email, password, delay: 2000 });
};

export const postLogout = (email, refresh_token) => {
    return axios.post('v1/logout', { email, refresh_token, delay: 2000 });
};

export const postSignup = (email, username, password) => {
    return axios.post('v1/register', { email, username, password });
};

export const getQuizByUser = () => {
    return axios.get('v1/quiz-by-participant');
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
    data.append('description', desc);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);

    return axios.post('v1/quiz', data);
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
    data.append('id', id);
    data.append('description', desc);
    data.append('name', name);
    data.append('difficulty', difficulty);
    data.append('quizImage', image);

    return axios.put('v1/quiz', data);
};

export const postCreateQuestionForQuiz = (id, desc, image) => {
    const data = new FormData();
    data.append('quiz_id', id);
    data.append('description', desc);
    data.append('questionImage', image);

    return axios.post('v1/question', data);
};

export const postCreateAnswerForQuiz = (description, correct_answer, question_id) => {
    return axios.post('v1/answer', {
        description,
        correct_answer,
        question_id,
    });
};

export const postAssignQuiz = (quizId, userId) => {
    return axios.post('v1/quiz-assign-to-user', { quizId, userId });
};

export const getQuizWithQA = (quizId) => {
    return axios.get(`v1/quiz-with-qa/${quizId}`);
};

export const postUpSertQA = (data) => {
    return axios.post('v1/quiz-upsert-qa', { ...data });
};

export const getDashboardOverview = () => {
    return axios.get('v1/overview');
};

export const refreshToken = (email, refresh_token) => {
    return axios.post('v1/refresh-token', { email, refresh_token });
};

export const postUpdateProfile = (username, userImage) => {
    const data = new FormData();
    data.append('username', username);
    data.append('userImage', userImage);

    return axios.post('v1/profile', data);
};

export const postChangePassword = (current_password, new_password) => {
    return axios.post('v1/change-password', { current_password, new_password });
};

export const getHistoryQuiz = () => {
    return axios.get('v1/history');
};
