import Service from "./service";

class PermissionService extends Service {

    create(perm, callback) {
        return this.post('/permissions', perm, callback);
    }

}

export default new PermissionService(0);