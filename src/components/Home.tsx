import { Button } from "react-bootstrap";
import { useJwt } from "../hooks/useJwt";
import { useNavigate } from "react-router";
import Profile from "./Profile";
import { useEffect, useState } from "react";

import axios from "axios";
import LoginMethod from "./LoginMethod";
const Home = () => {
  const { isAuthenticated, clearToken, user, setToken } = useJwt();
  const navigate = useNavigate();

  const [usr, setUsr] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/user", { withCredentials: true })
      .then((res) => {
        setUsr(res.data.user);
        setToken(res.data.token);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleLogout() {
    clearToken();
    navigate("/login");
  }

  return (
    <div>
      <h2>Homepage</h2>
      <p>Select menu from sidebar.</p>

      <hr />
      <div>
        {isAuthenticated && (
          <div>
            id: {user.employee_id} | role_id: {user.role_id} | role:{" "}
            {user?.role}
          </div>
        )}
      </div>
      {isAuthenticated && <Button onClick={handleLogout}>Logout</Button>}

      <hr />
      <div>
        {usr ? (
          <Profile user={usr} />
        ) : (
          <>
            <LoginMethod />
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
