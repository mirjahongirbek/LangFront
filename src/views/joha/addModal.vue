<template>
  <el-dialog
    title="Tips"
    :visible.sync="show"
  >
    <div v-for="(key, value) in modals">
      <el-input v-model="key.value" />
      {{ key }}
    </div>
    <el-button @click="add()">Add</el-button>
  </el-dialog>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean
    },
    modals: {
      type: Array,
      required: true

    },
    languageId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    add() {
      // { "key": null, "type": "Int32", "name": "Id", "value": "" }
      const modal = {}
      for (let i = 0; i < this.modals.length; i++) {
        modal[this.modals[i].name] = this.$store.getters.convertValue(this.modals[i].value, this.modals[i].type)
      }
      console.log(this.modals)
      console.log(modal)
      this.$emit('result', modal)
    }
  }
}
</script>

<style scoped>

</style>
