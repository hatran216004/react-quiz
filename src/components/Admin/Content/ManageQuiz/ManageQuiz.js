import './ManageQuiz.scss';
import { useState, useEffect } from 'react';

import { getAllQuizForAdmin } from '../../../../services/apiServices';
import Accordion from 'react-bootstrap/Accordion';
import TableQuiz from './TableQuiz';
import CreateQuiz from './CreateQuiz';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';

const ManageQuiz = () => {
    const [listQuiz, setListQuiz] = useState([]);

    useEffect(() => {
        fetchListQuiz();
    }, []);

    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    };

    return (
        <div className="manage-quiz-container">
            <h1 className="manage-quiz-title">Manage Quiz</h1>
            <div className="manage-quiz-content">
                <Accordion className="mt-3">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <h3 className="manage-quiz-heading">Add new quiz</h3>
                        </Accordion.Header>
                        <Accordion.Body>
                            <CreateQuiz fetchListQuiz={fetchListQuiz} />
                            <TableQuiz listQuiz={listQuiz} fetchListQuiz={fetchListQuiz} />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                        <Accordion.Header>
                            <h3 className="manage-quiz-heading">Update Q & A</h3>
                        </Accordion.Header>
                        <Accordion.Body>
                            <QuizQA />
                        </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2">
                        <Accordion.Header>
                            <h3 className="manage-quiz-heading">Assign to Users</h3>
                        </Accordion.Header>
                        <Accordion.Body>
                            <AssignQuiz />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </div>
    );
};

export default ManageQuiz;
