import './Questions.scss';
import '../../../User/Question/Question.scss';
import { FaImage } from 'react-icons/fa';
import { FaCirclePlus, FaCircleMinus } from 'react-icons/fa6';
import { CiCirclePlus, CiCircleMinus } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';

const Questions = () => {
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [image, setImage] = useState();
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

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    // useEffect(() => {
    //     return () => {
    //         image && URL.revokeObjectURL(image.preview);
    //     };
    // }, [image]);

    const handleUploadImage = (e, idQuestion) => {
        let questionsClone = _.cloneDeep(questions);

        const question = questionsClone.find((item) => {
            return item.id === idQuestion;
        });

        if (question && e.target.files[0]) {
            const file = e.target.files[0];
            // file.preview = URL.createObjectURL(file);
            // setImage(file);
            e.target.value = null;

            question.imageFile = file;
            question.imageName = file.name;
            setQuestions(questionsClone);
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
        switch (type) {
            case 'QUESTION': {
                let questionsClone = _.cloneDeep(questions);
                const question = questionsClone.find((item) => {
                    return item.id === idQuestion;
                });
                if (question) {
                    question.desc = e.target.value;
                    setQuestions(questionsClone);
                }
                break;
            }
            case 'ANSWERS': {
                break;
            }
            default:
                return;
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

    const handleSubmitQuestions = () => {
        console.log(questions);
    };

    return (
        <div className="manage-quiz-container pb-5">
            <h1 className="manage-questions-title">Manage Questions</h1>
            <div className="manage-questions-content mt-3">
                <div className="manage-questions-add">
                    <h3 className="manage-questions-add-title">Add New Question</h3>
                    {questions.length > 0 &&
                        questions.map((question, index) => {
                            return (
                                <form className="manage-questions-form" key={question.id}>
                                    <div className="manage-questions-form-group">
                                        <div className="questions-content">
                                            <div>
                                                <label htmlFor="input-quiz-difficult" className="form-label">
                                                    Select Quiz
                                                </label>
                                                <Select
                                                    options={options}
                                                    defaultValue={selectedQuiz}
                                                    onChange={setSelectedQuiz}
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="input-quiz-desc" className="form-label">
                                                    Question {index + 1} description
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

                                    <div className="form-preview-image align-self-center">
                                        <label
                                            className="form-label modal-btn-upload manage-questions-upload"
                                            htmlFor={question.id}
                                        >
                                            <FaImage className="modal-upload-icon" color="blueviolet" />
                                            {image ? 'Preview image' : 'Upload image'}
                                        </label>
                                        {/* <div className="img-preview-quiz img-preview-quiz-bg">
                                            {image ? <img src={image.preview} alt="" /> : <span>Preview image</span>}
                                        </div> */}
                                        <p className="clip-text">
                                            {question.imageName ? question.imageName : 'No images have been uploaded'}
                                        </p>
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
