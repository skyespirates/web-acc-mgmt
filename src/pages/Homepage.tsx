import { Container, Row, Col, Nav, Button } from "react-bootstrap";
import { useJwt } from "../hooks/useJwt";
import { useQuery } from "@tanstack/react-query";
import { getMenu } from "../api/api";
import { useNavigate } from "react-router";
import MenuForm from "../components/MenuForm";

// ===== Types =====
export interface Menu {
  menu_id: number;
  name: string;
  parent_id: number | null;
  url: string;
  sort_order: number;
  children?: Menu[];
}

// ===== Build Tree Helper (from your backend/logic) =====
export function buildMenuTree(flatMenus: Menu[]): Menu[] {
  const map = new Map<number, Menu>();
  const tree: Menu[] = [];

  flatMenus.forEach((m) => {
    map.set(m.menu_id, { ...m, children: [] });
  });

  flatMenus.forEach((m) => {
    const node = map.get(m.menu_id)!;

    if (m.parent_id === null) {
      tree.push(node);
    } else {
      const parent = map.get(m.parent_id);
      parent?.children?.push(node);
    }
  });

  return tree.sort((a, b) => a.sort_order - b.sort_order);
}

// ===== Recursive Menu Component =====
function MenuItem({ menu, level = 0 }: { menu: Menu; level?: number }) {
  const hasChildren = menu.children && menu.children.length > 0;

  return (
    <>
      <Nav.Item style={{ paddingLeft: level * 16 }}>
        <Nav.Link href={menu.url || "#"}>
          <u>
            <span className="text-underline">{menu.menu_id}</span>
          </u>{" "}
          {menu.name}
        </Nav.Link>
      </Nav.Item>

      {hasChildren &&
        menu
          .children!.sort((a, b) => a.sort_order - b.sort_order)
          .map((child) => (
            <MenuItem key={child.menu_id} menu={child} level={level + 1} />
          ))}
    </>
  );
}

// ===== Homepage =====
export default function HomePage() {
  const { isAuthenticated, user, token, clearToken } = useJwt();
  const { isError, isPending, isSuccess, error, data } = useQuery({
    queryKey: ["menus"],
    queryFn: () => {
      return getMenu(token!);
    },
  });
  const navigate = useNavigate();

  function handleLogout() {
    clearToken();
    navigate("/login");
  }

  return (
    <Container fluid>
      <Row>
        <Col md={3} className="border-end min-vh-100 p-3">
          <h5 className="mb-3">Menu</h5>
          {isPending && <p>menu is loading</p>}
          {isError && <p>error: {error.message}</p>}
          {isSuccess && data ? (
            <Nav className="flex-column">
              {data.map((menu: Menu) => {
                return <MenuItem key={menu.menu_id} menu={menu} />;
              })}
            </Nav>
          ) : (
            <p>Unauthenticated!</p>
          )}
        </Col>

        <Col md={9} className="p-4">
          <h2>Homepage</h2>
          <p>Select menu from sidebar.</p>
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
          <MenuForm />
        </Col>
      </Row>
    </Container>
  );
}
