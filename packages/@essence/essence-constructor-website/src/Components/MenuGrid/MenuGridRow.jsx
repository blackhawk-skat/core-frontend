// @flow
import * as React from "react";
import cn from "classnames";
import {compose} from "recompose";
import {observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Icon} from "@essence/essence-constructor-share/Icon";
import styles from "./MenuGridRowStyles";

type PropsType = {|
    route: {
        ckId: string | number,
        cvName: string,
        cvIconName?: string,
        leaf: "true" | "false",
    },
    pagesStore: {
        activePage?: {
            ckPage: string,
        },
        setPageAction: (ckId: string | number) => void,
    },
    routesStore: any,
    level: number,
    isOpen: boolean,
    classes?: Object,
|};

const LEFT_PADDING = 30;

class MenuGridRow extends React.Component<PropsType> {
    handleClick = () => {
        const {
            route: {leaf, ckId},
        } = this.props;

        if (leaf === "true") {
            this.props.pagesStore.setPageAction(ckId);
        } else {
            this.props.routesStore.openCloseExpansionAction(this.props.route.ckId);
        }
    };

    handleToggleFavorit = (event: SyntheticEvent<>) => {
        const {
            route: {leaf},
        } = this.props;

        event.stopPropagation();

        if (leaf === "true") {
            this.props.routesStore.setFavoritsAction(this.props.route.ckId);
        }
    };

    renderIcon() {
        const {
            route: {cvIconName},
            classes = {},
        } = this.props;

        return (
            <Grid item className={classes.iconRoot}>
                <Icon iconfont={cvIconName} size="lg" iconfontname="fa" />
            </Grid>
        );
    }

    renderFolderIcon() {
        const {isOpen, classes = {}} = this.props;

        return (
            <React.Fragment>
                <Grid item className={classes.chevronRoot}>
                    <Icon iconfont={isOpen ? "caret-down" : "caret-right"} size="lg" />
                </Grid>
                <Grid item className={classes.folrderRoot}>
                    <Icon iconfont={isOpen ? "folder-open-o" : "folder-o"} size="lg" />
                </Grid>
            </React.Fragment>
        );
    }

    render() {
        const {route, level, classes = {}, routesStore} = this.props;
        const {favorits} = routesStore;

        return (
            <div className={cn(classes.root)} style={{paddingLeft: level * LEFT_PADDING}} onClick={this.handleClick}>
                <Grid container wrap="nowrap" spacing={8} alignItems="center" className={classes.rootGrid}>
                    {route.leaf === "true" ? this.renderIcon() : this.renderFolderIcon()}
                    <Grid item xs zeroMinWidth>
                        <Typography color="inherit" noWrap data-qtip={route.cvName} className={classes.nameTypography}>
                            {route.cvName}
                        </Typography>
                    </Grid>
                </Grid>
                {route.leaf === "true" ? (
                    <div
                        className={cn(classes.favoriteRoot, {
                            [classes.favoriteSelected]: favorits.get(route.ckId),
                        })}
                        onClick={this.handleToggleFavorit}
                    >
                        <Icon iconfont={favorits.get(route.ckId) ? "star" : "star-o"} size="xs" />
                    </div>
                ) : null}
            </div>
        );
    }
}

export default compose(
    withStyles(styles),
    observer,
)(MenuGridRow);
