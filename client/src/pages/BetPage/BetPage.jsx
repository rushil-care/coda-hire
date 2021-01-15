import { Button } from "antd";
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Header from "../../components/Header/header";

class BetPage extends Component {
    state = {
        randomNo: 0,
        players: [],
        loss: {},
        wins: {},
        redirect: false,
    };

    componentDidMount() {
        let randomNo = Math.floor(Math.random() * 9 + 1);
        const { data, rowSelected } = this.props.location.state;

        let players = [];
        players = rowSelected.map((row) => {
            return data[row];
        });

        let loss = localStorage.getItem("loss");
        loss = JSON.parse(loss);

        let WinsObject = localStorage.getItem("wins");
        WinsObject = JSON.parse(WinsObject);

        players.map((user_obj) => {
            let { Bet, idx } = user_obj;
            Bet = parseInt(Bet);
            if (Bet === randomNo) {
                WinsObject[idx] += 1;
            } else if (Bet !== randomNo) {
                loss[idx] += 1;
            }
            return null;
        });

        localStorage.setItem("wins", JSON.stringify(WinsObject));
        localStorage.setItem("loss", JSON.stringify(loss));

        this.setState({ randomNo, players, loss, wins: WinsObject });
    }

    renderPlayers = () => {
        const { players, wins, loss, randomNo } = this.state;

        let playersJSX = [];

        playersJSX = players.map((user_obj, index) => {
            let { Name, Price, Bet, idx } = user_obj;
            let style = {
                backgroundImage: "url(" + user_obj["Profile Image"] + ")",
                height: 80,
            };

            let className = "lost";

            if (randomNo === parseInt(Bet)) {
                className = "won";
            }

            return (
                <div className={`player-card g-d ${className}`} key={"BET" + index}>
                    <div className="user-pic bg-image-full" style={style}></div>
                    <div className="user-desc f-d f-h-sb">
                        <div>
                            <div className="name mg-8 h3-heading">{Name}</div>
                            <div className="price mg-8">Price: {Price}</div>
                            <div className="bet mg-8">Bet: {Bet}</div>
                            <div className="wins mg-8">Wins: {wins[idx]}</div>
                            <div className="loss  mg-8">Loss: {loss[idx]}</div>
                        </div>
                        <div className={`h3-heading ${className}-status f-d f-h-e`}>
                            {className}
                        </div>
                    </div>
                </div>
            );
        });

        return playersJSX;
    };

    onBtnClick = () => {
        this.setState({ redirect: true });
    };

    render() {
        const { randomNo } = this.state;
        return (
            <>
                <Header number={randomNo} />
                <div className="bet-page-wrapper lr-pad-d lr-pad-m">
                    <div
                        className="f-d f-v-c c-pointer"
                        style={{ marginTop: 32 }}
                        onClick={this.onBtnClick}
                    >
                        <Button
                            type="dashed"
                            shape="circle"
                            icon="left"
                            style={{ marginRight: 8 }}
                        />
                        <span>BACK</span>
                    </div>
                    {/* <div className="random-banner"> Random Number {randomNo} </div> */}
                    <div className="player-card-wrap">{this.renderPlayers()}</div>
                </div>
                {this.state.redirect && (
                    <Redirect
                        to={{
                            pathname: `${process.env.PUBLIC_URL}/`,
                        }}
                    />
                )}
                <style jsx={"true"}>
                    {`
                        .bet-page-wrapper {
                            color: var(--carbon);
                            font-size: 16px;
                        }

                        .won {
                            border-bottom: 10px solid var(--go) !important;
                        }

                        .won-status {
                            color: var(--go);
                            text-transform: uppercase;
                            font-weight: 400;
                        }

                        .lost-status {
                            color: var(--tomato);
                            text-transform: uppercase;
                            font-weight: 400;
                        }

                        .lost {
                            border-bottom: 10px solid var(--tomato) !important;
                        }

                        .bet-page-wrapper .player-card {
                            width: 30%;
                            border-radius: 4px;
                            background-color: var(--dove);
                            padding: 32px;
                            box-shadow: var(--peaky-shadow-high);
                            border: var(--peaky-border);
                            grid-template-columns: 30% 70%;
                            margin-bottom: 32px;
                            margin-right: 32px;
                        }

                        .player-card-wrap {
                            display: flex;
                            justify-content: space-between;
                            flex-wrap: wrap;
                            margin-top: 64px;
                        }

                        .mg-8 {
                            margin-left: 16px;
                            margin-bottom: 8px;
                        }

                        @media all and (max-width: 1370px) and (min-width: 800px) {
                            .bet-page-wrapper .player-card {
                                width: 45%;
                                border-radius: 4px;
                                background-color: var(--dove);
                                padding: 32px;
                                box-shadow: var(--peaky-shadow-high);
                                border: var(--peaky-border);
                                grid-template-columns: 30% 70%;
                                margin-bottom: 32px;
                                margin-right: 32px;
                            }
                        }
                    `}
                </style>
            </>
        );
    }
}

export default BetPage;
