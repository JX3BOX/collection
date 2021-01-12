import {$http} from "./axios";
import {JX3BOX} from "@jx3box/jx3box-common";
import store from "@/store";

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

function get_my_collections(params) {
  return $http({
    method: "GET",
    url: `${JX3BOX.__helperUrl}api/my/post/collections`,
    headers: {Accept: "application/prs.helper.v2+json"},
    params: params,
  }).then(
    (data) => {
      data = data.data;
      if (data.code === 200) {
        store.state.my_collections = data.data.data;
        store.state.my_collections_total = data.data.total;
      }
    }
  );
}

function remove_collection(collection_id) {
  if (collection_id) {
    return $http({
      method: "PUT",
      url: `${JX3BOX.__helperUrl}api/post/collection/remove`,
      headers: {Accept: "application/prs.helper.v2+json"},
      data: qs.stringify({id: collection_id})
    });
  } else return null;
}

export {get_collection_menus, get_collection, get_collections, get_my_collections, remove_collection};
