# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2020-12-30
### Changed
- Changed license from ISC to MIT

## [1.1.0] - 2020-07-23
### Fixed
- useStatebotFactory() will invoke .pause() on teardown to prevent
  emit/enter from firing

### Updated
- Dependencies

## [1.0.2] - 2020-07-21
### Fixed
- useStatebot / useStatebotEvent hooks not cleaning up properly

## [1.0.1] - 2020-07-06
### Fixed
- .DS_Store snuck into dist/
- .mjs -> .js

## [1.0.0] - 2020-07-06
### Added
- statebot-mithril-hooks :)
