import {
    Button,
    ButtonBase,
    IconButton,
    type ButtonBaseProps,
    type ButtonProps,
    type IconButtonProps,
} from "@mui/material";
import { forwardRef, useEffect, useRef, type MouseEventHandler, type PointerEventHandler } from "react";

type ExcludedHandlers =
    | "onPointerDown"
    | "onPointerUp"
    | "onPointerLeave"
    | "onPointerCancel"
    | "onContextMenu"
    | "onClick";

type MobileInteractionProps = {
    delay?: number;
    onLongPress?: (element: HTMLButtonElement) => void;
    onClick?: MouseEventHandler<HTMLButtonElement>;
};

type UseLongPressOptions = MobileInteractionProps;

const useLongPress = ({ delay = 500, onLongPress, onClick }: UseLongPressOptions) => {
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const longPressTriggeredRef = useRef(false);

    const clearTimer = () => {
        if (timerRef.current === null) {
            return;
        }

        clearTimeout(timerRef.current);
        timerRef.current = null;
    };

    const handlePointerDown: PointerEventHandler<HTMLButtonElement> = (event) => {
        clearTimer();

        longPressTriggeredRef.current = false;

        const element = event.currentTarget;

        timerRef.current = setTimeout(() => {
            timerRef.current = null;
            longPressTriggeredRef.current = true;

            onLongPress?.(element);
        }, delay);
    };

    const handlePointerUp: PointerEventHandler<HTMLButtonElement> = () => {
        clearTimer();
    };

    const handlePointerCancel: PointerEventHandler<HTMLButtonElement> = () => {
        clearTimer();
    };

    const handlePointerLeave: PointerEventHandler<HTMLButtonElement> = (event) => {
        if (event.pointerType === "mouse") {
            clearTimer();
        }
    };

    const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
        if (longPressTriggeredRef.current) {
            longPressTriggeredRef.current = false;
            event.preventDefault();
            event.stopPropagation();
            return;
        }

        onClick?.(event);
    };

    const handleContextMenu: MouseEventHandler<HTMLButtonElement> = (event) => {
        if (onLongPress) {
            event.preventDefault();
        }
    };

    useEffect(() => {
        return () => {
            clearTimer();
        };
    }, []);

    return {
        onPointerDown: handlePointerDown,
        onPointerUp: handlePointerUp,
        onPointerLeave: handlePointerLeave,
        onPointerCancel: handlePointerCancel,
        onContextMenu: handleContextMenu,
        onClick: handleClick,
    };
};

export type MobileButtonBaseProps = Omit<ButtonBaseProps, ExcludedHandlers> & MobileInteractionProps;

export const MobileButtonBase = forwardRef<HTMLButtonElement, MobileButtonBaseProps>(function MobileButtonBase(
    { delay, onLongPress, onClick, ...rest },
    ref,
) {
    const longPressProps = useLongPress({
        delay,
        onLongPress,
        onClick,
    });

    return <ButtonBase ref={ref} {...rest} {...longPressProps} />;
});

export type MobileButtonProps = Omit<ButtonProps, ExcludedHandlers> & MobileInteractionProps;

export const MobileButton = forwardRef<HTMLButtonElement, MobileButtonProps>(function MobileButton(
    { delay, onLongPress, onClick, ...rest },
    ref,
) {
    const longPressProps = useLongPress({
        delay,
        onLongPress,
        onClick,
    });

    return <Button ref={ref} {...rest} {...longPressProps} />;
});

export type MobileIconButtonProps = Omit<IconButtonProps, ExcludedHandlers> & MobileInteractionProps;

export const MobileIconButton = forwardRef<HTMLButtonElement, MobileIconButtonProps>(function MobileIconButton(
    { delay, onLongPress, onClick, ...rest },
    ref,
) {
    const longPressProps = useLongPress({
        delay,
        onLongPress,
        onClick,
    });

    return <IconButton ref={ref} {...rest} {...longPressProps} />;
});
