<template>
	<view>
		<headerTab title="详细位置"></headerTab>
		<map
			:style="{ width: '100%', height: appheight + 'px' }"
			@click="tap"
			:latitude="latitude"
			:enable-building="true"
			:longitude="longitude"
			:markers="covers"
			:show-compass="true"
		></map>
	</view>
</template>

<script>
import Map from '../../../js_sdk/fx-openMap/openMap.js';
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
	created() {},
	onLoad(option) {
		uni.request({
			url: 'https://restapi.amap.com/v3/geocode/geo?parameters',
			method: 'GET',
			data: {
				key: '8a4d1f66f7dc12d82ebbc4a77533e929',
				address: option.loction
			},
			success: res => {
				console.log('ojbk',res);
				this.location = res.data.geocodes[0].location;
				this.location = this.location.split(',');
				this.latitude = this.location[1];
				this.longitude = this.location[0];
				plus.geolocation.getCurrentPosition( (position) => {
					console.log(79864563,position)
				},(e) => {
					console.log(e)
				})
				uni.getLocation({
					success: (response) => {
						console.log(response)
						this.options.origin = {
							latitude: response.latitude,
							longitude: response.longitude,
							name: '起点'
						};
						this.options.destination = {
							latitude: this.latitude,
							longitude: this.longitude,
							name: '终点'
						};
						this.options.mode = 'drive';
						this.options.mapId = 'map';
						console.log(this.options.mode)
						let amapuri = "amapuri://route/plan/?sourceApplication=uniapp&slat="+this.options.origin.latitude+"&slon="+this.options.origin.longitude+"&sname="+this.options.originName+"&dlat="+this.options.destination.latitude+"&dlon="+this.options.destination.longitude+"&dname="+this.options.destinationName+"&t=0";
						let qqmapDefault =
							'https://apis.map.qq.com/uri/v1/routeplan?type=drive&from=起点&fromcoord=' +
							this.options.origin.latitude +
							',' +
							this.options.origin.longitude +
							'&to=终点&tocoord=' +
							this.options.destination.latitude +
							',' +
							this.options.destination.longitude +
							'&policy=1';
							Map.routePlan(this.options);
						// window.location.href = encodeURI(amapuri);
						// plus.runtime.openURL(encodeURI(qqmapDefault))
						// plus.runtime.openURL(encodeURI(qqmapDefault),errorCB => {
						// 	uni.showToast({
						// 		title:errorCB
						// 	})
						// },identity => {
						// 	uni.showToast({
						// 		title:identity
						// 	})
						// });
					},
					fail(err) {
						console.log(err)
					}
				});
			}
		});
	},
	methods: {
		tap() {
			console.log(this.options)
			Map.routePlan(this.options);
		}
	},
	computed: {}
};
</script>

<style lang="less"></style>
