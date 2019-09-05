import * as React from "react";
import { Subtract } from "utility-types";
import {IBuilderConfig, IPageModel, IRecordsModel} from "../types";
import {checkAutoload} from "./utils";

export interface IWithModelProps<M> {
    pageStore: IPageModel,
    bc: IBuilderConfig,
    disabled?: boolean,
    hidden?: boolean,

    store: M;
    isAutoLoad: boolean,
}

export interface ICreateModelProps {
    bc: IBuilderConfig,
    pageStore: IPageModel,
}

interface IModelType {
    hidden?: boolean,
    disabled?: boolean,
    recordsStore: IRecordsModel,
}
interface IState<Model> {
    store?: Model,
    isAutoLoad: boolean
}

interface InjectedModelProps<M> {
    store: M;
    isAutoLoad: boolean,
}

export const withModel = <Model extends IModelType, P extends IWithModelProps<Model>>(
    createModel: (props: ICreateModelProps) => Model,
    name: string = "store",
)  => (WrappedComponent: React.ComponentType<P>) =>
        class ModelHOC extends React.Component<
            Subtract<P, InjectedModelProps<Model>>,
            IState<Model>
        > {
            public state: IState<Model> = {
                isAutoLoad: false,
                store: null,
            };

            public componentDidMount() {
                const {bc, pageStore} = this.props;
                const store: Model = createModel({bc, pageStore});
                const {recordsStore} = store;
                const isAutoLoad = checkAutoload({bc, pageStore, recordsStore: store.recordsStore});

                if (bc.ckPageObject) {
                    this.props.pageStore.addStore(store, bc.ckPageObject);
                }

                this.setState(
                    {
                        isAutoLoad,
                        store,
                    },
                    () => {
                        /*
                         * Дожидаемся did mount на внутренних компонентах.
                         * Поля могут сами инициировать начальную загрузку.
                         */
                        if (isAutoLoad && recordsStore && !recordsStore.isLoading) {
                            recordsStore.loadRecordsAction({status: "autoload"});
                        }
                    },
                );
            }

            public componentDidUpdate() {
                const {store} = this.state;

                if (store) {
                    store.disabled = this.props.disabled;
                    store.hidden = this.props.hidden;
                }
            }

            public componentWillUnmount() {
                if (this.props.bc.ckPageObject) {
                    // $FlowFixMe
                    this.props.pageStore.removeStore(this.props.bc.ckPageObject, this.state.store);
                }
            }

            public render() {
                const {store} = this.state;
                const storeProps = {[name]: store};

                if (!store) {
                    return null;
                }

                return <WrappedComponent {...this.props as P} {...storeProps} isAutoLoad={this.state.isAutoLoad} />;
            }
        }
