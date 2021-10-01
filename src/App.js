import React from 'react';
import './App.css';

// IMPORT DATA MANAGEMENT AND TRANSACTION STUFF
import DBManager from './db/DBManager';

// THESE ARE OUR REACT COMPONENTS
import DeleteModal from './components/DeleteModal';
import Banner from './components/Banner.js'
import Sidebar from './components/Sidebar.js'
import Workspace from './components/Workspace.js';
import Statusbar from './components/Statusbar.js'

class App extends React.Component {
    constructor(props) {
        super(props);

        // THIS WILL TALK TO LOCAL STORAGE
        this.db = new DBManager();

        // GET THE SESSION DATA FROM OUR DATA MANAGER
        let loadedSessionData = this.db.queryGetSessionData();

        // SETUP THE INITIAL STATE
        this.state = {
            currentList : null,
            sessionData : loadedSessionData,
            listKeyPairToDelete: null
        }
    }
    sortKeyNamePairsByName = (keyNamePairs) => {
        keyNamePairs.sort((keyPair1, keyPair2) => {
            // GET THE LISTS
            return keyPair1.name.localeCompare(keyPair2.name);
        });
    }
    // THIS FUNCTION BEGINS THE PROCESS OF CREATING A NEW LIST
    createNewList = () => {
        // FIRST FIGURE OUT WHAT THE NEW LIST'S KEY AND NAME WILL BE
        let newKey = this.state.sessionData.nextKey;
        let newName = "Untitled" + newKey;

        // MAKE THE NEW LIST
        let newList = {
            key: newKey,
            name: newName,
            items: ["?", "?", "?", "?", "?"]
        };

        // MAKE THE KEY,NAME OBJECT SO WE CAN KEEP IT IN OUR
        // SESSION DATA SO IT WILL BE IN OUR LIST OF LISTS
        let newKeyNamePair = { "key": newKey, "name": newName };
        let updatedPairs = [...this.state.sessionData.keyNamePairs, newKeyNamePair];
        this.sortKeyNamePairsByName(updatedPairs);

        // CHANGE THE APP STATE SO THAT IT THE CURRENT LIST IS
        // THIS NEW LIST AND UPDATE THE SESSION DATA SO THAT THE
        // NEXT LIST CAN BE MADE AS WELL. NOTE, THIS setState WILL
        // FORCE A CALL TO render, BUT THIS UPDATE IS ASYNCHRONOUS,
        // SO ANY AFTER EFFECTS THAT NEED TO USE THIS UPDATED STATE
        // SHOULD BE DONE VIA ITS CALLBACK
        this.setState(prevState => ({
            currentList: newList,
            sessionData: {
                nextKey: prevState.sessionData.nextKey + 1,
                counter: prevState.sessionData.counter + 1,
                keyNamePairs: updatedPairs
            }
        }), () => {
            // PUTTING THIS NEW LIST IN PERMANENT STORAGE
            // IS AN AFTER EFFECT
            this.db.mutationCreateList(newList);
        });
    }
    renameList = (key, newName) => {
        let newKeyNamePairs = [...this.state.sessionData.keyNamePairs];
        // NOW GO THROUGH THE ARRAY AND FIND THE ONE TO RENAME
        for (let i = 0; i < newKeyNamePairs.length; i++) {
            let pair = newKeyNamePairs[i];
            if (pair.key === key) {
                pair.name = newName;
            }
        }
        this.sortKeyNamePairsByName(newKeyNamePairs);

        // WE MAY HAVE TO RENAME THE currentList
        let currentList = this.state.currentList;
        if (currentList.key === key) {
            currentList.name = newName;
        }

        this.setState(prevState => ({
            currentList: prevState.currentList,
            sessionData: {
                nextKey: prevState.sessionData.nextKey,
                counter: prevState.sessionData.counter,
                keyNamePairs: newKeyNamePairs
            }
        }), () => {
            // AN AFTER EFFECT IS THAT WE NEED TO MAKE SURE
            // THE TRANSACTION STACK IS CLEARED
            let list = this.db.queryGetList(key);
            list.name = newName;
            this.db.mutationUpdateList(list);
            this.db.mutationUpdateSessionData(this.state.sessionData);
        });
    }
    renameItem = (itemId, newText, currentListKey) => {    
        if (newText === "") {
            newText = "?"
        }
        let templist = this.db.queryGetList(currentListKey)
        templist.items.map((element, index) => (
            (index+1 === itemId) ? templist.items[index] = newText : ({}))
        )
        //console.log(templist)
        //console.log(this.db.queryGetSessionData(templist.key));
        this.db.mutationUpdateList(templist);
        this.db.mutationUpdateSessionData(this.state.sessionData);
        this.loadList(templist.key);
    }
    dragAndDropUpdate = (draggedItemId, droppedAtItemId, currentListKey) => {
        console.log("dragged",draggedItemId,"dropped",droppedAtItemId)
        let tempList = this.db.queryGetList(currentListKey)
        let tempItems = tempList.items
        //move an item lower than its destination up, bubble items below it down
        //move item 5 to item 1. Item 1->2, 2->3, 3->4, 4->5
        if (draggedItemId > droppedAtItemId) {
            let movedItem = tempItems[draggedItemId-1]  //save the item that is moving up
            for (let i = draggedItemId-1; i > droppedAtItemId-2; i--) {
                console.log(i)
                tempItems[i] = tempItems[i-1];
            }
            tempItems[droppedAtItemId-1] = movedItem;
        //move item 1 to item 5. 
        } else if (draggedItemId < droppedAtItemId) {
            let movedItem = tempItems[draggedItemId-1]
            for (let i = draggedItemId-1; i < droppedAtItemId;i++) {
                tempItems[i] = tempItems[i+1]
            }
            tempItems[droppedAtItemId-1] = movedItem;
        }
        this.db.mutationUpdateList(tempList)
        this.db.mutationUpdateSessionData(this.state.sessionData)
        this.loadList(currentListKey)
    }
    // THIS FUNCTION BEGINS THE PROCESS OF LOADING A LIST FOR EDITING
    loadList = (key) => {
        let newCurrentList = this.db.queryGetList(key);
        this.setState(prevState => ({
            currentList: newCurrentList,
            sessionData: prevState.sessionData
        }), () => {
            // ANY AFTER EFFECTS?
        });
    }
    // THIS FUNCTION BEGINS THE PROCESS OF CLOSING THE CURRENT LIST
    closeCurrentList = () => {
        this.setState(prevState => ({
            currentList: null,
            listKeyPairMarkedForDeletion : prevState.listKeyPairMarkedForDeletion,
            sessionData: this.state.sessionData
        }), () => {
            // ANY AFTER EFFECTS?
        });
    }
    deleteList = (parameter) => {
        // SOMEHOW YOU ARE GOING TO HAVE TO FIGURE OUT
        // WHICH LIST IT IS THAT THE USER WANTS TO
        // DELETE AND MAKE THAT CONNECTION SO THAT THE
        // NAME PROPERLY DISPLAYS INSIDE THE MODAL
        this.setState({listKeyPairToDelete:parameter})
        this.showDeleteListModal(this.state.listKeyPairToDelete);
    }
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST
    showDeleteListModal() {
        let modal = document.getElementById("delete-modal");
        modal.classList.add("is-visible");
    }
    // THIS FUNCTION IS FOR HIDING THE MODAL
    hideDeleteListModal() {
        let modal = document.getElementById("delete-modal");
        modal.classList.remove("is-visible");
    }
    
