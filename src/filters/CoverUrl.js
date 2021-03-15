/**
 * 剑三小册封面
 * @param {*} url 封面链接
 */

const {__imgPath} = require("@jx3box/jx3box-common/data/jx3box.json");

export default (url) => {
  return url ? url : `${__imgPath}image/collection/default_cover.png`;
}