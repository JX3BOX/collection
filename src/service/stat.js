import { $next } from "@jx3box/jx3box-common/js/axios";

function post_collection_stat(id) {
    if (!id) return null;
    return $next.get("api/summary-any/" + id, {
        params: {
            type: "collection",
            actions: "views",
        },
    });
}

function getRank() {
    return $next.get("api/summary/visit/rank", {
        params: {
            postType: "collection",
            postAction: "views",
            sort: "7days",
            pageSize: 15,
        },
    });
}

export { post_collection_stat, getRank };
