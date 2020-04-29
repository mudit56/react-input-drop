# react-input-drop

> Input Dropdown with options to select and callback to manipulate options.

[![NPM](https://img.shields.io/npm/v/react-input-drop.svg)](https://www.npmjs.com/package/react-input-drop) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-input-drop
```

```bash
yarn add react-input-drop
```

## Props



| Prop | Summary | Example | Default | isRequired |
| ------ | ------ | ------ | ------ | ------ |
| value | value of input element | '' | '' | No |
| options  | Array of options to select, keys could be anything  | {id: '', name '' } | - | Yes |
| optionConfig | Array with two string elements, it contains the keys with which one object will be returned after selection | ["name","id"] | - | Yes |
| whenSelected | callback which will receive the selected option as argument | - | - | Yes |
| placeholder  | placeholder String | 'Enter Value' | '' | No |
| whenFocusAndChange | It will get invoked when the input value is changed or the input tag is focused, it receives input value as argument | - | - | No |
| whenFocus | It will get invoked when the input tag is focused | - | - | No |
| whenChange  | It will get invoked when the input value is changed, it receives input value as argument | - | - | No |
| customClass | To override the default boring style | - | - | No |
| inputProps | to pass attributes to input tag |  - | {} | No |


## Usage

```jsx
import React from 'react';
import './index.css';
import InputDrop from 'react-input-drop';
import 'react-input-drop/dist/index.css';

class App extends React.Component {

  state = {
    // You can also get these options from an api call if required. 
    options : [
      {id: 1, name: 'One'},
      {id: 2, name: 'Two'},
      {id: 3, name: 'Three'},
      {id: 4, name: 'Four'}
    ],
    filteredOptions: [],
    selected: null,
    value : '',
  }

  whenFocusAndChange = async (value = '') => {
    // this function is the place where you can make a api call to get the options if reqired.
    // You will get the typed value as argument
    const { options } = this.state;
    const filteredOptions = options.filter((item)=>item.name.toLowerCase().indexOf(value.toLowerCase().trim()) > -1 )
    this.setState({filteredOptions,value});
  }

  onSelectHandler = (selectedOption) => {
    console.log(selectedOption)
  }

  render() {
    return (
      <div className="App">
          Count : <InputDrop
            whenFocusAndChange = {this.whenFocusAndChange}
            options={this.state.filteredOptions}
            optionConfig={["name","id"]} // You have to pass the keys whose value you will get once item is selected. 
            whenSelected={this.onSelectHandler}
            placeholder="Count"
            value={this.state.value}
          />
      </div>
    );
  }
}
export default App;

```

## License

MIT © [mudit56](https://github.com/mudit56)
"# react-input-drop" 
