'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  langKeyForNull: 'any',
  langKeyDefault: 'en',
  useLangKeyLayout: false,
  pagesPaths: ['/src/pages/'],
  prefixDefault: true
  // // Example of markdownRemark
  // markdownRemark: {
  //   postPage: 'src/templates/blog-post.js',
  //   query: `
  //     {
  //         allMarkdownRemark {
  //             edges {
  //             node {
  //                 fields {
  //                 slug,
  //                 langKey
  //                 }
  //             }
  //             }
  //         }
  //     }
  //     `
  // }
  // // Example of Mdx
  // mdx: {
  //   postPage: 'src/templates/blog-post.js',
  //   query: `
  //     {
  //         allMdx {
  //            nodes {
  //            fields {
  //              langKey
  //              slug
  //            }
  //            internal {
  //              contentFilePath
  //            }
  //        }
  // }
  //     }
  //     `
  // }

};