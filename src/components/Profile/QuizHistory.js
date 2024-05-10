import './Profile.scss';
import { useEffect, useState } from 'react';
import { getHistoryQuiz } from '../../services/apiServices';
import { toast } from 'react-toastify';
import moment from 'moment/moment';

const QuizHistory = () => {
    const [historyQuiz, setHistoryQuiz] = useState([]);

    useEffect(() => {
        fetchHistoryQuiz();
    }, []);

    const fetchHistoryQuiz = async () => {
        let res = await getHistoryQuiz();
        if (res && res.EC === 0) {
            const data = res.DT.data.map((item) => {
                return {
                    quizHistory: item.quizHistory,
                    total_correct: item.total_correct,
                    total_questions: item.total_questions,
                    id: item.quiz_id,
                    date: moment(item.createdAt).utc().format('DD/MM/YYY hh:mm:ss A'),
                };
            });
            setHistoryQuiz(data);
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <div className="profile-table">
            {historyQuiz && historyQuiz.length > 0 ? (
                <table className="table ">
                    <thead>
                        <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Quiz name</th>
                            <th scope="col">Total question</th>
                            <th scope="col">Total correct</th>
                            <th scope="col">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {historyQuiz.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.quizHistory.name ? item.quizHistory.name : 'no data'}</td>
                                    <td>{item.total_questions}</td>
                                    <td>{item.total_correct}</td>
                                    <td>{item.date}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <span className="no-data">No data</span>
            )}
        </div>
    );
};

export default QuizHistory;
