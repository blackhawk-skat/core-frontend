import {PageModelAbstract} from "@essence/essence-constructor-share/models";
import * as React from "react";
import {render} from "react-dom";
import App from "./App";

const props = {
    bc: {
        ckObject: "render-module",
        ckPageObject: "render-module",
    },
    pageStore: new PageModelAbstract(),
    visible: true,
};

render(<App {...props} />, document.getElementById("root"));
