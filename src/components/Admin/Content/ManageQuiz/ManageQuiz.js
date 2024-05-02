import "./ManageQuiz.scss";
import { useState, useEffect } from "react";
import CreateQuiz from "./CreateQuiz";

import TableQuiz from "./TableQuiz";
import { getAllQuizForAdmin } from "../../../../services/apiServices";
import Accordion from "react-bootstrap/Accordion";

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
                            <h3 className="manage-quiz-heading">
                                Add new quiz
                            </h3>
                        </Accordion.Header>
                        <Accordion.Body className="manage-quiz-add-content">
                            <CreateQuiz fetchListQuiz={fetchListQuiz} />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <TableQuiz listQuiz={listQuiz} fetchListQuiz={fetchListQuiz} />
            </div>
        </div>
    );
};

export default ManageQuiz;
