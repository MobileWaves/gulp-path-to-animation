var expect = require('chai').expect;
var es = require('event-stream');
var gutil = require('gulp-util');
var PassThrough = require('stream').PassThrough;
var task = require('./our-task');

describe('Path to animation', function() {
  var sourceFileContents = JSON.stringify({
    'my-namespace': {
      'item1': [100,100, 200,200]
    }
  });

  var expectedContent = [
    '@keyframes my-namespace-item1 {',
    '\t0% { transform: translate(0%, 0%); }',
    '\t100% { transform: translate(100.00%, 100.00%); }',
    '}',
    '.animated-my-namespace-item1 {',
    '\t@include curved-animation(my-namespace-item1);',
    '}'
  ];

  it('should work in a buffer mode', function(done) {

    // create a fake source file
    var fakeFile = new gutil.File({
      contents: new Buffer(sourceFileContents)
    });

    // get the stream from the task
    var stream = task({
      namespace: 'my-namespace',
      elementWidth: 100,
      elementHeight: 100
    });

    stream.on('data', function(file) {
      expect(file.isBuffer()).to.equal(true);
      expect(file.contents.toString('utf8')).to.be.equal(expectedContent.join('\n'));
    });

    stream.on('end', function() {
      done();
    });

    stream.write(fakeFile);
    stream.end();
  });

  it('should work in a stream mode', function(done) {
    var fakeStream = new PassThrough();
    var fakeFile = new gutil.File({
      // the content should be an array stream
      contents: fakeStream
    });

    var contentChunks = sourceFileContents.split('');
    contentChunks.forEach(function(item) {
      fakeStream.write(new Buffer(item));
    });

    fakeStream.end();

    var stream = task({
      namespace: 'my-namespace',
      elementWidth: 100,
      elementHeight: 100
    });

    stream.on('data', function(file) {
      // make sure it came out the same way it went in
      expect(file.isStream()).to.equal(true);
      file.contents.pipe(es.wait(function(err, data) {
        // check the contents
        expect(data.toString('utf8')).to.be.eql(expectedContent.join('\n'));
        done();
      }))
    });

    stream.write(fakeFile);
    stream.end();
  });

  it('should let null pass through', function(done) {
    var stream = task();
    var n = 0;

    stream.pipe(es.through(
      function write(file) {
        // assure this is the right file
        expect(file.path).to.equal('null.md');
        expect(file.contents).to.be.null;
        n++;
      },
      function end() {
        // assure the write function is called once
        expect(n).to.equal(1);
        done();
      }
    ));

    stream.write(new gutil.File({
      path: 'null.md',
      contents: null
    }));

    stream.end();

  });
});