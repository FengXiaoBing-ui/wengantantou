<template>
	<view class="index">
		<headerTab title="功能说明"></headerTab>
		<view class="wrap">
			<view class="list" v-for="item in 10 " :key="item" @click="jump">
				<text>这里是关于功能的介绍这里是关于功能的介绍这里是关于功能的介绍</text>
				<image class="minright" src="../../../static/icon/minright.png" mode=""></image>
				<image class="leftbord" src="../../../static/icon/vertical.png" mode=""></image>
			</view>
			<uni-load-more status="nomore"></uni-load-more>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			jump(){
				uni.navigateTo({
					url:"../explaindetail/explaindetail"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	padding: 24rpx 34rpx;
	position: relative;
	top: 144rpx;
	z-index: 1;
	.list{
		margin-top: 24rpx;
		width: 100%;
		height: 139rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.6);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.6) 0%, rgba(28, 84, 184, 0.6) 100%);
		box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.6);
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 26rpx 34rpx 26rpx 20rpx;
		box-sizing: border-box;
		position: relative;
		.leftbord{
			position: absolute;
			left: -14rpx;
			top: 50%;
			width: 28rpx;
			height: 83rpx;
			transform: translateY(-50%);
		}
		text{
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 40rpx;
			color: #FFFFFF;
		}
		.minright{
			width: 14rpx;
			height: 17rpx;
		}
	}
}
</style>
