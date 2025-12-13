import { useEffect, useState } from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { useJwt } from "../hooks/useJwt";

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
        <Nav.Link href={menu.url || "#"}>{menu.name}</Nav.Link>
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
  const [menus, setMenus] = useState<Menu[]>([]);
  const { isAuthenticated, user } = useJwt();

  useEffect(() => {
    // Example: data normally fetched from API
    const flatMenus: Menu[] = [
      {
        menu_id: 1,
        name: "Dashboard",
        parent_id: null,
        url: "/",
        sort_order: 1,
      },
      { menu_id: 2, name: "Users", parent_id: null, url: "#", sort_order: 2 },
      {
        menu_id: 3,
        name: "User List",
        parent_id: 2,
        url: "/users",
        sort_order: 1,
      },
      {
        menu_id: 4,
        name: "User Roles",
        parent_id: 2,
        url: "/roles",
        sort_order: 2,
      },
      {
        menu_id: 5,
        name: "Settings",
        parent_id: 4,
        url: "/roles/settings",
        sort_order: 1,
      },
    ];

    setMenus(buildMenuTree(flatMenus));
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col md={3} className="border-end min-vh-100 p-3">
          <h5 className="mb-3">Menu</h5>
          <Nav className="flex-column">
            {menus.map((menu) => (
              <MenuItem key={menu.menu_id} menu={menu} />
            ))}
          </Nav>
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
        </Col>
      </Row>
    </Container>
  );
}
