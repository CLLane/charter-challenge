import React from 'react'
import TableRow from '../TableRow/TableRow'

let PaginationComponent = props => {
  console.log('paginatedList :>> ', props)
  if(!props.error){return (
    <>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>City,State</th>
          <th>Genre</th>
          <th>Phone #</th>
        </tr>
      </thead>
      <tbody>
        {props.paginatedList.map((restaurant, i) => {
          if (props.activePage === i + 1) {
            return <TableRow restaurant={restaurant} />
          }
        })}
      </tbody>
    </table>
    <div>
      {props.paginatedList.map((el, i) => {
        return (
          <button onClick={e => props.updateActivePage(e)} value={i + 1}>
            {i + 1}
          </button>
        )
      })}
    </div>
    </>
  )} else {
    return <p>{props.error}</p>
  }
}

export default PaginationComponent
