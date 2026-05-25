import  PropTypes from 'prop-types';

const Button = ({ icon, onClick, label }) => {
    return (
        <div>
            <button
                className={`${icon ? `bi bi-${icon}` : ''} btn btn-size-sm`}
                onClick={onClick ?? undefined}
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
                {label}
            </button>
        </div>
    );
};

export default Button;

Button.defaultProps = {
    icon: '',
    onClick: () => {},
    label: '',
}

Button.propTypes = {
    icon: PropTypes.string,
    onClick: PropTypes.func,
    label: PropTypes.string,
}