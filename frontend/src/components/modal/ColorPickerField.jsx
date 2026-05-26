import PropTypes from 'prop-types';
import { useRef } from 'react';
import { ColorCircle, ColorCircleEmpty, ColorClearButton, ColorErrorMsg, ColorHexValue, ColorPickerLabel, ColorPickerRow, ColorPickerWrapper } from './ModalGenericoStyle';

export function ColorPickerField({ label, value, onChange, error, optional }) {
    const inputRef = useRef(null);
    const hasColor = !!value;

    return (
        <ColorPickerWrapper>
            <ColorPickerLabel>
                {label}
                {optional && <small> (opcional)</small>}
            </ColorPickerLabel>

            <ColorPickerRow>
                {hasColor ? (
                    <ColorCircle
                        type="button"
                        $cor={value}
                        title="Clique para trocar a cor"
                        onClick={() => inputRef.current?.click()}
                    >
                        <input
                            ref={inputRef}
                            type="color"
                            value={value}
                            onChange={e => onChange(e.target.value)}
                        />
                    </ColorCircle>
                ) : (
                    <ColorCircleEmpty
                        type="button"
                        title="Clique para escolher uma cor"
                        onClick={() => inputRef.current?.click()}
                    >
                        <input
                            ref={inputRef}
                            type="color"
                            value="#000000"
                            onChange={e => onChange(e.target.value)}
                        />
                    </ColorCircleEmpty>
                )}

                {hasColor && (
                    <>
                        <ColorHexValue>{value.toUpperCase()}</ColorHexValue>
                        <ColorClearButton
                            type="button"
                            title="Remover cor"
                            onClick={() => onChange('')}
                        >
                            ✕
                        </ColorClearButton>
                    </>
                )}
            </ColorPickerRow>

            {error && <ColorErrorMsg>{error}</ColorErrorMsg>}
        </ColorPickerWrapper>
    );
}

ColorPickerField.defaultProps = {
    value:    '',
    onChange: () => {},
    error:    null,
    optional: false,
};

ColorPickerField.propTypes = {
    label:    PropTypes.string.isRequired,
    value:    PropTypes.string,
    onChange: PropTypes.func,
    error:    PropTypes.string,
    optional: PropTypes.bool,
};