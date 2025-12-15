import { useQuery } from "@tanstack/react-query";
import { Badge, Card, Table } from "react-bootstrap";
import { getUserRoles } from "../api/api";

type Role = {
  username: string;
  roles: string[];
};

export interface UserRolesResponse {
  status: string;
  message: string;
  users: Role[];
}

const UserRoles = () => {
  const { isPending, isError, error, isSuccess, data } = useQuery({
    queryKey: ["user-roles"],
    queryFn: getUserRoles,
  });
  return (
    <Card className="shadow-sm" style={{ width: "24rem" }}>
      <Card.Body>
        <h3 className="text-center">User Roles</h3>
        {isPending && <p>data is loading...</p>}
        {isError && <p>error: {error.message}</p>}
        {isSuccess && (
          <Table>
            <thead>
              <tr>
                <td>No</td>
                <td>Username</td>
                <td>Roles</td>
              </tr>
            </thead>
            <tbody>
              {data.users.map((d, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{d.username}</td>
                  <td>
                    {d.roles.map((r, j) => (
                      <Badge
                        className="me-2"
                        bg={r == "admin" ? "primary" : "secondary"}
                        key={j}
                      >
                        {r}
                      </Badge>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default UserRoles;
