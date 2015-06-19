#!/bin/bash

export NODE_ENV=production && node_modules/gulp/bin/gulp.js dist-scripts
export NODE_ENV=dev && node_modules/gulp/bin/gulp.js dist-scripts