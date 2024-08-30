import nodemailer from 'nodemailer';

export const transporterEmail = nodemailer.createTransport({
    host: "",
    port: "",
    auth: {
        user: "",
        name: "",
        pass: ""
    }
});

