import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {IWithModelProps, withModel} from "@essence/essence-constructor-share/decorators";
import {observer} from "mobx-react";
import * as React from "react";
import {ExampleModel} from "./ExampleModel";

export const Example = ({store}: IWithModelProps<ExampleModel>) => (
    <List>
        <Divider />
        {store.recordsStore.records.map((record: any) => (
            <React.Fragment key={record.ckId}>
                <ListItem>
                    <ListItemText primary={record[store.column]} secondary={record[store.displayField]} />
                </ListItem>
                <Divider />
            </React.Fragment>
        ))}
        <Divider />
    </List>
);

export default withModel(({bc, pageStore}): ExampleModel => new ExampleModel({bc, pageStore}), "store")(
    observer(Example),
);
