import React from "react";

export class ItemCard extends React.Component {
    render() {
        return (
            <div id={this.props.item.id} className="top5-item" >
                {this.props.item}
            </div>
        )
    }
}

export default ItemCard