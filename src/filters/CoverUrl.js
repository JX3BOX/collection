/**
 * 剑三小册封面
 * @param {*} url 封面链接
 */

const {__Root} = require("@jx3box/jx3box-common/js/jx3box.json");

export default (url) => {
  return url ? url : `${__Root}collection/img/default_cover.png`;
}