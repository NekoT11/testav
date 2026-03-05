// import 'dotenv/config';
import express from "express";
import mysql from "mysql2/promise";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
app.use(cors(), express.json());

const conect = mysql.createPool({
    host: "localhost",
    user: "root",
    database: "test",
    password: "NwEr9dw4@?", 
});

app.post('/reg', async (req, res) => {
    try{
        const {name,login,pass} = req.body
        const hash = await bcrypt.hash(pass,10)
        await conect.query('INSERT INTO users(name,login,password) VALUES(?, ?, ?)', [name,login,hash])
        res.status(201).json({message: 'niSe'})
    }
    catch(e){
        console.error(e)
        res.status(500).json({message: 'ne niSe'})
    }
})


app.post('/log', async (req, res) => {
    try {
        const { login, pass } = req.body
        const [user] = await conect.query('SELECT * FROM users WHERE login = ?', [login])
        
        
        if(user.length === 0) {
            res.status(401).json({message: 'Пользователь не найден'})
            return
        }

        const foundUser = user[0]

        const checkPass = await bcrypt.compare(pass, foundUser.password)

        if(!checkPass) { 
            res.status(401).json({message: 'Неверный пароль'})
            return
        }

        const token = jwt.sign(
            {id: foundUser.id, name: foundUser.name }, 'secret123'
        )

        res.status(200).json({ token, message:'Вы успешно авторизовались'})
    } catch(e) {
        console.error(e)
        res.status(500).json({message: 'Ошибка сервера'})
    }
})

app.get('/product', async (req, res) => {
    try{
    const [product] = await conect.query('SELECT * FROM product')
    
    res.status(200).json(product)

    }
    catch{
        res.status(500)
    }
})

app.listen(5000)