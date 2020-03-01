import React from 'react'
import {Link} from 'react-router-dom'
import styles from './Header.module.css';

export default function Header() {
    return (
        <div className={styles.header}>
            <div>
                React Chat
            </div>
            <div>
                <Link to='/login'> logout </Link>
            </div>
        </div>
    )
}
