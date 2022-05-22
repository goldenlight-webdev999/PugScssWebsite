'use strict';

import fs from 'fs';

const flip = ({ gulp, taskTarget, config, plugins, args, browserSync }) => {
  const dir = config.directory;
  gulp.task('flip', done => {
    // I want to rename folders, how do I do that?
    // mv current-name new-name
    const newName = new Date().toISOString().split(':').join('--');

    if (args.production) {
      // check if production exists
      if (fs.existsSync(dir.production)) {
        fs.renameSync(dir.production, `${dir.production}-${newName}`);
      }

      fs.renameSync(`${dir.production}-haha`, dir.production);
    } else if (args.development) {
      if (fs.existsSync(dir.development)) {
        fs.renameSync(dir.development, `${dir.development}-${newName}`);
      }

      fs.renameSync(`${dir.development}-haha`, dir.development);
    }
    done();
  });
};

export default flip;
