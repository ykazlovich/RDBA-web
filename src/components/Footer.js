import React from "react";
import Link from "react-router-dom/es/Link";
class Footer extends React.Component{


    render() {
        return (
            <footer>
            <div className='text-center'>
                <Link to="/">Go to index</Link>
            </div>
            </footer>
        );
    }
}
export {Footer}