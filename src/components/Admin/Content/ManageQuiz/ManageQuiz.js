import "./ManageQuiz.scss";
import { useState, useEffect } from "react";
import CreateQuiz from "./CreateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import TableQuiz from "./TableQuiz";
import { getAllQuizForAdmin } from "../../../../services/apiServices";
import Accordion from "react-bootstrap/Accordion";

const ManageQuiz = () => {
    const [showModalCreateQuiz, setShowModalCreateQuiz] = useState(false);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);

    const [listQuiz, setListQuiz] = useState([]);
    const [dataDelete, setDataDelete] = useState();
    const [dataUpdate, setDataUpdate] = useState();

    useEffect(() => {
        fetchListQuiz();
    }, []);

    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setListQuiz(res.DT);
        }
    };

    const handleShowDeleteQuiz = (dataQuiz) => {
        setDataDelete(dataQuiz);
        setShowModalDeleteQuiz(true);
    };

    const handleShowUpdateQuiz = (dataQuiz) => {
        setShowModalUpdateQuiz(true);
        setDataUpdate(dataQuiz);
    };

    return (
        <div className="manage-quiz-container">
            <h1 className="manage-quiz-title">Manage Quiz</h1>
            <div className="manage-quiz-content">
                <Accordion defaultActiveKey="0" className="mt-3">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>
                            <h3 className="manage-quiz-heading">
                                Add new quiz
                            </h3>
                        </Accordion.Header>
                        <Accordion.Body>
                            <CreateQuiz
                                show={showModalCreateQuiz}
                                setShow={setShowModalCreateQuiz}
                                fetchListQuiz={fetchListQuiz}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <div className="table-quiz-wrapper">
                    <TableQuiz
                        listQuiz={listQuiz}
                        handleShowDeleteQuiz={handleShowDeleteQuiz}
                        handleShowUpdateQuiz={handleShowUpdateQuiz}
                    />
                </div>
            </div>

            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDelete={dataDelete}
                fetchListQuiz={fetchListQuiz}
            />

            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdate={dataUpdate}
                fetchListQuiz={fetchListQuiz}
                setDataUpdate={setDataUpdate}
            />
        </div>
    );
};

export default ManageQuiz;
