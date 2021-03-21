<template>
    <section class="update-container">
        <form @submit.prevent="addUpdate">
            <el-input class="update-input" type="text" placeholder="Write an update.." v-model="updateToEdit.update"></el-input>
            <div class="flex-between">
                <div class="file-btn"><i class="el-icon-paperclip"></i>Add File</div>
                <el-button size="small">Update</el-button>
            </div>
        </form>
        <div v-if="comments">
            <div
            class="comment-content" 
            v-for="comment in comments"
            :key="comment.id"
            >
                <div class="member-content flex">
                    <div class="flex-center">
                        <el-avatar class="comment-avatar" :src="comment.byMember.imgUrl"></el-avatar>
                        <div class="comment-fullname">{{comment.byMember.fullname}}</div>
                    </div>
                    <div class="comment-time">{{comment.createdAt}}</div>
                </div>
                <div class="comment-update">{{comment.update}}</div>
                <div class="btns flex">
                    <div class="like-btn flex-center">Like</div>
                    <div class="reply-btn flex-center">Reply</div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        comments: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            updateToEdit: {
                update: null,
                file: null,
                createdAt: null,
                byMember: null
            }
        }
    },
    methods: {
        addUpdate() {
            console.log('addUpdate');
        }
    }
}
</script>

