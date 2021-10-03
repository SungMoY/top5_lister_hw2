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
        if (editingListName) {
            console.log("editingListName is currently", editingListName)
            return (
                <div id="top5-sidebar">
                    <div id="sidebar-heading">
                        <input 
                            type="button" 
                            id="add-list-button" 
                            className="top5-button-disabled"
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
        } else {
            console.log("editingListName is currently", editingListName)
            return (
                <div id="top5-sidebar">
                    <div id="sidebar-heading">
                        <input 
                            type="button" 
                            id="add-list-button" 
                            className="top5-button"
                            onClick={createNewListCallback}
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
}