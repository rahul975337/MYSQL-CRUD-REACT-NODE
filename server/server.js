const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
////////////
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "12345",
  database: "employeesystem",
});
//////////////////P O S T REQUEST TO ADD DATA//////////////

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;
  db.query(
    "INSERT INTO employees (name,age,country,position,wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});

//////////////////GET REQUEST TO SHOW/READ DATA//////////////

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//////////////////P U T REQUEST TO UPDATE DATA//////////////
app.put("/update", (req, res) => {
  const id = req.body.id;
  const wage = req.body.wage;
  db.query(
    "UPDATE employees SET wage = ? WHERE id = ?",
    [wage, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//////////////////D E L E T E REQUEST TO DELETE DATA//////////////
app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/////////////////////S E R V E R   P O R T SETUP///////////////
app.listen(3001, () => {
  console.log("hurrayy , server running on port 3001");
});
