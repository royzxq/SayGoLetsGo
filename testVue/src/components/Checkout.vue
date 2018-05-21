<template>
<div>
<div v-for="payment in this.user_pay">
  {{payment[0]}} should pay {{payment[1]}} {{payment[2]}}
</div>
</div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Checkout",
  computed: {
    ...mapGetters({
      user_pay: "expense/getUserpay"
    })
  }
};
</script>

<style lang="css" scoped>
</style>
