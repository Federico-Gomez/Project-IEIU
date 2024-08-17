// import React from "react";
import Navbar from "../Navbar/Navbar";
import MainContent from "../Main_Content/MainContent";
import Aside from "../Aside/Aside";
import styles from './Layout.module.css';

const Layout = ({ user }) => {

    return (
        <div className={styles.layoutContainer}>
            
            <Navbar user={user}/>
            
            <div className={styles.mainContainer}>
                <Aside />
                <MainContent />
            </div>
        </div>
    );
};

export default Layout;