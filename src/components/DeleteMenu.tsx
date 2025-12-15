import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { deleteMenu } from "../api/api";

export interface DeleteMenuPayload {
  menu_id: number;
}

export interface DeleteMenuResponse {
  status: string;
  message: string;
}

const DeleteMenu = () => {
  const [menuId, setMenuId] = useState(0);
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: deleteMenu,
    onSuccess: () => {
      setMenuId(0);
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload: DeleteMenuPayload = {
      menu_id: menuId,
    };

    mutate(payload);
  }
  return (
    <Card className="shadow-sm" style={{ width: "24rem" }}>
      <Card.Body>
        <h3 className="text-center">Delete Menu</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Menu ID</Form.Label>
            <Form.Control
              type="number"
              min={0}
              value={menuId}
              onChange={(e) => setMenuId(parseInt(e.target.value))}
            />
          </Form.Group>
          <Button
            type="submit"
            variant="outline-danger"
            className="w-100"
            disabled={isPending}
          >
            Delete
          </Button>
          {isError && <p>error: {error.message}</p>}
          {isSuccess && <p>{data.message}</p>}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default DeleteMenu;
