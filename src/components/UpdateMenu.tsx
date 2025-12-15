import { useState, type FormEvent } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateMenu } from "../api/api";

export interface UpdateMenuPayload {
  menu_id: number;
  name: string;
  url?: string;
  sort_order?: number;
}

export interface UpdateMenuResponse {
  status: string;
  message: string;
  insertedId: number;
}

const UpdateMenu = () => {
  const [menuId, setMenuId] = useState(0);
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const queryClient = useQueryClient();

  const { isPending, isError, mutate, error, isSuccess, data } = useMutation({
    mutationFn: updateMenu,
    onSuccess: () => {
      setMenuId(0);
      setName("");
      setUrl("");
      setSortOrder(0);

      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload: UpdateMenuPayload = {
      menu_id: menuId,
      name,
      url,
      sort_order: sortOrder,
    };
    mutate(payload);
  }
  return (
    <Card className="shadow-sm" style={{ width: "24rem" }}>
      <Card.Body>
        <h3 className="text-center mb-4">Edit Menu</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Menu ID</Form.Label>
            <Form.Control
              type="number"
              min={0}
              placeholder="Enter menu id"
              value={menuId}
              onChange={(e) => setMenuId(parseInt(e.target.value))}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter menu name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>URL</Form.Label>
            <Form.Control
              type="text"
              placeholder="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Sort Order</Form.Label>
            <Form.Control
              type="number"
              placeholder="sort order"
              value={sortOrder}
              onChange={(e) => setSortOrder(parseInt(e.target.value))}
            />
          </Form.Group>
          <Button
            variant="outline-warning"
            type="submit"
            className="w-100 mb-3"
            disabled={isPending}
          >
            Update
          </Button>
          {isError && <p>{error.message}</p>}
          {isSuccess && <p>{data.message}</p>}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UpdateMenu;
