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

    return (<input key={i} type={fieldType} name={field} placeholder={field}
      value={this.state[field]} onChange={handleChange} required=""/>);
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    let path = '/' + this.props.title.toLowerCase();

    const response = await fetch(path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    });

    const responseResult = await response.json();

    if (responseResult.user) {
      this.props.loginUser(responseResult.user);
    } else {
      this.props.showError(responseResult.message);
    }

  };

  render () {
    return (
      <div onSubmit={this.handleSubmit}>
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
