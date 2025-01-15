const express = require('express');
const supabase = require('./routes/supabaseClient');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
require('dotenv').config();

//mailing 
const cron = require('node-cron');
const nodemailer = require('nodemailer');


//cors midlewarre
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['POST', 'GET', 'PUT', 'DELETE'],//methods to allow
    credentials: true
}));
dotenv.config();
app.use(express.json());

//signupAPI 
app.post('/auth/signup', async (req, res) => {

    //getting email and password from the request body
    const {email, password} = req.body;

    //siging up with email and password
    const {data, error} = await supabase.auth.signUp({email,password});

    //if error occurs
    if (error) return res.status(400).json({error: error.message});
    res.status(201).json({message: 'signup successful', user: data.user}); 

});


//loginAPI

app.post('/auth/login', async (req, res) => {
    console.log(req.body);
    //email and password from the request body
    const {email, password} = req.body;

    //sign in
    const {data, error} = await supabase.auth.signInWithPassword({email, password});

    //if error occurs
    if (error) return res.status(400).json({error: error.message});
    res.status(200).json({message: 'login successful', user: data.user});

});

//running
app.listen(5000, () => {console.log('Server is running on port 5000')});


//test for cors

// app.get('/test-cors', (req, res) => {
//     res.json({message: 'cors is working'});
// });



//capusle api

app.post('/capsules', async (req, res) => {
    const {title, description, releaseDate, recipients} = req.body;

    //empty submission, handle
    if(!title || !description || !releaseDate || !recipients){
        return res.status(400).json({error: 'all fields are required.'});
    }


    try {
        const recipientsList = recipients.split(',').map(email => email.trim());

        //data to supabase
        const {data, error} = await supabase.from('capsules')
        .insert([
            {title, description,release_date: releaseDate, recipients: recipientsList},
        ]);

        //any error, 
        if(error) throw error;
        res.status(201).json({message: 'Capsule created successfully', data});            
    } catch (error) {
        res.status(400).json({error: error.message});
    }

});





//transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
});




//cron job

cron.schedule('*/1 * * * *', async () => {
// cron.schedule('0 0 * * *', async () => {
    console.log('Running scheduled email job');
    try {
        const today = new Date().toISOString().split('T')[0];

        // Fetch capsules ready to be sent
        const { data: capsules, error } = await supabase
            .from('capsules')
            .select('*')
            .eq('sent', false)
            .lte('release_date', today);

        if (error) {
            console.error('Error fetching capsules:', error.message);
            return;
        }

        for (const capsule of capsules) {
            const { id, title, description, recipients } = capsule;

            try {
                // Send email to each recipient
                for (const email of recipients) {
                    await transporter.sendMail({
                        from: process.env.EMAIL_USER,
                        to: email,
                        subject: `Time Capsule Release: ${title}`,
                        text: description,
                    });

                    console.log(`Email sent to ${email} for capsule: ${title}`);
                }

                // Mark capsule as sent
                const { error: updateError } = await supabase
                    .from('capsules')
                    .update({ sent: true })
                    .eq('id', id);

                if (updateError) throw updateError;

                console.log(`Capsule ${id} marked as sent.`);
            } catch (emailError) {
                console.error(`Failed to send emails for capsule ${id}:`, emailError.message);
            }
        }
    } catch (jobError) {
        console.error('Error running email job:', jobError.message);
    }
});

