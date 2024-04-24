import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiServices";
import "./ListQuiz.scss";

const ListQuiz = () => {
    const [arrQuiz, setArrQuiz] = useState([]);

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
        <div className="list-quiz-container">
            {arrQuiz &&
                arrQuiz.length > 0 &&
                arrQuiz.map((item, index) => {
                    return (
                        <div
                            className="card"
                            style={{ width: "18rem" }}
                            key={index}
                        >
                            <img
                                src={`data:image/jpeg;base64,${item.image}`}
                                className="card-img-top"
                                alt="..."
                            />
                            <div className="card-body">
                                <h5 className="card-title">Quiz {index + 1}</h5>
                                <p className="card-text">{item.description}</p>
                                <button className="btn-custom btn-primary">
                                    Start now
                                </button>
                            </div>
                        </div>
                    );
                })}
            {arrQuiz && arrQuiz.length === 0 && (
                <span className="no-data">Not found data</span>
            )}
        </div>
    );
};

export default ListQuiz;