import {$http} from "./axios";
import {JX3BOX} from "@jx3box/jx3box-common";

const qs = require("qs");

function get_collection_menus() {
  return $http({
    method: "GET",
    url: `${JX3BOX.__helperUrl}api/post/collection/menus`,
    headers: {Accept: "application/prs.helper.v2+json"},
  });
}

function get_collection($collection_id, params = {}) {
  return $http({
    method: "GET",
    url: `${JX3BOX.__helperUrl}api/post/collection/${$collection_id}`,
    headers: {Accept: "application/prs.helper.v2+json"},
    params: params,
  });
}

function get_collections(params) {
  return $http({
    method: "GET",
    url: `${JX3BOX.__helperUrl}api/post/collections`,
    headers: {Accept: "application/prs.helper.v2+json"},
    params: params,
  });
}

export {get_collection_menus, get_collection, get_collections};
