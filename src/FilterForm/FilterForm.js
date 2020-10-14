import React, { Component } from 'react'

class FilterForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      name: '',
    }
  }
  handleChange = async (event) => {
    await this.setState({ [event.target.name]: event.target.value })
  }

  
  render () {
    // console.log('this.props :>> ', this.props)
    return (
      <form>
        <label>Genre: </label>
        <select name='genre' onChange={e => this.props.onDropDownSelection(e)}>
          {this.props.genreList.map((genre, key) => {
            return (
              <option key={key} value={genre}>
                {genre}
              </option>
            )
          })}
        </select>
        <label>State: </label>
        <select name='state' onChange={e => this.props.onDropDownSelection(e)}>
          {this.props.stateList.map((state, key) => {
            return (
              <option key={key} value={state}>
                {state}
              </option>
            )
          })}
        </select>
        <p>Name:</p>
        <input
          type='text'
          name='name'
          onChange={this.handleChange}
        />
        <button value={this.state.name} onClick={(e) => this.props.onSearchFilterSubmit(e)}>
          Submit
        </button>
        <button onClick={(e) => this.props.resetClearButton(e)}>Clear</button>
      </form>
    )
  }
}

export default FilterForm
