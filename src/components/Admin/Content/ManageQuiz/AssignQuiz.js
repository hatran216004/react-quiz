import './AssignQuiz.scss';
import './QuizQA.scss';
import { useEffect, useState } from 'react';
import { getAllQuizForAdmin, getAllUser } from '../../../../services/apiServices';
import Select from 'react-select';

const AssignQuiz = () => {
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [listQuiz, setListQuiz] = useState([]);

    const [selectedUser, setSelectedUser] = useState(null);
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
        fetchListQuiz();
        fetchListUser();
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

    const fetchListUser = async () => {
        let res = await getAllUser();
        if (res && res.EC === 0) {
            const users = res.DT.map((user) => {
                return {
                    value: user.id,
                    label: `${user.id} - ${user.username}`,
                };
            });
            setListUser(users);
        }
    };

    return (
        <div className="row">
            <div className="col-md-6">
                <div>
                    <label htmlFor="input-quiz-difficult" className="form-label">
                        Select Quiz
                    </label>
                    <Select options={listQuiz} defaultValue={selectedQuiz} onChange={setSelectedQuiz} />
                </div>
            </div>

            <div className="col-md-6">
                <div>
                    <label htmlFor="input-quiz-difficult" className="form-label">
                        Select User
                    </label>
                    <Select options={listUser} defaultValue={selectedUser} onChange={setSelectedUser} />
                </div>
            </div>
        </div>
    );
};

export default AssignQuiz;
