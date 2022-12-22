'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPages = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _defaultOptions = require('./defaultOptions');

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

var _logError = require('./logError');

var _logError2 = _interopRequireDefault(_logError);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _getMarkdownPage = require('./getMarkdownPage');

var _getMarkdownPage2 = _interopRequireDefault(_getMarkdownPage);

var _getMdxPage = require('./getMdxPage');

var _getMdxPage2 = _interopRequireDefault(_getMdxPage);

var _ramda = require('ramda');

var _ramda2 = _interopRequireDefault(_ramda);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Test git

var createPages = function createPages(_, pluginOptions) {
  // if (!pluginOptions.markdownRemark) {
  //   return null;
  // }

  var options = _extends({}, _defaultOptions2.default, pluginOptions);

  var graphql = _.graphql,
      actions = _.actions;
  var createPage = actions.createPage;


  return new Promise(function (resolve, reject) {
    
    if (pluginOptions.markdownRemark){
      // console.log(`>>>>>>>>>>>>>`, `(pluginOptions.markdownRemark)`)
      var postPage = _path2.default.resolve(options.markdownRemark.postPage);

      graphql(options.markdownRemark.query).then(function (result) {
        try {
  
          if (result.errors) {
            throw result.errors;
          }
  
          result.data.allMarkdownRemark.edges.filter(_ramda2.default.path(['node', 'fields', 'slug'])).map((0, _getMarkdownPage2.default)(options, postPage)).map(function (page) {
            return createPage(page);
          });
  
          resolve();
        } catch (e) {
          (0, _logError2.default)(e);
          reject(e);
        }
      });
    }

    // for mdx
    if (pluginOptions.mdx){
      // console.log(`>>>>>>>>>>>>>`, `(pluginOptions.mdx)`)
      var postPageMdx = _path2.default.resolve(options.mdx.postPage);
      // console.log(`>>>>>>>>>>>>>`, `postPageMdx: ${postPageMdx}`)
      graphql(options.mdx.query).then(function (result) {
        try {
  
          if (result.errors) {
            // console.log(`>>>>>>>>>>>>>`, `(result.errors): ${result.errors}`)
            throw result.errors;
          }
          
  
          result.data.allMdx.nodes.filter(_ramda2.default.path(['fields', 'slug'])).map((0, _getMdxPage2.default)(options, postPageMdx)).map(function (page) {
            // console.log(`>>>>>>>>>>>>>`, `result.data.allMdx.nodes`)
            return createPage(page);
          });
  
          resolve();
        } catch (e) {
          // console.log(`>>>>>>>>>>>>>`, `catch (e): ${e}`)
          (0, _logError2.default)(e);
          reject(e);
        }
      });
    }
  });
};

exports.createPages = createPages;