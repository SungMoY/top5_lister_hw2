import React from "react";

export default class EditToolbar extends React.Component {
    handleCTRL = (event) => {
        console.log("handle CTRL keypress")
        if (event.key === 'z' && event.ctrlKey) {
            console.log("control-z successfully pressed")
            this.undo()
            event.stopImmediatePropagation()
        }
        if (event.key === 'y' && event.ctrlKey) {
            console.log("control-y successfully pressed")
            this.redo()
            event.stopImmediatePropagation()
        }
    }
    render() {
        const { currentList,
            transactionStacktps,
            undoCallback,
            redoCallback,
            closeCallback } = this.props;

        if (currentList !== null) {
            if (transactionStacktps.hasTransactionToUndo() && transactionStacktps.hasTransactionToRedo()) {
                console.log("undo and redo")
                return (
                    <div id="edit-toolbar" >
                    <div 
                        id='undo-button' 
                        className="top5-button"
                        onClick={undoCallback}>
                            &#x21B6;
                    </div>
                    <div
                        id='redo-button'
                        className="top5-button"
                        onClick={redoCallback}>
                            &#x21B7;
                    </div>
                    <div
                        id='close-button'
                        className="top5-button"
                        onClick={closeCallback}>
                            &#x24E7;
                    </div>
                </div>
                )
            } else if (transactionStacktps.hasTransactionToUndo() && !transactionStacktps.hasTransactionToRedo()) {
                console.log("undo but no redo")
                return (
                    <div id="edit-toolbar">
                    <div 
                        id='undo-button' 
                        className="top5-button"
                        onClick={undoCallback}>
                            &#x21B6;
                    </div>
                    <div
                        id='redo-button'
                        className="top5-button-disabled"
                        onClick={redoCallback}>
                            &#x21B7;
                    </div>
                    <div
                        id='close-button'
                        className="top5-button"
                        onClick={closeCallback}>
                            &#x24E7;
                    </div>
                </div>
                )
            } else if (transactionStacktps.hasTransactionToRedo() && !transactionStacktps.hasTransactionToUndo()) {
                console.log("no undo but redo")
                return (
                    <div id="edit-toolbar">
                    <div 
                        id='undo-button' 
                        className="top5-button-disabled"
                        onClick={undoCallback}>
                            &#x21B6;
                    </div>
                    <div
                        id='redo-button'
                        className="top5-button"
                        onClick={redoCallback}>
                            &#x21B7;
                    </div>
                    <div
                        id='close-button'
                        className="top5-button"
                        onClick={closeCallback}>
                            &#x24E7;
                    </div>
                </div>
                )
            } else {
                console.log("no undo and no redo")
                return (
                    <div id="edit-toolbar">
                    <div 
                        id='undo-button' 
                        className="top5-button-disabled"
                        onClick={undoCallback}>
                            &#x21B6;
                    </div>
                    <div
                        id='redo-button'
                        className="top5-button-disabled"
                        onClick={redoCallback}>
                            &#x21B7;
                    </div>
                    <div
                        id='close-button'
                        className="top5-button"
                        onClick={closeCallback}>
                            &#x24E7;
                    </div>
                </div>
                )
            }
        } else {
            //no list is currently open
            return (
                <div id="edit-toolbar">
                    <div 
                        id='undo-button' 
                        className="top5-button-disabled"
                        onClick={undoCallback}>
                            &#x21B6;
                    </div>
                    <div
                        id='redo-button'
                        className="top5-button-disabled"
                        onClick={redoCallback}>
                            &#x21B7;
                    </div>
                    <div
                        id='close-button'
                        className="top5-button-disabled"
                        onClick={closeCallback}>
                            &#x24E7;
                    </div>
                </div>
            )
        }
    }
}
