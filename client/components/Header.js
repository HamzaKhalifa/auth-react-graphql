import React from 'react'
import { useQuery, useMutation } from 'react-apollo';
import { Link } from 'react-router-dom';
import { CURRENT_USER, LOGOUT } from '../queries';

function Header() {
    const { data, loading, error } = useQuery(CURRENT_USER);
    const [logout] = useMutation(LOGOUT);

    const renderButtons = () => {
        if (loading) return <div>Loading</div>;
        if (error) return <div className="red-text">{error.message}</div>;
        if (data && data.user) {
            return <li><a onClick={() => {
                logout({
                    refetchQueries: [{ query: CURRENT_USER }]
                });
                }}>Logout</a></li>
        } else {
            return(
                <div>
                    <li>
                        <Link to="/signup">Signup</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </div>
            );
        }
    }

    return (
        <div>
            <nav>
                <div className="nav-wrapper">
                    <Link to="/" className="brand-logo left">Home</Link>
                    <ul className="right">
                        {renderButtons()}
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Header
