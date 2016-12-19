module.exports = {
  // remove the following files as they are mostly
  // related to the sample counter page and functionality
  remove: [

  ],
  // clean the following files by either clearing them
  // (by specifying {clear: true}) or by removing lines
  // that match a regex pattern
  clean: [

  ],
  // add the following files to the project, mostly
  // related to .gitkeep for version control
  add: [
    { file: 'app/actions/.gitkeep' },
    { file: 'test/actions/.gitkeep' },
    { file: 'test/components/.gitkeep' },
    { file: 'test/containers/.gitkeep' },
    { file: 'test/reducers/.gitkeep' }
  ]
};
