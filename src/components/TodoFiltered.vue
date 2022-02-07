<template>
  <div>
    <button @click="change('all')" :class="{ active: filter == 'all' }">
      All
    </button>
    <button @click="change('Active')" :class="{ active: filter == 'Active' }">
      Active
    </button>
    <button
      @click="change('Completed')"
      :class="{ active: filter == 'Completed' }"
    >
      Completed
    </button>
  </div>
</template>

<script>
export default {
  name: '',
  computed: {
    filter() {
      return this.$store.state.filter
    }
  },
  methods: {
    change(filter) {
      this.$store.commit('change',filter);
    }
  }
}
</script>