<template>
<v-container class="pa-4">
    <v-container class="pr-10">
        <template>
        <v-row class="fill-height">
            <v-col>
            <v-sheet height="64">
                <v-toolbar flat>
                <v-btn outlined class="mr-4" color="grey darken-2"
                    @click="setToday()"
                >今天
                </v-btn>
                <v-btn fab text small color="grey darken-2"
                    @click="prev()"
                ><v-icon small>mdi-chevron-left</v-icon>
                </v-btn>
                <v-btn fab text small color="grey darken-2"
                    @click="next"
                ><v-icon small>mdi-chevron-right</v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">
                    {{ $refs.calendar.title }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                    <v-btn outlined color="grey darken-2"><span>Add</span></v-btn>
                </v-toolbar>
            </v-sheet>
            <v-sheet>
                <v-calendar ref="calendar" type="week" color="primary"
                    v-model="focus"
                    :now="today" :value="today"
                    :events="events.data" :event-color="getColor"
                    @click:event="showEvent"
                ></v-calendar>
                <v-menu offset-x
                    v-model="selectedOpen"
                    :close-on-content-click="false"
                    :activator="selectedElement"
                >
                <v-card color="grey lighten-4" min-width="350px" class="pb-3 rounded-lg" flat>
                    <v-toolbar :color="selectedEvent.color" elevation="0">
                        <v-toolbar-title class="white--text font-weight-bold">
                            {{selectedEvent.name}}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon color="white">
                            <v-icon>mdi-delete-off</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <span v-html="selectedEvent.describe"></span>
                    </v-card-text>
                    <!-- <v-card-actions>
                        <v-btn text color="secondary"
                            @click="selectedOpen = false"
                        >Back
                        </v-btn>
                    </v-card-actions> -->
                </v-card>
                </v-menu>
            </v-sheet>
            </v-col>
        </v-row>
        </template>
    </v-container>

</v-container>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'

export default {
  name: 'ScheduleMain',
  data: () => ({
        time:Vue.prototype.$SYSTIME,
        today:Vue.prototype.$TODAY,
        events: Vue.prototype.$EVENTS,
        focus: '',
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
    }),
    methods: {
        getColor(event){return event.color;},
        setToday(){
            this.focus = this.today = Vue.prototype.$TODAY;
            this.$refs.calendar.scrollToTime('07:30');
        },
        prev(){this.$refs.calendar.prev();},
        next(){this.$refs.calendar.next();},
        showEvent ({ nativeEvent, event }) {
            const open = ()=>{
                this.selectedEvent = event
                this.selectedElement = nativeEvent.target
                requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
            }
            if(this.selectedOpen){
                this.selectedOpen = false
                requestAnimationFrame(() => requestAnimationFrame(() => open()))
            }else{
                open()
            }
            nativeEvent.stopPropagation()
        },
    },
    activated() {
        this.setToday();
    },
    mounted(){
        this.setToday();
    },
    created(){
        this.setToday();
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