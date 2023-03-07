const {task,src,dest} = require('gulp');
const sftp = require("gulp-sftp-up4");
const oss = require("gulp-aliyun-oss");
var tinypngFree = require('gulp-tinypng-free');
const path = require('path');

const cdPath = (str) => path.join(process.env.CURRENT_PATH, str);

// 上传ftp
task("sftp", function() {
  // let ip
  console.log(process.env.IP,'ip')
  return src(cdPath(`${process.env.BUILD_FOLDER}/**/*`)).pipe(
    sftp({
      host: process.env.IP,
      user: process.env.SFTP_USR || "huanglinzhi",
      remotePath: path.join(
        "/data/webapp/",
        process.env.TEST_HOST,
        process.env.TARGET_FOLDER
      )
    })
  );
});
// 上传ftp
task("sftp2", function() {
  return src(cdPath(`${process.env.BUILD_FOLDER}/**/*`)).pipe(
    sftp({
      host: "43.240.3.97",
      user: process.env.SFTP_USR || "huanglinzhi",
      remotePath: path.join(
        "/data/webapp/",
        process.env.TEST_HOST,
        process.env.TARGET_FOLDER
      )
    })
  );
});
// 上传到oss
task("oss", function(cb) {
  var options = {
    accessKeyId: process.env.OSS_KEY,
    accessKeySecret: process.env.OSS_SECRET,
    region: "oss-cn-shanghai",
    bucket: "maimai-feb2",
    prefix: path.join("h5", process.env.TARGET_FOLDER).replace(/^\//gi, ""),
    ossOpt: {
      headers: {
        "Cache-Control": "no-cache"
      }
    }
  };

  return src([
      cdPath(`${process.env.BUILD_FOLDER}/**/*.*`),
      '!' + cdPath(`${process.env.BUILD_FOLDER}/**/*.html`),
    ])
    .pipe(oss(options));
});

// 图片压缩
task('tinypng', function(cb) {
  return src(cdPath('/**/*.{png,jpg}'))
      .pipe(tinypngFree({}))
      .pipe(dest(cdPath('dist')));
});