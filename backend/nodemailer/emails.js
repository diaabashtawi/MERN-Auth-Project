import {transporterEmail} from "./nodemailer.config.js";
import {
    PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE,
    VERIFICATION_EMAIL_TEMPLATE,
    WELCOME_EMAIL_TEMPLATE
} from "./emailTemplates.js";


export const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [email]
    // console.log(`recipient: ${recipient}`)
    try{
        const response = await transporterEmail.sendMail({
            from: '"Deya Bakheet 👻" <deya@deyabakheet.me>', // sender address
            to: recipient,
            subject: 'Verify your email',
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
            category: 'Email Verification'
        })
        // console.log('Email sent successfully.', response);
    }catch (error){
        console.log(`Error sending email: ${error}`);
        throw new Error(`Error in sending Verification Email: ${error}`);
    }
}

export const sendWelcomeEmail = async (email, name)=>{
    const recipient = [email]
    // console.log(`recipient: ${recipient}`)
    try{
        const response = await transporterEmail.sendMail({
            from: '"Deya Bakheet 👻" <deya@deyabakheet.me>', // sender address
            to: recipient,
            subject: 'Verify your email',
            html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
            category: 'Welcome Email'
        })
        // console.log('Welcome email sent successfully.', response);
    }catch (error){
        console.log(`Error sending email: ${error}`);
        throw new Error(`Error in sending Welcome Email: ${error}`);
    }
}

export const sendPasswordRestEmail = async (email, restUrl)=>{
    const recipient = [email]
    // console.log(`recipient: ${recipient}`)
    try{
        const response = await transporterEmail.sendMail({
            from: '"Deya Bakheet 👻" <deya@deyabakheet.me>', // sender address
            to: recipient,
            subject: 'Reset your password',
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", restUrl),
            category: 'Password Reset'
        })
        // console.log('Welcome email sent successfully.', response);
    }catch (error){
        console.error(`Error sending password reset email`, error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
}

export const sendRestSuccessEmail = async (email)=>{
    const recipient = [email]
    // console.log(`recipient: ${recipient}`)
    try{
        const response = await transporterEmail.sendMail({
            from: '"Deya Bakheet 👻" <deya@deyabakheet.me>', // sender address
            to: recipient,
            subject: 'Password Rest Successful',
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: 'Password Reset'
        })
        // console.log('Welcome email sent successfully.', response);
    }catch (error){
        console.error(`Error sending password reset email`, error);
        throw new Error(`Error sending password reset email: ${error}`);
    }
}

