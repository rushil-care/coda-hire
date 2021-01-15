import React, { Component } from "react";
import Header from "./Header/header";

export class Layout extends Component {
    constructor() {
        super();
        this.state = {
            clickState: false,
        };
    }

    componentDidMount() {}

    render() {
        return (
            <>
                <Header />
                {this.props.children}
                <style jsx={"true"}>{``}</style>
            </>
        );
    }
}

export default Layout;
