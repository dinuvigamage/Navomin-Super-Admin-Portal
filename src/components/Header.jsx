import { FiLogOut } from "react-icons/fi";

const Header = () => {
  return (
    <div className="d-flex justify-content-end m-2 px-4">
      <button
        className="btn btn-light text-danger border"
        // onClick={handleLogout}
      >
        <FiLogOut className="me-1" /> Log out
      </button>
    </div>
  );
};

export default Header;