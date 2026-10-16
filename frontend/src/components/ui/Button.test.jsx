// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
    it('renderiza o texto e dispara onClick', () => {
        const onClick = vi.fn();
        render(<Button onClick={onClick}>Salvar</Button>);

        const btn = screen.getByRole('button', { name: 'Salvar' });
        fireEvent.click(btn);

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('respeita o estado desabilitado', () => {
        render(<Button disabled>Salvar</Button>);
        expect(screen.getByRole('button', { name: 'Salvar' })).toBeDisabled();
    });
});
