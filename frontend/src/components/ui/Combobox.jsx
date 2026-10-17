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

const InputBox = styled.input`
    width: 100%;
    box-sizing: border-box;
    min-height: 2.5rem;
    padding: 0.6rem 2rem 0.6rem 0.8rem;
    border: 1px solid #535353;
    background-color: #1f2830;
    border-radius: 0.4rem;
    font-size: 0.9rem;
    outline: none;
    color: #fff;

    &::placeholder { color: #6b7280; }
    &:focus { border-color: #C53A2C; }
`;

const Clear = styled.button`
    position: absolute;
    top: 50%;
    right: 0.6rem;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    color: #6b7280;
    cursor: pointer;
    line-height: 1;

    &:hover { color: #ef4444; }
    &:focus { outline: none; }
`;

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
    display: block;
    width: 100%;
    text-align: left;
    padding: 0.55rem 0.8rem;
    background: transparent;
    border: none;
    color: #fff;
    cursor: pointer;
    font-size: 0.9rem;

    &:hover { background: #C53A2C; }
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

export function Combobox({ id, label, options = [], value, onChange, placeholder, error, optional }) {
    const [aberto, setAberto] = useState(false);
    const [busca, setBusca] = useState('');
    const ref = useRef(null);

    const selecionado = options.find(o => o.value === value);

    useEffect(() => {
        const onClickFora = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setAberto(false);
                setBusca('');
            }
        };
        document.addEventListener('mousedown', onClickFora);
        return () => document.removeEventListener('mousedown', onClickFora);
    }, []);

    const filtradas = options.filter(o => o.label.toLowerCase().includes(busca.toLowerCase()));

    const selecionar = (opcao) => {
        onChange(opcao.value);
        setAberto(false);
        setBusca('');
    };

    return (
        <Wrapper ref={ref}>
            <Label htmlFor={id}>
                {label}
                {optional && <small> (opcional)</small>}
            </Label>

            <Rel>
                <InputBox
                    id={id}
                    type="text"
                    role="combobox"
                    aria-expanded={aberto}
                    aria-autocomplete="list"
                    placeholder={placeholder ?? 'Selecione...'}
                    value={aberto ? busca : (selecionado?.label ?? '')}
                    onChange={(e) => { setBusca(e.target.value); setAberto(true); }}
                    onFocus={() => { setBusca(''); setAberto(true); }}
                />

                {value && (
                    <Clear type="button" title="Limpar" onClick={() => onChange('')}>✕</Clear>
                )}

                {aberto && (
                    <Dropdown role="listbox">
                        {filtradas.length === 0 ? (
                            <Vazio>Nenhuma opção</Vazio>
                        ) : filtradas.map(o => (
                            <Opcao key={o.value} type="button" role="option" aria-selected={o.value === value} onClick={() => selecionar(o)}>
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

Combobox.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
    })),
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string,
    optional: PropTypes.bool,
};
