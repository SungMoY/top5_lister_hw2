import React from "react";

export class ItemCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            itemText: this.props.item,
            itemId: this.props.id,
            editActive: false,
            draggedOnto: false,
            actualInputChange: false
        }
    }

    handleClick = (event) => {
        if (event.detail === 2) {
            this.setState({editActive:!this.state.editActive})
        }
    }
    handleChange = (event) => {
        this.setState({
            itemText: event.target.value,
            actualInputChange: true
        })
    }
    handleKeyPress = (event) => {
        if (event.code === "Enter") {
            this.handleBlur();
        }
    }
    handleBlur = (event) => {
        if (this.state.actualInputChange) {
            this.setState({
                editActive: !this.state.editActive,
                actualInputChange: false
            }, () => {
                this.props.renameItemCallback(this.state.itemId, this.state.itemText, this.props.currentListKey)
            });
        } else {
            this.setState({
                editActive: !this.state.editActive,
                actualInputChange: false
            })
        }
    }

    handleDragStart = (event) => {
        event.dataTransfer.setData("number", event.target.id)
    }
    handleDragOver = (event) => {
        event.preventDefault();
    }
    handleDrop = (event) => {
        this.props.dragAndDropUpdateCallback(event.dataTransfer.getData("number"), this.props.id, this.props.currentListKey)
        this.setState({draggedOnto : false})
    }
    handleDragEnter = (event) => {
        this.setState({draggedOnto : true})
    }

    handleDragLeave = (event) => {
        this.setState({draggedOnto : false})
    }

    //if editActive is true, the double clicked item is changed to an autoFocused text input
    //else, the item is a simple div element when the double click event ready
    render() {
        if (this.state.editActive) {
            return (
                <input
                    id={this.props.id}
                    className='top5-item'
                    type='text'
                    autoFocus={true}
                    onKeyPress={this.handleKeyPress}
                    onBlur={this.handleBlur}
                    onChange={this.handleChange}
                    defaultValue={this.props.item}
                />)
        } else {
            let selectClass = "top5-item"
            if (this.state.draggedOnto) {
                selectClass = "top5-item-dragged-to"
            }
            return (
                <div 
                    id={this.props.id} 
                    className={selectClass}
                    onClick={this.handleClick}
                    draggable={true}
                    onDragStart={this.handleDragStart}
                    onDragOver={this.handleDragOver}
                    onDrop={this.handleDrop}
                    onDragEnter={this.handleDragEnter}
                    onDragLeave={this.handleDragLeave} >
                        {this.props.item}
                </div>
            )
        }
    }
}

export default ItemCard