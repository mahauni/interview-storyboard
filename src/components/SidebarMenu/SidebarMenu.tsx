import React, { useState } from 'react';
import './assets/style.css'
import type { MenuType } from './types/menu.type';

type SidebarMenuProps = {
    isOpen?: boolean
    menuData: MenuType[]
}

export const SidebarMenu = ({ isOpen = false, menuData }: SidebarMenuProps) => {
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const [openSubmenus, setOpenSubmenus] = useState<any>({});
    const [menuOpen, setMenuOpen] = useState(isOpen);

    const toggleSubmenu = (index: number) => {
        /* eslint-disable  @typescript-eslint/no-explicit-any */
        setOpenSubmenus((prev: any) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    function onOutsideClick() {
        setMenuOpen(false)
    }

    function onOpen() {
        setMenuOpen(true)
    }

    return (
        <>
            {menuOpen && <div className="sidebar-backdrop" onClick={onOutsideClick} />}
            <div className={`sidebar ${menuOpen ? 'open' : ''}`} onClick={onOpen}>
                {menuOpen && (
                    <ul className="menu">
                        {menuData.map((item: MenuType, index: number) => (
                            <li key={index}>
                                <div
                                    className="menu-item"
                                    onClick={() => item.submenu && toggleSubmenu(index)}
                                >
                                    {item.title} {item.submenu && <span>{openSubmenus[index] ? '▲' : '▼'}</span>}
                                </div>
                                {item.submenu && openSubmenus[index] && (
                                    <ul className="submenu">
                                        {item.submenu.map((sub, subIndex) => (
                                            <li key={subIndex} className="submenu-item">{sub.title}</li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    );
};


