const BuilderWindowStyles = () => ({
    content: {},
    contentScrollableParent: {
        display: "flex",
    },
    "dialod-align-left": {
        justifyContent: "flex-start",
    },
    "dialod-align-right": {
        justifyContent: "flex-end",
    },
    dialogButtonActions: {},
    "paper-align-left": {
        // Height: "100%",
        margin: 0,
        // MaxHeight: "100%",
    },
    "paper-align-right": {
        // Height: "100%",
        margin: 0,
        // MaxHeight: "100%",
    },
    "winsize-base": {
        maxWidth: 800,
    },
    "winsize-default": {
        maxWidth: 800,
    },
    "winsize-fullscreen": {
        "& $contentScrollableParent": {
            flexGrow: 1,
        },

        "& $dialogButtonActions": {
            justifyContent: "center",
        },
    },
    "winsize-narrow": {
        maxWidth: 500,
    },
    "winsize-wide": {
        maxWidth: 1000,
    },
    "winsize-xlwide": {
        maxWidth: 1600,
    },
    "winsize-xwide": {
        maxWidth: 1200,
    },
});

export default BuilderWindowStyles;
