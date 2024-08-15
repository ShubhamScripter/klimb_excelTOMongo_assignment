import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';



function App() {
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [filetitle, setFiletitle] = useState('Upload a .xlsx or .xls file here');
    const [issuccess, setIssuccess] = useState(false);
    

    // Handle file selection
    const onFileChange = (event) => {

      const selectedFile = event.target.files[0];
      // check file has valid xls or xlsx extension
        if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
          selectedFile.type === 'application/vnd.ms-excel') {
            setFile(selectedFile);
            setFiletitle(event.target.files[0].name);
            setMessage(''); // Clear any previous error message

        } else {
            setMessage('Please upload a valid Excel file (.xls or .xlsx).');
            setFile(null);
            setFiletitle(event.target.files[0].name);
        }
        
        
        
    };

    // Handle file upload
    const onFileUpload = () => {
        if (!file) {
            setMessage('Please select a valid file to upload');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:5000/upload', formData)
            .then(response => {
                console.log('File uploaded successfully');
                setIssuccess(true);
                setMessage('');
            })
            .catch(error => {
                setMessage('Error uploading file');
            });
    };

    // Trigger file input when clicking on the custom button
    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2>Add from Excel</h2>
                
            </div>
            <div style={styles.body}>
               {!issuccess? <><h3>Add Candidates to Database</h3>
                <input type="file" id="fileInput" onChange={onFileChange} style={styles.inputFile} />
                <div style={styles.uploadButton} >
                <FontAwesomeIcon icon={faUpload} size="2x" onClick={triggerFileInput}/>
                    <p style={styles.instructions}>{`${filetitle}`}</p>
                    <button style={styles.submitButton} onClick={onFileUpload}>Submit</button>
                </div>
               

</>
               : 
               <div style={{display:"flex",flexDirection:"column",alignItems:"center",border: '1px dashed #ccc'}}>
                <p style={{color:"rgb(85 225 41)", fontSize:"30px"}}>Thank you for your submission</p>
                <p><FontAwesomeIcon  icon={faCheck} style={{ color: "rgb(85 225 41)" }}  size="2x"/>succesfully file uploaded</p>
                <p>your record will process shortly</p>
               </div>
               }
            </div>
            {message && <p style={styles.message}>{message}</p>}
            
        </div>
    );
}

const styles = {
    container: {
        padding: '20px',
        margin: '0 auto',
       
    },
    header: {
        backgroundColor: '#d8c65b',
        padding: '15px',
        leftPadding:'50px',
        display: 'flex',
        borderRadius: '5px 5px 0 0',
        flexDirection: 'column',
        
        
    },
    body: {
        padding: '20px'
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
    submitButton: {
        marginTop: '20px',
        padding: '10px 20px',
        borderRadius: '5px',
        backgroundColor: 'rgb(85 225 41)',
        color: '#fff',
        border: 'none',
        cursor: 'pointer'
    },
    message: {
        marginTop: '20px',
        color: '#333'
    }
};

export default App;
