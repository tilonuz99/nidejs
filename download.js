const fs = require('fs');
const http = require('http');
const https = require('https');
const { pathToFileURL } = require('url');

/**
 * Downloads file from remote HTTP[S] host and puts its contents to the
 * specified location.
 */
function download(url, filePath) {
  const proto = !url.charAt(4).localeCompare('s') ? https : http;

  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filePath);

    const request = proto.get(url, response => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
        return;
      }

      response.pipe(file);
    });

    // The destination stream is ended by the time it's called
    request.on('error', err => {
      fs.unlink(filePath, () => reject(err));
    });

    file.on('error', err => {
      fs.unlink(filePath, () => reject(err));
    });

    request.end();

  });
}
module.exports = { download };