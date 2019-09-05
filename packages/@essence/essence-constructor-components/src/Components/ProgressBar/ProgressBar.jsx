// @flow
import * as React from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import {type StatusType} from "../../stores/SnackbarModel/SnackbarModelType";

type PropsType = {|
    progressCount: number,
    status: StatusType,
|};

const FULL_LOADED = 100;

const ProgressBar = ({progressCount, status}: PropsType) => {
    let content = "Загрузка файла завершена";

    if (status === "progress") {
        content =
            progressCount === FULL_LOADED ? (
                "Сохранение файла..."
            ) : (
                <LinearProgress variant="determinate" value={progressCount} />
            );
    }

    if (status === "errorUpload") {
        content = "Ошибка";
    }

    return <div data-page-object="progress-loader">{content}</div>;
};

export default ProgressBar;
