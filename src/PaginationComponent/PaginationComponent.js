import React from 'react';
import TableRow from '../TableRow/TableRow';

let PaginationComponent = (props) => {
  console.log('paginatedList :>> ', props);
  return(
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
          console.log('i :>> ', i);
          if(props.activePage === (i+1)){
            return <TableRow restaurant={restaurant} />
          }
        })}
      </tbody>
    </table>
  )
}

export default PaginationComponent;