import { useState } from "react";
import ModalDeleteQuiz from "./ModalDeleteQuiz";
import ModalUpdateQuiz from "./ModalUpdateQuiz";

const TableQuiz = ({ listQuiz, fetchListQuiz }) => {
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);

    const [dataDelete, setDataDelete] = useState();
    const [dataUpdate, setDataUpdate] = useState();

    const handleShowDeleteQuiz = (dataQuiz) => {
        setDataDelete(dataQuiz);
        setShowModalDeleteQuiz(true);
    };

    const handleShowUpdateQuiz = (dataQuiz) => {
        setShowModalUpdateQuiz(true);
        setDataUpdate(dataQuiz);
    };

    return (
        <>
            {listQuiz.length > 0 ? (
                <>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr className="text-center">
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Type</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {listQuiz.map((quiz, index) => {
                                return (
                                    <tr
                                        key={`quiz-item-${index}`}
                                        className="text-center"
                                    >
                                        <td>{quiz.id}</td>
                                        <td>{quiz.name}</td>
                                        <td>{quiz.description}</td>
                                        <td>{quiz.difficulty}</td>
                                        <td className="d-flex justify-content-center">
                                            <button
                                                className="btn-custom btn-update"
                                                onClick={() =>
                                                    handleShowUpdateQuiz(quiz)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="btn-custom btn-delete"
                                                onClick={() =>
                                                    handleShowDeleteQuiz(quiz)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
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
                </>
            ) : (
                <span className="no-data">Not found data</span>
            )}
        </>
    );
};

export default TableQuiz;
