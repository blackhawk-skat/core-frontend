import * as React from "react";
import cn from "clsx";
import {Grid} from "@material-ui/core";
import {useTranslation, toColumnStyleWidth} from "@essence/essence-constructor-share/utils";
import {mapComponents} from "@essence/essence-constructor-share/components";
import {BuilderTypeContext} from "@essence/essence-constructor-share/context";
import {useStyles} from "./Group.styles";
import {IGroupProps} from "./Group.types";

export const Group: React.FC<IGroupProps> = (props) => {
    const {error, isRow, bc, status, renderComponent, children} = props;
    const builderType = React.useContext(BuilderTypeContext);
    const inFilter = builderType === "filter";
    const classes = useStyles(undefined);
    // eslint-disable-next-line id-length
    const {t} = useTranslation();

    return (
        <Grid
            container
            spacing={1}
            className={cn(classes.root, {
                [classes.rootError]: error,
                [classes.filterRoot]: inFilter,
                [classes.panelRoot]: !inFilter,
            })}
            direction={isRow ? "row" : "column"}
            wrap={isRow ? "nowrap" : "wrap"}
            data-qtip={error ? t("a5a5d7213d1f4f77861ed40549ee9c57") : ""}
        >
            <Grid container className={classes.label} wrap="nowrap" justify="space-between">
                <Grid item className={classes.labelTextStartAngle}>
                    &nbsp;
                </Grid>
                {bc.cvDisplayed ? (
                    <Grid item className={`${classes.labelDisplay}`}>
                        <span>{t(bc.cvDisplayed)}</span>
                    </Grid>
                ) : null}
                <Grid item xs className={classes.labelTextLine}>
                    &nbsp;
                </Grid>
                {status}
                <Grid item className={classes.labelTextEndAngle}>
                    &nbsp;
                </Grid>
            </Grid>
            {renderComponent &&
                mapComponents(bc.childs, (ChildCmp, child) => (
                    <Grid
                        item
                        xs={12}
                        key={child.ckPageObject}
                        className={classes.child}
                        style={toColumnStyleWidth(child.width)}
                    >
                        {renderComponent(ChildCmp, child)}
                    </Grid>
                ))}
            {children}
        </Grid>
    );
};