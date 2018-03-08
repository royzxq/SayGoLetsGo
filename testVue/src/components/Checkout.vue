<template>
<div>
<div v-for="(value, key) in this.user_pay">
  User {{key}} should pay {{value}}
</div>
</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {

  name: 'Checkout',
  computed: {
    ...mapGetters({
      user_pay: 'expense/getUserpay',
    }),
   
  },

}
</script>

<style lang="css" scoped>
</style>
