import type { Menu } from "../pages/Homepage";

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
