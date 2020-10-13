import React, { Component } from 'react'
import { fetchRestaurants } from '../src/utilities/apiCalls'
import PaginationComponent from '../src/PaginationComponent/PaginationComponent'

import './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      error: '',
      restaurantList: [],
      pageNumbers: 0,
      paginatedList: [],
      activePage: 1
    }
  }
  async componentDidMount () {
    await this.getRestaurantList()
    await this.createPaginatedList(this.state.restaurantList)
  }


  getRestaurantList = async () => {
    try {
      const result = await fetchRestaurants();
      this.setState({restaurantList: result})
    } catch (error) {
      this.setState({ error: error.message })
    }
  }
  
  createPaginatedList = async (list) => {
    let sortedList = this.alphabetizeList(list);
    let pageNumbers = this.setActivePages(list);
    let paginatedList = [];
    for( let i = 0; i < pageNumbers; i++) {
      paginatedList.push(sortedList.splice(0, 10))
    }
    await this.setState({
      restaurantList: paginatedList.flatMap(el => el),
      pageNumbers: pageNumbers,
      paginatedList: paginatedList,
      
    })
  }

  setActivePages = (list) => {
    return Math.ceil(list.length / 10)
  }

  alphabetizeList = (list) => {
    return list.sort((a,b) => (a.name < b.name ? -1 : 1))
  }

  updateActivePage = (e) => {
    e.preventDefault();
    this.setState({
      activePage: parseInt(e.target.value)
    })
  }
  
  render () {
    return (
      <>
      <PaginationComponent paginatedList={this.state.paginatedList} activePage={this.state.activePage}/>
      <div>
        {this.state.paginatedList.map((el, i) => {return <button onClick={(e) => this.updateActivePage(e)} value={i +1}>{i + 1}</button>})}
      </div>
      </>
    )
  }
}

export default App
