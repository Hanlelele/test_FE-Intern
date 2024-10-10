import React from 'react';
import UploadFile from './components/uploadFile';
import Transactions from './components/transactions';
import { ToastContainer } from 'react-toastify';
import './App.css';

const App = () => {
    return (
        <div className="container">
            <div className="wrap">
                <h3 className="title">Quản lý giao dịch cửa hàng</h3>

                <div className="wrapper">
                    <UploadFile />
                    <Transactions />
                    <ToastContainer
                        position="top-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover={false}
                        theme="colored"
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
