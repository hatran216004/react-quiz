import './DetailQuiz.scss';
import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import _ from 'lodash';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import { getDataQuiz, postSubmitQuiz } from '../../../services/apiServices';
import Question from '../Question';
import ModalSubmitQuiz from '../ModalSubmitQuiz';
import DetailQuizRight from '../DetailQuizRight';

const DetailQuiz = () => {
    const [dataQuiz, setDataQuiz] = useState([]);
    const [currQuestion, setCurrQuestion] = useState(0);

    const [showModalSubmit, setShowModalSubmit] = useState(false);
    const [dataResult, setDataResult] = useState();

    const params = useParams();
    const quizId = params.id;
    const location = useLocation();

    useEffect(() => {
        fetchQuestion();
    }, [quizId]);

    const fetchQuestion = async () => {
        const res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                .groupBy('id') // groupby các obj có id giống nhau vào cùng 1 mảng
                .map((value, key) => {
                    // value: mỗi mảng gồm các obj có cùng id
                    // key: id
                    let answers = []; // mảng chứa các câu trl của mỗi obj
                    let questionDesc,
                        image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDesc = item.description;
                            image = item.image;
                        }
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    });
                    answers = _.orderBy(answers, ['id'], ['asc']);
                    return { questionId: key, answers, questionDesc, image };
                })
                .value();
            setDataQuiz(data);
        }
    };

    const handlePrevQuestion = () => {
        if (currQuestion - 1 < 0) {
            return;
        }
        setCurrQuestion(currQuestion - 1);
    };

    const handleNextQuestion = () => {
        if (currQuestion + 1 < dataQuiz.length) setCurrQuestion(currQuestion + 1);
        else {
            return;
        }
    };

    const handleCheckbox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz); // clone mảng chứa các câu hỏi
        let question = dataQuizClone.find(
            // tìm câu hỏi có id trùng với questionId
            (item) => +item.questionId === +questionId,
        );
        if (question) {
            // mảng các câu trả lời sau khi cập nhật isSelected
            question.answers = question.answers.map((item) => {
                // tìm phần tử có id trùng với answerId trong mảng answers của question
                if (answerId === item.id) {
                    item.isSelected = !item.isSelected;
                }
                // else {
                //     item.isSelected = false;
                // }
                return item;
            });
        }
        let index = dataQuizClone.findIndex((item) => +item.questionId === +questionId);
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
        }
    };

    const handleSubmitQuiz = async () => {
        // custom data
        let payload = {
            quizId: +quizId,
            answers: [],
        };

        dataQuiz.forEach((question) => {
            let userAnswerId = []; // mảng chứa id của các câu trl được check
            question.answers.forEach((answer) => {
                if (answer.isSelected) {
                    userAnswerId.push(answer.id);
                }
            });

            payload.answers.push({
                questionId: +question.questionId, // id của mỗi question
                userAnswerId,
            });
        });

        // call api
        let res = await postSubmitQuiz(payload);
        if (res && res.EC === 0) {
            setShowModalSubmit(true);
            setDataResult(res.DT);
        }
    };

    return (
        <>
            <div className="detail-quiz-container mt-3">
                <div className="container">
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/users">Users</Breadcrumb.Item>
                        <Breadcrumb.Item active>Quiz</Breadcrumb.Item>
                    </Breadcrumb>
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="detail-quiz-left">
                                <div className="detail-quiz-title">
                                    Quiz {quizId}. {location?.state?.quizTitle}
                                </div>
                                <Question
                                    handleCheckbox={handleCheckbox}
                                    currQuestion={currQuestion}
                                    dataQuiz={dataQuiz.length > 0 && dataQuiz[currQuestion]}
                                />
                                <div className="detail-quiz-footer mt-5">
                                    <button className="btn-custom question-btn" onClick={handlePrevQuestion}>
                                        Back
                                    </button>
                                    <button className="btn-custom question-btn" onClick={handleNextQuestion}>
                                        Next
                                    </button>
                                    <button className="btn-custom btn-primary" onClick={handleSubmitQuiz}>
                                        Finish
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3">
                            <DetailQuizRight
                                dataQuiz={dataQuiz.length > 0 && dataQuiz}
                                handleSubmitQuiz={handleSubmitQuiz}
                                setCurrQuestion={setCurrQuestion}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ModalSubmitQuiz
                show={showModalSubmit}
                setShow={setShowModalSubmit}
                dataResult={dataResult ? dataResult : {}}
            />
        </>
    );
};

export default DetailQuiz;
