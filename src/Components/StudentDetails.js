import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import studentData from '../DB/studentslist.json';

function StudentDetails(){

  //Fetch the student Id from the URL
  const { id: studentId } = useParams();
  const studentDetails = studentData.find(student => student.id === parseInt(studentId));

  const navigate = useNavigate();

  //Function to close the student details
  const handleCloseButton = () => {
    navigate(-1);
  }

  return (
    <div className="p-3">
      <h2 className="mb-4">Student Details</h2>
      {studentDetails ? <table className="table table-bordered">
        <tbody>
          <tr>
            <th>Name</th>
            <td>{studentDetails.title}</td>
          </tr>
          <tr>
            <th>ID</th>
            <td>{studentDetails.id}</td>
          </tr>
          <tr>
            <th>Age</th>
            <td>{studentDetails.age}</td>
          </tr>
          {/* Add more rows for other fields */}
        </tbody>
      </table>
      : <p>No student details available</p>}

      {/* Button to close the student details */}
      <button className="btn btn-danger" onClick={handleCloseButton}>
        Close
      </button>
    </div>
  );
};

export default StudentDetails;
