import * as allIcons from '@ant-design/icons';
import { MenuDataItem } from '@ant-design/pro-layout';
import React from 'react';

const fixMenuItemIcon = (menus: MenuDataItem[], iconType = 'Outlined'): MenuDataItem[] => {
  menus.forEach((item) => {
    const { icon, children } = item;
    if (icon && typeof icon === 'string') {
      const fixIconName = icon.slice(0, 1).toLocaleUpperCase() + icon.slice(1) + iconType;
      let iconObject = '' as any;
      // 使用类型断言绕过类型检查
      const icons = allIcons as any;
      if (typeof icons[fixIconName] !== 'undefined') {
        iconObject = React.createElement(icons[fixIconName]);
      } else if (typeof icons[icon] !== 'undefined') {
        iconObject = React.createElement(icons[icon]);
      }
      item.icon = iconObject;
    }
    if (children && children.length > 0) {
      item.children = fixMenuItemIcon(children);
    }
  });
  return menus;
};

export default fixMenuItemIcon;
