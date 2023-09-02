const express = require("express")
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql');

app.get("/", async (req, res) => {
    const connection = mysql.createConnection(config);
    const sql = `SELECT * FROM people`;  

    connection.query(sql, (error, results) => {
        if (error) {
            console.error('Erro na consulta SQL:', error.message);
            return res.status(500).send('Erro na consulta SQL');
        }

        let listOfPeople = "<ul>";

      results.map(result => {
        listOfPeople += `<li>${result.id} - ${result.name}</li>`;
      })
      listOfPeople += "</ul>";
      connection.end();
      res.send('<h1>Full Cycle Rocks!</h1>' + listOfPeople);    
    });   
});

app.listen(port, () => {
    console.log("Running into port" + port)
});