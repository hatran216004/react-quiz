import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import "./ManageQuiz.scss";
import "../ManageUsers/ManageUsers.scss";
import { toast } from "react-toastify";
import Select from "react-select";
import { postCreateNewQuiz } from "../../../../services/apiServices";

const CreateQuiz = ({ fetchListQuiz }) => {
    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [type, setType] = useState();
    const [image, setImage] = useState();

    const options = [
        { value: "EASY", label: "EASY" },
        { value: "MEDIUM", label: "MEDIUM" },
        { value: "HARD", label: "HARD" },
    ];

    useEffect(() => {
        return () => {
            image && URL.revokeObjectURL(image.preview);
        };
    }, [image]);

    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setImage(file);
        e.target.value = null;
    };

    const handleSubmitCreateQuiz = async () => {
        if (!type) {
            toast.error("Please select difficult of quiz!");
            return;
        }

        let res = await postCreateNewQuiz(desc, name, type?.value, image);
        if (!name && !desc) {
            toast.error("Name / Description is requird!");
            return;
        }

        if (res && res.EC === 0) {
            toast.success(res.EM);

            setName("");
            setDesc("");
            setType();
            setImage();

            fetchListQuiz();
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <>
            <form className="row g-3">
                <div className="col-md-12">
                    <label htmlFor="input-quiz-desc" className="form-label">
                        Description
                    </label>
                    <input
                        className="form-control"
                        id="input-quiz-desc"
                        type="text"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <div className="col-md-8">
                    <label htmlFor="input-quiz-name" className="form-label">
                        Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="input-quiz-name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="col-md-4">
                    <label
                        htmlFor="input-quiz-difficult"
                        className="form-label"
                    >
                        Difficult
                    </label>
                    <Select
                        options={options}
                        defaultValue={type}
                        onChange={setType}
                    />
                </div>
                <div className="col-md-12">
                    <div className="d-flex align-items-center gap-5">
                        <label
                            className="form-label modal-btn-upload"
                            htmlFor="upload"
                        >
                            <FaCloudUploadAlt className="modal-upload-icon" />
                            Upload image
                        </label>
                        <div className="img-preview-quiz">
                            {image ? (
                                <img src={image.preview} alt="" />
                            ) : (
                                <span>Preview image</span>
                            )}
                        </div>
                    </div>
                    <input
                        type="file"
                        hidden
                        id="upload"
                        onChange={(e) => handleUploadImage(e)}
                    />
                </div>
            </form>

            <button
                className="btn-custom btn-primary ms-auto"
                onClick={handleSubmitCreateQuiz}
            >
                Save
            </button>
        </>
    );
};

export default CreateQuiz;
