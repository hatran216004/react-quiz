import "./Question.scss";
import _ from "lodash";
import no_image from "../../../assets/img/no-img.jpg";

const Question = ({ currQuestion, dataQuiz }) => {
    if (_.isEmpty(dataQuiz)) {
        return <></>;
    }

    // console.log(dataQuiz);

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
                                    <div
                                        key={`answear-${index}`}
                                        className="question-answer"
                                    >
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                value=""
                                            />
                                            <label className="form-check-label">
                                                {item.description}
                                            </label>
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Question;
