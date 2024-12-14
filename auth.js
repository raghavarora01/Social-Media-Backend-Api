
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import database from "../database.js";

const jwt_secretkey = process.env.SECURITY_KEY || "default_secret";

const registerUser = (req, res) => {
    const { username, email, name, password } = req.body;

    const select_query = "SELECT * FROM userinfo WHERE username = ?";
    
    database.query(select_query, [username], async (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }

        if (result.length) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Hashing the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const insertQuery = "INSERT INTO userinfo (username, email, password, name) VALUES (?, ?, ?, ?)";
        const values = [username, email, hashedPassword, name];

        database.query(insertQuery, values, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Database error" });
            } else {
                const token = jwt.sign({ id: result.insertId, email }, jwt_secretkey);
                res.setHeader('Authorization', `Bearer ${token}`);
                return res.status(201).json({
                    message: "User registered successfully",
                    token
                });
            }
        });
    });
};
const login = (req,res)=>{
    const username = req.body.username;
    const reqpassword = req.body.password;
    const login_query = "select * from userinfo where username = ?";
    database.query(login_query,[username],(err, result)=>{
        if(err){
            return res.status(500).json({error:"Database error"});
        }
        if(result.length==0){
            res.status(404).json({error : "User not found"});
        }
        const user = result[0];
        const ispasswordvalid = bcrypt.compareSync(reqpassword,user.password);
        if(!ispasswordvalid){
            return res.status(401).json({error : "Invalid Password"});
        }
        const token = jwt.sign({id : user.id,email:user.email, username : user.username},jwt_secretkey);
        res.setHeader('Authorization', `Bearer ${token}`);
        return res.status(200).json({
           
            message : "login successful",token
                });
    });
};

export default {registerUser,login};
