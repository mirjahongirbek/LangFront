<template>
  <div>

    <br>
    <br>
    <br>
    sdlicsndci
    <el-button type="warning" plain @click="dialogVisible = true">Add</el-button>
    <el-table
      :data="languages"
      style="width: 100%"
    >
      <el-table-column
        prop="languageId"
        label="LanguageId"
        width="180"
      />
      <el-table-column
        prop="name"
        label="Name"
        width="180"
      />
      <el-table-column
        prop="id"
        label="Edit"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick">Detail</el-button>
          <el-button type="text" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog
      title="Tips"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="Language Id">
          <el-input v-model="newLang.languageId" placeholder="Language Id" />
        </el-form-item>
        <el-form-item label="Language Name">
          <el-input v-model="newLang.name" placeholder="Language Name" />
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="saveNew()">Confirm</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      newLang: {
        languageId: 0,
        name: 'joha'
      },
      languages: []
    }
  },
  mounted() {
    this.getAll()
  },
  methods: {
    saveNew() {
      const item = this.languages.firstOrDefault(m => m.languageId === this.newLang.languageId)
      if (item) {
        console.log(item)
        return
      }
      this.$store.state.http.post('/language/Add', this.newLang).then(response => {
        console.log(response)
        this.languages.push(response.data.result)
      }, err => {
      })
    },

    getAll() {
      this.$store.state.http.get('/language/getAll').then(response => {
        console.log(response)
        this.languages = response.data.result
      }, err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>

</style>
