import { Container, Row, Col, Nav } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import { getMenu } from "../api/api";

import MenuItem from "../components/MenuItem";
import { NavLink, Outlet } from "react-router";

import { routes } from "../routes";
import { useJwt } from "../hooks/useJwt";

export interface Menu {
  menu_id: number;
  name: string;
  parent_id: number | null;
  url: string;
  sort_order: number;
  children?: Menu[];
}

export default function HomePage() {
  const { isError, isPending, isSuccess, error, data } = useQuery({
    queryKey: ["menus"],
    queryFn: getMenu,
  });
  const { user } = useJwt();
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
          <Nav>
            {routes.map((r) => {
              if (r.id > 1 && user.role_id != 2) {
                return "";
              }
              return (
                <Nav.Item key={r.id}>
                  <Nav.Link>
                    <NavLink
                      to={r.path}
                      className={({ isActive }) =>
                        isActive ? "text-danger" : ""
                      }
                    >
                      {r.name}
                    </NavLink>
                  </Nav.Link>
                </Nav.Item>
              );
            })}
          </Nav>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}
