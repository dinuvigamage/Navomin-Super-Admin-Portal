// import {
//   FiGrid,
//   FiFileText,
//   FiShoppingCart,
//   FiMessageSquare,
//   FiArchive,
//   FiUsers,
//   FiLogOut,
// } from "react-icons/fi";
// import { NavLink, useNavigate } from "react-router-dom";
// import GlobalVars from "../globalVars";
// import { useCallback } from "react";

// export default function Sidebar() {
//   const navigate = useNavigate();
//   const [user, logoutUser] = GlobalVars();

//   const handleNavigation = useCallback(
//     (path) => {
//       navigate(path);
//     },
//     [navigate]
//   );

//   const handleLogout = () => {
//     logoutUser(); // Call the logout function from GlobalVars
//   };
//   return (
//     <div className="bg-light text-black vh-100 p-3" style={{ width: "250px" }}>
//       <h4 className="mb-4">Navomin Super</h4>
//       <ul className="nav flex-column">
//         <li className="nav-item mb-2">
//           <NavLink
//             to="/"
//             className={({ isActive }) =>
//               isActive
//                 ? "nav-link text-purple fw-bold fs-5"
//                 : "nav-link text-black fs-5"
//             }
//             end
//           >
//             <FiGrid className="me-2" />
//             Home
//           </NavLink>
//         </li>
//         <li className="nav-item mb-2">
//           <NavLink
//             to="/billing"
//             className={({ isActive }) =>
//               isActive
//                 ? "nav-link text-purple fw-bold fs-5"
//                 : "nav-link text-black fs-5"
//             }
//           >
//             <FiFileText className="me-2" />
//             Billing
//           </NavLink>
//         </li>
//         <li className="nav-item mb-2">
//           <NavLink
//             to="/preOrders"
//             className={({ isActive }) =>
//               isActive
//                 ? "nav-link text-purple fw-bold fs-5"
//                 : "nav-link text-black fs-5"
//             }
//           >
//             <FiShoppingCart className="me-2" />
//             Pre Order
//           </NavLink>
//         </li>
//         <li className="nav-item mb-2">
//           <NavLink
//             to="/normalOrders"
//             className={({ isActive }) =>
//               isActive
//                 ? "nav-link text-purple fw-bold fs-5"
//                 : "nav-link text-black fs-5"
//             }
//           >
//             <FiShoppingCart className="me-2" />
//             Normal Orders
//           </NavLink>
//         </li>
//         <li className="nav-item mb-2">
//           <NavLink
//             to="/inventory"
//             className={({ isActive }) =>
//               isActive
//                 ? "nav-link text-purple fw-bold fs-5"
//                 : "nav-link text-black fs-5"
//             }
//           >
//             <FiArchive className="me-2" />
//             Inventory
//           </NavLink>
//         </li>
//         {/* <li className="nav-item mb-2">
//           <NavLink to="/creditProfile" className="nav-link text-black">
//             <FiUsers className="me-2" />
//             Credit Profiles
//           </NavLink>
//         </li>
//         <li className="nav-item mb-2">
//           <NavLink to="/pendingPayments" className="nav-link text-black">
//             <FiUsers className="me-2" />
//             Pending Payments
//           </NavLink>
//         </li>
//         <li className="nav-item mb-2">
//           <NavLink to="/#" className="nav-link text-black">
//             <FiUsers className="me-2" />
//             Staff Profiles
//           </NavLink>
//         </li> */}
//       </ul>
//       <div className="mt-auto bg-black">
//         <hr className="my-4" />
//         <div className="d-flex justify-contant-end p-3 w-100">
//           {user ? (
//             <div className="d-flex align-items-end justify-content-end w-100">
//               {/* Profile Image */}
//               <div
//                 className="position-relative d-flex align-items-center"
//                 onClick={() => handleNavigation("/profile")}
//                 style={{ cursor: "pointer" }}
//               >
//                 <img
//                   src={"https://i.imgur.com/GPee7gF.jpg"}
//                   alt="Profile"
//                   className="rounded-circle me-2"
//                   style={{ width: "40px", height: "40px" }}
//                 />
//                 <span
//                   className="position-absolute"
//                   style={{
//                     width: "12px",
//                     height: "12px",
//                     backgroundColor: "red",
//                     borderRadius: "50%",
//                     bottom: "2px",
//                     right: "5px",
//                     border: "2px solid white",
//                   }}
//                 ></span>
//               </div>

