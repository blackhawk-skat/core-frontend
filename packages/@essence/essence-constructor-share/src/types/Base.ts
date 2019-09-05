export type ICkId = number | string;

/**
 * 1 - Создание
 * 2 - Редактирование
 * 3 - Удаление
 * 4 - Действие настраивается пользователем
 * 6 - Клонирование
 */
export type IBuilderMode = "1" | "2" | "3" | "4" | "6";

export interface IFormOptions {
    filter?: object[];
    reset?: boolean;
    form?: any;
    noClean?: boolean;
    noLoad?: boolean;
    selectedRecordId?: ICkId;
}

export type ObservableMap<Key, Value> = any;
export type IObservableArray<Key> = any;
export type Field = any;
export type FormType = any;

export type WindowModelType = any;
export type StoreModelTypes = any;

export interface IRecord {[$key: string]: number | string | undefined}
