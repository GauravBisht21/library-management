import ReactPaginate from "react-paginate";
import { useState } from "react";
import config from "../config";
import ToggleList from "./Common/ToggleList";
import { 
    Link
} from 'react-router-dom';

function StudentsList(props){
    //Store the studentData from props in a variable
    const studentData = props.studentData;

    //Pagination Logic
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    }

    //Pagination configuration
    const itemsPerpage = config.studentsConfig.studentsPerPage;
    const startingIndex = currentPage * itemsPerpage;
    const currentStudents = studentData.slice(startingIndex, startingIndex + itemsPerpage);
    const pageCount = Math.ceil(studentData.length / itemsPerpage);

    // State to track whether the list is visible or hidden
    const [isListVisible, setListVisibility] = useState(true);

    // Function to toggle the list visibility
    const toggleListVisibility = () => {
        setListVisibility(!isListVisible);
    };

    return (
        <div className='p-5'>
            <div className='text-center mb-3'>
                <h2 className="text-center">Students List</h2>
                <ToggleList
                    isListVisible={isListVisible}
                    toggleListVisibility={toggleListVisibility}
                /> 
            </div>
            {isListVisible && (
                <table className="table table-bordered">
                    <thead>
                        <tr className='bg-lightgrey bg-secondary text-white font-weight-bold'>
                            <th>ID</th>
                            <th>Student Name</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        currentStudents.length > 0 ? 
                            currentStudents.map(student => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{student.title}</td>
                                    <td>{student.age}</td>
                                    <td>
                                        <Link
                                        className='btn btn-info'
                                        to={`/student-details/${student.id}`}
                                        >
                                        View
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        : 
                            <tr>
                                <td colSpan="3">No student available</td>
                            </tr>
                        }
                    </tbody>
                </table>
            )}
                
            {/* Pagination Component */}
            {isListVisible && ( <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={config.studentsConfig.marginPagesDisplayed}
                pageRangeDisplayed={config.studentsConfig.pageRangeDisplayed}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            /> 
            )}
        </div>
    );
}

export default StudentsList;