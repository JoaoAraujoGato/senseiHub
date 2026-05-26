import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Actions, Button, CloseButton, Field, Modal, ModalHeader, ModalTitle, Overlay } from './ModalGenericoStyle'
import { ColorPickerField } from './ColorPickerField'

export function ModalGenerico({ aberto, onFechar, onSalvar, titulo, fields, defaultValues, submitLabel }) {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm()

  useEffect(() => {
    reset(defaultValues ?? {})
  }, [defaultValues, reset])

  if (!aberto) return null

  // Agrupa campos que têm `row` igual para renderizar lado a lado
  const rows = fields.reduce((acc, field) => {
    const key = field.row ?? field.name  // sem row → linha própria
    if (!acc[key]) acc[key] = []
    acc[key].push(field)
    return acc
  }, {})

  const renderField = (f) => {
    if (f.type === 'color') {
        return (
            <Controller
                key={f.name}
                name={f.name}
                control={control}
                rules={f.rules}
                render={({ field }) => (
                    <ColorPickerField
                        label={f.label}
                        optional={f.optional}
                        value={field.value ?? ''}
                        onChange={field.onChange}
                        error={errors[f.name]?.message}
                    />
                )}
            />
        );
    }

    return (
      <Field key={f.name} style={f.style}>
        <label>{f.label}</label>
        <input
          type={f.type ?? 'text'}
          placeholder={f.placeholder}
          {...register(f.name, f.rules)}
        />
        {errors[f.name] && <span>{errors[f.name].message}</span>}
      </Field>
  )}

  return (
    <Overlay onClick={onFechar}>
      <Modal onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{titulo}</ModalTitle>
          <CloseButton onClick={onFechar}>✕</CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit(onSalvar)}>
          {Object.values(rows).map((group, i) =>
            group.length > 1
              ? <div key={i} style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                  {group.map(renderField)}
                </div>
              : renderField(group[0])
          )}

          <Actions style={{ marginTop: '1rem' }}>
            <Button type="button" onClick={onFechar}>Cancelar</Button>
            <Button type="submit" $variant="primary">{submitLabel}</Button>
          </Actions>
        </form>
      </Modal>
    </Overlay>
  )
}

ModalGenerico.defaultProps = {
  aberto: false,
  onFechar: () => {},
  onSalvar: () => {},
  defaultValues: {},
  fields: [],
  submitLabel: 'Salvar',
}

ModalGenerico.propTypes = {
  aberto: PropTypes.bool,
  onFechar: PropTypes.func,
  onSalvar: PropTypes.func,
  titulo: PropTypes.string.isRequired,
  submitLabel: PropTypes.string,
  defaultValues: PropTypes.object,
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,          // 'text' | 'color' | 'email' …
    placeholder: PropTypes.string,
    rules: PropTypes.object,         // react-hook-form rules
    row: PropTypes.string,           // campos com mesmo row ficam lado a lado
    style: PropTypes.object,
  })),
}