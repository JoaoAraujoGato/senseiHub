import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Field, Actions, Grid, Row, Secao, SecaoTitulo } from './FormStyles';
import { ColorPickerField } from '@/components/modal/ColorPickerField';
import { Combobox } from '@/components/ui/Combobox';
import { MultiSelect } from '@/components/ui/MultiSelect';
import { Button } from '@/components/ui/Button';

export function FormBase({ fields = [], schema, defaultValues = {}, onSubmit, onCancel, submitLabel = 'Salvar', cancelLabel = 'Cancelar' }) {
    const { register, handleSubmit, reset, control, watch, formState: { errors } } = useForm({
        resolver: schema ? zodResolver(schema) : undefined,
    });

    useEffect(() => {
        reset(defaultValues ?? {});
    }, [defaultValues, reset]);

    // Valores atuais — usados por campos condicionais (`when`)
    const valores = watch();

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

        if (f.type === 'combobox') {
            return (
                <Controller
                    key={f.name}
                    name={f.name}
                    control={control}
                    rules={f.rules}
                    render={({ field }) => (
                        <Combobox
                            id={f.name}
                            label={f.label}
                            optional={f.optional}
                            placeholder={f.placeholder}
                            options={f.options ?? []}
                            value={field.value ?? ''}
                            onChange={field.onChange}
                            error={errors[f.name]?.message}
                        />
                    )}
                />
            );
        }

        if (f.type === 'multiselect') {
            return (
                <Controller
                    key={f.name}
                    name={f.name}
                    control={control}
                    rules={f.rules}
                    render={({ field }) => (
                        <MultiSelect
                            id={f.name}
                            label={f.label}
                            optional={f.optional}
                            placeholder={f.placeholder}
                            options={f.options ?? []}
                            value={field.value ?? []}
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
                    <label htmlFor={f.name}>{f.label}</label>
                    <select id={f.name} {...register(f.name)}>
                        <option value="">Selecione...</option>
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
                <Field key={f.name} style={{ ...f.style, gridColumn: '1 / -1' }}>
                    <label htmlFor={f.name}>{f.label}</label>
                    <textarea id={f.name} rows={f.rows ?? 3} placeholder={f.placeholder} {...register(f.name)} />
                    {errors[f.name] && <span>{errors[f.name].message}</span>}
                </Field>
            );
        }

        return (
            <Field key={f.name} style={f.style}>
                <label htmlFor={f.name}>{f.label}</label>
                <input
                    id={f.name}
                    type={f.type ?? 'text'}
                    placeholder={f.placeholder}
                    {...register(f.name, f.rules)}
                />
                {errors[f.name] && <span>{errors[f.name].message}</span>}
            </Field>
        );
    };

    // Agrupa campos por seção (preserva a ordem de aparição)
    const secoes = [];
    for (const f of fields) {
        if (f.when && !f.when(valores)) continue; // condicional
        const titulo = f.section ?? null;
        let secao = secoes.find(s => s.titulo === titulo);
        if (!secao) {
            secao = { titulo, grupos: [] };
            secoes.push(secao);
        }
        const rowKey = f.row ?? f.name;
        let grupo = secao.grupos.find(g => g.key === rowKey);
        if (!grupo) {
            grupo = { key: rowKey, campos: [] };
            secao.grupos.push(grupo);
        }
        grupo.campos.push(f);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {secoes.map((secao, i) => (
                <Secao key={secao.titulo ?? i}>
                    {secao.titulo && <SecaoTitulo>{secao.titulo}</SecaoTitulo>}
                    <Grid>
                        {secao.grupos.map(grupo =>
                            grupo.campos.length > 1
                                ? <Row key={grupo.key}>
                                    {grupo.campos.map(renderField)}
                                </Row>
                                : renderField(grupo.campos[0])
                        )}
                    </Grid>
                </Secao>
            ))}

            <Actions>
                <Button type="button" variant="secondary" onClick={onCancel}>{cancelLabel}</Button>
                <Button type="submit" variant="primary">{submitLabel}</Button>
            </Actions>
        </form>
    );
}

FormBase.propTypes = {
    fields: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
        type: PropTypes.string,
        placeholder: PropTypes.string,
        options: PropTypes.arrayOf(PropTypes.shape({
            value: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
        })),
        size: PropTypes.number,
        rows: PropTypes.number,
        rules: PropTypes.object,
        row: PropTypes.string,
        style: PropTypes.object,
        optional: PropTypes.bool,
        section: PropTypes.string,
        when: PropTypes.func,
    })),
    schema: PropTypes.object,
    defaultValues: PropTypes.object,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    submitLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
};
