import { Button } from "react-bootstrap";
import { useJwt } from "../hooks/useJwt";
import { useNavigate } from "react-router";

const Home = () => {
  const { isAuthenticated, clearToken, user } = useJwt();
  const navigate = useNavigate();

  function handleLogout() {
    clearToken();
    navigate("/login");
  }
  return (
    <>
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
      {isAuthenticated && (
        <Button onClick={handleLogout} className="">
          Logout
        </Button>
      )}
    </>
  );
};

export default Home;
