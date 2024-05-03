import './Questions.scss';
import '../../../User/Question/Question.scss';
import {
    getAllQuizForAdmin,
    postCreateQuestionForQuiz,
    postCreateAnswerForQuiz,
} from '../../../../services/apiServices';

import { FaImage } from 'react-icons/fa';
import { FaCirclePlus, FaCircleMinus } from 'react-icons/fa6';
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import 'lightgallery/scss/lightgallery.scss';
import 'lightgallery/scss/lg-zoom.scss';
import LightGallery from 'lightgallery/react';
import lgZoom from 'lightgallery/plugins/zoom';

const Questions = () => {
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [listQuiz, setListQuiz] = useState([]);

    const [questions, setQuestions] = useState([
        {
            id: uuidv4(),
            desc: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    desc: '',
                    isCorrect: false,
                },
            ],
        },
    ]);

    // useEffect(() => {
    //     return () => {
    //         URL.revokeObjectURL();
    //     };
    // }, []);

    useEffect(() => {
        fetchListQuiz();
    }, []);

    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            const data = res.DT.map((quiz) => {
                return {
                    value: quiz.id,
                    label: `${quiz.id} - ${quiz.name}`,
                };
            });

            setListQuiz(data);
        }
    };

    const handleUploadImage = (e, idQuestion) => {
        let questionsClone = _.cloneDeep(questions);
        const question = questionsClone.find((item) => {
            return item.id === idQuestion;
        });

        const file = e.target.files[0];
        if (question && file) {
            question.imageFile = file;
            question.imageName = file.name;
            setQuestions(questionsClone);
            e.target.value = null;
        }
    };

    const handleAddRemoveQuestion = (type, idQuestion) => {
        switch (type) {
            case 'ADD': {
                const newQuestions = {
                    id: uuidv4(),
                    desc: '',
                    imageFile: '',
                    imageName: '',
                    answers: [
                        {
                            id: uuidv4(),
                            desc: '',
                            isCorrect: false,
                        },
                    ],
                };
                setQuestions((prev) => [...prev, newQuestions]);
                break;
            }
            case 'REMOVE': {
                let questionsClone = _.cloneDeep(questions);
                const newQuestions = questionsClone.filter((question) => {
                    return question.id !== idQuestion;
                });
                setQuestions(newQuestions);
                break;
            }
            default:
                return;
        }
    };

    const handleAddRemoveAnswer = (type, idQuestion, idAnswer) => {
        let questionsClone = _.cloneDeep(questions);
        switch (type) {
            case 'ADD': {
                const question = questionsClone.find((item) => {
                    return item.id === idQuestion;
                });

                if (question) {
                    const newAnswer = {
                        id: uuidv4(),
                        desc: '',
                        isCorrect: false,
                    };
                    question.answers.push(newAnswer);
                    setQuestions(questionsClone);
                }
                break;
            }
            case 'REMOVE': {
                const question = questionsClone.find((item) => {
                    return item.id === idQuestion;
                });

                if (question) {
                    question.answers = question.answers.filter((answer) => {
                        return answer.id !== idAnswer;
                    });
                    setQuestions(questionsClone);
                }
                break;
            }
            default:
                return;
        }
    };

    const handleOnChange = (e, type, idQuestion) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions);
            const question = questionsClone.find((item) => {
                return item.id === idQuestion;
            });
            if (question) {
                question.desc = e.target.value;
                setQuestions(questionsClone);
            }
        }
    };

    const handleAnswerQuestion = (e, type, idQuestion, idAnswer) => {
        let questionsClone = _.cloneDeep(questions);
        const question = questionsClone.find((item) => {
            return item.id === idQuestion;
        });

        if (question) {
            question.answers = question.answers.map((answer) => {
                if (answer.id === idAnswer) {
                    if (type === 'CHECKBOX') {
                        !answer.isCorrect ? (answer.isCorrect = true) : (answer.isCorrect = false);
                    }
                    if (type === 'INPUT') {
                        answer.desc = e.target.value;
                    }
                }
                return answer;
            });
        }
        setQuestions(questionsClone);
    };

    const handleSubmitQuestions = async () => {
        // validate

        // submit question & answers
        await Promise.all(
            questions.map(async (question) => {
                const dataQuestion = await postCreateQuestionForQuiz(
                    selectedQuiz.value,
                    question.desc,
                    question.imageFile,
                );

                await Promise.all(
                    question.answers.map(async (answer) => {
                        await postCreateAnswerForQuiz(answer.desc, answer.isCorrect, dataQuestion.DT.id);
                    }),
                );
            }),
        );
    };

    return (
        <div className="manage-quiz-container pb-5">
            <h1 className="manage-questions-title">Manage Questions</h1>
            <div className="manage-questions-content mt-3">
                <div className="manage-questions-add">
                    <h3 className="manage-questions-add-title">Add New Question</h3>
                    <div className="manage-questions-select-quiz">
                        <BsQuestionCircleFill color="#8a2be2" size="2rem" />
                        <div>
                            <label htmlFor="input-quiz-difficult" className="form-label">
                                Select Quiz
                            </label>
                            <Select options={listQuiz} defaultValue={selectedQuiz} onChange={setSelectedQuiz} />
                        </div>
                    </div>

                    {questions.length > 0 &&
                        questions.map((question, index) => {
                            return (
                                <form className="manage-questions-form" key={question.id}>
                                    <div className="manage-questions-form-group">
                                        <div className="questions-content">
                                            <div>
                                                <label htmlFor="input-quiz-desc" className="form-label">
                                                    Question {index + 1}
                                                </label>
                                                <input
                                                    className="form-control"
                                                    id="input-quiz-desc"
                                                    type="text"
                                                    value={question.desc}
                                                    onChange={(e) => handleOnChange(e, 'QUESTION', question.id)}
                                                    placeholder="Enter your description..."
                                                />
                                            </div>
                                        </div>

                                        <div className="manage-answers-list">
                                            {question.answers.length > 0 &&
                                                question.answers.map((answer) => {
                                                    return (
                                                        <div className="manage-answers-item" key={answer.id}>
                                                            <div
                                                                className="question-answer manage-answers-item-checkbox"
                                                                onClick={(e) =>
                                                                    handleAnswerQuestion(
                                                                        e,
                                                                        'CHECKBOX',
                                                                        question.id,
                                                                        answer.id,
                                                                    )
                                                                }
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    hidden
                                                                    checked={answer.isCorrect}
                                                                    readOnly
                                                                />
                                                                <p></p>
                                                            </div>
                                                            <input
                                                                type="text"
                                                                className="manage-answers-item-input"
                                                                placeholder="Enter your answer..."
                                                                value={answer.desc}
                                                                onChange={(e) =>
                                                                    handleAnswerQuestion(
                                                                        e,
                                                                        'INPUT',
                                                                        question.id,
                                                                        answer.id,
                                                                    )
                                                                }
                                                            />
                                                            <FaCirclePlus
                                                                className="manage-answers-item-icon"
                                                                onClick={() =>
                                                                    handleAddRemoveAnswer('ADD', question.id)
                                                                }
                                                            />
                                                            {question.answers.length > 1 && (
                                                                <FaCircleMinus
                                                                    className="manage-answers-item-icon"
                                                                    onClick={() =>
                                                                        handleAddRemoveAnswer(
                                                                            'REMOVE',
                                                                            question.id,
                                                                            answer.id,
                                                                        )
                                                                    }
                                                                />
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                        </div>
                                    </div>

                                    <div className="form-preview-image align-items-center">
                                        <label
                                            className="form-label modal-btn-upload manage-questions-upload"
                                            htmlFor={question.id}
                                        >
                                            <FaImage className="modal-upload-icon" color="blueviolet" />
                                            Upload image
                                        </label>

                                        {question.imageFile ? (
                                            <LightGallery speed={500} plugins={[lgZoom]}>
                                                <a href={URL.createObjectURL(question.imageFile)}>
                                                    <img
                                                        alt={question.imageName}
                                                        src={URL.createObjectURL(question.imageFile)}
                                                        className="img-preview-quiz"
                                                    />
                                                </a>
                                            </LightGallery>
                                        ) : (
                                            <p className="clip-text">No images have been uploaded</p>
                                        )}
                                        <input
                                            type="file"
                                            hidden
                                            id={question.id}
                                            onChange={(e) => handleUploadImage(e, question.id)}
                                        />
                                    </div>

                                    <div className="manage-questions-actions">
                                        <CiCirclePlus
                                            color="rgb(47, 182, 47)"
                                            onClick={() => handleAddRemoveQuestion('ADD')}
                                        />
                                        {questions.length > 1 && (
                                            <CiCircleMinus
                                                color="red"
                                                onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}
                                            />
                                        )}
                                    </div>
                                </form>
                            );
                        })}

                    <button className="btn-custom btn-primary ms-auto mt-3" onClick={handleSubmitQuestions}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Questions;
