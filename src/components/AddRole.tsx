import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { addRole } from "../api/api";

const AddRole = () => {
  const [role, setRole] = useState("");

  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error, isSuccess, data } = useMutation({
    mutationFn: addRole,
    onSuccess: () => {
      setRole("");
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    mutate(role);
  }
  return (
    <Card className="shadow-sm" style={{ width: "24rem" }}>
      <Card.Body>
        <h3 className="text-center">Add New Role</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter role name"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="outline-success"
            className="w-100"
            disabled={isPending}
          >
            Add Role
          </Button>
          {isError && <p>{error.message}</p>}
          {isSuccess && <p>{data.message}</p>}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddRole;
