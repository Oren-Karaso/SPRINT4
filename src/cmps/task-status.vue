<template>
    <section class="status-modal">
        <ul v-if="renderStatuses" class="status-list clean-list">
            <li v-for="status in renderStatuses" :key="status.id" >
                <div class="label" @click="onStatus(status.id)" v-bind:style="{ borderLeft: `10px solid ${status.color}` }" >
                    {{status.title}}
                    <i class="el-icon-delete" @click.stop="onRemoveStatus(status.id)"></i>
                </div>
            </li>
            <li>
                <input 
                ref="addStatusInput"
                @keyup.enter="addStatus"
                class="input-add-status"
                type="text"
                placeholder="New label"
                v-bind:style="{ borderLeft: `10px solid ${addStatusColor}` }"
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
        statuses: {
          type: Array,
          required: true,
        },
    },
    data() {
        return {
            addStatusColor: 'gray'
        }
    },
    methods: {
        changeColor(color) {
            this.addStatusColor = color;
        },
        addStatus(ev) {
            this.$emit('addStatus', { title: ev.target.value, color: this.addStatusColor });
            this.$refs['addStatusInput'].value = '';
            this.addStatusColor = 'gray';
        },
        onStatus(statusId) {
            this.$emit('updateStatus', statusId);
        },
        onRemoveStatus(statusId) {
            this.$emit('removeStatus', statusId);            
        }
    },
    computed: {
        renderStatuses() {
            return this.statuses.filter(status => status.id !== 'sNew');
        }
    },
    components: {
        colorPicker
    },
}
</script>
