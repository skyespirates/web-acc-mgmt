import { useQuery } from "@tanstack/react-query";
import { getRoleList } from "../api/api";
import { Card, ListGroup } from "react-bootstrap";

interface Role {
  role_id: number;
  name: string;
  description?: string;
}

export interface RoleListResponse {
  status: string;
  message: string;
  roles: Role[];
}

const RoleList = () => {
  const { isPending, isError, error, isSuccess, data } = useQuery({
    queryKey: ["roles"],
    queryFn: getRoleList,
  });
  if (isPending) return <p>Fetching role list..</p>;
  if (isError) return <p>{error.message}</p>;
  if (isSuccess) {
    return (
      <Card className="shadow-sm" style={{ width: "24rem" }}>
        <Card.Body>
          <h3 className="text-center">Role List</h3>
          <ListGroup numbered variant="flush">
            {data.roles.map((role) => (
              <ListGroup.Item key={role.role_id}>
                {role.name.toUpperCase()}
              </ListGroup.Item>
            ))}
            ;
          </ListGroup>
        </Card.Body>
      </Card>
    );
  }
};

export default RoleList;
