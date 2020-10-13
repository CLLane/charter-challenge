import React, { Component } from 'react'
import { fetchRestaurants } from '../src/utilities/apiCalls'
import PaginationComponent from '../src/PaginationComponent/PaginationComponent'
import FilterForm from '../src/FilterForm/FilterForm'

import './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      error: '',
      restaurantList: [],
      pageNumbers: 0,
      paginatedList: [],
      activePage: 1,
      filter: {
        state: '',
        genre: '',
        name: ''
      }
    }
  }
  async componentDidMount () {
    await this.getRestaurantList()
    await this.createPaginatedList(this.state.restaurantList)
  }

  getRestaurantList = async () => {
    try {
      const result = await fetchRestaurants()
      this.setState({ restaurantList: result })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  createPaginatedList = list => {
    let sortedList = this.alphabetizeList(list)
    let pageNumbers = this.setPageNumbers(list)
    let paginatedList = []
    for (let i = 0; i < pageNumbers; i++) {
      paginatedList.push(sortedList.splice(0, 10))
    }
    this.setState({
      restaurantList: paginatedList.flatMap(el => el),
      pageNumbers: paginatedList.length,
      paginatedList: paginatedList
    })
  }

  setPageNumbers = list => {
    return Math.ceil(list.length / 10)
  }

  alphabetizeList = list => {
    return list.sort((a, b) => (a.name < b.name ? -1 : 1))
  }

  updateActivePage = e => {
    e.preventDefault()
    this.setState({
      activePage: parseInt(e.target.value)
    })
  }

  onFilterSubmit = async (e, formState) => {
    e.preventDefault()
    await this.setState({
      filter: {
        state: formState.state,
        genre: formState.genre,
        name: formState.name
      }
    })
    let filteredList = []
   if(this.state.filter.state){
     filteredList = this.state.restaurantList.filter(el => el.state.toUpperCase() === this.state.filter.state.toUpperCase())
   }
   if(this.state.filter.state && this.state.filter.genre) {
     filteredList = filteredList.filter(el => el.genre.split(',').map(el=> el.toUpperCase()).includes(this.state.filter.genre.toUpperCase()))
   } else if(this.state.filter.genre ) {
     filteredList = this.state.restaurantList.filter(el => el.genre.split(',').map(el => el.toUpperCase()).includes(this.state.filter.genre.toUpperCase()))
   }

   if((this.state.filter.state && this.state.filter.name) || (this.state.filter.name && this.state.filter.genre)) {
     filteredList = filteredList.filter(el => el.name.toUpperCase() === this.state.filter.name.toUpperCase())
   } else if ( this.state.filter.name ) {
     filteredList = this.state.restaurantList.filter(el => el.name.toUpperCase() === this.state.filter.name.toUpperCase())
   }
   this.createPaginatedList(filteredList)
  }

  render () {
    return (
      <>
        <FilterForm onFilterSubmit={this.onFilterSubmit} />
        <PaginationComponent
          paginatedList={this.state.paginatedList}
          activePage={this.state.activePage}
        />
        <div>
          {this.state.paginatedList.map((el, i) => {
            return (
              <button onClick={e => this.updateActivePage(e)} value={i + 1}>
                {i + 1}
              </button>
            )
          })}
        </div>
      </>
    )
  }
}

export default App
