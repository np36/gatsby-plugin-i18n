"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Get page from markdownRemark
 * @param {*} options default options + user options
 * @param {*} postPage path.resolve(options.markdownRemark.postPage)
 * @param {*} edge allMarkdownRemark.edges
 * @return {*} page
 */
var getMarkdownPage = function getMarkdownPage(options, postPage) {
  return function (edge) {
    var path = edge.node.fields.slug;
    var slug = edge.node.fields.slug;
    var langKey = edge.node.fields.langKey;

    return {
      path: path, // required
      component: postPage,
      context: {
        // path: path, // For backward compatibility only...
        slug: slug,
        langKey: langKey
      },
      layout: options.useLangKeyLayout ? langKey : null
    };
  };
};

exports.default = getMarkdownPage;