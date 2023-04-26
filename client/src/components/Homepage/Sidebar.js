import React, { useState } from "react";
import "./Sidebar.scss";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ViewListSharpIcon from '@mui/icons-material/ViewListSharp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import SearchIcon from '@material-ui/icons/Search';
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const [isExpanded, setExpandState] = useState(false);
    const navigate = useNavigate();
    const menuItems = [
        {
            text: "Dashboard",
            icon: <DashboardIcon className="sidebar-icon" />,
            onClick: () => {
                navigate('/viewproducts');
            },
        },
        {
            text: "Profile",
            icon: <PersonIcon className="sidebar-icon" />,
            onClick: () => {
                navigate('/register');
            },
        },
        {
            text: "Cart",
            icon: <ShoppingCartIcon className="sidebar-icon" />,
            onClick: () => {
                navigate('/viewcart');
            },
        },
        {
            text: "Orders",
            icon: <ViewListSharpIcon className="sidebar-icon" />,
            onClick: () => {
                navigate('/orders');
            },
        },
        
        {
            text: "Search",
            icon: <SearchIcon className="sidebar-icon"/>,
            onClick: () => {
                navigate('/Search');
            },
        },
        {
            text: "Logout",
            icon: <LogoutSharpIcon className="sidebar-icon"/>,
            onClick: () => {
                navigate('/logout');
            },
        },
        
    ];
    return (
        <div
            className={
                isExpanded
                    ? "side-nav-container"
                    : "side-nav-container side-nav-container-NX"
            }
        >
            <div className="nav-upper">
                <div className="nav-heading">
                    {isExpanded && (
                        <div className="nav-brand">
                            <h2>MINTOR</h2>
                        </div>
                    )}
                    <button
                        className={
                            isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
                        }
                        onClick={() => setExpandState(!isExpanded)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
                <div className="nav-menu">
                    {menuItems.map(({ text, icon, onClick }, index) => (
                        <div
                            key={index}
                            className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
                            onClick={onClick}
                        >
                            {icon}
                            {isExpanded && <p>{text}</p>}
                        </div>
                    ))}
                </div>
            </div>
            
            
            
        </div>
        
    );
};

export default Sidebar;
