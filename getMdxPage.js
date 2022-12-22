"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Get page from mdx
 * @param {*} options default options + user options
 * @param {*} postPage path.resolve(options.mdx.postPage)
 * @param {*} node allMdx.nodes
 * @return {*} page
 */
var getMarkdownPage = function getMarkdownPage(options, postPage) {
  return function (node) {
    var path = node.fields.slug;
    var component = node.internal.contentFilePath
    var component2 = `${postPage}?__contentFilePath=${component}`
    var slug = node.fields.slug;
    var langKey = node.fields.langKey;

    return {
      path: path, // required
      component: component2,
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