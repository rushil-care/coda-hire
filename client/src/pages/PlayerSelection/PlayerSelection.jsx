import React, { Component } from "react";
import { Table, Button, notification, Input, Icon } from "antd";
import Axios from "axios";
import LeftPane from "./LeftPane";
import { Redirect, withRouter } from "react-router-dom";

import Highlighter from "react-highlight-words";

class PlayerSelection extends Component {
    state = {
        selectedRowKeys: [], // Check here to configure the default column
        loading: false,
        data: [],
        tableLoading: true,
        redirect: false,
        searchText: "",
        searchedColumn: "",
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

    start = () => {
        this.setState({
            selectedRowKeys: [],
            loading: false,
        });
    };

    onSelectChange = (selectedRowKeys) => {
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

    /* Search Name Functionality */

    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={(node) => {
                        this.searchInput = node;
                    }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ width: 188, marginBottom: 8, display: "block" }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: (filtered) => (
            <Icon type="search" style={{ color: filtered ? "#1890ff" : undefined }} />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) =>
            this.state.searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
                    searchWords={[this.state.searchText]}
                    autoEscape
                    textToHighlight={text.toString()}
                />
            ) : (
                text
            ),
    });

    handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        this.setState({
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
        });
    };

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: "" });
    };

    /* Search Name Functionality ends */

    render() {
        const { loading, selectedRowKeys, data, tableLoading, redirect } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = selectedRowKeys.length > 0;

        const columns = [
            {
                title: "Player Name",
                dataIndex: "Name",
                ...this.getColumnSearchProps("Name"),
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
                sorter: (a, b) => parseInt(a.Price) - parseInt(b.Price),
            },
            {
                title: "Bet",
                dataIndex: "Bet",
                sorter: (a, b) => parseInt(a.Bet) - parseInt(b.Bet),
            },
            {
                title: "Wins",
                dataIndex: "idx",
                render: (idx) => {
                    let WinsObject = localStorage.getItem("wins");
                    WinsObject = JSON.parse(WinsObject);
                    return <div>{WinsObject[idx]}</div>;
                },
                sorter: (a, b) => {
                    let WinsObject = localStorage.getItem("wins");
                    WinsObject = JSON.parse(WinsObject);
                    let a_index = a.idx;
                    let b_index = b.idx;
                    return parseInt(WinsObject[a_index]) - parseInt(WinsObject[b_index]);
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

                sorter: (a, b) => {
                    let LossObject = localStorage.getItem("loss");
                    LossObject = JSON.parse(LossObject);
                    let a_index = a.idx;
                    let b_index = b.idx;
                    return parseInt(LossObject[a_index]) - parseInt(LossObject[b_index]);
                },
            },
        ];

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
                            columns={columns}
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
