import React from 'react'
import { NavLink } from 'react-router-dom';
import { MdDevices } from "react-icons/md";

import './SideNavigationBar.css';

function SideNavigationBar() {
  return (
    <div class="sidebar">
        <div className="side-container">
            <NavLink to="/electronics" activeClassName="selectedLink">
                <div className="link-icon">
                    <MdDevices />
                </div>
                <p className="text-design">Electronics</p>
            </NavLink>
            <NavLink to="/outdoors" activeClassName="selectedLink">
                <div className="link-icon">
                    <i class="fas fa-campground"></i>
                </div>
                <p className="text-design">Outdoors</p>
            </NavLink>
            <NavLink to="/gaming" activeClassName="selectedLink">
                <div className="link-icon">
                    <i class="fab fa-xbox"></i>
                </div>
                <p className="text-design">Gaming</p>
            </NavLink>
            <NavLink to="/freebies" activeClassName="selectedLink">
                <div className="link-icon">
                    <i class="fab fa-freebsd"></i>
                </div>
                <p className="text-design">Freebies</p>
            </NavLink>
            <NavLink to="/stationery" activeClassName="selectedLink">
                <div className="link-icon">
                    <i class="fa fa-book"></i>
                </div>  
                <p className="text-design">Stationery</p>
            </NavLink>
        </div>
    </div>
  )
}

export default SideNavigationBar;