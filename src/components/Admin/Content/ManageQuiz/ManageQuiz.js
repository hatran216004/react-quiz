import './ManageQuiz.scss';
import { useState, useEffect } from 'react';

import { getAllQuizForAdmin } from '../../../../services/apiServices';
import Accordion from 'react-bootstrap/Accordion';
import TableQuiz from './TableQuiz';
import CreateQuiz from './CreateQuiz';
import QuizQA from './QuizQA';
import AssignQuiz from './AssignQuiz';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

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
                <Tabs defaultActiveKey="add" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="add" title="Add new quiz">
                        <CreateQuiz fetchListQuiz={fetchListQuiz} />
                        <TableQuiz listQuiz={listQuiz} fetchListQuiz={fetchListQuiz} />
                    </Tab>
                    <Tab eventKey="update" title="Update Q & A">
                        <QuizQA />
                    </Tab>
                    <Tab eventKey="assign" title="Assign to Users">
                        <AssignQuiz />
                    </Tab>
                </Tabs>
            </div>
        </div>
    );
};

export default ManageQuiz;
