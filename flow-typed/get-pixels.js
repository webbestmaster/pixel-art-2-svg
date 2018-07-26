// @flow

export type ImageDataType = {|
    data: Array<number>,
    shape: [number, number]
|};

type GetPixelsCallbackType = (error: Error | null, imageData: ImageDataType) => void;

declare module 'get-pixels' {
    declare module.exports: (pathToFile: string, callback: GetPixelsCallbackType) => void;
}
