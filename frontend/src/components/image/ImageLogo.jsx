import  PropTypes from 'prop-types';
import styled from "styled-components"

const StyledImage = styled.img`
    width: ${({ width }) => width || "120px"};
    height: ${({ height }) => height || "auto"};
    object-fit: ${({ fit }) => fit || "contain"};
    border-radius: ${({ radius }) => radius || "0"};
`

function ImageLogo({
    src,
    alt,
    width,
    height,
    fit,
    radius,
    ...props
}) {
    return (
        <div className='d-flex pl-3 pt-3'>
            <StyledImage
                src={src}
                alt={alt}
                width={width}
                height={height}
                fit={fit}
                radius={radius}
                {...props}
            />
        </div>
    )
}

export default ImageLogo

ImageLogo.defaultProps = {
    src: '',
    alt: '',
    width: '',
    height: '',
    fit: 'contain',
    radius: '',
}

ImageLogo.propTypes = {
    src: PropTypes.string,
    alt: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    fit: PropTypes.string,
    radius: PropTypes.string,
}