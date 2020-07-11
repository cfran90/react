import './service';
import Service from "./service";

class UserService extends Service {

    newUser(user, callback) {
        return this.post('/users', user, callback);
    }

    updateUser(userId, user, callback) {
        return this.put(`/users/${userId}`, user, callback);
    }

    deleteUser(userId, callback) {
        return this.delete(`/users/${userId}`, callback);
    }

    findById(userId, callback) {
        return this.get(`/users/${userId}`).then(callback);
    }

}

export default new UserService();