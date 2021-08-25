import React from 'react';

function Footer () {
    return (
        <footer className="footer">
            <span className="footer__copyright">&copy; {new Date().getFullYear()} Mesto Russia</span>     
        </footer>
    )
}

export default Footer