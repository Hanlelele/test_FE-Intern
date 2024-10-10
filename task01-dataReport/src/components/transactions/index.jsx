import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Transactions = () => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);

    const handleQuery = async () => {
        if (!startTime || !endTime) {
            toast.error('Vui lòng nhập khoảng thời gian!');
            return;
        }

        toast.success('Truy vấn thành công!');
    };

    return (
        <div className="query-section">
            <div className="time">
                <div className="time-edit">
                    <label>Giờ bắt đầu: </label>
                    <input type="datetime-local" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                </div>
                <div className="time-edit">
                    <label>Giờ kết thúc: </label>
                    <input type="datetime-local" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
                </div>
            </div>
            <button onClick={handleQuery} className="btn">
                Truy vấn
            </button>

            {totalAmount !== null && <div className="money">Tổng Thành tiền: {totalAmount} VND</div>}
        </div>
    );
};

export default Transactions;
