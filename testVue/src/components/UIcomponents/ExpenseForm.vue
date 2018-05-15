<template>
	<div v-if="show">
    <label >how much did you pay?</label>
	<input v-model.number="expense"  type="number" placeholder="how much did you pay?" />
  <myMultiselect :options="users" :label="'username'" />
    <input v-model="comment" type="text" placeholder="What's this paid for?"/>
	<button v-on:click="submit"> Submit</button>
	</div>
</template>

<script>
import {printResponse} from "@/utils/helper"
import myMultiselect from '@/components/UIcomponents/multiselect'
import {mapGetters} from 'vuex'

export default {
  name: 'ExpenseForm',
  data: function () {return {
        expense: 0.0,
        show: true,
        comment: '',
  	}
  },
  props: [
    'travel',
  ],
  components: {
    myMultiselect
  },
  methods:{
  	submit: function(){
        var obj = {}
        obj.paid_member = localStorage.getItem('tWeb_memberId')
        obj.expense = this.expense
        obj.payees = []
        for(let user of this.values){
          obj.payees.push(user.id)
        }
        obj.comment = this.comment
        this.$store.dispatch('expense/createExpense', obj).then(()=>{
          this.$emit('submit')
          this.$router.go(0)
        }).catch(error => {
          printResponse("create expense failed", error)
        })
  	}
  },
  mounted() {
    var obj = {
      travelgroup: this.travel
    }
    this.$store.dispatch('user/fetchGroupUsers', obj)
  },
  computed: {
    ...mapGetters({
      users: 'user/getGroupUsers',
      values: 'options/getValues'
    })
  }
}
</script>

<style lang="css" scoped>
</style>
