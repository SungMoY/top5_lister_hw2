import React from "react";
import ItemCard from './ItemCard';

export default class Workspace extends React.Component {
    render() {
        const { currentList,
                renameItemCallback,
                dragAndDropUpdateCallback } = this.props;

        if (currentList != null) {
            //This render occurs when a list is selected and its items are on display on Workspace div
            return (
                <div id="top5-workspace">
                    <div id="workspace-edit">
                        <div id="edit-numbering">
                            <div className="item-number">1.</div>
                            <div className="item-number">2.</div>
                            <div className="item-number">3.</div>
                            <div className="item-number">4.</div>
                            <div className="item-number">5.</div>
                        </div>
                        <div id="edit-items">
                            {
                                this.props.currentList.items.map((currentItem, index) => (
                                    <ItemCard 
                                        key={index+1}
                                        id={index+1}
                                        item={currentItem}
                                        currentListKey={currentList.key}
                                        renameItemCallback={renameItemCallback}
                                        dragAndDropUpdateCallback={dragAndDropUpdateCallback}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </div>
            )
        } else {
            //This empty render occurs when no list is currently selected.
            return (
                <div id="top5-workspace">
                    <div id="workspace-edit">
                        <div id="edit-numbering">
                            <div className="item-number">1.</div>
                            <div className="item-number">2.</div>
                            <div className="item-number">3.</div>
                            <div className="item-number">4.</div>
                            <div className="item-number">5.</div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}