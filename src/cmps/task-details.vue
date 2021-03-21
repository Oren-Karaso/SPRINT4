<template>
    <section class="task-details">
        <div class="close-btn" @click="onClose"><i class="el-icon-close"></i></div>
        <div class="task-title">{{task.title}}</div>
        <div class="btns-container">
            <span @click="onUpdate">Updates</span>
            <span @click="onActivity">Activity Log</span>
        </div>
        <task-update v-if="isUpdate" :comments="task.comments" />
        <task-activity v-if="isActivity" :activities="setTaskActivity"/>
    </section>
</template>

<script>
import taskUpdate from './task-update'
import taskActivity from './task-activity'

export default {
    props: {
        task: {
            type: Object,
            required: true
        },
        activities: {
            type: Array,
            required: true
        },
    },
    data() {
        return {
            isUpdate: true,
            isActivity: false
        }
    },
    methods: {
        onUpdate() {
            this.isUpdate = true;
            this.isActivity = false;
        },
        onActivity() {
            this.isUpdate = false;
            this.isActivity = true;
        },
        onClose() {
            this.$emit('closeTaskDetails');
        }
    },
    computed: {
        setTaskActivity() {
            let copyActivities = JSON.parse(JSON.stringify(this.activities));
            return copyActivities.filter(activity => activity.task.id === this.task.id);
        } 
    },
    components: {
        taskUpdate,
        taskActivity
    }
}
</script>
