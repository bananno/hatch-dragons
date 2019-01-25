import React, { Component } from 'react';

class Form extends Component {
  state = (() => {
    let temp = {};
    this.props.fields.forEach(field => {
      temp[field] = '';
    });
    return temp;
  })();

  getInputField = (field, i) => {
    const handleChange = (e) => {
      let newState = this.state;
      newState[field] = e.target.value;
      this.setState(newState);
    };

    let fieldType = field.match('password') ? 'password' : 'text';

    return (
      <input key={i} type={fieldType} name={field} placeholder={field}
        value={this.state[field]} onChange={handleChange}
        />
    );
  }

  render () {
    return (
      <div>
        <h2>{this.props.title}</h2>
        <form>
          {this.props.fields.map(this.getInputField)}
          <button type="submit">{this.props.title}</button>
        </form>
      </div>
    );
  }
}

export default Form;
