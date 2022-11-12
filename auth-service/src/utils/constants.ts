import jwt from "jsonwebtoken";

const jwtOption : jwt.SignOptions = {
    algorithm: 'RS256',
    expiresIn: "1d",
    issuer: "localhost",
    audience: "http://localhost:3000"
}

export default {
    jwtOption
}