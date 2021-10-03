import React from "react";
import ListCard from "./ListCard";

export default class Sidebar extends React.Component {
    render() {
        const { heading,
                currentList,
                keyNamePairs,
                handleSendEditingBoolCallback,
                editingListName,
                createNewListCallback, 
                deleteListCallback, 
                loadListCallback,
                renameListCallback} = this.props;
        let addListBool = "top5-button"
        console.log("editingListName is currently", editingListName)
        if (editingListName) {
            addListBool = "top5-button-disabled"
        }
        return (
            <div id="top5-sidebar">
                <div id="sidebar-heading">
                    <input 
                        type="button" 
                        id="add-list-button" 
                        onClick={createNewListCallback}
                        className={addListBool}
                        value="+" />
                    {heading}
                </div>
                <div id="sidebar-list">
                {
                    keyNamePairs.map((pair) => (
                        <ListCard
                            key={pair.key}
                            keyNamePair={pair}
                            handleSendEditingBoolCallback={handleSendEditingBoolCallback}
                            editingListName={editingListName}
                            selected={(currentList !== null) && (currentList.key === pair.key)}
                            deleteListCallback={deleteListCallback}
                            loadListCallback={loadListCallback}
                            renameListCallback={renameListCallback}
                        />
                    ))
                }
                </div>
            </div>
        );
    }
}