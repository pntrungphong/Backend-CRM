'use strict';

export interface IFile {
    encoding: string;
    buffer: Buffer;
    fieldName: string;
    mimeType: string;
    originalName: string;
    size: number;
}
