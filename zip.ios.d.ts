export declare class Zip {
    private static lastProgressPercent;
    static zip(): void;
    static unzipWithProgress(archive: string, destination: string, progressCallback: (progressPercent) => void, overwrite?: boolean, password?: string): Promise<any>;
    static unzip(archive: string, destination: string, overwrite?: boolean, password?: string): void;
}
