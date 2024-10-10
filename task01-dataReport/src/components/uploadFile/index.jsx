import React, { useState, useRef } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UploadCloudIcon } from 'lucide-react';

const UploadFile = () => {
    const [file, setFile] = useState();
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    const handleUploadClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleUpload = async () => {
        if (!file) {
            toast.error('Vui lòng chọn file!');
            return;
        }

        toast.success('Upload thành công!');
    };

    return (
        <div className="upload-section">
            <div className="form" onClick={handleUploadClick}>
                <input
                    className="file-input"
                    type="file"
                    name="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    hidden
                />
                <UploadCloudIcon className="cloudIcon" />
                <p>Browse File to Upload</p>
            </div>
            {file && <div className="upload_file">{file.name}</div>}
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default UploadFile;
