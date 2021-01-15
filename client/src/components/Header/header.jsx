import React from "react";

const Header = (props) => {
    return (
        <>
            <div className="nav-bar f-d f-h-c heading h1-heading">Oppose Bet : {props.number}</div>
            <style jsx={"true"}>
                {`
                    .nav-bar {
                        color: var(--dove);
                        background: var(--bluecuracao);
                        top: 0px;
                        width: 100%;
                        padding: 16px;
                    }
                `}
            </style>
        </>
    );
};

export default Header;