//               {/* Profile Info */}
//               <div
//                 className="d-flex flex-column me-3"
//                 onClick={() => handleNavigation("/profile")}
//                 style={{ cursor: "pointer" }}
//               >
//                 <span className="fw-bold">{user.First_Name}</span>
//                 <span className="text-success" style={{ fontSize: "12px" }}>
//                   View profile
//                 </span>
//               </div>

//               {/* Settings Icon */}
//               {/* <button className="btn me-2" onClick={() => handleNavigation("/settings")}>
//                 <FaCog className="fs-5 text-dark" />
//               </button> */}

//               {/* Logout Button */}
//               <button
//                 className="btn btn-light text-danger border border-danger py-1"
//                 onClick={handleLogout}
//               >
//                 Log out
//               </button>
//             </div>
//           ) : (
//             <button
//               className="btn btn-primary me-3 py-1"
//               onClick={() => handleNavigation("/login")}
//             >
//               Login
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

import {
  FiGrid,
  FiFileText,
  FiShoppingCart,
  FiArchive,
} from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import GlobalVars from "../globalVars";
import { useCallback } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [user, logoutUser] = GlobalVars();

  const handleNavigation = useCallback(
    (path) => {
      navigate(path);
    },
    [navigate]
  );

  const handleLogout = () => {
    logoutUser(); // Call the logout function from GlobalVars
  };

  return (
    <div className="bg-light text-black d-flex flex-column vh-100 p-3" style={{ width: "250px" }}>
      {/* Sidebar header */}
      <h4 className="mb-4">Navomin Super</h4>

      {/* Sidebar links */}
      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "nav-link text-purple fw-bold fs-5"
                : "nav-link text-black fs-5"
            }
            end
          >
            <FiGrid className="me-2" />
            Home
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/billing"
            className={({ isActive }) =>
              isActive
                ? "nav-link text-purple fw-bold fs-5"
                : "nav-link text-black fs-5"
            }
          >
            <FiFileText className="me-2" />
            Billing
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/preOrders"
            className={({ isActive }) =>
              isActive
                ? "nav-link text-purple fw-bold fs-5"
                : "nav-link text-black fs-5"
            }
          >
            <FiShoppingCart className="me-2" />
            Pre Order
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/normalOrders"
            className={({ isActive }) =>
              isActive
                ? "nav-link text-purple fw-bold fs-5"
                : "nav-link text-black fs-5"
            }
          >
            <FiShoppingCart className="me-2" />
            Normal Orders
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink
            to="/inventory"
            className={({ isActive }) =>
              isActive
                ? "nav-link text-purple fw-bold fs-5"
                : "nav-link text-black fs-5"
            }
          >
            <FiArchive className="me-2" />
            Inventory
          </NavLink>
        </li>
      </ul>

      {/* Spacer to push profile/login to bottom */}
      <div className="flex-grow-1"></div>

      {/* Bottom section */}
      <div className="mt-auto">
        <hr className="my-4" />
        <div className="d-flex align-items-center justify-content-end w-100">
          {user ? (
            <div className="d-flex align-items-center">
              {/* Profile Image */}
              <div
                className="position-relative d-flex align-items-center me-2"
                onClick={() => handleNavigation("/profile")}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={"https://i.imgur.com/GPee7gF.jpg"}
                  alt="Profile"
                  className="rounded-circle"
                  style={{ width: "40px", height: "40px" }}
                />
                <span
                  className="position-absolute"
                  style={{
                    width: "12px",
                    height: "12px",
                    backgroundColor: "red",
                    borderRadius: "50%",
                    bottom: "2px",
                    right: "5px",
                    border: "2px solid white",
                  }}
                ></span>
              </div>

              {/* Profile Info */}
              <div
                className="d-flex flex-column me-2"
                onClick={() => handleNavigation("/profile")}
                style={{ cursor: "pointer" }}
              >
                <span className="fw-bold">{user.Name}</span>
                <span className="text-success" style={{ fontSize: "12px" }}>
                  View profile
                </span>
              </div>
            </div>
          ) : (
            <button
              className="btn btn-primary py-1 px-3"
              onClick={() => handleNavigation("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
