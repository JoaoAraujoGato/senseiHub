import PropTypes from 'prop-types';
import { Overlay, Modal, ModalHeader, ModalTitle, CloseButton } from './ModalGenericoStyle';
import { FormBase } from '@/components/form/FormBase';

export function ModalGenerico({ aberto, onFechar, onSalvar, titulo, fields, defaultValues, submitLabel, schema }) {
  if (!aberto) return null;

  return (
    <Overlay onClick={onFechar}>
      <Modal onClick={e => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>{titulo}</ModalTitle>
          <CloseButton onClick={onFechar}>✕</CloseButton>
        </ModalHeader>

        <FormBase
          fields={fields}
          schema={schema}
          defaultValues={defaultValues}
          onSubmit={onSalvar}
          onCancel={onFechar}
          submitLabel={submitLabel}
        />
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
  })),
}
