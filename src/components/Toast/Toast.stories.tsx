import type { Meta, StoryObj } from '@storybook/react-vite';

import { Toast } from './Toast';

const meta = {
    component: Toast,
    parameters: {
        layout: 'centered',
    },
    args: {
        title: 'Testing',
        description: 'Custom description',
    },
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};

export const Success: Story = {
    args: {
        variant: 'success'
    }
};

export const Error: Story = {
    args: {
        variant: 'error'
    }
};

export const Warning: Story = {
    args: {
        variant: 'warning'
    }
};

export const Info: Story = {
    args: {
        variant: 'info'
    }
};

export const Closable: Story = {
    args: {
        dismissible: true
    }
};


export const CustomTime: Story = {
    args: {
        duration: 10_000
    }
};
