<template>
	<ul class="board-list clean-list">
		<li v-for="board in boards" :key="board._id" class="board-preview-container">
            <router-link :to="'/board/' + board._id"><board-preview :board="board" /></router-link>
		</li>
	</ul>
</template>

<script>
import boardPreview from "./board-preview";

export default {
	props: {
		boards: {
			type: Array,
			required: true,
		},
	},
	components: {
		boardPreview,
	},
};
</script>