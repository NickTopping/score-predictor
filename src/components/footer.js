import React from "react"
//import { Link } from 'gatsby'
import footerStyles from './footer.module.scss'
import Arsenal from "../images/Arsenal.png";
import Liverpool from "../images/Liverpool.png";
import ManchesterCity from "../images/Manchester_City.png";
import ManchesterUnited from "../images/Manchester_United.png";

const Footer = () => {
    return (
        <footer className={footerStyles.container}>
            <div className={footerStyles.divider}></div>
            <img className={footerStyles.badge} src={Arsenal} alt="Arsenal badge" />
            <img className={footerStyles.badge} src={Liverpool} alt="Liverpool badge" />
            <img className={footerStyles.badge} src={ManchesterCity} alt="Manchester City badge" />
            <img className={footerStyles.badge} src={ManchesterUnited} alt="Manchester United badge" />
        </footer>
    )
}

export default Footer