const {google} = require('googleapis');
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GMAIL_REDIRECT_URI, GMAIL_REFRESH_TOKEN } = require('../config/envs');
const nodemailer = require("nodemailer");


const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GMAIL_REDIRECT_URI
  );

oauth2Client.setCredentials({refresh_token:GMAIL_REFRESH_TOKEN})


async function sendEmail(){
    try {
        const accesstoken=await oauth2Client.getAccessToken()
        const transport=nodemailer.createTransport({
            service:"gmail",
            auth:{
                type:'Oauth2',
                user:'fabrizioandrade989@gmail.com',
                clientId:GOOGLE_CLIENT_ID,
                clientSecret:GOOGLE_CLIENT_SECRET,
                refreshToken:GMAIL_REFRESH_TOKEN,
                accesstoken:accesstoken


            }
        })

        const mailOptions = {
            from: 'devhouse@gmail.com',
            to: 'fabrizioandrade989@gmail.com',
            subject: 'Confirmacion de cita',
            text:'Gracias por agendar la cita',
            html: `<h1>Su cita ha sido confirmada</h1><p>Pronto estaremos en contacto.</p><p>Haga clic <a href="http://localhost:5173/home">aquí</a> para visitar la página.</p>`
          };
        const result = await transport.sendMail(mailOptions)
        return result
        } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports=sendEmail