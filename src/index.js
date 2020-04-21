import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './styles.module.css';

class InputDrop extends Component {

    constructor(props){
        super(props);
        const { value = '' } = props;
        this.state = {
            value,
            hideOptions: true,
        }
    }

    getStyle = () => {
        return this.state.hideOptions ? { height: 0 } : {};
    }

    onChangeHandler= (value) => {
        const { whenChange, whenFocusAndChange } = this.props;
        whenChange(value);
        whenFocusAndChange(value);
    }

    onFocusHandler= () => {
        const { whenFocus, whenFocusAndChange } = this.props;
        this.setState({
            hideOptions: false,
            value: '',
        })
        whenFocus();
        whenFocusAndChange();
    }


    onInputChange = (e) => {
        const { target : {value } } = e;
        this.setState({
          value: value,
        })
        this.onChangeHandler(value);
      }
    
    select = (id,displayKey,item)=>{
        this.props.whenSelected({
            [id]: item[id],
            [displayKey]: item[displayKey],
        });
        this.setState({
            value: item[displayKey],
            hideOptions: true, 
        })
     }
    
    render() {
        const { options = [], optionConfig } = this.props;
        const key = optionConfig[1];
        const id = key;
        const displayKey = optionConfig[0];
        return (
            <div className={s.container} onMouseLeave={() => {
                this.setState({
                    hideOptions: true,
                })
            }}>
                <input
                    tabIndex={0}
                    onFocus={this.onFocusHandler}
                    onClick={this.onFocusHandler}
                    onChange={this.onInputChange}
                    value={this.state.value}
                    type="text" />
                <div style={this.getStyle()}>
                    {
                        !!options.length && options.map((item, index)=>{
                            return (
                                <div
                                tabIndex={0}
                                 onClick={() => this.select(id,displayKey,item)}
                                 onKeyPress={(e) => {
                                     const keyCode = e.key;
                                     keyCode === 'Enter' && this.select(id,displayKey,item)
                                 }}   
                                 key={item[key]}>
                                    {item[displayKey]}
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

InputDrop.propTypes = {
    whenFocusAndChange: PropTypes.func.isRequired,
    whenSelected: PropTypes.func.isRequired,
    optionConfig: PropTypes.array.isRequired,
}

InputDrop.defaultProps = {
    whenChange: () => {},
    whenFocus: () => {},
    whenFocusAndChange: () => {},
    whenSelected: () => {},
}

export default InputDrop;