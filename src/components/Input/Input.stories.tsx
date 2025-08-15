import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from './Input';

const meta = {
    component: Input,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {}
};

export const Password: Story = {
    args: {
        type: 'password'
    }
};

export const Number: Story = {
    args: {
        type: 'number'
    }
};

export const Clearable: Story = {
    args: {
        clearable: true
    }
};

