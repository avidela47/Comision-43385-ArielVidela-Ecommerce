/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import logoImg from '../../assets/logo.png';
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { RiTwitterXFill } from 'react-icons/ri';
import '../../index.css'

const Footer = () => {
    return (
        <>
            <div className="contact bg-light">
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top bg-light">
                    <div className="col-md-3 d-flex align-items-center">
                        <div className='footer-logo'>
                            <img src={logoImg} alt="logo" />
                        </div>

                    </div>
                    <span className="mb-3 mb-md-0 text-muted">© 2023 Horus Santeria - Ariel Videla</span>

                    <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
                        <div className='contact-icon'>
                            <FaInstagram className='i' />
                            <RiTwitterXFill className='i' />
                            <FaFacebookF className='i' />
                            <FaYoutube className='i' />
                        </div>
                    </ul>
                </footer>
            </div>
        </>
    )
}

export default Footer;

