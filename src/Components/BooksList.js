import ReactPaginate from "react-paginate";
import { useState } from "react";
import config from "../config";
import ToggleList from "./Common/ToggleList";

function BooksList(props) {
    //Set the book data from the props in a variable
    const bookData = props.bookData;

    //Pagination Logic
    const [currentPage, setCurrentPage] = useState(0);
    
    const handlePageClick = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };
    
    //Pagination configuration
    const itemsPerPage = config.booksConfig.booksPerPage;
    const startingIndex = currentPage * itemsPerPage;
    const currentBooks = bookData.slice(startingIndex, startingIndex + itemsPerPage);
    const pageCount = Math.ceil(bookData.length / itemsPerPage);

    // State to track whether the list is visible or hidden
    const [isListVisible, setListVisibility] = useState(true);

    // Function to toggle the list visibility
    const toggleListVisibility = () => {
        setListVisibility(!isListVisible);
    };

    return (
        <div className="p-5">
            <div className="text-center mb-3">
                <h2 className="text-center">Books List</h2>
                <ToggleList
                    isListVisible={isListVisible}
                    toggleListVisibility={toggleListVisibility}
                />
            </div>
            {isListVisible && (
                <table className="table table-bordered">
                    <thead>
                        <tr className="bg-lightgrey bg-secondary text-white font-weight-bold">
                            <th>ID</th>
                            <th>Title</th>
                            <th>Author</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentBooks.length > 0 ? (
                            currentBooks.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3">No books available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            )}

            {/* Pagination Component */}
            {isListVisible && (<ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={config.booksConfig.marginPagesDisplayed}
                pageRangeDisplayed={config.booksConfig.pageRangeDisplayed}
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

export default BooksList;
