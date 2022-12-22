'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onCreateNode = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _defaultOptions = require('./defaultOptions');

var _defaultOptions2 = _interopRequireDefault(_defaultOptions);

var _ptzI18n = require('ptz-i18n');

var _result = require('folktale/result');

var _result2 = _interopRequireDefault(_result);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getValidFile = function getValidFile(filePath) {
  return (0, _ramda.isNil)(filePath) ? _result2.default.Error('No file name') : _result2.default.Ok(filePath);
};

var getFilePath = function getFilePath(node) {
  
  switch (node.internal.type) {
    case 'File':
      return getValidFile(node.absolutePath);
    case 'MarkdownRemark':
      return getValidFile(node.fileAbsolutePath);
    case 'Mdx':
      // console.log(`>>>>>>>>>>>>>`, `case 'Mdx': node.internal.contentFilePath === ${node.internal.contentFilePath}`)
      // console.log(`>>>>>>>>>>>>>`, `return getValidFile(node.internal.contentFilePath) === ${getValidFile(node.internal.contentFilePath)}`)
      return getValidFile(node.internal.contentFilePath);
    default:
      return _result2.default.Error('Skiping file type: ' + node.internal.type);
  }
};

/**
 * Add custom url pathname for blog posts.
 * @param {*} args args
 * @param {*} pluginOptions plugin options from gatsby-config.js
 * @returns {void} void
 */
var onCreateNode = function onCreateNode(_ref, pluginOptions) {
  
  var node = _ref.node,
      actions = _ref.actions;


  var options = _extends({}, _defaultOptions2.default, pluginOptions);

  // console.log(`>>>>>>>>>>>>>`, `getFilePath(node): ${getFilePath(node)}`)
  return getFilePath(node).map(function (filePath) {
    
    return (0, _ramda.chain)(function (isInPaths) {
      if (isInPaths === false) {
        // console.log(`>>>>>>>>>>>>>`, `(isInPaths === false): Skipping page, not in pagesPaths`)
        return 'Skipping page, not in pagesPaths';
      }

      var slugAndLang = (0, _ptzI18n.getSlugAndLang)(options, filePath);
      // console.log(`>>>>>>>>>>>>>`, `slugAndLang: ${slugAndLang}`)

      var createNodeField = actions.createNodeField;

      if (node.internal.type === 'MarkdownRemark' || node.internal.type === 'Mdx') {
        // console.log(`---------------`, `node.internal.type: ${node.internal.type}`)
        createNodeField({
          node: node,
          name: 'langKey',
          value: slugAndLang.langKey
        });
      }

      createNodeField({
        node: node,
        name: 'slug',
        value: slugAndLang.slug
      });

      return 'langKey and slug added';
    }, (0, _ptzI18n.isInPagesPaths)(options, filePath));
  }).merge();
};

exports.onCreateNode = onCreateNode;