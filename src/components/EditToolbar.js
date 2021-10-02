import React from "react";

export default class EditToolbar extends React.Component {
    render() {
        if (this.props.currentList == null) {
            return (
                <div id="edit-toolbar">
                <div 
                    id='undo-button' 
                    className="top5-button">
                        &#x21B6;
                </div>
                <div
                    id='redo-button'
                    className="top5-button">
                        &#x21B7;
                </div>
                <div
                    id='close-button'
                    className="top5-button-disabled"
                    onClick={this.props.closeCallback}>
                        &#x24E7;
                </div>
            </div>
            )
        } else {
            return (
                <div id="edit-toolbar">
                    <div 
                        id='undo-button' 
                        className="top5-button">
                            &#x21B6;
                    </div>
                    <div
                        id='redo-button'
                        className="top5-button">
                            &#x21B7;
                    </div>
                    <div
                        id='close-button'
                        className="top5-button"
                        onClick={this.props.closeCallback}>
                            &#x24E7;
                    </div>
                </div>
            )
        }
    }
}