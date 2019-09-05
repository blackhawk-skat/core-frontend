// @flow
import {type BuilderPanelType} from "../Panel/BuilderPanelType";

export type BuilderHistoryPanelType = BuilderPanelType & {
    type: "HISTORYPANEL",
    ckQuery: string,
    btnaudit?: "true" | "false",
    btnrefresh?: "true" | "false",
    btndelete?: "true" | "false",
};

export type BuilderHistoryPanelPropsType = {
    bc: BuilderHistoryPanelType,
};
