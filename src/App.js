import React, { Component } from 'react'
import { fetchRestaurants } from '../src/utilities/apiCalls'

import './App.css'

class App extends Component {
  constructor () {
    super()
    this.state = {
      error: '',
      restaurantList: []
    }
  }
  componentDidMount () {
    this.getRestaurantList()
  }

  getRestaurantList = async () => {
    try {
      const result = await fetchRestaurants();
      if(result) {
        this.setState({ restaurantList: result})
      }
    } catch (error) {
      this.setState({ error: error.message })
    }
  }
  
  
  render () {
    console.log('this.state.restaurantList :>> ', this.state.restaurantList);
    return <div className='App' />
  }
}

export default App
