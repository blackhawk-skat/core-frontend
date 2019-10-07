import {IEssenceTheme} from "@essence/essence-constructor-share";
/* eslint-disable sort-keys */
export default (theme: IEssenceTheme) => ({
    text: {
        fontSize: 15,
        width: 120,
    },
    tabIcon: {
        color: theme.palette.secondary.main,
        fontSize: 20,
        padding: "0 4px",
        width: 32,
        textAlign: "center",
    },
    tabRoot: {
        "& $tabWrapper > *:first-child": {
            marginBottom: 0,
        },
        "& $activeTabWrapper > *:first-child": {
            marginBottom: 0,
        },
        border: `1px solid ${theme.palette.primary.main}`,
        padding: 0,
        height: theme.essence.sizing.appBarHeight,
        minHeight: theme.essence.sizing.appBarHeight,
    },
    verticalTabRoot: {
        width: "100%",
        maxWidth: "100%",
    },
    horizontalTabRoot: {
        width: 160,
    },
    tabWrapper: {
        flexDirection: "row",
        textTransform: "none",
    },
    activeTab: {
        backgroundColor: theme.palette.common.white,
        height: theme.essence.sizing.appBarHeight,
        borderBottom: `2px solid ${theme.palette.common.white}`,
    },
    activeTabWrapper: {
        flexDirection: "row",
        textTransform: "none",
    },
    activeCloseIcon: {
        top: 2,
        right: 2,
        position: "absolute",
        color: theme.palette.primary.main,
    },
    closeIcon: {
        top: 2,
        right: 2,
        position: "absolute",
        color: theme.palette.primary.main,
    },
    activeTabIcon: {
        color: theme.palette.secondary.main,
    },
});
