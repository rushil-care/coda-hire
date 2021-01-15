import React from "react";
import { Button } from "antd";

const LeftPane = (props) => {
    const { data, rowSelected } = props;

    const renderPlayers = () => {
        let selectedPlayers = rowSelected.map((row, idx) => {
            let user_data = data[row];
            let { Name, Price, Bet } = user_data;
            console.log("row", row);
            console.log("data", data);
            let style = {
                backgroundImage: "url(" + user_data["Profile Image"] + ")",
                height: 45,
            };
            return (
                <div className="player-row g-d" key={"LEFT" + idx}>
                    <div className="img bg-image-full" style={style}></div>
                    <div className="user-desc f-d f-v-c f-h-sb">
                        <div>
                            <div>{Name}</div>
                            <div>{Bet}</div>
                        </div>
                        <div>{Price}</div>
                    </div>
                </div>
            );
        });

        return selectedPlayers;
    };

    return (
        <>
            <div className="player-sidebar">
                <div className="h3-heading">Players Playing {rowSelected.length}</div>
                <div className="players-wrap">{renderPlayers()}</div>
                <div className="btn f-d f-h-c">
                    <Button
                        type="primary"
                        size={"large"}
                        id={"startBtn"}
                        onClick={props.onBtnClick}
                    >
                        START
                    </Button>
                </div>
            </div>
            <style jsx={"true"}>
                {`
                    .player-sidebar {
                        width: 33%;
                        height: 100%;
                        background-color: var(--dove);
                        position: fixed;
                        top: 0;
                        padding: 32px;
                    }

                    .player-sidebar .players-wrap {
                        margin-top: 32px;
                        height: 80%;
                        overflow-y: auto;
                    }

                    .player-row {
                        grid-template-columns: 30% 70%;
                        margin-bottom: 32px;
                    }

                    .player-sidebar .btn #startBtn {
                        margin-top: 36px;
                        width: 100%;
                    }
                `}
            </style>
        </>
    );
};

export default LeftPane;
