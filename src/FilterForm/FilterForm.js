import React, { Component } from 'react'

class FilterForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      city: '',
      state: '',
      genre: '',
      name: ''
    }
  }
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render () {
    return (
      <form >
        <p>State:</p>
        <input type='text' name='state' value={this.state.state} onChange={this.handleChange.bind(this)}/>
        <p>Genre:</p>
        <input type='text' name='genre' value={this.state.genre} onChange={this.handleChange.bind(this)}/>
        <p>Name:</p>
        <input type='text' name='name' value={this.state.name} onChange={this.handleChange.bind(this)}/>
        <button onClick={(e) => this.props.onFilterSubmit(e, this.state)}>Submit</button>
      </form>
    )
  }
}

export default FilterForm
