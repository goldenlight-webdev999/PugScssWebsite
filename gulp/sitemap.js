"use strict";

import gsitemap from "gulp-sitemap";
import save from "gulp-save";

const sitemap = ({
  gulp,
  taskTarget,
  config,
  plugins,
  args,
  browserSync,
  baseUrl,
}) => {
  const dir = config.directory;

  gulp.task('sitemap', () => {
    return (
      gulp.src(`${taskTarget}/*.html`, {
        read: false
      })
        .pipe(save('before-sitemap'))
        .pipe(gsitemap({
          siteUrl: baseUrl
        })) // Returns sitemap.xml
        .pipe(gulp.dest(taskTarget))
        .pipe(save.restore('before-sitemap'))
    );
  });
};

export default sitemap;
