import jsTPS_Transaction from "./jsTPS.js"
/**
 * ChangeItem_Transaction
 * 
 * This class represents a transaction that updates the text
 * for a given item. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class ChangeItem_Transaction extends jsTPS_Transaction {
    constructor(db, initId, currentListKey, initOldText, initNewText, func) {
        super();
        this.db = db;
        this.itemId = initId;
        this.currentListKey = currentListKey;
        this.oldText = initOldText;
        this.newText = initNewText;
        this.func = func
    }
    doTransaction() {
        this.func(this.itemId, this.newText, this.currentListKey)
    }
    
    undoTransaction() {
        this.func(this.itemId, this.oldText, this.currentListKey)
    }
    redoTransaction() {
        this.func(this.itemId, this.newText, this.currentListKey)
    }
}