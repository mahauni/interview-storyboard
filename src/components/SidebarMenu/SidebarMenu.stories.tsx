import type { Meta, StoryObj } from '@storybook/react-vite';

import { SidebarMenu } from './SidebarMenu';

const meta = {
    component: SidebarMenu,
} satisfies Meta<typeof SidebarMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

const menuData = [
    { title: 'Home' },
    {
        title: 'Services',
        submenu: [
            { title: 'Web Development' },
            { title: 'Mobile Apps' },
        ],
    },
    {
        title: 'About',
        submenu: [
            { title: 'Company' },
            { title: 'Team' },
        ],
    },
    { title: 'Contact' },
]

export const Default: Story = {
    args: {
        isOpen: false,
        menuData
    }
};

export const ClosedMenu: Story = {
    args: {
        isOpen: false,
        menuData
    }
};

export const OpenMenu: Story = {
    args: {
        isOpen: true,
        menuData
    }
};
