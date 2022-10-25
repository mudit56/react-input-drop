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
      {id: 4, name: 'Four'},
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
    this.setState({value: selectedOption.name});
  }

  render() {
    return (
      <div className="App">
          Count : <InputDrop
            whenFocusAndChange = {this.whenFocusAndChange}
            containerStyle={{
              padding: '30px',
              width: '300px'
            }}
            options={this.state.filteredOptions}
            optionConfig={["name","id"]} // You have to pass the keys whose value you will get once item is selected. 
            whenSelected={this.onSelectHandler}
            placeholder="Count"
            value={this.state.value}
            inputProps = {{
              autocomplete: 'on',
              id: 'a',
              //disabled: true,
              // Use this space for attributes to be passed on input tag
            }}
          />
      </div>
    );
  }
}
export default App;
