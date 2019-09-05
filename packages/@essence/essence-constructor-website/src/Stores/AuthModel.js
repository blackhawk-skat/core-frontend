/* eslint-disable jsx-a11y/href-no-hash */
// @flow
import {extendObservable, action} from "mobx";
import {sendRequest} from "@essence/essence-constructor-components";
import {getFromStore, saveToStore} from "@essence/essence-constructor-share/utils";
import noop from "lodash/noop";
import {applicationStore} from "./ApplicationModel";

export interface AuthModelType {
    +userInfo: Object;
    +checkAuthAction: (history?: History) => void;
    +loginAction: (authValues: Object, history: any, responseOptions?: Object) => void;
    +changeUserInfo: (userInfo: Object) => void;
    +successLoginAction: (response: Object, history: any) => void;
}

export class AuthModel implements AuthModelType {
    userInfo: Object;

    constructor() {
        extendObservable(this, {
            userInfo: getFromStore("auth", {}),
        });
    }

    checkAuthAction = action("checkAuthAction", (history?: History) =>
        sendRequest({
            action: "sql",
            query: "GetSessionData",
        })
            .then((response) => {
                if (response && applicationStore.snackbarStore.checkValidLoginResponse(response)) {
                    this.successLoginAction(response, history);
                }
            })
            .catch(noop),
    );

    loginAction = action("loginAction", (authValues: Object, history: any, responseOptions: Object = {}) =>
        sendRequest({
            action: "auth",
            body: authValues,
            query: "Login",
        })
            .then((response) => {
                if (applicationStore.snackbarStore.checkValidLoginResponse(response)) {
                    this.successLoginAction(
                        {
                            ...response,
                            ...responseOptions,
                        },
                        history,
                    );
                }
            })
            .catch((error) => {
                applicationStore.snackbarStore.checkExceptResponse(error);
                applicationStore.logoutAction();
                this.userInfo = {};
            }),
    );

    successLoginAction = action("successLoginAction", (response: Object, history: any) => {
        const {state: {backUrl = "/home"} = {}} = history.location;

        this.userInfo = response;
        applicationStore.setSesssionAction(response);
        if (response.mode !== "reports") {
            saveToStore("auth", response);
        }
        history.push(backUrl);
    });

    changeUserInfo = action("changeUserInfo", (userInfo: Object = {}) => {
        this.userInfo = {
            ...this.userInfo,
            ...userInfo,
        };
        saveToStore("auth", this.userInfo);
    });
}
