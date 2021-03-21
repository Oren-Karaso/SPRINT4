// Guidelines
// *. Save the entire board, dont handle mini-updates
// *. No need for saving an activities array per task, those activities are easily filtered from the board activities
// *. activites - when board is updated, the frontend does not send the activities array within the board
//    instead it only sends a new activity object: {txt, boardId, groupId, taskId}
//    the backend adds this activity to the board with $push and can also emit socket notificatios
// *. D & D Guidelines - vuedraggable
// *. Same model for Monday style app (do not implement a generic columns feature)
// *. boardStore no need for group/task stores
// *. rendering performance
// *. we do not handle concurrent editing - needs versioning

async function saveTask({ commit }, { task }) {
	try {
		const boardId = 'u101';
		const task = await boardService.saveTask(boardId, task);
		commit({ type: 'setTask', task });
	} catch (err) {
		console.log('boardStore: Error in loadBoard', err);
		throw err;
	}
}

async function loadBoard({ commit }) {
	try {
		const boardId = 'u101';
		const board = await boardService.getById(boardId);
		commit({ type: 'setBoard', board });
		socketService.emit('watch-board', boardId); // join('u101')
		socketService.off('board-updated');
		socketService.on('board-updated', (board) => {
			commit({ type: 'setBoard', board });
		});
		socketService.on('task-updated', (task) => {
			commit({ type: 'saveTask', task });
		});
	} catch (err) {
		console.log('boardStore: Error in loadBoard', err);
		throw err;
	}
}

// *. render optimization

const board = {
	_id: 'b101',
	title: 'Robot dev proj',
	createdAt: 1589983468418,
	createdBy: {
		// Mini-user, ID from backend
		_id: 'u101',
		fullname: 'Abi Abambi',
		imgUrl: 'http://some-img',
	},
	statuses: [
		{
			id: 's101',
			title: 'Done',
			color: '#61bd4f',
		},
		{
			id: 's102',
			title: 'Stuck',
			color: 'red',
		},
		{
			id: 's103',
			title: 'Working on it',
			color: 'yellow',
		},
	],
	priorities: [
		{
			id: 'p101',
			title: 'High',
			color: '#61bd4f',
		},
	],
	members: [
		{
			_id: 'u101', // Each is mini-user, ID from Backend
			fullname: 'Tal Tarablus',
			imgUrl: 'https://www.google.com',
		},
		{
			_id: 'u102', // Each is mini-user, ID from Backend
			fullname: 'Tal Tarablus',
			imgUrl: 'https://www.google.com',
		},
	],
	groups: [
		{
			id: 'g101',
			title: 'Group 1',
			tasks: [
				{
					id: 't104',
					title: 'Help me',
					members: [
						{
							_id: 'u101',
							fullname: 'Tal Tarablus',
							imgUrl:
								'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
						},
					],
					byMember: {
						_id: 'u102',
						fullname: 'Shraga Puk',
						imgUrl:
							'http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg',
					},
					comments: [
						{
							id: 'u101',
							update: 'changed font size',
							file: 'http://some-img',
							createdAt: 154514,
							byMember: {
								_id: 'u101',
								fullname: 'Abi Abambi',
								imgUrl: 'http://some-img',
							},
						},
					],
					statusId: 's101',
					priorityId: 'p102',
					createdAt: 1590999730348,
					dueDate: 16156215211,
				},
			],
			color: '#8D0000',
		},
	],
	activities: [
		{
			id: 'a101',
			action: 'Changed Color',
			createdAt: 154514,
			byMember: {
				_id: 'u101',
				fullname: 'Abi Abambi',
				imgUrl: 'http://some-img',
			},
			task: {
				id: 't101',
				title: 'Replace Logo',
			},
		},
	],
};

const user = {
	_id: 'u101',
	fullname: 'Abi Abambi',
	username: 'abiBabi',
	password: 'aBambi123',
	imgUrl: 'http://some-img.jpg',
};
