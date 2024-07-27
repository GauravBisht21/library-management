import { Link } from 'react-router-dom';

const NotFound = () => {

    return (
        <div className="d-flex flex-column align-items-center justify-content-center mt-5">
            <div className="text-center">
                <h1 className="display-1">404</h1>
                <h2 className="display-4">Not Found!!!</h2>
            </div>
            <Link className="mt-3 btn btn-success" to="/book-list">
                Home
            </Link>
        </div>
    );
}

export default NotFound;