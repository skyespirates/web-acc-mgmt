import { useState, type FormEvent } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addMenu } from "../api/api";

export interface MenuPayload {
  name: string;
  parent_id?: number;
  url?: string;
  sort_order?: number;
}

export interface AddMenuResponse {
  message: string;
  insertedId: number;
}

const MenuForm = () => {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState(0);
  const [url, setUrl] = useState("");
  const [sortOrder, setSortOrder] = useState(0);

  const queryClient = useQueryClient();

  const { isPending, isError, mutate, error } = useMutation({
    mutationFn: addMenu,
    onSuccess: () => {
      setName("");
      setParentId(0);
      setUrl("");
      setSortOrder(0);

      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload: MenuPayload = {
      name,
      parent_id: parentId,
      url,
      sort_order: sortOrder,
    };
    mutate(payload);
  }
  return (
    <Card className="shadow-sm" style={{ width: "24rem" }}>
      <Card.Body>
        <h3 className="text-center mb-4">Add Menu</h3>
        <Form onSubmit={handleSubmit}>
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
            <Form.Label>Parent ID</Form.Label>
            <Form.Control
              type="number"
              placeholder="parent id"
              value={parentId}
              onChange={(e) => setParentId(parseInt(e.target.value))}
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
            variant="secondary"
            type="submit"
            className="w-100 mb-3"
            disabled={isPending}
          >
            Add Menu
          </Button>
          {isError && <p>{error.message}</p>}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default MenuForm;
