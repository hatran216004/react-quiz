import './Question.scss';
import _ from 'lodash';
import no_image from '../../../assets/img/no-img.jpg';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';
import { FaCheck } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

const Question = ({ currQuestion, dataQuiz, handleCheckbox, showAnswer }) => {
    if (_.isEmpty(dataQuiz)) {
        return <></>;
    }

    console.log(dataQuiz);
    return (
        <div className="question-wrapper">
            <h1 className="question-title">
                Question {currQuestion + 1}: {dataQuiz.questionDesc} ?
            </h1>
            <div className="row align-items-center">
                <div className="col-md-6">
                    <div className="question-img-wrapper">
                        {dataQuiz.image ? (
                            <LightGallery speed={500} plugins={[lgZoom]} elementClassNames="question-img">
                                <a href={`data:image/jpeg;base64,${dataQuiz.image}`}>
                                    <img
                                        alt={`question-img-${currQuestion + 1}`}
                                        src={`data:image/jpeg;base64,${dataQuiz.image}`}
                                        className="img-preview-quiz"
                                    />
                                </a>
                            </LightGallery>
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
                                    <label key={`answer-${index}`} className="question-answer">
                                        <input
                                            hidden
                                            type="checkbox"
                                            value=""
                                            checked={item.isSelected}
                                            onChange={() => handleCheckbox(item.id, dataQuiz.questionId)}
                                        />
                                        <p>{item.description}</p>
                                        {showAnswer && (
                                            <>
                                                {item.isCorrect ? (
                                                    <FaCheck className="question-answer-icon" color="green" />
                                                ) : (
                                                    <IoMdClose
                                                        className="question-answer-icon"
                                                        size="1.5rem"
                                                        color="red"
                                                    />
                                                )}
                                            </>
                                        )}
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
