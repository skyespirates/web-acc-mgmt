import { Nav } from "react-bootstrap";
import type { Menu } from "../pages/Homepage";

export default function MenuItem({
  menu,
  level = 0,
}: {
  menu: Menu;
  level?: number;
}) {
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
