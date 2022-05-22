'use strict';
require("@babel/register")

// GUlp is a simple platform-agnostic toolkit that helps you automate painful
// and time-consuming tasks in your workflow
import gulp from 'gulp';
// browser-sync - Live CSS Reload & Browser Syncing
import browserSyncLib from 'browser-sync';
// minimist - argument parser without all the fanciful decoration
import minimist from 'minimist';
// gulp-load-plugins - Loads gulp plugins from package dependencies and attaches
// them to an object of your choice.
import gulpLoadPlugins from 'gulp-load-plugins';

// Import package.json to grab and use the config property
import packageJsonData from './package.json';

import clean from './gulp/clean';
import copy from './gulp/copy';
import copyIcon from './gulp/copy-icon';
import deploy from './gulp/deploy';
import font from './gulp/font';
import image from './gulp/image';
import pug from './gulp/pug';
import javascript from './gulp/javascript';
import sass from './gulp/sass';
import template from './gulp/template';
import watch from './gulp/watch';
import flip from './gulp/flip';
import sitemap from './gulp/sitemap';
import { printCompile, getBaseUrl } from './gulp/util/util.js';

global.compileMode = 'all';

const config = Object.assign({}, packageJsonData.config);
const args = minimist(process.argv.slice(2));
const dir = config.directory;
const taskTarget = args.production ? `${dir.production}-haha` : `${dir.development}-haha`;

// Create a new browserSync instance
const browserSync = browserSyncLib.create();

// Load gulp plugins
const plugins = gulpLoadPlugins({
  // when set to true, the plugin will log info to console.
  // Useful for bug reporting and issue debugging
  DEBUG: false
});

// Read all files from the gulp folder and load all gulp tasks
// fs.readdirSync('./gulp')
//   .filter(fileName => /\.(js)$/i.test(fileName))
//   .map(fileName => fileName.split('.').reduce(a=>a)());
const baseUrl = getBaseUrl(args, config)
const taskOptionList = { gulp, config, args, taskTarget, plugins, browserSync, baseUrl };
clean(taskOptionList);
copy(taskOptionList);
copyIcon(taskOptionList);
deploy(taskOptionList);
font(taskOptionList);
image(taskOptionList);
pug(taskOptionList);
javascript(taskOptionList);
sass(taskOptionList);
template(taskOptionList);
watch(taskOptionList);
flip(taskOptionList);
sitemap(taskOptionList);

// Server task with watch
gulp.task(
  'build-common',
  gulp.series(
    'font',
    'copy',
    'copyIcon',
    'image',
    'sass',
    'pug',
    'javascript',
    'template',
    'sitemap'
  )
);

gulp.task(
  'build-dev',
  gulp.series(
    'clean:development',
    'build-common',
    'flip'
  )
);

// Build production ready code
gulp.task(
  'build-prod',
  gulp.series(
    'clean:production',
    'build-common',
    'flip'
  )
);

gulp.task(
  'exec-dev',
  gulp.series(
    'clean:development',
    'build-common',
    'watch'
  )
);

gulp.task(
  'exec-prod',
  gulp.series(
    'clean:production',
    'build-common',
    'flip',
    'watch'
  )
);

// Default gulp task
gulp.task('default', () => {
  console.log('Default gulp task');
});
if (!args.production) {

  const readline = require('readline');
  readline.emitKeypressEvents(process.stdin);
  if (process.stdin.setRawMode){
    process.stdin.setRawMode(true)
  }

  process.stdin.on('keypress', (str, key) => {
    if (key.name === 'a') {
      compileMode = 'all';
    }
    if (key.name === 'c') {
      compileMode = 'current';
    }
    if (key.ctrl && key.name === 'c') {
      process.exit();
      console.clear();
    }
    else {
      // compile all
      // console.clear();
      // console.log(`You pressed the '${str}' key`);
      // console.log();
      // console.log(key);
    }
    printCompile(compileMode, args);
  });
}
