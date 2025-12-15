import { useMutation } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { addPermisson } from "../api/api";

export interface PermissionPayload {
  role_id: number;
  menu_id: number;
}

export interface PermissionResponse {
  status: string;
  message: string;
}

const AddPermission = () => {
  const [menuId, setMenuId] = useState(0);
  const [roleId, setRoleId] = useState(0);

  const { isPending, isError, error, isSuccess, data, mutate } = useMutation({
    mutationFn: addPermisson,
    onSuccess: () => {
      setRoleId(0);
      setMenuId(0);
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload: PermissionPayload = {
      role_id: roleId,
      menu_id: menuId,
    };

    mutate(payload);
  }
  return (
    <Card className="shadow-sm" style={{ width: "24rem" }}>
      <Card.Body>
        <h3 className="text-center">Add Permission</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Group className="mb-3">
              <Form.Label>Role ID</Form.Label>
              <Form.Control
                type="number"
                min={0}
                placeholder="Enter role id"
                value={roleId}
                onChange={(e) => setRoleId(parseInt(e.target.value))}
              />
            </Form.Group>
            <Form.Label>Menu ID</Form.Label>
            <Form.Control
              type="number"
              min={0}
              placeholder="Enter menu id"
              value={menuId}
              onChange={(e) => setMenuId(parseInt(e.target.value))}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="dark"
            className="w-100"
            disabled={isPending}
          >
            Set Permission
          </Button>
          {isError && <p>{error.message}</p>}
          {isSuccess && <p>{data.message}</p>}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddPermission;
