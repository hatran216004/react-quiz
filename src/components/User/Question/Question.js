import "./Question.scss";
import _ from "lodash";
import no_image from "../../../assets/img/no-img.jpg";
import { useState } from "react";

const Question = ({ currQuestion, dataQuiz, handleCheckbox }) => {
    // const [checked, setChecked] = useState();

    if (_.isEmpty(dataQuiz)) {
        return <></>;
    }

    const handleCheckAnswer = (e, answerId, questionId) => {
        // setChecked(answerId);
        handleCheckbox(answerId, questionId);
    };

    return (
        <div className="question-wrapper">
            <div className="row align-items-center">
                <h1 className="question-title">
                    Question {currQuestion + 1}: {dataQuiz.questionDesc} ?
                </h1>
                <div className="col-md-6">
                    <div className="question-img">
                        {dataQuiz.image ? (
                            <img
                                src={`data:image/jpeg;base64,${dataQuiz.image}`}
                                alt=""
                            />
                        ) : (
                            <img src={no_image} alt="" className="img-border" />
                        )}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="question-answer-wrapper">
                        {dataQuiz.answers.length > 0 &&
                            dataQuiz.answers.map((item, index) => {
                                return (
                                    <label
                                        key={`answer-${index}`}
                                        className="question-answer"
                                    >
                                        <input
                                            hidden
                                            type="checkbox"
                                            value=""
                                            checked={item.isSelected}
                                            onChange={(e) =>
                                                handleCheckAnswer(
                                                    e,
                                                    item.id,
                                                    dataQuiz.questionId
                                                )
                                            }
                                        />
                                        <p>{item.description}</p>
                                    </label>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Question;
