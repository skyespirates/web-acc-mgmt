import { Modal, Button, ListGroup } from "react-bootstrap";
import { useJwt, type TokenPayload } from "../hooks/useJwt";
import { jwtDecode } from "jwt-decode";
export interface Role {
  role_id: number;
  name: string;
}

interface RoleSelectModalProps {
  show: boolean;
  roles: Role[];
  onSelect: (employee_id: number, role_id: number) => void;
  onClose?: () => void;
}

export function RoleSelectModal({
  show,
  roles,
  onSelect,
  onClose,
}: RoleSelectModalProps) {
  const { token } = useJwt();
  const payload = {} as TokenPayload;
  if (token) {
    const temp = jwtDecode(token) as TokenPayload;
    payload.employee_id = temp.employee_id;
  }

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Select Your Role</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p className="text-muted mb-3">Please choose a role to continue</p>

        <ListGroup>
          {roles.map((role) => (
            <ListGroup.Item
              key={role.role_id}
              action
              onClick={() => onSelect(payload.employee_id, role.role_id)}
            >
              {role.name}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
