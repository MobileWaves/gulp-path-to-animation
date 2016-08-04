var through = require('through2');
var PassThrough = require('stream').PassThrough;
var es = require('event-stream');
var generateCss = require('path-to-animation').generateCss;

/**
 * Way to get user's values
 *
 * @method exports
 * @param  {Object} data            Used to provide namespace, element dimensions and mixin name.
 * @param  {String} data.namespace  Which namespace to dig for paths
 * @param  {Number} data.elementWidth  Animated element's width
 * @param  {Number} data.elementHeight  Animated element's height
 * @param  {Number} data.sassMixin  Which sass mixin to use
 *
 * @return {Object}      Stream
 */
module.exports = function(data) {
  return through.obj(function(file, encoding, callback) {
    // get the path by the namespace
    var namespace;
    var elementWidth;
    var elementHeight;
    var sassMixin;
    var path;
    var cssOutput;

    // if the content of the file is null, we pass through
    if (file.isNull()) {
      this.push(file);
      callback();
      return;
    }

    namespace = data.namespace;
    elementWidth = data.elementWidth;
    elementHeight = data.elementHeight;

    // TODO: this should be inside the path-to-animation module.
    sassMixin = data.sassMixin || 'curved-animation';

    if (file.isBuffer()) {
      path = JSON.parse(file.contents.toString('utf8'))[data.namespace];
      cssOutput = generateCss(path, namespace, elementWidth, elementHeight, sassMixin);
      file.contents = new Buffer(cssOutput);
      callback(null, file);
    } else if (file.isStream()) {
      file.contents.pipe(es.wait(function(err, data) {
        // the new content should be a stream as well.
        var stream = new PassThrough();
        path = JSON.parse(data.toString('utf8'))[namespace];
        cssOutput = generateCss(path, namespace, elementWidth, elementHeight, sassMixin);

        file.contents = stream;

        stream.write(new Buffer(cssOutput));
        stream.end();

        callback(null, file);
      }));
    }
  });
};