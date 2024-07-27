import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('token');
        navigate('/login');
        window.location.reload();
    };

    return (
        <div className="mt-5">
            {sessionStorage.getItem('token') && (
                <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button>
            )}
        </div>
    );
}

export default Logout;