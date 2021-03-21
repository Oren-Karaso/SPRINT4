<template>
    <section class="priority-modal">
        <ul v-if="renderPriorities" class="priority-list clean-list">
            <li v-for="priority in renderPriorities" :key="priority.id" >
                <div class="label" @click="onPriority(priority.id)" v-bind:style="{ borderLeft: `10px solid ${priority.color}` }" >
                    {{priority.title}}
                    <i class="el-icon-delete" @click.stop="onRemovePriority(priority.id)"></i>
                </div>
            </li>
            <li>
                <input 
                ref="addPriorityInput"
                @keyup.enter="addPriority"
                class="input-add-priority"
                type="text"
                placeholder="New label"
                v-bind:style="{ borderLeft: `10px solid ${addPriorityColor}` }"
                >
            </li>
            <color-picker class="label-color-picker" @changeColor="changeColor"/>
        </ul>
    </section>
</template>

<script>
import colorPicker from "./color-picker";
export default {
    props: {
        priorities: {
          type: Array,
          required: true,
        },
    },
    data() {
        return {
            addPriorityColor: 'gray'
        }
    },
    methods: {
        changeColor(color) {
            this.addPriorityColor = color;
        },
        addPriority(ev) {
            this.$emit('addPriority', { title: ev.target.value, color: this.addPriorityColor });
            this.$refs['addPriorityInput'].value = '';
            this.addPriorityColor = 'gray';
        },
        onPriority(priorityId) {
            this.$emit('updatePriority', priorityId);
        },
        onRemovePriority(priorityId) {
            this.$emit('removePriority', priorityId);            
        }
    },
    computed: {
        renderPriorities() {
            console.log(this.priorities);
            return this.priorities.filter(priority => priority.id !== 'pNew');
        }
    },
    components: {
        colorPicker
    },
}
</script>