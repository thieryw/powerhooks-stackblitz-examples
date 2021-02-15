import { useRef, useState } from "react";
import memoize from "memoizee";
import { id } from "evt/tools/typeSafety/id";

export type CallbackFactory<FactoryArgs extends any[],Args0 extends any[],R> = (...factoryArgs: FactoryArgs) => (...args: Args0) => R


export function useCallbackFactory<
    FactoryArgs extends any[],
    Args0 extends any[],
    R = void
>(
    callback: (...callbackArgs: [FactoryArgs, Args0]) => R
): CallbackFactory<FactoryArgs, Args0, R> {

    type Out = CallbackFactory<FactoryArgs, Args0, R>;

    const callbackRef = useRef<typeof callback>(callback);

    callbackRef.current = callback;

    const memoizedRef = useRef<Out | undefined>(undefined);

    return useState(
        () => id<Out>(
            (...factoryArgs) => {

                if (memoizedRef.current === undefined) {

                    memoizedRef.current = memoize(
                        (...factoryArgs: FactoryArgs) =>
                            (...args: Args0) =>
                                callbackRef.current(factoryArgs, args),
                        { "length": factoryArgs.length }
                    );

                }

                return memoizedRef.current(...factoryArgs);

            }

        )
    )[0];

}