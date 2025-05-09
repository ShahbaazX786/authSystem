import dotenv from 'dotenv';

dotenv.config()

// Reason For creating a separate config file.
// Nodemailer.js was being initialized in parallel or before index.js and as dotenv is not defined until then so was getting undefined error for nodemailer auth config.
// I had 2 choices either make the nodemailer.js a method which returns the data runtime or creating a config file for dotenv.
// I preferred this solution.