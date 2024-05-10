import { useState } from 'react';
import { postChangePassword } from '../../services/apiServices';
import { toast } from 'react-toastify';

const ChangePassword = ({ handleClose }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setComfirmPassword] = useState('');

    const handlChangePassword = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error('The password confirmation does not match');
            return;
        }

        let res = await postChangePassword(currentPassword, newPassword);
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
                <label htmlFor="inputPassword" className="form-label">
                    Current password
                </label>
                <input
                    autoComplete="off"
                    type="password"
                    className="form-control"
                    id="inputPassword"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
            </div>

            <div className="col-md-12">
                <label htmlFor="inputPassword2" className="form-label">
                    New Password
                </label>
                <input
                    autoComplete="off"
                    type="password"
                    className="form-control"
                    id="inputPassword2"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>

            <div className="col-md-12">
                <label htmlFor="inputPassword3" className="form-label">
                    Comfirm password
                </label>
                <input
                    autoComplete="off"
                    type="password"
                    className="form-control"
                    id="inputPassword3"
                    value={confirmPassword}
                    onChange={(e) => setComfirmPassword(e.target.value)}
                />
            </div>
            <div className="profile-bottom">
                <button className="btn-custom btn-primary" onClick={(e) => handlChangePassword(e)}>
                    Save
                </button>
            </div>
        </form>
    );
};

export default ChangePassword;
