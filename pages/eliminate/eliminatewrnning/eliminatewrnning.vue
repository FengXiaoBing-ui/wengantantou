<template>
	<view class="index">
		<headerTab title="消警记录" @option="option" :record="true" :confirmed="true" :garbage="false" :option="['待处理','已处理']"></headerTab>
		<view class="wrap">
			<view class="list" v-for="(item, index) in warninglist" :key="index" @click="jump">
				<view class="list-left">
					<view class="top">
						<image src="../../../static/icon/6707.png" mode=""></image>
						<text>{{ item.title }}</text>
					</view>
					<text class="mid">{{ item.num }}</text>
					<view class="bot">
						<image v-if="item.states == '超温警告'" src="../../../static/icon/6918.png" mode=""></image>
						<image v-if="item.states == '电量低'" src="../../../static/icon/6921.png" mode=""></image>
						<text :class="{ origin: item.states == '电量低', red: item.states == '超温警告' }">{{ item.states }}</text>
						<text>于{{ item.time }}</text>
					</view>
				</view>
				<view class="list-right"><image src="../../../static/icon/minright.png" mode=""></image></view>
				<view class="states" :class="active=='未处理'?'active':''">
					<text>{{ active }}</text>
				</view>
				<view class="box-foot"></view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: "未处理",
				warninglist: [
					{
						title: '110kV丹诗文线-N4',
						num: '探头编号T5B464668444447',
						states: '超温警告',
						time: '2021-12-21 15:24:20',
						active: ''
					},
					{
						title: '110kV丹诗文线-N4',
						num: '探头编号T5B464668444447',
						states: '电量低',
						time: '2021-12-21 15:24:20',
						active: ''
					},
					{
						title: '110kV丹诗文线-N4',
						num: '探头编号T5B464668444447',
						states: '超温警告',
						time: '2021-12-21 15:24:20',
						active: ''
					},
					{
						title: '110kV丹诗文线-N4',
						num: '探头编号T5B464668444447',
						states: '超温警告',
						time: '2021-12-21 15:24:20',
						active: ''
					}
				]
			};
		},
		methods:{
			jump(){
				if(this.active=='未处理'){
					uni.navigateTo({
						url:"../eliminatewrningdetail/eliminatewrningdetail"
					})
				}else{
					uni.navigateTo({
						url:"../eliminatewrningdetailtwo/eliminatewrningdetailtwo"
					})
				}
			},
			option(v){
				if(v=='待处理') v = '未处理'
				this.active = v
			}
		}
	}
</script>

<style lang="less" scoped>
	.wrap{
		position: relative;
		top: 248rpx;
		padding: 27rpx 34rpx;
		box-sizing: border-box;
	}
.list{
		margin: 20rpx 0;
		width: 100%;
		height: 182rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.6);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.6) 0%, rgba(28, 84, 184, 0.6) 100%);
		box-shadow: 2px 3px 8px rgba(90, 232, 255, 0.4);
		position: relative;
		padding: 10rpx 20rpx 20rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		z-index: 99;
		.active {
			width: 41rpx;
			height: 41rpx;
		}
		.list-left {
			.top {
				display: flex;
				align-items: center;
				text {
					font-size: 32rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #ffffff;
				}
				image {
					width: 48rpx;
					height: 48rpx;
				}
			}
			.mid {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 40rpx;
				color: #ffffff;
			}
			.bot {
				display: flex;
				align-items: center;
				.origin {
					color: #fbc965;
					opacity: 1;
				}
				.red {
					color: #ff7672;
					opacity: 1;
				}
				text {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 40rpx;
					color: #ffffff;
					opacity: 0.5;
					margin-left: 10rpx;
				}
				image {
					width: 26rpx;
					height: 38rpx;
				}
			}
		}
		.list-right {
			image {
				width: 14rpx;
				height: 17rpx;
			}
		}
		
		.states {
			position: absolute;
			top: 14rpx;
			right: 25rpx;
			width: 115rpx;
			height: 43rpx;
			background: rgba(0, 62, 99, 0.95);
			border: 1rpx solid #FFFFFF;
			opacity: 0.58;
			border-radius: 10rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: center;
			text{
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				opacity: 0.58;
			}
		}
		.active{
			border: 1px solid #5AE8FF;
			text{
				color: #5AE8FF;
				opacity: 1;
			}
		}
		.box-foot {
			width: 114rpx;
			height: 4rpx;
			background: #54d6ff;
			box-shadow: 0px 0px 8rpx #9ef2ff;
			position: absolute;
			bottom: -2rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
	.list {
		align-items: center;
		justify-content: space-between;
	}
</style>
