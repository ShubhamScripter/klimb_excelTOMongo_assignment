import React, { useState } from 'react';
import axios from 'axios';

function UploadExcel() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');

    const onFileChange = event => {
        setFile(event.target.files[0]);
    };

    const onFileUpload = () => {
        console.log("yes");
        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:5000/upload', formData)
            .then(response => {
                console.log(`data`);
                setMessage('File uploaded successfully');
            })
            .catch(error => {
                console.log(`${error}`);
                setMessage('Error uploading file');
            });
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>Add from Excel</h2>
            </div>
            <div style={styles.body}>
                <h3>Add Candidates to Database</h3>
                <input type="file" onChange={onFileChange} style={styles.inputFile} />
                <div style={styles.uploadButton} onClick={onFileUpload}>
                    <img src="https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/10649901261559427099-512.png" alt="upload" style={styles.uploadIcon}/>
                    <p style={styles.instructions}>Upload a .xlsx or .xls file here</p>
                </div>
            </div>
            {message && <p style={styles.message}>{message}</p>}
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#f5f5f5'
    },
    header: {
        backgroundColor: '#d8c65b',
        padding: '10px',
        borderRadius: '5px 5px 0 0',
        textAlign: 'center'
    },
    body: {
        padding: '20px',
        textAlign: 'center',
    },
    inputFile: {
        display: 'none'
    },
    uploadButton: {
        border: '1px dashed #ccc',
        padding: '20px',
        borderRadius: '5px',
        cursor: 'pointer',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    uploadIcon: {
        width: '40px',
        marginBottom: '10px'
    },
    instructions: {
        color: '#999'
    },
    message: {
        marginTop: '20px',
        color: '#333'
    }
};

export default UploadExcel;
