import React from 'react'

let TableRow = props => {
  return (
    <>
    {props.restaurant.map(el => 
      <tr>
        <td>{el.name}</td>
        <td>{el.city}, {el.state}</td>
        <td>{el.genre.replace(/,/g, ' | ')}</td>
        <td>{el.telephone}</td>
      </tr>
      )}
    </>
  )
}

export default TableRow