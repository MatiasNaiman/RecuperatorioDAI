import 'dotenv/config'

const config = {
    server : process.env.SERVER,
    user : process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    options : {
        trustServerCertificate : true,
        trustConnection : true
    }
}
export default config;