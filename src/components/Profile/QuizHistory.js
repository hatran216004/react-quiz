import './Profile.scss';
import { useEffect, useState } from 'react';
import { getHistoryQuiz } from '../../services/apiServices';
import { toast } from 'react-toastify';

const QuizHistory = () => {
    const [historyQuiz, setHistoryQuiz] = useState([]);

    useEffect(() => {
        fetchHistoryQuiz();
    }, []);

    const fetchHistoryQuiz = async () => {
        let res = await getHistoryQuiz();
        if (res && res.EC === 0) {
            setHistoryQuiz(res.DT.data);
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <div className="profile-table">
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
                    {historyQuiz &&
                        historyQuiz.length > 0 &&
                        historyQuiz.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.quizHistory.name ? item.quizHistory.name : 'no data'}</td>
                                    <td>{item.total_questions}</td>
                                    <td>{item.total_correct}</td>
                                    <td>{item.updatedAt.replace('.000Z', ' PM')}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default QuizHistory;
