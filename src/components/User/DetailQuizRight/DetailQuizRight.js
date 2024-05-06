import React from 'react';
import '../DetailQuiz/DetailQuiz.scss';

const DetailQuizRight = ({ dataQuiz }) => {
    return (
        <div className="detail-quiz-right">
            <div className="main-timer">60 : 00</div>
            <div className="detail-quiz-right-questions">
                <div className="row gy-3">
                    {dataQuiz.length > 0 &&
                        dataQuiz.map((item, index) => {
                            return (
                                <div className="col-md-3" key={index}>
                                    <div className="detail-quiz-right-question">{index + 1}</div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default DetailQuizRight;
