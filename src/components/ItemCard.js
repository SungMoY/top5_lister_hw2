import React from "react";

export class ItemCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.item,
            editActive: false
        }
    }
    handleRemoveEdit = (event) => {
        console.log("remove edit called")
        
        this.setState({
            editActive: false
        });
    }
    //indicates that text input has finished and item should now be updated
    handleBlur = (event) => {
        //console.log("HANDLE BLUR CALLED")
        let id = this.props.id;
        let textValue = this.state.text;
        //console.log("currentList", this.props.currentListKey);
        this.props.renameItemCallback(id, textValue, this.props.currentListKey);
        this.handleToggleEdit();
    }
    //calls handleblur when enter is pressed
    handleKeyPress = (event) => {
        if (event.code === "Enter") {
            //console.log("enter was pressed")
            this.handleBlur();
        }
    }
    //sets the state text to the updated text input
    handleUpdate = (event) => {
        this.setState({ text: event.target.value });
    }
    //calls handletoggleedit when item is doubleclicked
    handleClick = (event) => {
        if (event.detail === 1) {
            console.log("clicked once")
            this.handleRemoveEdit(event);
        } else if (event.detail === 2) {
            //console.log("double clicked an item")
            if (this.editActive) {
                this.handleRemoveEdit(event);
            } else {
                this.handleToggleEdit(event);
            }
        }
    }
    //flips the value of editactive then calls state (which calls render)
    handleToggleEdit = (event) => {
        //console.log("editActive was ", this.state.editActive)
        this.setState({
            editActive: !this.state.editActive
        });
    }
    //if editActive is true, the double clicked item is changed to a text input
    //else, the item is a simple div element when the double click event ready
    render() {
        //console.log("render called")
        //console.log("editActive is now", this.state.editActive)
        //console.log("current key", this.props.id)
        if (this.state.editActive) {
            //console.log('now editing', this.props.id)
            return (
                <input
                    id={this.props.id}
                    className='top5-item'
                    type='text'
                    onKeyPress={this.handleKeyPress}
                    onBlur={this.handleBlur}
                    onChange={this.handleUpdate}
                    defaultValue={this.props.item}
                />)
        }
        return (
            <div 
                id={this.props.id} 
                className="top5-item"
                onClick={this.handleClick}>
                {this.props.item}
            </div>
        )
    }
}

export default ItemCard