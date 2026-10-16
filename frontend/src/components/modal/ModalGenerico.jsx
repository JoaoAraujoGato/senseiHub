import PropTypes from 'prop-types'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Actions, CloseButton, Field, Modal, ModalHeader, ModalTitle, Overlay } from './ModalGenericoStyle'
import { Button } from '@/components/ui/Button'
import { ColorPickerField } from './ColorPickerField'

export function ModalGenerico({ aberto, onFechar, onSalvar, titulo, fields, defaultValues, submitLabel, schema }) {
  const { register, handleSubmit, reset, control, formState: { errors } } = useForm({
    resolver: schema ? zodResolver(schema) : undefined,
  })

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

    if (f.type === 'select') {
      return (
        <Field key={f.name} style={f.style}>
          <label>{f.label}</label>
          <select {...register(f.name)}>
            <option value="">Selecione...</option>
            {(f.options ?? []).map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {errors[f.name] && <span>{errors[f.name].message}</span>}
        </Field>
      );
    }

    if (f.type === 'multiselect') {
      return (
        <Field key={f.name} style={f.style}>
          <label>{f.label}</label>
          <select multiple size={f.size ?? 4} {...register(f.name)}>
            {(f.options ?? []).map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          {errors[f.name] && <span>{errors[f.name].message}</span>}
        </Field>
      );
    }

    if (f.type === 'textarea') {
      return (
        <Field key={f.name} style={f.style}>
          <label>{f.label}</label>
          <textarea rows={f.rows ?? 3} placeholder={f.placeholder} {...register(f.name)} />
          {errors[f.name] && <span>{errors[f.name].message}</span>}
        </Field>
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
            <Button type="button" variant="secondary" onClick={onFechar}>Cancelar</Button>
            <Button type="submit" variant="primary">{submitLabel}</Button>
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
  schema: PropTypes.object,
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string,          // 'text' | 'color' | 'email' | 'password' | 'select' …
    placeholder: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })),                             // usado quando type === 'select' | 'multiselect'
    size: PropTypes.number,          // linhas visíveis do multiselect
    rows: PropTypes.number,          // linhas do textarea
    rules: PropTypes.object,         // react-hook-form rules
    row: PropTypes.string,           // campos com mesmo row ficam lado a lado
    style: PropTypes.object,
  })),
}