import React from "react";
import EditToolbar from "./EditToolbar";

export default class Banner extends React.Component {
    render() {
        const { title,
                currentList,
                transactionStacktps,
                undoCallback,
                redoCallback,
                closeCallback } = this.props;
        return (
            <div id="top5-banner">
                {title}
                <EditToolbar 
                    currentList={currentList}
                    transactionStacktps={transactionStacktps}
                    undoCallback={undoCallback}
                    redoCallback={redoCallback}
                    closeCallback={closeCallback}
                />
            </div>
        );
    }
}