import "./DetailQuiz.scss";
import { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../../services/apiServices";
import _ from "lodash";

const DetailQuiz = () => {
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
        }
    };

    return (
        <div className="detail-quiz-container mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="detail-quiz-left">
                            <div className="detail-quiz-title">
                                Quiz: {quizId}. {location?.state?.quizTitle}
                            </div>
                            <div className="detail-quiz-img">
                                <img src="" alt="" /> img
                            </div>
                            <div className="detail-quiz-info">
                                <div className="detail-quiz-question">
                                    Question: 1. ewqe
                                </div>
                                <div className="detail-quiz-answer">
                                    <div>A. qweq</div>
                                    <div>B. eqwe</div>
                                </div>
                            </div>
                            <div className="detail-quiz-footer">
                                <button className="btn btn-outline-danger">
                                    Back
                                </button>
                                <button className="btn btn-outline-info">
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
