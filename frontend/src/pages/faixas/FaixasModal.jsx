import  PropTypes from 'prop-types';
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Actions, Button, CloseButton, ColorRow, Field, Modal, ModalHeader, ModalTitle, Overlay } from './FaixasStyle';

export function FaixaModal({ aberto, onFechar, onSalvar, faixaSelecionada }) {
    const isEdicao = !!faixaSelecionada

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    // preenche o form ao abrir em modo edição
    useEffect(() => {
        if (faixaSelecionada) {
            reset({
                nome:             faixaSelecionada.nome,
                corPrincipalHex:  faixaSelecionada.corPrincipalHex,
                corSecundariaHex: faixaSelecionada.corSecundariaHex || '',
            })
        } else {
            reset({ nome: '', corPrincipalHex: '#000000', corSecundariaHex: '' })
        }
    }, [faixaSelecionada, reset])

    if (!aberto) return null

    return (
        <Overlay onClick={onFechar}>
            <Modal onClick={e => e.stopPropagation()}>
                <ModalHeader>
                    <ModalTitle>{isEdicao ? 'Editar Faixa' : 'Nova Faixa'}</ModalTitle>
                    <CloseButton onClick={onFechar}>✕</CloseButton>
                </ModalHeader>

                <form onSubmit={handleSubmit(onSalvar)}>
                    <Field>
                        <label>Nome</label>
                        <input
                            placeholder="Ex: Azul"
                            {...register('nome', { required: 'Nome é obrigatório' })}
                        />
                        {errors.nome && <span>{errors.nome.message}</span>}
                    </Field>

                    <ColorRow>
                        <Field style={{ flex: 1 }}>
                            <label>Cor Principal</label>
                            <input
                                type="color"
                                {...register('corPrincipalHex', { required: 'Obrigatório' })}
                            />
                            {errors.corPrincipalHex && <span>{errors.corPrincipalHex.message}</span>}
                        </Field>

                        <Field style={{ flex: 1 }}>
                            <label>Cor Secundária <small>(opcional)</small></label>
                            <input
                                type="color"
                                {...register('corSecundariaHex')}
                            />
                        </Field>
                    </ColorRow>

                    <Actions style={{ marginTop: '1rem' }}>
                        <Button type="button" onClick={onFechar}>Cancelar</Button>
                        <Button type="submit" $variant="primary">
                            {isEdicao ? 'Salvar' : 'Cadastrar'}
                        </Button>
                    </Actions>
                </form>
            </Modal>
        </Overlay>
    )
}

FaixaModal.defaultProps = {
    aberto: false,
    onFechar: () => {},
    onSalvar: () => {},
    faixaSelecionada: {},
}

FaixaModal.propTypes = {
    aberto: PropTypes.bool,
    onFechar: PropTypes.func,
    onSalvar: PropTypes.func,
    faixaSelecionada: PropTypes.object,
}