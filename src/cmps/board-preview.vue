<template>
    <el-card class="board-preview">
        <p>
            <img :src="board.imgUrl" height="300">
        </p>
        <h4>{{board.title}}</h4>
        <p>Created by: {{board.createdBy.fullname}}</p>
    </el-card>
</template>

<script>
    export default {
        props: {
            board: {
                type: Object,
                required: true
            }
        }
    }
</script>