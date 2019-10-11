import * as React from "react";
import {Backdrop, Modal, Grow, Paper} from "@material-ui/core";
import {FocusableArrow} from "../FocusableArrow";
import {ANIMATION_TIMEOUT} from "../../constants";
import {isFunction} from "../../utils/functions";
import {useStyles} from "./PopoverContent.styles";
import {IPopoverContentProps} from "./Popover.types";

export const PopoverContent: React.FC<IPopoverContentProps> = React.forwardRef<HTMLDivElement, IPopoverContentProps>(
    function PopoverContent(props: IPopoverContentProps, ref) {
        const classes = useStyles(props);
        const style: React.CSSProperties = {
            bottom: "auto",
            position: "absolute",
            right: "auto",
            ...props.styleOffset,
        };

        return (
            <React.Fragment>
                {props.hideBackdrop ? null : <Backdrop open className={classes.popoverBackdrop} />}

                <Modal
                    open
                    className={classes.popoverRoot}
                    style={style}
                    data-page-object={props.dataPageObjectPopover}
                    hideBackdrop
                    container={props.container}
                    disableRestoreFocus
                    disableAutoFocus
                    disableEnforceFocus
                    disableEscapeKeyDown={props.disableEscapeKeyDown}
                    onEscapeKeyDown={props.onEscapeKeyDown}
                >
                    <div ref={ref}>
                        <Grow appear in onEntering={props.onEntering} timeout={ANIMATION_TIMEOUT}>
                            <FocusableArrow
                                tabFocusable={props.tabFocusable}
                                focusableMount={props.focusableMount}
                                restoreFocusedElement={props.restoreFocusedElement}
                            >
                                <Paper className={props.paperClassName} style={{width: props.width}}>
                                    {isFunction(props.popoverContent)
                                        ? props.popoverContent({
                                              onClose: props.onClose,
                                              onOpen: props.onOpen,
                                              open: props.open,
                                              position: style.bottom ? "top" : "bottom",
                                          })
                                        : props.popoverContent}
                                </Paper>
                            </FocusableArrow>
                        </Grow>
                    </div>
                </Modal>
            </React.Fragment>
        );
    },
);