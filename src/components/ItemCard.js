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
            //console.log("default value", this.state.itemText, this.state.itemId)
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
            console.log("ACTUALIBNPUTCHAGE")
            this.setState({
                editActive: !this.state.editActive,
                actualInputChange: false
            }, () => {
                console.log("PARAMS", this.state.itemId, this.state.itemText, this.props.currentListKey)
                this.props.renameItemCallback(this.state.itemId, this.state.itemText, this.props.currentListKey)
            });
        console.log("TEXT AFTER EDIT", this.state.itemText)
        } else {
            console.log("NONONONONO ACTUALIBNPUTCHAGE")
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
        //console.log("dragged over", this.props.id)
    }
    handleDrop = (event) => {
        //console.log("dragged", event.dataTransfer.getData("number"))
        //console.log("dropped on", this.props.id)
        this.props.dragAndDropUpdateCallback(event.dataTransfer.getData("number"), this.props.id, this.props.currentListKey)
        this.setState({draggedOnto : false})
        /*
        this.setState(prevState => ({
            draggedOnto: false,
        }), () => {
            // ANY AFTER EFFECTS?
        });
        */
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
        //console.log("render called", this.props.id, this.props.item)
        //console.log("editActive is now", this.state.editActive)
        //console.log("current key", this.props.id)
        if (this.state.editActive) {
            //console.log('now editing', this.props.id)
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