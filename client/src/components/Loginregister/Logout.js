import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

function Logout() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      };
      await axios.post("http://localhost:5000/logout", null, config);
      setIsLoggedOut(true);
      localStorage.clear();
    } catch (error) {
      console.error(error);
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div>
      {isLoggedOut ? (
        <>
          <Typography variant="body1">Logged out successfully</Typography>
          <Button variant="contained" onClick={handleHomeClick}>
            Home
          </Button>
        </>
      ) : (
        <Button variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      )}
    </div>
  );
}

export default Logout;
