import React from "react";
import Link from "react-router-dom/es/Link";

class Header extends React.Component {


    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">

                <div className="container">
                    <strong><Link to="/" className="black">RDBA</Link></strong>
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/add">Add order</Link>
                            </li>
                        </ul>
                </div>

            </nav>

        );
    }
}

export {Header}