import jsTPS_Transaction from "./jsTPS.js"
/**
 * MoveItem_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class MoveItem_Transaction extends jsTPS_Transaction {
    constructor(db, currentListKey, draggedItemId, droppedAtItemId, funct) {
        super();
        this.db = db;
        this.currentListKey = currentListKey;
        this.draggedItemId = draggedItemId;
        this.droppedAtItemId = droppedAtItemId;
        this.funct = funct;
    }
    doTransaction() {
        //this.model.swapItems(this.oldItemIndex, this.newItemIndex);
        this.funct(this.draggedItemId, this.droppedAtItemId, this.currentListKey)
    }
    undoTransaction() {
        //this.model.swapItems(this.newItemIndex, this.oldItemIndex);
        this.funct(this.droppedAtItemId, this.draggedItemId, this.currentListKey)
    }
    redoTransaction() {
        //this.model.swapItems(this.oldItemIndex, this.newItemIndex);
        this.funct(this.draggedItemId, this.droppedAtItemId, this.currentListKey)
    }
}