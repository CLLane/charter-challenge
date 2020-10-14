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
      await this.setState({ restaurantList: result })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  createPaginatedList = async list => {
    let sortedList = this.alphabetizeList(list)
    let pageNumbers = this.setPageNumbers(list)
    let paginatedList = []
    for (let i = 0; i < pageNumbers; i++) {
      paginatedList.push(sortedList.slice(i * 10, 10 + i * 10))
    }
    await this.setState({
      pageNumbers: paginatedList.length,
      paginatedList: paginatedList
    })
    console.log('this.state3:>> ', this.state)
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

  generateGenreList = list => {
    let genreList = list.reduce(
      (acc, cv) => {
        let objGenreList = cv.genre.split(',')
        objGenreList.forEach(genre => {
          if (!acc.includes(genre)) {
            acc.push(genre)
          }
        })
        return acc
      },
      ['All']
    )
    return genreList.sort((a, b) => (a < b ? -1 : 1))
  }

  generateStateList = list => {
    return list.reduce(
      (acc, cv) => {
        if (!acc.includes(cv.state)) {
          acc.push(cv.state)
        }
        return acc
      },
      ['All']
    )
  }

  onDropDownSelection = async e => {
    await this.setState({
      filter: {
        ...this.state.filter,
        [e.target.name]: e.target.value
      },
      activePage: 1
    })
    this.filterList()
  }

  filterList = () => {
    let genreFilteredList = this.state.restaurantList.reduce((acc, cv) => {
      if (
        this.state.filter.genre &&
        cv.genre
          .split(',')
          .map(el => el.toUpperCase())
          .includes(this.state.filter.genre.toUpperCase())
      ) {
        acc.push(cv)
      }
      return acc
    }, [])
    let stateFilteredList = this.state.restaurantList.reduce((acc, cv) => {
      if (
        this.state.filter.state &&
        cv.state
          .split(',')
          .map(el => el.toUpperCase())
          .includes(this.state.filter.state.toUpperCase())
      ) {
        acc.push(cv)
      }
      return acc
    }, [])

    let finalList = this.state.restaurantList.reduce((acc, cv) => {
      if (genreFilteredList.length < 1 && stateFilteredList.length < 1) {
        acc = this.state.restaurantList
      }
      if (genreFilteredList.length > 0 && stateFilteredList.length < 1) {
        acc = genreFilteredList
      }
      if (genreFilteredList.length < 1 && stateFilteredList.length > 0) {
        acc = stateFilteredList
      }
      if (genreFilteredList.length > 0 && stateFilteredList.length > 0) {
        genreFilteredList.forEach(el => {
          if (stateFilteredList.includes(el) && !acc.includes(el)) {
            acc.push(el)
          }
        })
      }
      return acc
    }, [])
    this.createPaginatedList(finalList)
  }

  render () {
    return (
      <>
        <FilterForm
          genreList={this.generateGenreList(this.state.restaurantList)}
          stateList={this.generateStateList(this.state.restaurantList)}
          onDropDownSelection={e => this.onDropDownSelection(e)}
        />
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
