<template>
<v-container fluid >
</v-container>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
export default {
    name: 'HomeMain',
    data: () => ({
        user:Vue.prototype.$USER,
    }),
    created() {

    },
}
</script>
