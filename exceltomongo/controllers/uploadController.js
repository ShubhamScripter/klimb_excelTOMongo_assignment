const async = require('async');
const XLSX = require('xlsx');
const Candidate = require('../models/candidate');

exports.processFile = async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    const filePath = req.file.path;

    try {
        // Read the Excel file
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // Extract headers and rows
        const headers = data[0];
        const rows = data.slice(1);





        async.eachSeries(rows, (row, callback) => {

            const candidateData = {
                name: row[headers.indexOf('Name of the Candidate')],
                email: row[headers.indexOf('Email')],
                mobileNo: row[headers.indexOf('Mobile No.')],
                dateOfBirth: row[headers.indexOf('Date of Birth')],
                workExperience: row[headers.indexOf('Work Experience')],
                resumeTitle: row[headers.indexOf('Resume Title')],
                currentLocation: row[headers.indexOf('Current Location')],
                postalAddress: row[headers.indexOf('Postal Address')],
                currentEmployer: row[headers.indexOf('Current Employer')],
                currentDesignation: row[headers.indexOf('Current Designation')]
            };

            // console.log('Processing row:', candidateData);

            Candidate.findOne({ email: candidateData.email }).then(existingCandidate => {
                if (existingCandidate) {
                    console.log(`Duplicate record found for email: ${candidateData.email}`);
                    callback();
                    // Skip the row and continue with the next one
                    return;
                } 
                else {
                    const newCandidate = new Candidate(candidateData);
                    if (candidateData.name && candidateData.email && candidateData.mobileNo)
                     {
                        newCandidate.save().then(() => {
                            //console.log("during")
                            callback();
                        }).catch((err) => {
                            console.log(err.message);
                            callback();
                        });
                    } 
                    else {
                        // console.log("Data is missing")
                        callback();
                    }
                }
            })
                .catch(err => {
                    console.error(`Error processing candidate ${err.message}`);
                    callback()
                    // callback(err); // Pass the error to the final callback
                });
        }, (err) => {
            if (err) {
                console.error(`Error processing file: ${err.message}`);
                return res.status(500).send('Error processing file.');
            }
            res.send('File processed successfully.');
        });

    }
    catch (err) {
        console.error(`Error processing file: ${err.message}`);
        res.status(500).send('Error processing file.');
    }
};