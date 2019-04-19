<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="(key, value) in project.projects"
        :label="key.name"
        :name="key.name"
        @tab-click="selectTab(key)"
      >
        <el-card v-for="(key1, value1) in key.entitys" class="box-card">
          {{ key1.name }}
          <div v-for="modal in key1.getFields" :key="o" class="text item">
            {{ modal.name }}
          </div>
          <el-button type="success" round @click="goEntitys(key1, key.name)">Success</el-button>
        </el-card>
      </el-tab-pane>
      <el-tab-pane label="Config" name="second">Config</el-tab-pane>
    </el-tabs>

  </div>
</template>

<script>
export default {
  name: 'ProjectsVue',
  data() {
    return {
      project: {}

    }
  },
  mounted() {
    this.$store.getters.getProject(this).then(response => {
      this.project = response
    })
  },
  methods: {
    goEntitys(key, name) {
      console.log(key)
      console.log(name)
      this.$router.push({ path: '/lang/entity/' + key.id + '/' + name })
    },
    selectTab(key) {
      console.log(key)

      this.$store.state.http.get('/Project/getProjects?id=' + key.id).then(response => {
        console.log(response)
      }, err => {

      })
    }
  }
}
</script>

<style scoped>

</style>
