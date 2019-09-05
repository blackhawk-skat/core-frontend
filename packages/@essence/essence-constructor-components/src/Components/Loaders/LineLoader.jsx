// @flow
import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {withStyles} from "@material-ui/core/styles";
import IconBflLine from "../../Icons/IconBflLine";
import styles from "./LineLoadersStyles";

type PropsType = {|
    classes: {
        [$Keys<$Call<typeof styles>>]: string,
    },
    loaderType?: "default" | "bfl-loader",
    size: number,
|};

const REACT_APP_LOADER = process.env.REACT_APP_LOADER || "default";

const LineLoader = ({classes, loaderType, size}: PropsType) => (
    <div className={classes.root} data-page-object="line-loader">
        {(loaderType || REACT_APP_LOADER) === "bfl-loader" ? (
            <IconBflLine
                className={classes.rootIcon}
                firstPathClassName={classes.firstPath}
                secondPathClassName={classes.secondPath}
                style={{height: size, width: size}}
            />
        ) : (
            <CircularProgress size={size} />
        )}
    </div>
);

LineLoader.defaultProps = {
    size: 70,
};

export default withStyles(styles)(LineLoader);
