<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$store.getters.getProject(this).then(response => {})
  },
  methods: {
    getFronts() {
      this.$store.state.http.get('/Project/getProjects').then(response => {
        console.log(response)
        this.project = response.data.result
        this.$store.state.project = response.data.result
      }, err => {
        console.log(err)
      })
    }
  }
}
</script>
