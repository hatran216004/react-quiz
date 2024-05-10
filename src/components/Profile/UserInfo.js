import './Profile.scss';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaCloudUploadAlt } from 'react-icons/fa';
import _ from 'lodash';
import { postUpdateProfile } from '../../services/apiServices';
import { toast } from 'react-toastify';

const UserInfo = ({ handleClose }) => {
    const account = useSelector((state) => state.user.account);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');
    const [image, setImage] = useState();
    const [previewImage, setPreviewImage] = useState();

    useEffect(() => {
        if (account && !_.isEmpty(account)) {
            setEmail(account.email);
            setUsername(account.username);
            setRole(account.role);
            if (account.image) {
                const newImage = {
                    preview: `data:image/jpeg;base64,${account.image}`,
                };

                setPreviewImage(newImage);
            }
        }
    }, []);

    useEffect(() => {
        return () => {
            previewImage && URL.revokeObjectURL(previewImage.preview);
        };
    }, [previewImage]);

    const handleUploadImage = (e) => {
        const file = e.target.files[0];
        file.preview = URL.createObjectURL(file);
        setPreviewImage(file);
        setImage(file);
    };

    const handleSubmitProfile = async (e) => {
        e.preventDefault();

        let res = await postUpdateProfile(username, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            handleClose();
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <form className="row g-3">
            <div className="col-md-12">
                <label htmlFor="inputEmail4" className="form-label">
                    Email
                </label>
                <input disabled type="email" className="form-control" id="inputEmail4" value={email} />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputCity" className="form-label">
                    Username
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="col-md-6">
                <label htmlFor="inputState" className="form-label">
                    Role
                </label>
                <select id="inputState" className="form-select" disabled>
                    <option defaultValue={role} value="USER">
                        USER
                    </option>
                    <option value="ADMIN">ADMIN</option>
                </select>
            </div>
            <div className="col-md-12">
                <label className="form-label modal-btn-upload" htmlFor="upload">
                    <FaCloudUploadAlt className="modal-upload-icon" />
                    Upload image
                </label>
                <input type="file" hidden id="upload" onChange={(e) => handleUploadImage(e)} />
            </div>
            <div className="img-preview">
                {previewImage ? <img src={previewImage.preview} alt="" /> : <span>Avatar</span>}
            </div>
            <div className="profile-bottom">
                <button className="btn-custom btn-primary" onClick={(e) => handleSubmitProfile(e)}>
                    Save
                </button>
            </div>
        </form>
    );
};

export default UserInfo;
