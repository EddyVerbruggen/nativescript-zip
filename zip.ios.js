"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("file-system");
var Zip = (function () {
    function Zip() {
    }
    Zip.zip = function () { };
    Zip.unzipWithProgress = function (archive, destination, progressCallback, overwrite, password) {
        Zip.lastProgressPercent = 0;
        return new Promise(function (resolve, reject) {
            if (!fs.File.exists(archive)) {
                return reject("File does not exist, invalid archive path: " + archive);
            }
            if (overwrite === undefined) {
                overwrite = true;
            }
            SSZipArchive.unzipFileAtPathToDestinationOverwritePasswordProgressHandlerCompletionHandler(archive, destination, overwrite, password, function (entry, zipFileInfo, entryNumber, entriesTotal) {
                if (entriesTotal > 0) {
                    var percent = Math.floor(entryNumber / entriesTotal * 100);
                    if (percent != Zip.lastProgressPercent) {
                        Zip.lastProgressPercent = percent;
                        progressCallback(percent);
                    }
                }
            }, function (path, succeeded, err) {
                if (succeeded) {
                    resolve();
                }
                else {
                    reject(err ? err.localizedDescription : 'Unzip error');
                }
            });
        });
    };
    Zip.unzip = function (archive, destination, overwrite, password) {
        try {
            if (password || overwrite) {
                SSZipArchive.unzipFileAtPathToDestinationOverwritePasswordError(archive, destination, overwrite, password);
            }
            else {
                SSZipArchive.unzipFileAtPathToDestination(archive, destination);
            }
        }
        catch (ex) {
            console.log(ex);
        }
        finally {
            console.log("done");
        }
    };
    return Zip;
}());
exports.Zip = Zip;
//# sourceMappingURL=zip.ios.js.map