import './service';
import Service from "./service";

class GroupService extends Service {

    newGroup(group, callback) {
        return this.post('/groups', group, callback);
    }

    saveOrRemovePermission(groupId, permissionId, isSave, callback) {
        let permission = {"permission": permissionId};
        if (isSave) {
            return this.post(`/groups/${groupId}/save-permission`, permission, callback);
        }
        return this.post(`/groups/${groupId}/remove-permission`, permission, callback);
    }

    updateGroup(group, callback) {
        return this.put('/groups', group, callback);
    }

    deleteGroup(groupId, callback) {
        return this.delete(`/groups/${groupId}`, callback);
    }

    findAll(callback) {
        return this.get('/groups').then(callback);
    }

    findById(groupId, callback) {
        return this.get(`/groups/${groupId}`).then(callback);
    }

}

export default new GroupService();