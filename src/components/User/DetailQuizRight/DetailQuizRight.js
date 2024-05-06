import '../DetailQuiz/DetailQuiz.scss';
import CountDown from './CountDown';

const DetailQuizRight = ({ dataQuiz, handleSubmitQuiz }) => {
    const onTimeUp = () => {
        handleSubmitQuiz();
    };

    return (
        <div className="detail-quiz-right">
            <div className="main-timer">
                <CountDown onTimeUp={onTimeUp} />
            </div>
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
