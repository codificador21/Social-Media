const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');
const morgan = require('morgan')

const logDirectory = path.join(__dirname,'../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const acessLogStream = rfs.createStream('access.log',{
    interval: '1d', // rotate daily
    path: logDirectory
});

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'abcd',
    db: 'socialmedia_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: 'codificador111@gmail.com',
            pass: 'webDev123'
        },
        
    },
        google_client_id: "543187461919-71m6f5lkc0cau5hi52it49ej8rbihpsf.apps.googleusercontent.com",
        google_client_secret:"4JHXICjSKUP739v2fcULbcjq",
        google_call_back_URL:"http://localhost:8000/users/auth/google/callback",
        jwt_secret: 'SocialMedia',
        morgan:{
            mode: 'dev',
            options : {stream: acessLogStream}
        }
}

const production = {
    name: 'production',
    asset_path: process.env.SM_ASSET_PATH,
    session_cookie_key: process.env.SM_JWT_SECRET,
    db: process.env.SM_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth:{
            user: process.env.SM_GMAIL_USERNAME,
            pass: process.env.SM_GMAIL_PASS
        },
        
    },
        google_client_id: process.env.SM_GOOGLE_CLIENT_ID,
        google_client_secret: process.env.SM_GOOGLE_CLIENT_SECRET,
        google_call_back_URL: process.env.SM_GOOGLE_BACK_URL,
        jwt_secret: process.env.SM_JWT_SECRET ,
        morgan:{
            mode: 'combined',
            options : {stream: acessLogStream}
        }
}

module.exports = eval(process.env.SM_ENVIRONMENT) == undefined ? 'development' : eval(process.env.SM_ENVIRONMENT);