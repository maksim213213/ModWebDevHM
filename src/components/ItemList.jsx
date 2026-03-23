import React, { Component } from "react";

class ItemList extends Component {
  render() {
    const items = ["Apple", "Banana", "Orange", "Grapes"];

    return (
      <div>
        <h2>Item List</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default ItemList;