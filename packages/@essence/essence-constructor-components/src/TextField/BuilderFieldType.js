// @flow
import * as React from "react";
import {Form, Field} from "mobx-react-form";
import {type PageModelType} from "../stores/PageModel";
import {type CommonDecoratorInjectType} from "../decorators/commonDecorator";
import {type BuilderBaseType} from "../BuilderType";
import BuilderFieldStyle from "./BuilderFieldStyle";

export type BuilderFieldHanlers = {
    onChange: (event: ?SyntheticEvent<>, value: mixed) => void,
    onClear: (event: ?SyntheticEvent<>) => void,
};

export type BaseBuilderFieldType = BuilderBaseType & {
    currencysign?: "string",
    cvDisplayed?: string,
    required?: "true" | "false",
    maxsize?: number,
    regexp?: string,
    column?: string,
    contentwidth?: string,
    info?: string,
    defaultvalue?: "false" | "true" | string,
    defaultvaluequery?: string,
    datatype?: "combo" | "numeric" | "text" | string,
    editmode?: string,
    width?: number | string,
    getglobal?: string,
    getgloballist?: string,
    redirecturl?: string,
    columnsfilter?: string,
    redirectusequery?: string,
    imask?: string,
    format?: string,
    validaterelated?: string,
    rules?: string,
    disabledstartdate?: string,
    disabledenddate?: string,
    pickerwidth?: string,
    displayfield?: string,
    valuefield?: string,
    collectionvalues?: "object" | "array",
    pagesize?: string,
    pickerheight?: string,
    allownew?: "false" | "true",
    clearable?: "false" | "true",
    querydelay?: string,
    queryparam?: string,
    minchars?: string,
    querymode?: "local" | "remote",
    clearfield?: string,
    selfclean?: "false" | "true",
    reloadfield?: string,
    getglobaltostore?: string,
    thousandseparator?: string,
    decimalseparator?: string,
    decimalprecision?: string,
    reqcount?: string,
    reqcountrules?: string,
    requiredrules?: string,
};

export type BuilderFieldType = BaseBuilderFieldType;

export type BuilderFieldPropsType = CommonDecoratorInjectType & {
    bc: BuilderFieldType,
    field: Field,
    parentKey?: string,
    editing?: boolean,
    readOnly?: boolean,
    pageStore: PageModelType,
    disabled?: boolean,
    hidden?: boolean,
    visible: boolean,
    form: Form,
    noLabel?: boolean,
    classes: {
        [$Keys<$Call<typeof BuilderFieldStyle, any>>]: string,
    },
    tabIndex?: string,
    autoremove?: boolean,
    onChange?: (event: ?SyntheticEvent<>, value: mixed) => void,
    onExpand?: () => void,
};

export type TextFieldChildProps = BuilderFieldHanlers & {
    bc: BuilderFieldType,
    readOnly?: boolean,
    field: Field,
    form: Form,
    noLabel?: boolean,
    InputLabelProps?: Object,
    label?: string | React.Node,
    disabled?: boolean,
    style?: Object,
    tips: Array<React.Node>,
    className?: string,
    value: mixed,
    errorText?: string,
    InputProps?: Object,
    inputProps?: Object,
    imask?: string,
    pageStore: PageModelType,
    editing?: boolean,
    height?: string,
    hidden?: boolean,
    visible: boolean,
    error?: boolean,
    tabIndex?: string,
    width?: number | string,
    onInitGlobal: (store?: any) => void,
};
