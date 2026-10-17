import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
`;

const Label = styled.label`
    font-size: 0.85rem;
    font-weight: 600;
    color: #fcfcfc;

    small {
        font-weight: 400;
        color: #6b7280;
    }
`;

const Rel = styled.div`position: relative;`;

const Box = styled.button`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.5rem;
    width: 100%;
    box-sizing: border-box;
    min-height: 2.5rem;
    padding: 0.5rem 0.8rem;
    border: 1px solid #535353;
    background-color: #1f2830;
    border-radius: 0.4rem;
    font-size: 0.9rem;
    color: #fff;
    cursor: pointer;
    text-align: left;

    &:focus { outline: none; border-color: #C53A2C; }
`;

const Placeholder = styled.span`color: #6b7280;`;

const Chips = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
`;

const Chip = styled.span`
    background: #0c131a;
    border: 1px solid #2d3f4f;
    border-radius: 4rem;
    padding: 0.1rem 0.6rem;
    font-size: 0.78rem;
`;

const Caret = styled.span`color: #9ca3af;`;

const Dropdown = styled.div`
    position: absolute;
    top: calc(100% + 2px);
    left: 0;
    right: 0;
    z-index: 20;
    background: #1f2830;
    border: 1px solid #535353;
    border-radius: 0.4rem;
    max-height: 220px;
    overflow-y: auto;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
`;

const Opcao = styled.button`
    display: flex;
    align-items: center;
    gap: 0.6rem;
    width: 100%;
    text-align: left;
    padding: 0.55rem 0.8rem;
    background: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 0.9rem;

    &:hover { background: #2d3f4f; }
    &:focus { outline: none; }
`;

const Vazio = styled.div`
    padding: 0.6rem 0.8rem;
    color: #6b7280;
    font-size: 0.85rem;
`;

const Erro = styled.span`
    font-size: 0.75rem;
    color: #ef4444;
`;

export function MultiSelect({ id, label, options = [], value = [], onChange, placeholder, error, optional }) {
    const [aberto, setAberto] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const onClickFora = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setAberto(false);
        };
        document.addEventListener('mousedown', onClickFora);
        return () => document.removeEventListener('mousedown', onClickFora);
    }, []);

    const selecionados = options.filter(o => value.includes(o.value));

    const toggle = (v) => {
        onChange(value.includes(v) ? value.filter(x => x !== v) : [...value, v]);
    };

    return (
        <Wrapper ref={ref}>
            <Label htmlFor={id}>
                {label}
                {optional && <small> (opcional)</small>}
            </Label>

            <Rel>
                <Box id={id} type="button" aria-expanded={aberto} onClick={() => setAberto(a => !a)}>
                    {selecionados.length === 0
                        ? <Placeholder>{placeholder ?? 'Selecione...'}</Placeholder>
                        : <Chips>{selecionados.map(s => <Chip key={s.value}>{s.label}</Chip>)}</Chips>}
                    <Caret>▾</Caret>
                </Box>

                {aberto && (
                    <Dropdown role="listbox">
                        {options.length === 0 ? (
                            <Vazio>Nenhuma opção</Vazio>
                        ) : options.map(o => (
                            <Opcao key={o.value} type="button" role="option" aria-selected={value.includes(o.value)} onClick={() => toggle(o.value)}>
                                <input type="checkbox" readOnly checked={value.includes(o.value)} />
                                {o.label}
                            </Opcao>
                        ))}
                    </Dropdown>
                )}
            </Rel>

            {error && <Erro>{error}</Erro>}
        </Wrapper>
    );
}

MultiSelect.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    })),
    value: PropTypes.arrayOf(PropTypes.string),
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    optional: PropTypes.bool,
};
