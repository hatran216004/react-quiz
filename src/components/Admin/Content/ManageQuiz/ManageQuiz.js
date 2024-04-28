import { useState } from "react";
import "./ManageQuiz.scss";
import ModalCreateQuiz from "./ModalCreateQuiz";

const ManageQuiz = () => {
    const [showModalCreateQuiz, setShowModalCreateQuiz] = useState(false);

    return (
        <div className="manage-quiz-container">
            <h1 className="manage-quiz-title">Manage Quiz</h1>
            <div className="manage-quiz-content">
                <div className="d-flex">
                    <button
                        className="btn-custom manage-quiz-btn btn-add-new ms-auto"
                        onClick={() => setShowModalCreateQuiz(true)}
                    >
                        Add new quiz
                    </button>
                </div>
            </div>

            <ModalCreateQuiz
                show={showModalCreateQuiz}
                setShow={setShowModalCreateQuiz}
            />
        </div>
    );
};

export default ManageQuiz;
