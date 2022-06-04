<template>
<v-container class="pa-4">
    <v-container class="pr-10">
        <v-row>
            <v-col>
            <v-sheet height="540">
                <v-calendar
                ref="calendar"
                :now="today"
                :value="today"
                :events="events"
                color="primary"
                type="week"
                ></v-calendar>
            </v-sheet>
            </v-col>
        </v-row>
    </v-container>

</v-container>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'

export default {
  name: 'ScheduleMain',
  data: () => ({
        today:'2022-01-01',
        events: [],
    }),
    methods: {
         
    },
    mounted () {
      this.$refs.calendar.scrollToTime('07:30')
    },
    created(){
        this.today=Vue.prototype.$getToday();
    }
}
</script>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>