import { NavLink } from "react-router-dom";

const Headers=()=>{
    return(
        <>
         <div className="sidebar">
                        <ul className="nav-menu">
                            <li>
                                <NavLink
                                    id=""
                                    className={({ isActive }) =>
                                        `nav-item ${isActive ? "active" : ""}`
                                    }
                                    to={"/"}
                                    title="notification_settings"
                                >
                                    <i className="fas fa-store"></i>
                                    <span>Store</span>
                                </NavLink>
                            </li>


                            <li>
                                <NavLink
                                    id=""
                                    className={({ isActive }) =>
                                        `nav-item ${isActive ? "active" : ""}`
                                    }
                                    to={"/sku"}
                                    title="notification_settings"
                                >
                                    <i className="fas fa-barcode"></i>
                                    <span>SKU</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    id=""
                                    className={({ isActive }) =>
                                        `nav-item ${isActive ? "active" : ""}`
                                    }
                                    to={"/planning"}
                                    title="notification_settings"
                                >
                                    <i className="fas fa-calendar-alt"></i>
                                    <span>Planning</span>
                                </NavLink>
                            </li>

                            <li>
                                <NavLink
                                    id=""
                                    className={({ isActive }) =>
                                        `nav-item ${isActive ? "active" : ""}`
                                    }
                                    to={"/chart"}
                                    title="notification_settings"
                                >
                                    <i className="fas fa-chart-bar"></i>
                                    <span>Charts</span>
                                </NavLink>
                            </li>

                        </ul>
                    </div>
        </>
    )
}
export default Headers;