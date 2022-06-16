<template>
<v-container class="ml-8 mt-4 mb-10">
    <span class="text-h5 font-weight-black ml-4">沙河校区</span>
	<v-card 
		class="map mt-2" rounded="0" elevation="2" 
        min-width="1050"
        justify="center"
    >
	</v-card>
    <v-divider class="mt-10 mb-4 px-4"></v-divider>
    <span class="text-h5 font-weight-black ml-4">西土城校区</span>
    <v-card 
		class="map2 mt-2" rounded="0" elevation="2" 
        min-width="750"
        justify="center"
    >
	</v-card>
</v-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'IndexView',
  data: () => ({
        }),
}
</script>

<style>
.map {
	width: 1050px;
	height: 650px;
	background-image: url("@/assets/map/bg.png");
	background-size: 1050px 650px;
	background-repeat:no-repeat;
}
.map2 {
	width: 750px;
	height: 1100px;
	background-image: url("@/assets/map/xitucheng.png");
	background-size: 750px 1100px ; 
	background-repeat:no-repeat;
}
</style>
