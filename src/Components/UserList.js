import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import config from '../config';
import UserCardSkeleton from './Common/UserCardSkeleton';
import './UserList.css';

function UserList() {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const fetchTotalUsers = 0;
    const itemsPerPage = config.userListConfig.usersPerPage;

    // Define fetchUsers outside of useEffect and memoize it with useCallback
    const fetchUsers = useCallback(() => {
        setLoading(true);
        const startUser = currentPage * itemsPerPage;
        axios.get(`https://jsonplaceholder.typicode.com/users?_start=${startUser}&_limit=${itemsPerPage}`)
            .then((response) => {
                setUsers(response.data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, [currentPage, itemsPerPage]);

    // Call fetchUsers when the component mounts and when currentPage changes
    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    useEffect(() => {
        axios({
            method: 'GET',
            url: `https://jsonplaceholder.typicode.com/users`,
            timeout: 1000,
        })
         .then((response) => {
            setTotalUsers(response.data.length);
         })
         .catch((error) => {
            setError(error);
         });
    }, [fetchTotalUsers]);

    //Pagination Logic
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    const handleTryAgain = () => {
        //send the request again and set the error and loading state as false
        setError(null);
        setLoading(true);
        fetchUsers();
    }
    
    //Pagination configuration
    const pageCount = Math.ceil(totalUsers/ itemsPerPage);


  return (
    <div className="container mt-3">
        <h2 className="text-center mb-4">User List</h2>
        <div className="row">
            { loading ? (
                    // Show 3 skeletons per page as placeholders
                    Array.from({ length: itemsPerPage }, (_, index) => <UserCardSkeleton key={index} />)
            ) : 
            error ? (
                <div> 
                    <div className="text-center error-message">{error.message}</div>
                    <button className="btn btn-success try-again-btn" onClick={handleTryAgain}>Try Again</button>
                </div>
            )
            : users.length > 0 ? (users.map(user => (
            <div key={user.id} className="col-md-4 mb-4">
                <div className="card h-100 center shadow">
                    <div className="d-flex justify-content-center mt-3">
                        <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${user.name}.svg`} className="card-img-top" alt={user.name} style={{ objectFit: 'cover', height: '100px', width: '100px' }} />
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text"><b>Username:</b> {user.username}</p>
                        <p className="card-text"><b>Email:</b> {user.email}</p>
                        <p className="card-text"><b>Phone:</b> {user.phone}</p>
                        <p className="card-text"><b>Website:</b> <a href={`http://${user.website}`} target="_blank" rel="noopener noreferrer">{user.website}</a></p>
                        <p className="card-text"><b>Address:</b> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}</p>
                        <p className="card-text"><b>Company:</b> {user.company.name}</p>
                        <p className="card-text"><b>Catch Phrase:</b> {user.company.catchPhrase}</p>
                        <p className="card-text"><b>BS:</b> {user.company.bs}</p>
                    </div>
                </div>
            </div>
            ))) : (<div className="text-center">No users available</div>)}
        </div>
        {!loading && !error && <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={config.userListConfig.marginPagesDisplayed}
            pageRangeDisplayed={config.userListConfig.pageRangeDisplayed}
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
            forcePage={currentPage}
        />}
    </div>
  );
}

export default UserList;
