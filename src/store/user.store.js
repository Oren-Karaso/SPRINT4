import { userService } from "../services/user.service.js";

export const userStore = {
    state: {
        users: [],
        loggedInUser: userService.getLoggedInUser(),
    },
    getters: {
        users(state){ return state.users},
        loggedInUser(state){ return state.loggedInUser},
    },
    mutations: {
        setUsers(state, {users}){
            state.users = users;
        },  
        setUser(state, {user}){
            state.loggedInUser = user;
        },
        removeUser(state, { user }) {
            const idx = state.users.findIndex(u => u._id === user._id);
            state.users.splice(idx, 1);
        }
    },
    actions: {
        async loadUsers({commit}) {
            try {
                const users = await userService.getUsers()
                commit({type: 'setUsers', users});
            } catch (err) {
                console.log('Store: Cannot load users', err);
                throw new Error('Cannot load users');
            }
        },
        async login({ commit }, { userCred }) {
            try {
                const user = await userService.login(userCred)
                commit({type: 'setUser', user})
                return user;
            } catch (err) {
                console.log('Store: Cannot login user', err);
                throw new Error('Cannot login user');
            }
        },
        async logout({ commit }) {
            try {
                await userService.logout()
                commit({ type: 'setUser', user: null })
            } catch (err) {
                console.log('Store: Cannot logout', err);
                throw new Error('Cannot logout');
            }
        },
        async signup({ commit }, { userCred }) {
            try {
                const user = await userService.signup(userCred)
                commit({type: 'setUser', user})
            } catch (err) {
                console.log('Store: Cannot signup', err);
                throw new Error('Cannot signup');
            }
        },
        async updateUser({ commit }, { user }) {
            try {
                user = await userService.update(user)
                commit({type: 'setUser', user})
            } catch (err) {
                console.log('Store: Cannot edit user', err);
                throw new Error('Cannot edit user');
            }
        },
        async removeUser({ commit }, { userId }) {
            try {
                await userService.remove(userId)
                commit({ type: 'removeUser', userId });
            } catch (err) {
                console.log('Store: Cannot remove user', err);
                throw new Error('Cannot remove user');
            }
        }
    }
}