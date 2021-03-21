<template>
  <section
    class="task-preview flex-center"
    v-bind:style="{ borderLeft: `8px solid ${groupColor}` }"
  >
    <div
      class="task-left-container"
      @click.prevent="onTask"
    >
      <div class="remove-title-wrapper flex">
        <div
          @click.stop="removeTask"
          class="btns-hidden"
        >
          <i class="el-icon-delete"></i>
        </div>
        <form 
          @submit.prevent="updateTaskTitle"
          @change.prevent="updateTaskTitle"
        >
          <input
            ref="inputTask"
            type="text"
            v-model="titleToEdit"
            class="task-title"
            value="titleToEdit"
          >
        </form>
        <div
          @click="editTitle"
          class="btns-hidden"
        ><i class="el-icon-edit"></i></div>
      </div>
      <div
        class="btn-chat"
        @click.stop="onChat"
      ><i class="el-icon-chat-dot-round"></i></div>
    </div>
    <task-details
      v-if="isTaskDetails"
      :task="task"
      :activities="activities"
      @closeTaskDetails="closeTaskDetails"
    />
    <div class="task-right-container">
      <div
        class="members-container"
        @click="toggleTaskMembers"
      >
        <task-members-container :task="task" />
        <task-members
          v-click-outside="toggleTaskMembers"
          @removeMemberFromTask="removeMemberFromTask"
          @addMemberToTask="addMemberToTask"
          v-if="isTaskMemebersShown"
          :boardMembers="boardMembers"
          :taskMembers="task.members"
        />
      </div>
      <div class="status-container">
        <div
          class="status"
          v-if="getStatusById"
          :style="{ background: getStatusById.color }"
          @click="toggleTaskStatuses"
        >
          {{ getStatusById.title }}
        </div>
        <task-status
          v-click-outside="toggleTaskStatuses"
          v-if="isTaskStatusesShown"
          :statuses="statuses"
          @updateStatus="updateStatus"
          @addStatus="addStatus"
          @removeStatus="removeStatus"
        />
      </div>
      <div class="date-picker-container">
        <el-date-picker
          v-if="currDueDate"
          class="date-picker"
          v-model="currDueDate"
          @change="updateDueDate"
          type="date"
          size="small"
          placeholder="Pick a day"
          :clearable="false"
        >
        </el-date-picker>
      </div>
      <div class="priority-container">
        <div
          class="priority"
          v-if="getPriorityById"
          v-bind:style="{ background: getPriorityById.color }"
          @click="toggleTaskPriorities"
        >
          {{ getPriorityById.title }}
        </div>
        <task-priority
          v-click-outside="toggleTaskPriorities"
          v-if="isTaskPrioritiesShown"
          :priorities="priorities"
          @updatePriority="updatePriority"
          @addPriority="addPriority"
          @removePriority="removePriority"
        />
      </div>
    </div>
  </section>
</template>

<script>
import taskMembers from "./task-members";
import taskMembersContainer from "./task-members-container";
import taskStatus from "./task-status";
import taskPriority from "./task-priority";
import vClickOutside from "v-click-outside";
import taskDetails from "./task-details";

export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    task: {
      type: Object,
      required: true,
    },
    groupColor: {
      type: String,
      required: true,
    },
    statuses: {
      type: Array,
      required: true,
    },
    priorities: {
      type: Array,
      required: true,
    },
    boardMembers: {
      type: Array,
      required: true,
    },
    activities: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isTaskMemebersShown: false,
      isTaskStatusesShown: false,
      isTaskPrioritiesShown: false,
      isTaskDetails: false,
      isTitleEditable: false,

    };
  },
  methods: {
    onTask() {
      // console.log("onTask");
    },
    removeTask() {
      this.$emit("removeTask", this.task.id);
    },
    updateDueDate(date) {
      console.log(date);
      
      this.$emit("updateDueDate", { date, taskId: this.task.id });
    },

    toggleTaskMembers() {
      this.isTaskMemebersShown = !this.isTaskMemebersShown;
    },
    toggleTaskStatuses() {
      this.isTaskStatusesShown = !this.isTaskStatusesShown;
    },
    toggleTaskPriorities() {
      this.isTaskPrioritiesShown = !this.isTaskPrioritiesShown;
    },
    removeMemberFromTask(taskMember) {
      this.$emit('removeMemberFromTask', { taskMember, taskId: this.task.id });
    },
    addMemberToTask(member) {
      this.$emit('addMemberToTask', { member, taskId: this.task.id });
    },
    updateStatus(statusId) {
      this.isTaskStatusesShown = !this.isTaskStatusesShown;
      this.$emit('updateStatus', { statusId, taskId: this.task.id });
    },
    addStatus(newStatus) {
      this.$emit('addStatus', newStatus)
    },
    removeStatus(statusId) {
      this.$emit('removeStatus', statusId);
    },
    updatePriority(priorityId) {
      this.isTaskPrioritiesShown = !this.isTaskPrioritiesShown;
      this.$emit('updatePriority', { priorityId, taskId: this.task.id });
    },
    addPriority(newPriority) {
      this.$emit('addPriority', newPriority)
    },
    removePriority(priorityId) {
      this.$emit('removePriority', priorityId);
    },
    onChat() {
      this.isTaskDetails = !this.isTaskDetails;
    },
    editTitle() {
      this.$refs.inputTask.focus()
    },
    updateTaskTitle() {
      this.isTitleEditable = !this.isTitleEditable
      this.$emit('updateTaskTitle', { updatedTitle: this.titleToEdit, taskId: this.task.id });
    },
    closeTaskDetails() {
      this.isTaskDetails = !this.isTaskDetails;
    },
  },
  computed: {
    getStatusById() {
      const [status] = this.statuses.filter(
        (status) => status.id === this.task.statusId
      );
      return status;
    },
    getPriorityById() {
      const [priority] = this.priorities.filter(
        (priority) => priority.id === this.task.priorityId
      );
      return priority;
    },
    titleToEdit(){
      return this.task.title
    },
    currDueDate(){
      
      
      return this.task.dueDate
    }
  },
  components: {
    taskMembers,
    taskStatus,
    taskPriority,
    taskDetails,
    taskMembersContainer,
  },
};
</script>