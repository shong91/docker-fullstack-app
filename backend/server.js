// 필요한 모듈을 가져온다
const express= require("express");
const bodyParser = require("body-parser");
const db = require("./db");

const app = express();

// json 형태로 오는 요청의 본문을 해석할 수 있게 등록
app.use(bodyParser.json());

// db create :: 아래는 테이블 임시 생성. 추후 docker 에서 mysql image 를 받아, /mysql/sqls/initialize.sql 에서 테이블을 생성한다. 
db.pool.query(
    `CREATE TABLE LISTS (
    ID INTEGER AUTO_INCREMENT,
    VALUE Text, 
    PRIMARY KEY (ID)
    )`, 
    (err, results, fields) => {
        console.log('results: ', results);
})

// db lists 테이블에 있는 모든 데이터를 프론트 서버에 보내주기
app.get('/api/values', function(req, res){
    console.log("GET function ")
    // db에서 모든 정보를 가져온다. 
    db.pool.query('SELECT * FROM LISTS;', 
        (err, results, fields) => {
            if (err){
                return res.status(500).send(err)
            } else{
                return res.json(results)
            }
        })
})


// client 에서 입력한 값을 db에 넣어주기
app.post('/api/value', function(req, res, next){
    console.log("POST function ")
    // db insert : body-parser를 이용하여 
    db.pool.query(`INSERT INTO LISTS (VALUE) VALUES ("${req.body.value}")`, 
        (err, results, fields) => {
            if (err){
                return res.status(500).send(err)
            } else {
                return res.json({success: true, value: req.body.value})
            }
        })
})


app.listen(5000, () => {
    console.log('application runs on 5000 port. ')
})