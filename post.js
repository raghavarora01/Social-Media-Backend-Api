import database from "../database.js";
import jwt from "jsonwebtoken";
const jwt_secretkey = process.env.SECURITY_KEY || "default_secret";

const add=(req, res)=>{
    const authHeader = req.headers['Authorization'];
    if(!authHeader){
        console.log(authHeader);
        return res.status(401).json({ error: "Authorization header is missing" });
    }
    const Token = authHeader.split(' ')[1];
    if(!Token){
        return res.status(401).json({ error: "Token is missing" });
    }
    const verifiedtoken = jwt.verify(Token, jwt_secretkey);
    if(!verifiedtoken){
        return res.status(403).json({ error: "Invalid token" });
    }
        const userid = req.body.userId;
        const content = req.body.content;
        const insertquery = "INSERT into posts(userid, content) values (?,?)";
        const values = [userid, content];
        database.query(insertquery, values,(err, result)=>{
            if(err){
                return res.status(500).json({ error: "Database error" });
            }
            res.status(201).json({ message: "Post added successfully", postId: result.insertId });
        })

}
export default {add};
