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

  hideDropDown = () => {
    setTimeout(() => {
      this.setState({hideOptions: true});
    }, 120);
  }

  render() {
    const {
      options = [],
      optionConfig,
      placeholder,
      customClass,
      inputProps
    } = this.props
    const key = optionConfig[1]
    const id = key
    const displayKey = optionConfig[0]
    return (
      <div
        className={[s.container, customClass].join(' ')}
      >
        <input
          tabIndex={0}
          onBlur={this.hideDropDown}
          onFocus={this.onFocusHandler}
          onClick={this.onFocusHandler}
          onChange={this.onInputChange}
          value={this.props.value}
          placeholder={placeholder}
          type='text'
          {...inputProps}
        />
        <div className={s.box}>
          <div id={1} ref={i=>this.boxRef=i} className={s.boxIn} style={this.getStyle()}>
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
  inputProps: {}
}

export default InputDrop
