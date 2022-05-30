<template>
<v-container fluid >
    <v-card
        class="mx-auto"
        max-width="344"
        style="margin-top:10%"
        outlined
    >
        <v-list-item three-line>
        <v-list-item-content>
            <div class="text-overline mb-0">
            {{user.id}}
            </div>
            <v-list-item-title class="text-h5 mb-2">
            {{user.name}}
            </v-list-item-title>
            <v-list-item-subtitle class="text-button">{{user.school}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{user.major}}</v-list-item-subtitle>
            <v-list-item-subtitle>{{user.classid}}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar
            tile
            size="80"
            color="grey"
        ></v-list-item-avatar>
        </v-list-item>
    </v-card>
</v-container>
</template>

<script>
// @ is an alias to /src
import Vue from 'vue'
export default {
    name: 'HomeMain',
    data: () => ({
        user:Vue.prototype.USER,
    }),
}
</script>
