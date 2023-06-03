import React, { Fragment } from 'react'
import { VscHome } from 'react-icons/vsc'
import { FiUser } from 'react-icons/fi'
import { BsCode, BsFilePdf } from 'react-icons/bs'
import { MdOutlineDashboard, MdOutlineContactPage, MdEmail, MdFileDownload } from 'react-icons/md'
import { AiFillLinkedin, AiFillPhone, AiFillGithub, AiOutlineUnorderedList, AiOutlineDownload, AiFillSafetyCertificate } from 'react-icons/ai'
import { VscAccount } from 'react-icons/vsc'
import { Link, NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <Fragment>
            <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark slide-in-left">
                <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                    <Link to="/" className="d-flex align-items-center pb-1 mb-md-0 me-md-auto text-white text-decoration-none">
                        <span className="fs-5 d-none d-sm-inline ff-jost fw-600">Zakaria</span>
                    </Link>
                    <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        <li className="nav-item">
                            <NavLink to="/home" className="nav-link align-middle px-0 text-white  zoom-on-hover">
                                <VscHome className='fs-5' /> <span className="col-sm-12 col-md-5 portfolio-link text-decoration-none text-white m-1 px-2 py-1  rounded">Accueil</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/Cities" className="nav-link align-middle px-0 text-white  zoom-on-hover">
                                <FiUser className='fs-5' /> <span className="col-sm-12 col-md-5 portfolio-link text-decoration-none text-white m-1 px-2 py-1 rounded">Ville</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/cities" className="nav-link align-middle px-0 text-white  zoom-on-hover">
                                <BsCode className='fs-5' /> <span className="col-sm-12 col-md-5 portfolio-link text-decoration-none text-white m-1 px-2 py-1  rounded ">Compétences</span>
                            </NavLink>
                        </li>
                        


                        
                    </ul>
                    <hr />
                    
                </div>
            </div>

        </Fragment>
    )
}

export default Sidebar;