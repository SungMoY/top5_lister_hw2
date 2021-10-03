import React from "react";

export default class EditToolbar extends React.Component {
    handleCTRL = (event) => {
        if (event.key === 'z' && event.ctrlKey) {
            this.undo()
            event.stopImmediatePropagation()
        }
        if (event.key === 'y' && event.ctrlKey) {
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
