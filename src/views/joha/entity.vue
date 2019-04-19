<template>
  <div>
    <el-button type="danger" plain @click="dialogVisible= true">Danger</el-button>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(key, value) in project.langs" :name="key.toString()" :label="value">
        <el-button @click="adding(key)">Add</el-button>
        <br><br><br>
        <el-row :gutter="20">
          <el-col :span="2">.</el-col>
          <el-col :span="16">
            <table>
              <thead>
                <tr>
                  <th>Language</th>
                  <th v-for="(key1, value1) in modal.getFields">
                    {{ key1.name }}
                  </th>
                  <th>Edit</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(key, value) in data[key.toString()]">
                  <td>{{ key.langId }}</td>
                  <td v-for="(key1, value1) in key.data">
                    {{ key1 }}
                  </td>
                  <td><el-button type="primary" icon="el-icon-edit" circle @click="edit(key)" />
                    <el-button type="danger" icon="el-icon-delete" circle @click="deleteEntity(key)" />
                  </td>
                </tr>
              </tbody>
            </table>
          </el-col>
          <el-col :span="2" />
        </el-row>

      </el-tab-pane>
    </el-tabs>

    <el-dialog
      title="Tips"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-select v-model="newLanguage" placeholder="Select">
        <el-option
          v-for="item in languages"
          :key="item.id"
          :label="item.name"
          :value="item.languageId"
        />
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="addLanguage()">Confirm</el-button>
      </span>
    </el-dialog>
    <add-modal
      :show.sync="show"
      :modals="modal.getFields"
      :language-id="langId"
      @result="addEntity"
    />
    {{ temp }}
  </div>
</template>

<script>
import addModal from './addModal.vue'

export default {
  name: 'EntityVue',
  components: {
    addModal
  },
  data() {
    return {
      modal: {},
      project: {},
      dialogVisible: false,
      languages: [],
      newLanguage: 0,
      id: '',
      name: '',
      data: {},
      show: false,
      langId: 0,
      temp: 0

    }
  },
  computed: {},
  mounted() {
    const _this = this
    const id = _this.$route.params.id
    const name = _this.$route.params.name
    this.id = id
    this.name = name
    if (!id) return
    this.$store.getters.getAllLangs(this).then(response => {
      console.log(response)
      this.languages = response
    })
    _this.$store.getters.getProject(_this).then(response => {
      const pro = response.projects.firstOrDefault(m => m.name == name)
      _this.project = pro
      const modal = pro.entitys.firstOrDefault(m => m.id == id)
      _this.modal = modal
      console.log(modal)
    })
  },
  methods: {
    edit(key) {
      console.log(key)
    },
    deleteEntity(key) {
      console.log(key)
    },
    getByKey(id) {
      console.log(id)
      if (!this.data) {
        return ''
      }
      const _this = this
      for (const key in this.data) {
        if (id.toString() == key.toString()) {
          console.log(_this.data[key])
          return _this.data[key]
        }
      }
      if (id.toString() in this.data) {
        console.log(this.data[id.toString()])
        return this.data[id.toString()]
      }
      return 'joha'
    },
    addEntity(result) {
      console.log(result)
      const modal = {
        langId: this.langId,
        name: this.name,
        guid: this.id,
        data: result
      }
      this.$store.state.http.post('/project/AddEntity', modal).then(response => {
        if (this.data[modal.langId.toString()] && this.data[modal.langId.toString()].length == 0) {
          this.data[modal.langId.toString()] = [response.data.result]
        } else {
          this.data[modal.langId.toString()].push(response.data.result)
        }
        this.temp++
      }, err => {
        this.$store.getters.errorParse(err, this)
      })
    },
    adding(langId) {
      this.langId = langId
      this.show = true
    },
    handleClick(e) {
      if (this.data[e.name]) {
        return
      }
      this.langId = parseInt(e.name)
      this.$store.state.http.get('/project/GetModal?name=' + this.name + '&id=' + this.id + '&langId=' + e.name).then(response => {
        if (this.data[e.name.toString()] && this.data[e.name.toString()].length == 0) {
          this.data[e.name.toString()] = [response.data.result]
        } else {
          this.data[e.name.toString()] = response.data.result
        }
        this.getByKey(e.name)
        this.temp++
      }, err => {
        this.$store.getters.errorParse(err, this)
      })
    },
    convertData(array) {
      const result = []
      for (let i = 0; i < array.length; i++) {

      }
    },
    addLanguage() {
      // this.project.langs.firstOrDefault(m=>m.id)
      if (this.newLanguage > 0) {
        this.$store.state.http.get('/project/AddLanguage?name=' + this.name + '&id=' + this.id + '&langId=' + this.newLanguage
        ).then(response => {
          console.log(response)
          console.log(response)
        }, err => {
          this.$store.getters.errorParse(err, this)
        })
      }
    },
    getData() {

    }

  }

}

</script>

<style scoped>

</style>
