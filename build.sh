#!/usr/bin/env bash

#
#   Script to generate a release package for a flarum extension
#
#   How to use
#       - place in extension directory and run ./build.sh
#       - the zip is stored in /tmp/<extension/<extension>.zip
#


# this directory
base=${PWD}

# the extension name from the flarum.json
extension=$(php <<CODE
<?php
\$flarum = json_decode(file_get_contents('flarum.json'), true);
echo array_key_exists('name', \$flarum) ? \$flarum['name'] : '';
CODE
)

# the target directory to store zip and files in
release=/tmp/${extension}

# remove any previous build files
rm -rf ${release}
# create the build directory anew
mkdir ${release}

# create a zip archive from the repository
git archive --format zip --worktree-attributes HEAD > ${release}/release.zip

# move into the tmp release directory
cd ${release}
# unzip the release zip received from the repository
unzip release.zip -d ./
# remove the release zip
rm release.zip

# Delete files
rm -rf ${release}/build.sh

# Install all Composer dependencies
composer install --prefer-dist --optimize-autoloader --ignore-platform-reqs --no-dev

# move into js directory
cd "${release}/js"
# run bower install if a json is available
if [ -f bower.json ]; then
bower install
fi

# loop through the subdirectories forum & admin if they exist
for app in forum admin; do
    cd "${release}/js"

    if [ -d $app ]; then
      cd $app

      if [ -f bower.json ]; then
        bower install
      fi

      npm install
      gulp --production
      rm -rf node_modules bower_components
    fi
done

rm -rf "${release}/extensions/${extension}/js/bower_components"
wait

# Finally, create the release archive
cd ${release}
find . -type d -exec chmod 0750 {} +
find . -type f -exec chmod 0644 {} +
chmod 0775 .
cd ..
zip -r ~/${extension}.zip ${extension}
