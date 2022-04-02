export interface SaveDialogOptions {
    title?: string;
    defaultPath?: string;
    buttonLabel?: string;
    filters: Array<{
        name: string;
        extensions: string[];
    }>;
    message?: string;
    nameFieldLabel?: string;
    showsTagField?: boolean;
    properties?: Array<
        | 'showHiddenFiles'
        | 'createDirectory'
        | 'treatPackageAsDirectory'
        | 'showOverwriteConfirmation'
        | 'dontAddToRecent'
    >;
    securityScopedBookmarks?: boolean;
}