    deleteListConfirmed = () => {
        //hides the modal
        let modal = document.getElementById("delete-modal");
        modal.classList.remove("is-visible");
        //Now delete the list
        console.log(this.state.sessionData)


        console.log(this.state.listKeyPairToDelete.key)
        let tempArray = this.state.sessionData.keyNamePairs
        console.log("temparray", this.state.listKeyPairToDelete)
        let newArray = []
        tempArray.map((eachList) => (
            (eachList.key === this.state.listKeyPairToDelete.key) ? {} : (newArray[eachList.key] = eachList)
        )
        )
        console.log(newArray)
        //this.db.mutationUpdateSessionData(this.state.sessionData);
    }
    
    render() {
        return (
            <div id="app-root">
                <Banner 
                    title='Top 5 Lister'
                    closeCallback={this.closeCurrentList} />
                <Sidebar
                    heading='Your Lists'
                    currentList={this.state.currentList}
                    keyNamePairs={this.state.sessionData.keyNamePairs}
                    createNewListCallback={this.createNewList}
                    deleteListCallback={this.deleteList}
                    loadListCallback={this.loadList}
                    renameListCallback={this.renameList}
                />
                <Workspace
                    currentList={this.state.currentList} 
                    dragAndDropUpdateCallback={this.dragAndDropUpdate} />
                <Statusbar 
                    currentList={this.state.currentList} />
                <DeleteModal
                    listKeyPair={this.state.listKeyPairToDelete}
                    hideDeleteListModalCallback={this.hideDeleteListModal}
                    deleteListConfirmedCallback={this.deleteListConfirmed}
                />
            </div>
        );
    }
}

export default App;
