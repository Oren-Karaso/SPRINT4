import { boardService } from "../services/board.service.js";

export const boardStore = {
    state: {
        boards: [],
        currBoard: null,
    },
    getters: {
        boards(state) { return state.boards },
        getCurrBoard(state) { return state.currBoard }
    },
    mutations: {
        setBoards(state, payload) {
            state.boards = payload.boards;
        },
        addBoard(state, { board }) {
            state.boards.push(board);
        },
        removeBoard(state, { board }) {
            const idx = state.boards.findIndex(t => t._id === board._id);
            state.boards.splice(idx, 1);
        },
        editBoard(state, { board }) {
            const idx = state.boards.findIndex(t => t._id === board._id);
            state.boards.splice(idx, 1, board);
        }
    },
    actions: {
        async loadBoards({ commit }, { filterBy }) {
            try {
                const boards = await boardService.query(filterBy)
                commit({ type: 'setBoards', boards });
            } catch (err) {
                console.log('Store: Cannot load boards', err);
                throw new Error('Cannot load boards');
            }
        },
        async saveBoard({ commit }, { board }) {
            const type = (board._id) ? 'editBoard' : 'addBoard';
            try {
                const savedBoard = await boardService.save(board)
                commit({ type, board: savedBoard })
            } catch (err) {
                console.log('Store: Cannot save board', err);
                throw new Error('Cannot save board');
            }
        },
        async removeBoard({ commit }, payload) {
            try {
                await boardService.remove(payload.board._id)
                commit(payload);
            } catch (err) {
                console.log('Store: Cannot remove board', err);
                throw new Error('Cannot remove board');
            }
        }
    }
}
