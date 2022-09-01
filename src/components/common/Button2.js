import React from 'react';
import PropTypes from 'prop-types';
// fontawesome spinner

const Button2 = (props) => {
  return (
    <button
      type={props.type || "submit"}
      style={{...styles.button, ...props.style}}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.disabled ? (
        <p>Loading...</p> 
      ) : (
        props.children
      )}
    </button>
  )
}

const styles = {
  button: {
    alignSelf: 'center',
    backgroundColor: 'orange',
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    marginTop: 5,
    width: "70%",
    borderRadius: 10,
    fontSize: 16,
    paddingTop: 5,
    paddingBottom: 5,
    fontWeight: "bold",
    fontFamily: "sans-serif",
  }
}

Button2.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default Button2;