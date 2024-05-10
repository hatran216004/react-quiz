import { useState } from 'react';

const ChangePassword = () => {
    return (
        <form className="row g-3">
            <div className="col-md-12">
                <label htmlFor="inputPassword4" className="form-label">
                    Current password
                </label>
                <input autoComplete="off" type="password" className="form-control" id="inputPassword4" />
            </div>
            <div className="col-md-12">
                <label htmlFor="inputPassword4" className="form-label">
                    New Password
                </label>
                <input autoComplete="off" type="password" className="form-control" id="inputPassword4" />
            </div>
            <div className="col-md-12">
                <label htmlFor="inputPassword4" className="form-label">
                    Comfirm new password
                </label>
                <input autoComplete="off" type="password" className="form-control" id="inputPassword4" />
            </div>
        </form>
    );
};

export default ChangePassword;
