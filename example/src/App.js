import React from 'react';
import './index.css';
import InputDrop from 'react-input-drop';
import 'react-input-drop/dist/index.css';

class App extends React.Component {

  state = {
    options : [],
    selected: null,
  }

  whenFocusAndChange = async (value = '') => {
    const response = await fetch(`http://54.200.190.162:4002/api/company/searchCompensationCompany?name=${value}`);
    let res;
    let data;
    if(response.ok) {
      res = await response.json();
      data = res.data || [];
    }
    this.setState({options: data});
  }

  onSelectHandler = (selectedOption) => {
    //
  }

  render() {
    return (
      <div className="App">
        <div>
          <InputDrop
            whenFocusAndChange = {this.whenFocusAndChange}
            options={this.state.options}
            optionConfig={["companyName","_id"]}
            whenSelected={this.onSelectHandler}
          />
        </div>
      </div>
    );
  }
}
export default App;
