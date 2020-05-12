import {action, computed, observable, ObservableMap} from "mobx";
import {IRecord} from "../types";
import {IBuilderMode} from "../types/Builder";
import {entriesMapSort, deepDelete} from "../utils/transform";
import {Field} from "./Field";
import {IField, IFormProps, IForm, IFormHooks, IRegisterFieldOptions} from "./types";

export class Form implements IForm {
    public initialValues: IRecord = {};

    public hooks: IFormHooks;

    public mode: IBuilderMode;

    constructor(props: IFormProps) {
        this.hooks = props.hooks;
        this.initialValues = props.values;
        this.mode = props.mode || "1";
    }

    @observable public fields: ObservableMap<string, IField> = observable.map();

    @observable public submitting = false;

    @computed get values(): IRecord {
        const values: IRecord = {
            ...this.initialValues,
        };

        for (const [key, field] of this.fields.entries()) {
            if (key.indexOf(".") === -1) {
                values[key] = field.output(field, this);
            }
        }

        return values;
    }

    @computed get isValid(): boolean {
        for (const field of this.fields.values()) {
            if (field.isValid === false) {
                return false;
            }
        }

        return true;
    }

    @action
    registerField = (key: string, options: IRegisterFieldOptions): IField => {
        let field = this.fields.get(key);

        if (!field) {
            field = new Field({
                bc: options.bc,
                form: this,
                input: options.input,
                isArray: options.isArray,
                isObject: options.isObject,
                key,
                output: options.output,
                pageStore: options.pageStore,
            });

            this.fields.set(key, field);
            this.fields = new ObservableMap(
                entriesMapSort(this.fields, ([keyOld], [keyNew]) => keyOld.length - keyNew.length),
            );
        }

        return field;
    };

    @action
    unregisterField = (key: string) => {
        if (this.fields.has(key)) {
            this.fields.delete(key);
            this.initialValues = deepDelete(this.initialValues, key);
        }
    };

    @action
    validate = () => {
        for (const field of this.fields.values()) {
            field.validate();
        }

        return undefined;
    };

    @action
    onSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        this.validate();
        await this.submit();
    };

    @action
    update = (initialValues: IRecord = {}, isReset = false) => {
        for (const [, field] of this.fields) {
            const [isExists, value] = field.input(initialValues, field, this);

            if (isExists) {
                field.value = value;
            } else if (isReset) {
                field.reset();
            } else {
                field.clear();
            }
        }
    };

    @action
    resetValidation = () => {
        for (const field of this.fields.values()) {
            field.resetValidation();
        }
    };

    submit = async () => {
        this.submitting = true;

        if (this.hooks.onSuccess) {
            await this.hooks.onSuccess(this);
        }

        this.submitting = false;
    };

    select = (key: string) => {
        return this.fields.get(key);
    };

    // Alias to select
    $ = this.select;

    has = (key: string) => {
        return this.fields.has(key);
    };

    onFilterRedirect = async () => {
        if (this.hooks.onFilterRedirect) {
            await this.hooks.onFilterRedirect(this);
        }
    };
}