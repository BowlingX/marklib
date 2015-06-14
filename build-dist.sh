#!/bin/bash

NODE_ENV=production && node_modules/gulp/bin/gulp.js dist-scripts
NODE_ENV=dev && node_modules/gulp/bin/gulp.js dist-scripts