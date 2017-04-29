import * as fs from 'file-system';

export class Zip {

  private static lastProgressPercent: number;

  public static zip() { }

  public static unzipWithProgress(archive: string, destination: string, progressCallback: (progressPercent) => void, overwrite?: boolean, password?: string): Promise<any> {
    Zip.lastProgressPercent = 0;
    return new Promise((resolve, reject) => {

      if (!fs.File.exists(archive)) {
        return reject(`File does not exist, invalid archive path: ${archive}`);
      }

      if (overwrite === undefined) {
        overwrite = true;
      }

      SSZipArchive.unzipFileAtPathToDestinationOverwritePasswordProgressHandlerCompletionHandler(
          archive,
          destination,
          overwrite,
          password,
          (entry, zipFileInfo, entryNumber, entriesTotal) => {
            if (entriesTotal > 0) {
              let percent = Math.floor(entryNumber / entriesTotal * 100);
              if (percent != Zip.lastProgressPercent) {
                Zip.lastProgressPercent = percent;
                progressCallback(percent);
              }
            }
          },
          (path, succeeded, err) => {
            if (succeeded) {
              resolve();
            } else {
              reject(err ? err.localizedDescription : 'Unzip error');
            }
          });

    });
  }

  public static unzip(archive: string, destination: string, overwrite?: boolean, password?: string) {
    try {
      if (password || overwrite) {
        SSZipArchive.unzipFileAtPathToDestinationOverwritePasswordError(archive, destination, overwrite, password);
      }
      else {
        SSZipArchive.unzipFileAtPathToDestination(archive, destination);
      }
    } catch (ex) {
      console.log(ex)
    } finally {
      console.log("done")
    }
  }
}