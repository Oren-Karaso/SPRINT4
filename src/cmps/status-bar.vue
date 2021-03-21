<template>
  <section
    class="status-bar-wrapper"
    v-if="statuses"
  >
    <div
      class="part-of-bar"
      v-for="(status, idx) in statusesMap"
      :key="idx"
      :style="styleObject(status)"
      :data-title="dataLabel(status)"
    >
    </div>
  </section>
</template>

<script>
export default {
  props: {
    statuses: {
      type: Array,
      required: true,
    },
    tasks: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      statusesMap: null,

    }
  },
  methods: {
    createTasksMap() {
      this.statusesMap = JSON.parse(JSON.stringify(this.statuses))
      this.statusesMap.forEach(task => task.count = 0)
      this.statusesMap.forEach(status => {
        this.tasks.forEach(task => {
          if (task.statusId === status.id) status.count++;
        })
      })

    },
    dataLabel(status) {
      return `${status.title}, ${(status.count / this.tasks.length * 100).toFixed(0)}%`
    },

    styleObject(status) {
      return {
        backgroundColor: status.color,
        width: status.count / this.tasks.length * 100 + '%'
      }
    }

  },
  computed: {

  },
  watch: {
    tasks: {
      deep: true,
      handler() {
        this.createTasksMap()
      }
    }
  },
  created() {
    this.createTasksMap()

  }
}
</script>