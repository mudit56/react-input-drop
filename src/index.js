import React, { Component } from 'react'
import PropTypes from 'prop-types'
import s from './styles.module.css'
class InputDrop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hideOptions: true
    }
  }

  getStyle = () => {
    return this.state.hideOptions
      ? {
          display: 'none'
        }
      : {}
  }

  onChangeHandler = (value) => {
    const { whenChange, whenFocusAndChange } = this.props
    whenChange(value)
    whenFocusAndChange(value)
  }

  onFocusHandler = (e) => {
    const {
      target: { value }
    } = e
    const { whenFocus, whenFocusAndChange } = this.props
    this.setState({
      hideOptions: false
    })
    whenFocus()
    whenFocusAndChange(value)
  }

  onInputChange = (e) => {
    const {
      target: { value }
    } = e
    this.onChangeHandler(value)
  }

  select = (id, displayKey, item) => {
    this.props.whenSelected({
      [id]: item[id],
      [displayKey]: item[displayKey]
    })
    this.setState({
      hideOptions: true
    })
  }

  render() {
    const {
      options = [],
      optionConfig,
      placeholder,
      customClass,
      inputProps,
      inputStyle,
      containerStyle,
    } = this.props
    const key = optionConfig[1]
    const id = key
    const displayKey = optionConfig[0]
    return (
      <div
        className={[s.container, customClass].join(' ')}
        style={containerStyle}
        onMouseLeave={() => {
          this.setState({
            hideOptions: true
          })
        }}
      >
        <input
          tabIndex={0}
          onFocus={this.onFocusHandler}
          onClick={this.onFocusHandler}
          onChange={this.onInputChange}
          value={this.props.value}
          placeholder={placeholder}
          type='text'
          style={inputStyle}
          {...inputProps}
        />
        <div className={s.box}>
          <div className={s.boxIn} style={this.getStyle()}>
            {!!options.length &&
              options.map((item, index) => {
                return (
                  <div
                    tabIndex={0}
                    onClick={() => this.select(id, displayKey, item)}
                    onKeyPress={(e) => {
                      const keyCode = e.key
                      keyCode === 'Enter' && this.select(id, displayKey, item)
                    }}
                    key={item[key]}
                  >
                    {item[displayKey]}
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    )
  }
}

InputDrop.propTypes = {
  whenFocusAndChange: PropTypes.func.isRequired,
  whenSelected: PropTypes.func.isRequired,
  optionConfig: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  customClass: PropTypes.string,
  inputProps: PropTypes.object
}

InputDrop.defaultProps = {
  whenChange: () => {},
  whenFocus: () => {},
  whenFocusAndChange: () => {},
  whenSelected: () => {},
  placeholder: '',
  customClass: '',
  inputStyle: {},
  containerStyle: {},
  inputProps: {}
}

export default InputDrop
