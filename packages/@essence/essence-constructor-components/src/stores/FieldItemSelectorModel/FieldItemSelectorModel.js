// @flow
import {action} from "mobx";
import camelCase from "lodash/camelCase";
import {type BuilderModeType} from "../../BuilderType";
import {saveAction} from "../actions/saveAction";
import {type GridModelType} from "../GridModel";
import {StoreBaseModel} from "../StoreBaseModel";
import {type FieldItemSelectorModelType} from "./FieldItemSelectorModelType";

function getSelectionRecords(gridStore: GridModelType) {
    if (gridStore.bc.selmode === "MULTI" || gridStore.bc.selmode === "SIMPLE") {
        return [...gridStore.selectedRecords.values()];
    }

    return [gridStore.recordsStore.selectedRecord];
}

export class FieldItemSelectorModel extends StoreBaseModel implements FieldItemSelectorModelType {
    name = "itemselector";

    getStores = ({fieldFrom, fieldTo}: Object): [?GridModelType, ?GridModelType] => [
        this.pageStore.stores.get(fieldFrom.ckPageObject),
        this.pageStore.stores.get(fieldTo.ckPageObject),
    ];

    saveAction = action("saveAction", (values: Object, mode: BuilderModeType) =>
        saveAction.call(this, values, mode, {
            actionBc: {
                ckObject: `${this.bc.ckObject}_button`,
                ckPageObject: `${this.bc.ckPageObject}_button`,
                cvName: `${this.bc.cvName}_button`,
            },
            bc: this.bc,
            pageStore: this.pageStore,
        }),
    );

    applySaveAction = (fromStore: GridModelType, toStore: GridModelType, recs: Object[]) => {
        fromStore.recordsStore.removeRecordsAction(recs, camelCase(this.bc.column));
        toStore.recordsStore.addRecordsAction(recs);

        toStore.recordsStore.sortRecordsAction();
        fromStore.clearStoreAction();
    };

    moveRecSaveAction = action(
        "moveRecSaveAction",
        async (mode: BuilderModeType, {fieldFrom, fieldTo}, isAll: Boolean) => {
            const [fromStore, toStore] = this.getStores({fieldFrom, fieldTo});

            if (!fromStore || !toStore) {
                return false;
            }

            const recs = isAll ? fromStore.recordsStore.records : getSelectionRecords(fromStore);
            const saveStatus = await this.saveAction(recs, mode);

            if (saveStatus) {
                this.applySaveAction(fromStore, toStore, recs);
            }

            return saveStatus;
        },
    );
}
