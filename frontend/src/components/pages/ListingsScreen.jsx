import React from 'react'

import './ListingsScreen.css';

// dummy data
const items = [
  {name: 'Electronics'},
  {name: 'Books'}
]

function ListingsScreen() {
  return (
     <>
      {items.map(item => {
        return (
            <div className="listing-container">
              <h2>{item.name}</h2>
            </div>
          )
        })
      }
    </>
  )
}

export default ListingsScreen