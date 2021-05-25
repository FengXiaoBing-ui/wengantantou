<template>
	<view>
		<headerTab title="详细位置"></headerTab>
		<map :style="{ width: '100%', height: appheight + 'px' }" @tap="tap" :latitude="latitude" :enable-building="true" :longitude="longitude" :markers="covers" :show-compass="true"></map>
	</view>
</template>

<script>
	import Map from '@/js_sdk/fx-openMap/openMap.js'
export default {
	data() {
		return {
			id: 0, // 使用 marker点击事件 需要填写id
			title: 'map',
			latitude: 0,
			longitude: 0,
			location: {},
			covers: [],
			options: {}
		};
	},
	created() {
		
	},
	onLoad(option) {
		uni.request({
			url:"https://restapi.amap.com/v3/geocode/geo?parameters",
			method:"GET",
			data:{
				key:'5fc47fa889ee50c06189c4f9326145f5',
				address: option.loction
			},
			success:(res) => {
				console.log(res)
				this.location = res.data.geocodes[0].location
				this.location = this.location.split(',')
				this.latitude = this.location[1]
				this.longitude = this.location[0]
				uni.getLocation({
					success: (response) => {
						this.options.origin = {
							latitude: response.latitude,
							longitude: response.longitude,
							name:"起点"
						}
						this.options.destination = {
							latitude: this.latitude,
							longitude: this.longitude,
							name:"终点"
						}
						this.options.mode = "drive"
						this.options.mapId = "map"
						Map.routePlan(this.options)
					}
				})
				
			}
		})
		
	},
	methods:{
		tap(){
			Map.routePlan(this.options)
		}
	},
	computed: {}
};
</script>

<style lang="less"></style>
