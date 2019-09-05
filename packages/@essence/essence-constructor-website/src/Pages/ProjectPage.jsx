/* eslint-disable jsx-a11y/href-no-hash */
// @flow
import * as React from "react";
import {inject, observer} from "mobx-react";
import {withStyles} from "@material-ui/core/styles";
import {compose} from "recompose";
import {BuilderPage} from "@essence/essence-constructor-components";
import {type ApplicationModelType} from "../Stores/ApplicationModel";

type StoresPropsType = {
    applicationStore: ApplicationModelType,
};
type OwnPropsType = {
    match: {
        params: {
            ckId: string,
        },
    },
    classes?: Object,
};
type PropsType = StoresPropsType & OwnPropsType;

const mapStoresToProps = (stores: Object): StoresPropsType => ({
    applicationStore: stores.applicationStore,
});

const styles = () => ({
    hidden: {
        display: "none",
    },
    root: {
        height: "100%",
    },
});

class ProjectPage extends React.Component<PropsType> {
    componentDidMount() {
        this.handleSetPage();
    }

    componentDidUpdate(prevProps: PropsType) {
        const {ckId} = this.props.match.params;

        if (prevProps.match.params.ckId !== ckId) {
            this.handleSetPage();
        }
    }

    handleSetPage = () => {
        const {ckId} = this.props.match.params;
        const {routesStore, pagesStore} = this.props.applicationStore;
        const routes = routesStore.recordsStore.records;
        const pageConfig = routes.find((route) => route.ckId === ckId || route.cvUrl === ckId);

        if (pageConfig) {
            pagesStore.setPageAction(pageConfig.ckId, false);
        } else {
            pagesStore.setPageAction(ckId);
        }
    };

    componentWillUnmount() {
        this.props.applicationStore.pagesStore.removeAllPagesAction();
    }

    render() {
        const {
            classes = {},
            applicationStore: {pagesStore},
        } = this.props;

        return (
            <div className={classes.root}>
                {pagesStore.pages.map((page) => (
                    <BuilderPage
                        key={page.ckPage}
                        pageStore={page}
                        visible={pagesStore.activePage === page}
                        className={pagesStore.activePage === page ? "" : classes.hidden}
                    />
                ))}
            </div>
        );
    }
}

export default compose(
    inject(mapStoresToProps),
    withStyles(styles),
    observer,
)(ProjectPage);
