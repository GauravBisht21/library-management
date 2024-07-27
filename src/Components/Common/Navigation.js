import {
    Link,
    useMatch
  } from 'react-router-dom';

function Navigation() {
    //Logic for changing the color of books list and student list buttons for the current active page
    const isBookListActive = useMatch('/book-list/*');
    const isStudentListActive = useMatch('/student-list/*');
    const isAddBookActive = useMatch('/add-book/');
    const isUserListActive = useMatch('/user-list/');

    return (
        <nav>
            <ul className="list-inline">
                <li className="list-inline-item">
                    <Link className={`btn ${isBookListActive ? 'btn-primary' : 'btn-light'}`} to="/book-list">Books List</Link>
                </li>
                <li className="list-inline-item">
                    <Link className={`btn ${isStudentListActive ? 'btn-primary' : 'btn-light'}`} to="/student-list">Students List</Link>
                </li>
                <li className="list-inline-item">
                    <Link className={`btn ${isAddBookActive ? 'btn-primary' : 'btn-light'}`} to="/add-book">Add Book</Link>
                </li>
                <li className="list-inline-item">
                    <Link className={`btn ${isUserListActive ? 'btn-primary' : 'btn-light'}`} to="/user-list">User List</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navigation;