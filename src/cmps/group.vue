<template>
  <ul class="group clean-list">
    <div class="group-header">
      <div class="group-header-left">
        <span
          class="down-arrow-container"
          @click="toggleGroupEdit"
        >
          <i class="el-icon-arrow-down"></i>
        </span>
        <input
          class="group-title-input"
          v-if="groupTitle"
          type="text"
          @change="updateTitle"
          v-model="groupTitle"
          :style="{ color: group.color }"
        />
      </div>
      <div
        v-click-outside="toggleGroupEdit"
        v-if="isShownGroupEdit"
        class="group-edit"
      >
        <div @click="removeGroup">
          <i class="el-icon-delete"></i>Delete Group
        </div>
        <div @click="onColorPicker">
          <i><img
              class="color-palette"
              src="@/assets/color-palette.svg"
            /></i>Change Color
        </div>
      </div>
      <color-picker
        class="color-picker"
        v-click-outside="onColorPicker"
        v-if="isColorPicker"
        @changeColor="changeColor"
      />
      <div class="group-header-right">
        <div>Members</div>
        <div>Status</div>
        <div>Timeline</div>
        <div>Priority</div>
      </div>
    </div>
    <draggable
      v-model="group.tasks"
      @start="drag = true"
      @end="drag = false"
      @change="changedByDrag"
    >
      <li
        v-for="task in group.tasks"
        :key="task._id"
        class="task-container"
      >
        <task-preview
          :task="task"
          :groupColor="group.color"
          :statuses="statuses"
          :priorities="priorities"
          :boardMembers="boardMembers"
          :activities="activities"
          @removeMemberFromTask="removeMemberFromTask"
          @addMemberToTask="addMemberToTask"
          @removeTask="removeTask"
          @updateDueDate="updateDueDate"
          @updateStatus="updateStatus"
          @addStatus="addStatus"
          @removeStatus="removeStatus"
          @updatePriority="updatePriority"
          @addPriority="addPriority"
          @removePriority="removePriority"
          @updateTaksTitle="updateTaskTitle"
          @updateTaskTitle="updateTaskTitle"
        />
      </li>
    </draggable>
    <input
      ref="addTaskInput"
      @keyup.enter="addTask"
      class="input-add-task"
      type="text"
      placeholder="+ Add"
    />
    <div class="bars-container">
      <div class="bars-container-left"></div>
      <div class="bars-container-right">
        <div class="space"></div>
        <status-bar
          :statuses="statuses"
          :tasks="group.tasks"
        />
        <div class="space"></div>
        <priority-bar
          :priorities="priorities"
          :tasks="group.tasks"
        />
      </div>
    </div>
  </ul>
</template>

<script>
import taskPreview from "./task-preview";
import colorPicker from "./color-picker";
import draggable from "vuedraggable";
import statusBar from '../cmps/status-bar';
import priorityBar from '../cmps/priority-bar';
import vClickOutside from "v-click-outside";

export default {
  directives: {
    clickOutside: vClickOutside.directive,
  },
  name: "group",
  props: {
    group: {
      type: Object,
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
      isColorPicker: false,
      groupTitle: null,
      isShownGroupEdit: false,
    };
  },
  methods: {
    removeGroup() {
      this.$emit("removeGroup", { groupId: this.group.id });
    },
    changeColor(chosenColor) {
      this.isColorPicker = !this.isColorPicker;
      this.isShownGroupEdit = !this.isShownGroupEdit;
      this.$emit("changeColor", { chosenColor, groupId: this.group.id });
    },
    onColorPicker() {
      this.isColorPicker = !this.isColorPicker;
    },
    updateTitle() {
      this.$emit("updateTitle", {
        title: this.groupTitle,
        groupId: this.group.id,
      });
    },
    removeTask(taskId) {
      this.$emit("removeTask", { taskId, groupId: this.group.id });
    },
    toggleGroupEdit() {
      this.isShownGroupEdit = !this.isShownGroupEdit;
      if (this.isColorPicker) this.isColorPicker = false;
    },
    addTask(ev) {
      this.$emit("addTask", {
        taskTitle: ev.target.value,
        groupId: this.group.id,
      });
      this.$refs["addTaskInput"].value = "";
    },
    updateDueDate(update) {
      update.groupId = this.group.id;
      this.$emit("updateDueDate", update);
    },
    removeMemberFromTask(update) {
      update.groupId = this.group.id;
      this.$emit('removeMemberFromTask', update);
    },
    addMemberToTask(update) {
      update.groupId = this.group.id;
      this.$emit('addMemberToTask', update);
    },
    updateStatus(update) {
      update.groupId = this.group.id;
      this.$emit('updateStatus', update);
    },
    addStatus(newStatus) {
      this.$emit('addStatus', newStatus)
    },
    removeStatus(statusId) {
      this.$emit('removeStatus', statusId);
    },
    updatePriority(update) {
      update.groupId = this.group.id;
      this.$emit('updatePriority', update);
    },
    addPriority(newPriority) {
      this.$emit('addPriority', newPriority)
    },
    removePriority(priorityId) {
      this.$emit('removePriority', priorityId);
    },
    updateTaskTitle(update) {
      update.groupId = this.group.id
      this.$emit('updateTaskTitle', update);
    },
    changedByDrag() {
      this.$emit('updateTasksOrder', { groupId: this.group.id, tasks: this.group.tasks })
    }
  },
  created() {
    this.groupTitle = this.group.title;
  },
  components: {
    taskPreview,
    colorPicker,
    draggable,
    statusBar,
    priorityBar
  },
};
</script>
