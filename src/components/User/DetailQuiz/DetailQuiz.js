import "./DetailQuiz.scss";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../../services/apiServices";
import Question from "../Question";
import _ from "lodash";

const DetailQuiz = () => {
    const [dataQuiz, setDataQuiz] = useState([]);
    const [currQuestion, setCurrQuestion] = useState(0);

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
                .groupBy("id")
                .map((value, key) => {
                    // value: array include objects with same id
                    // key: id
                    let answers = []; // array include answers
                    let questionDesc,
                        image = null;
                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDesc = item.description;
                            image = item.image;
                        }
                        answers.push(item.answers);
                    });
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
        if (currQuestion + 1 < dataQuiz.length)
            setCurrQuestion(currQuestion + 1);
        else {
            return;
        }
    };

    return (
        <div className="detail-quiz-container mt-3">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="detail-quiz-left">
                            <div className="detail-quiz-title">
                                Quiz {quizId}. {location?.state?.quizTitle}
                            </div>
                            <Question
                                currQuestion={currQuestion}
                                dataQuiz={
                                    dataQuiz.length > 0 &&
                                    dataQuiz[currQuestion]
                                }
                            />
                            <div className="detail-quiz-footer mt-5">
                                <button
                                    className="btn-custom question-btn"
                                    onClick={handlePrevQuestion}
                                >
                                    Back
                                </button>
                                <button
                                    className="btn-custom question-btn"
                                    onClick={handleNextQuestion}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="detail-quiz-right">
                            Detail quiz right
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailQuiz;
