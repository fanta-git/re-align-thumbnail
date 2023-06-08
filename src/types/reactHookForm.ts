import { EventType, FieldPath, UseFormWatch } from "react-hook-form";
import { Subscription } from "react-hook-form/dist/utils/createSubject";

export type WatchWithDefault<T extends UseFormWatch<any>> = T extends UseFormWatch<infer P>
    ? (callback: (value: P, info: { name?: FieldPath<P>, type?: EventType }) => void) => Subscription
    : never;
