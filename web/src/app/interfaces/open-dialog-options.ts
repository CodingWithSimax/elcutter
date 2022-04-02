export interface OpenDialogOptions {
    title?: string;
    defaultPath?: string;
    buttonLabel?: string;
    filters?: Array<{
        name: string;
        extensions: Array<string>;
    }>;
    properties?: Array<
        | 'openFile'
        | 'openDirectory'
        | 'multiSelections'
        | 'showHiddenFiles'
        | 'createDirectory'
        | 'promptToCreate'
        | 'noResolveAliases'
        | 'treatPackageAsDirectory'
        | 'dontAddToRecent'
    >;
    message?: string;
    securityScopedBookmarks?: boolean;
}
