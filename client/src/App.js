import "./App.css";
import React, { useState } from "react";
import Axios from "axios";
function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);
  const [newWage, setNewWage] = useState(0);
  const [employeeList, setEmployeeList] = useState([]);
  //////////////////P O S T REQUEST TO ADD DATA//////////////
  const addEmployee = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage,
    }).then((response) => {
      setEmployeeList([
        ...employeeList,
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage,
        },
      ]);
    });
  };
  //////////////////GET REQUEST TO SHOW/READ DATA//////////////
  const getEmployees = () => {
    Axios.get("http://localhost:3001/employees").then((response) => {
      setEmployeeList(response.data);
    });
  };
  //////////////////P U T REQUEST TO UPDATE DATA//////////////
  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", {
      wage: newWage,
      id: id,
    }).then((response) => {
      setEmployeeList(
        employeeList.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                name: val.name,
                country: val.country,
                position: val.position,
                wage: newWage,
              }
            : val;
        })
      );
    });
  };
  //////////////////D E L E T E REQUEST TO DELETE DATA//////////////
  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  };

  //////////////////
  return (
    <div className="App">
      <div className="information">
        <label htmlFor="">Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label htmlFor="">Age:</label>
        <input
          type="number"
          onChange={(event) => {
            setAge(event.target.value);
          }}
        />
        <label htmlFor="">Country:</label>
        <input
          type="text"
          onChange={(event) => {
            setCountry(event.target.value);
          }}
        />
        <label htmlFor="">Position:</label>
        <input
          type="text"
          onChange={(event) => {
            setPosition(event.target.value);
          }}
        />
        <label htmlFor="">Wage (yearly):</label>
        <input
          type="number"
          onChange={(event) => {
            setWage(event.target.value);
          }}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>
        {employeeList.map((val, key) => {
          return (
            <div className="employee">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Age: {val.age}</h3>
                <h3>Country: {val.country}</h3>
                <h3>Position: {val.position}</h3>
                <h3>Wage: {val.wage}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="20000..."
                  onChange={(event) => {
                    setNewWage(event.target.value);
                  }}
                />
                <button onClick={() => updateEmployeeWage(val.id)}>
                  Update
                </button>
                <button onClick={() => deleteEmployee(val.id)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
