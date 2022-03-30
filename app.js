const express = require('express')
const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const router = express.Router()
const config = require('./config')
const tokenList = {}
const app = express()

router.get('/', (req,res) => {
    res.send('Ok');
})

router.post('/login', (req,res) => {
    const postData = req.body;
   // res.json(postData);
     const user = { "userId": postData.userId, "senha": postData.senha };
  //  res.json(user);
     // parte do login valida o user na base de dados depois cria o token e refresh_token com senhas diferentes
    //passando o user
    const token = jwt.sign({ userId: user.userId }, config.secret, { expiresIn: config.tokenLife });
   // const refreshToken = jwt.sign(user.userId, config.refreshTokenSecret, { expiresIn: Number( config.refreshTokenLife ) });
    const response = {
        "status": "Logged in",
        "userId": user.userId,
        "token": token,
      //  "refreshToken": refreshToken,
    };
  //  tokenList[refreshToken] = response;
    res.status(200).json(response);
})

router.post('/refreshToken', (req, res) => {
    res.json('Atualiza Token');
})

router.get('/pedido', verificarJWT, (req, res)=>{
    res.json('buscando pedidos');
})

function verificarJWT(req, res, next){
    const token = req.headers['x-access-token']
    jwt.verify(token, config.secret, (err, decoded)=>{
        if(err){ 
            if(err.name === "TokenExpiredError"){
                return res.status(400).json({"erro": "Token Expirado!" }).end()
            }
            return res.status(401).json({"msg": "Token Invalido!" }).end()  
        }
          req.userId = decoded.userId
          next()     
    })
}

app.use(express.json())
app.use(morgan('dev'))
app.use('/api', router)
app.listen(config.port || process.env.port || 3000, ()=>{
    console.log("server run port "+config.port)
});
