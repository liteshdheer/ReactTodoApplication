import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./styles/student-table.css";

export default function StudentTable() {
  const [students, setStudents] = useState("");
  const navigate=useNavigate();
  const displayDetails=(id)=>{
    navigate("/student/view/"+id)
  }

  const editDetails=(id)=>{
    navigate("/student/edit/"+id)
  }
  const deleteDetails=(id)=>{
    if(window.confirm("Are you sure to delete the student data? ")){
    fetch("http://localhost:8000/students/" + id, {
      method: "DELETE",
     
    })
      .then((res) => {
        alert("Removed Student data successfully");
        window.location.reload();
      })
      .catch((err) => console.log(err.message));
    
    }
  }

  useEffect(() => {
    fetch("http://localhost:8000/students")
      .then((res) => res.json())
      .then((data) => 
       setStudents(data))
      .catch((err) => 
        console.log(err.message));
  }, []);

  

  return (
    <div className="container">
      <h2>Student Records</h2>
      <div className="table-container">
        <Link to="/student/create" className="btn btn-primary mb-3">
          Add New Student
        </Link>
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Place</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students && students.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.place}</td>
                <td>{item.phone}</td>
                <td>
                  <button
                    onClick={()=>displayDetails(item.id)}
                    className="btn btn-info btn-sm me-2"
                  >
                    View
                  </button>
                  <button
                    onClick={()=>editDetails(item.id)}
                    className="btn btn-warning btn-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={()=>deleteDetails(item.id)}
                    className="btn btn-danger btn-sm ms-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
