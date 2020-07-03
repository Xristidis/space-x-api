import React from "react";
import Search from "../search/Search";
import Button from "../button/Button";
// import "./index.css";

export default class Header extends React.Component {
    render() {
        return (
            <header>
                <Search />
                <Button />
            </header>
        );
    }
}