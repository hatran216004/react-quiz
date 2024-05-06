import './QuizQA.scss';
import '../../../User/Question/Question.scss';
import { getAllQuizForAdmin, getQuizWithQA, postUpSertQA } from '../../../../services/apiServices';

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
import { toast } from 'react-toastify';

const QuizQA = () => {
    const initQuestions = [
        {
            id: uuidv4(),
            description: '',
            imageFile: '',
            imageName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false,
                },
            ],
        },
    ];
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [listQuiz, setListQuiz] = useState([]);

    const [questions, setQuestions] = useState(initQuestions);

    useEffect(() => {
        fetchListQuiz();
    }, []);

    useEffect(() => {
        selectedQuiz && fetchQuizWithQA();
    }, [selectedQuiz]);

    const fetchQuizWithQA = async () => {
        let res = await getQuizWithQA(selectedQuiz.value);
        // convert image base64 to js obj
        let newQA = [];
        for (let i = 0; i < res.DT.qa.length; i++) {
            let question = res.DT.qa[i];
            if (question.imageFile) {
                question.imageFile = await urltoFile(
                    `data:image/png;base64,${question.imageFile}`,
                    `Question-${question.id}.png`,
                    'image/png',
                );
            }
            newQA.push(question);
        }

        if (res && res.EC === 0) {
            setQuestions(newQA);
        }
    };

    // return a promise that resolves with a File instance
    const urltoFile = async (url, filename, mimeType) => {
        if (url.startsWith('data:')) {
            var arr = url.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[arr.length - 1]),
                n = bstr.length,
                u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            var file = new File([u8arr], filename, { type: mime || mimeType });
            return Promise.resolve(file);
        }
        return fetch(url)
            .then((res) => res.arrayBuffer())
            .then((buf) => new File([buf], filename, { type: mimeType }));
    };

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
                    description: '',
                    imageFile: '',
                    imageName: '',
                    answers: [
                        {
                            id: uuidv4(),
                            description: '',
                            isCorrect: false,
                        },
                    ],
                };
                setQuestions([...questions, newQuestions]);
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
                        description: '',
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
                question.description = e.target.value;
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
                        answer.description = e.target.value;
                    }
                }
                return answer;
            });
        }
        setQuestions(questionsClone);
    };

    const handleValidateQA = () => {
        let isSucceed = true;
        let isValidateAnswer = true;
        let isValidateQuestion = true;
        let isValidateMinLength = true;
        let indexQuestion = 0;
        let indexAnswer = 0;
        let questionMinLength = 4;
        for (let i = 0; i < questions.length; i++) {
            if (!questions[i].description) {
                isValidateQuestion = false;
                indexQuestion = i;
                break;
            }

            if (questions[i].description.length < questionMinLength) {
                isValidateMinLength = false;
                indexQuestion = i;
                break;
            }

            for (let j = 0; j < questions[i].answers.length; j++) {
                if (!questions[i].answers[j].description) {
                    isValidateAnswer = false;
                    indexAnswer = j;
                    break;
                }
            }

            if (!isValidateAnswer) {
                indexQuestion = i;
                break;
            }
        }

        if (!isValidateAnswer) {
            toast.error(`Please enter a answer ${indexAnswer + 1} to ${indexQuestion + 1}`);
            return;
        }

        if (!isValidateQuestion) {
            toast.error(`Please enter a description for question ${indexQuestion + 1}`);
            return;
        }

        if (!isValidateMinLength) {
            toast.error(`Question ${indexQuestion + 1} description needs at least ${questionMinLength} characters`);
            return;
        }

        return isSucceed;
    };

    const handleSubmitQuestions = async () => {
        // validate
        if (_.isEmpty(selectedQuiz)) {
            toast.error('Please choose a quiz');
            return;
        }

        if (!handleValidateQA()) return;

        let questionsClone = _.cloneDeep(questions);
        for (let i = 0; i < questionsClone.length; i++) {
            if (questionsClone[i].imageFile) {
                questionsClone[i].imageFile = await toBase64(questionsClone[i].imageFile);
            }
        }

        let res = await postUpSertQA({
            quizId: selectedQuiz.value,
            questions: questionsClone,
        });

        if (res && res.EC === 0) {
            toast.success(res.EM);
            fetchQuizWithQA();
        } else {
            toast.error(res.EM);
        }
    };

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

    return (
        <div className="quiz-QA-container">
            <div className="manage-questions-content mt-3">
                <div className="manage-questions-add">
                    <div className="manage-questions-select-quiz">
                        <BsQuestionCircleFill color="#8a2be2" size="2rem" />
                        <div>
                            <label htmlFor="input-quiz-difficult" className="form-label">
                                Select Quiz
                            </label>
                            <Select options={listQuiz} defaultValue={selectedQuiz} onChange={setSelectedQuiz} />
                        </div>
                    </div>

                    {questions &&
                        questions.length > 0 &&
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
                                                    spellCheck={false}
                                                    className="form-control"
                                                    id="input-quiz-desc"
                                                    type="text"
                                                    value={question.description}
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
                                                            <div className="manage-answers-item-valid">
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter your answer..."
                                                                    value={answer.description}
                                                                    onChange={(e) =>
                                                                        handleAnswerQuestion(
                                                                            e,
                                                                            'INPUT',
                                                                            question.id,
                                                                            answer.id,
                                                                        )
                                                                    }
                                                                />
                                                            </div>

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

export default QuizQA;
