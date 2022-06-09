<template>
<v-container class="pa-4">
    <v-container class="pr-10">
        <template>
        <v-row class="fill-height">
            <v-col>
            <v-sheet height="64">
                <v-toolbar flat>
                <v-btn
                    outlined class="mr-4" color="grey darken-2"
                    @click="setToday()"
                >今天
                </v-btn>
                <v-btn
                    fab text small
                    color="grey darken-2"
                    @click="prev()"
                ><v-icon small>mdi-chevron-left
                    </v-icon>
                </v-btn>
                <v-btn
                    fab text small
                    color="grey darken-2"
                    @click="next"
                ><v-icon small>mdi-chevron-right
                    </v-icon>
                </v-btn>
                <v-toolbar-title v-if="$refs.calendar">
                    {{ $refs.calendar.title }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
                    <v-btn
                        outlined color="grey darken-2"
                        v-bind="attrs"
                        v-on="on"
                    ><span>Add</span>
                    </v-btn>
                </v-toolbar>
            </v-sheet>
            <v-sheet height="600">
                <v-calendar
                    ref="calendar"
                    v-model="focus"
                    color="primary"
                    :events="events"
                    :event-color="getEventColor"
                    type="week"
                    @click:event="showEvent"
                ></v-calendar>
                <v-menu
                    v-model="selectedOpen"
                    :close-on-content-click="false"
                    :activator="selectedElement"
                    offset-x
                >
                <v-card
                    color="grey lighten-4"
                    min-width="350px"
                    flat
                >
                    <v-toolbar :color="selectedEvent.color" dark>
                    <v-btn icon>
                        <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                    <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn icon>
                        <v-icon>mdi-heart</v-icon>
                    </v-btn>
                    <v-btn icon>
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                    </v-toolbar>
                    <v-card-text>
                    <span v-html="selectedEvent.details"></span>
                    </v-card-text>
                    <v-card-actions>
                    <v-btn
                        text
                        color="secondary"
                        @click="selectedOpen = false"
                    >Cancel
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-menu>
            </v-sheet>
            </v-col>
        </v-row>
        </template>
        <!-- <v-row>
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
        </v-row> -->
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
        events: [{name:'Event',start:'2022-06-05 08:00',end:'2022-06-05 10:00'}],
        focus: '',
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    methods: {
        getEventColor (event) {
            event.color='orange';
            return 'orange'
        },
        setToday () {
            this.focus = ''
        },
        prev () {
            this.$refs.calendar.prev()
        },
        next () {
            this.$refs.calendar.next()
        },
        showEvent ({ nativeEvent, event }) {
            const open = () => {
            this.selectedEvent = event
            this.selectedElement = nativeEvent.target
            requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
            }

            if (this.selectedOpen) {
            this.selectedOpen = false
            requestAnimationFrame(() => requestAnimationFrame(() => open()))
            } else {
            open()
            }
            nativeEvent.stopPropagation()
        },
        
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