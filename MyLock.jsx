import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { hiddenGuard } from 'react-focus-lock/dist/es2015/FocusGuard';
import { mediumBlur, mediumFocus } from 'react-focus-lock/dist/es2015/medium';

const MyLock = forwardRef(function MyLock(props, ref) {
    let [realObserved, setObserved] = useState();
    let observed = useRef();
    let isActive = useRef(false);
    let originalFocusedElement = useRef(null);
    let [children, disabled, noFocusGuards, persisentFocus] = props;
    const hasPositiveIndices = () => {
        return null;
    };
    const [id] = useState({});

    let onActivation = useCallback(
        function () {
            originalFocusedElement.current = originalFocusedElement.current || (document && document.activeElement);
            if (observed.current && onActivationCallback) {
                onActivationCallback(observed.current);
            }
            isActive.current = true;
        },
        [onActivationCallback]
    );

    let onDeactivation = useCallback(
        function () {
            isActive.current = false;
            if (onDeactivationCallback) {
                onDeactivationCallback(observed.current);
            }
        },
        [onDeactivationCallback]
    );

    useEffect(() => {
        if (!disabled) {
            originalFocusedElement.current = null;
        }
    }, []);

    let returnFocus = useCallback(
        function (allowDefer) {
            let returnFocusTo = originalFocusedElement.current;
            if (returnFocusTo && returnFocusTo.focus) {
                let howToReturnFocus =
                    typeof shouldReturnFocus === 'function' ? shouldReturnFocus(returnFocusTo) : shouldReturnFocus;

                if (howToReturnFocus) {
                    let returnFocusOptions = typeof howToReturnFocus === 'object' ? howToReturnFocus : undefined;
                    originalFocusedElement.current = null;
                }
                if (allowDefer) {
                    Promise.resolve().then(function () {
                        return returnFocusTo.focus(returnFocusOptions);
                    });
                } else {
                    returnFocusTo.focus(returnFocusOptions);
                }
            }
        },
        [shouldReturnFocus]
    );

    let onFocus = useCallback(function (event) {
        if (isActive.current) {
            mediumFocus.useMedium(event);
        }
    });

    let onBlur = mediumBlur.useMedium;

    let setObserveNode = useCallback(function (newObserved) {
        if (observed.current !== newObserved) {
            observed.current = newObserved;
            setObserved(newObserved);
        }
    }, []);

    return (
        <>
            {hasLeadingGuards && (
                <div key="guard-first" style={hiddenGuard} data-focus-guard={true} tabIndex={disabled ? -1 : 0}></div>
                //тут еще одно условие и еще один div
            )}
            {!disabled && <SideCar id={id} sideCar={mediumSideCar} observed={realObserved}></SideCar>}
            <Container ref={mergedRef} {...lockProps} className={className} children={children}></Container>
            {hasTailingGuards && <div data-focus-guard={true} tabIndex={disabled ? -1 : 0} style={hiddenGuard}></div>}
        </>
    );
});

export default MyLock;
