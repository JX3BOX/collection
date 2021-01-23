import axios from "axios";
import { __helperUrl } from "@jx3box/jx3box-common/js/jx3box.json";
import {
    installInterceptors,
    installNextInterceptors,
} from "@jx3box/jx3box-common/js/axios";

const $http = axios.create({
    withCredentials: true,
    baseURL: process.env.NODE_ENV === "production" ? __helperUrl : "/",
});
installInterceptors($http);

export { $http };
