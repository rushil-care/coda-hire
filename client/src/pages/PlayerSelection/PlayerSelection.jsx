import React, { Component } from "react";
import { Table, Button, notification } from "antd";
import Axios from "axios";
import LeftPane from "./LeftPane";
import { Redirect, withRouter } from "react-router-dom";

class PlayerSelection extends Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        data: [],
        tableLoading: true,
        redirect: false,
    };

    componentDidMount = () => {
        let players_api = "https://s3-ap-southeast-1.amazonaws.com/he-public-data/bets7747a43.json";
        Axios.get(players_api).then((res) => {
            let data = res.data;

            let wins = {};
            let loss = {};

            data = data.map((obj, idx) => {
                wins = { ...wins, [idx]: 0 };
                loss = { ...loss, [idx]: 0 };
                return { ...obj, idx: idx };
            });

            if (!localStorage.getItem("wins")) {
                localStorage.setItem("wins", JSON.stringify(wins));
            }

            if (!localStorage.getItem("loss")) {
                localStorage.setItem("loss", JSON.stringify(loss));
            }

            this.setState({ data, tableLoading: false });
        });
    };

    columns = [
        {
            title: "Player Name",
            dataIndex: "Name",
        },
        {
            title: "Avatar",
            dataIndex: "Profile Image",
            render: (idx) => {
                let style = {
                    backgroundImage: "url(" + idx + ")",
                    height: 45,
                };
                return <div className="bg-image-full f-d f-h-c" style={style}></div>;
            },
        },
        {
            title: "Price",
            dataIndex: "Price",
        },
        {
            title: "Bet",
            dataIndex: "Bet",
        },
        {
            title: "Wins",
            dataIndex: "idx",
            render: (idx) => {
                let WinsObject = localStorage.getItem("wins");
                WinsObject = JSON.parse(WinsObject);
                return <div>{WinsObject[idx]}</div>;
            },
        },
        {
            title: "Loss",
            dataIndex: "loss",
            render: (loss, idx) => {
                // let index = idx["idx"];
                let index = idx.idx;
                let LossObject = localStorage.getItem("loss");
                LossObject = JSON.parse(LossObject);
                return <div>{LossObject[index]}</div>;
            },
        },
    ];

    start = () => {
        this.setState({ loading: true });
        // ajax request after empty completing
        setTimeout(() => {
            this.setState({
                selectedRowKeys: [],
                loading: false,
            });
        }, 1000);
    };

    onSelectChange = (selectedRowKeys) => {
        console.log("selectedRowKeys changed: ", selectedRowKeys);
        this.setState({ selectedRowKeys });
    };

    onBtnClick = () => {
        const { selectedRowKeys: rowSelected } = this.state;
        if (rowSelected.length < 2)
            notification.open({
                type: "warning",
                message: "Atleast two players required to start Game",
            });
        if (rowSelected.length >= 2) {
            this.setState({ redirect: true });
        }
    };

    render() {
        const { loading, selectedRowKeys, data, tableLoading, redirect } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;
        return (
            <>
                <div className="dashboard-wrap f-d">
                    <div className="left-pane">
                        <LeftPane
                            data={data}
                            rowSelected={selectedRowKeys}
                            onBtnClick={this.onBtnClick}
                        />
                    </div>
                    <div className="table-wrap">
                        <div style={{ marginBottom: 16 }} className="f-d f-h-sb">
                            <div>
                                <Button
                                    type="primary"
                                    onClick={this.start}
                                    disabled={!hasSelected}
                                    loading={loading}
                                >
                                    Clear Selected Players
                                </Button>
                                <span style={{ marginLeft: 8 }}>
                                    {hasSelected
                                        ? `Selected ${selectedRowKeys.length} Players`
                                        : ""}
                                </span>
                            </div>

                            <Button
                                type="primary"
                                onClick={() => {
                                    localStorage.clear();
                                    window.location.reload();
                                }}
                            >
                                Reset Win and lose
                            </Button>
                        </div>
                        <Table
                            rowSelection={rowSelection}
                            columns={this.columns}
                            dataSource={data}
                            loading={tableLoading}
                            rowKey={"idx"}
                        />
                    </div>
                    {redirect && (
                        <Redirect
                            to={{
                                pathname: `${process.env.PUBLIC_URL}/betpage`,
                                state: { data: data, rowSelected: selectedRowKeys },
                            }}
                        />
                    )}
                </div>
                <style jsx={"true"}>{`
                    .dashboard-wrap .left-pane {
                        width: 40%;
                        margin-bottom: 64px;
                    }

                    .dashboard-wrap .table-wrap {
                        margin-top: 64px;
                        width: 60%;
                        padding-right: 64px;
                    }
                `}</style>
            </>
        );
    }
}

export default withRouter(PlayerSelection);
