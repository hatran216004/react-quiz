import './ListQuiz.scss';
import { useEffect, useState } from 'react';
import { getQuizByUser } from '../../../services/apiServices';
import { useNavigate } from 'react-router-dom';

const ListQuiz = () => {
    const [arrQuiz, setArrQuiz] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getQuizData();
    }, []);

    const getQuizData = async () => {
        const res = await getQuizByUser();
        if (res && res.EC === 0) {
            setArrQuiz(res.DT);
        }
    };

    return (
        <div className="list-quiz-container pb-5">
            <div className="row gy-4">
                {arrQuiz &&
                    arrQuiz.length > 0 &&
                    arrQuiz.map((item, index) => {
                        return (
                            <div className="col-md-3" key={`quiz-${index}`}>
                                <div className="card" style={{ width: '18rem' }} key={index}>
                                    <img
                                        src={`data:image/jpeg;base64,${item.image}`}
                                        className="card-img-top"
                                        alt="..."
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">Quiz {item.id}</h5>
                                        <p className="card-text">{item.description}</p>
                                        <button
                                            className="btn-custom btn-primary"
                                            onClick={() =>
                                                navigate(`/quiz/${item.id}`, {
                                                    state: {
                                                        quizTitle: item.description,
                                                    },
                                                })
                                            }
                                        >
                                            Start now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
            </div>
            {arrQuiz && arrQuiz.length === 0 && <span className="no-data">Not found data</span>}
        </div>
    );
};

export default ListQuiz;
