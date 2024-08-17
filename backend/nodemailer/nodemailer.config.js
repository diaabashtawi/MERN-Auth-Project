import nodemailer from 'nodemailer';

export const transporterEmail = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    auth: {
        user: "deya@deyabakheet.me",
        name: "Deya Bakheet",
        pass: "Diaa#2010856015"
    }
});

