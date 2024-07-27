import { useState } from "react";
import './AddBook.css';
import BooksList from "./BooksList";
import { useDispatch, useSelector } from 'react-redux';
import { addBook, getBooksList } from './redux/slices/AddBookItem';

function AddBook() {
    const dispatch = useDispatch();

    // Local state for the form
    const [book, setBook] = useState({
        id: '',
        title: '',
        author: '',
    });

    const [touched, setTouched] = useState({
        id: false,
        title: false,
        author: false,
    });

    // Function to handle field value changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setBook(prevBook => ({ ...prevBook, [name]: value }));
    };

    // Function to handle field blur events
    const handleBlur = (field) => {
        setTouched({ ...touched, [field]: true });
    };

    // Function to validate the form fields
    const validate = () => {
        const errors = {
            id: !book.id,
            title: !book.title,
            author: !book.author,
        };
        return errors;
    };

    // Function to check if the form is valid
    const isFormValid = () => {
        const errors = validate();
        return !errors.id && !errors.title && !errors.author;
    };

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        setTouched({ id: true, title: true, author: true });

        if (isFormValid()) {
            // Dispatch the addBook action with the book state
            dispatch(addBook(book));

            // Reset the local form state
            setBook({ id: '', title: '', author: '' });
            setTouched({ id: false, title: false, author: false });
        }
    };

    const errors = validate();

    const books = useSelector(getBooksList);


    return (
        <div className="p-5">
            <div className="p-5 shadow border rounded">
                <h1 className="mb-4">Add Book</h1>
                <form className="add-book" onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="id" className="form-label">
                            Book Id <span className="text-danger">*</span>
                        </label>
                        <input
                            type="number"
                            className="form-control"
                            id="id"
                            name="id"
                            placeholder="Enter book ID"
                            value={book.id}
                            onChange={handleChange}
                            onBlur={() => handleBlur('id')}
                        />
                        {touched.id && errors.id && <p className="text-danger">Book ID is required</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Book Name <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            placeholder="Enter book name"
                            value={book.title}
                            onChange={handleChange}
                            onBlur={() => handleBlur('title')}
                        />
                        {touched.title && errors.title && <p className="text-danger">Book Name is required</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="author" className="form-label">
                            Book Author <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="author"
                            name="author"
                            placeholder="Enter book author"
                            value={book.author}
                            onChange={handleChange}
                            onBlur={() => handleBlur('author')}
                        />
                        {touched.author && errors.author && <p className="text-danger">Book Author is required</p>}
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    </form>
            </div>

            <BooksList bookData = {books} />
        </div>
    );
}
export default AddBook;
