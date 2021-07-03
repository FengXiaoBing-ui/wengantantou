<template>
	<view class="index">
		<headerTab title="设备数据总览"></headerTab>
		<view class="wrap">
			<view class="headerimg"></view>
			<view class="mid_l1_and_r2">
				<view class="left">
					
				</view>
				<view class="right">
					
				</view>
			</view>
			<view class="mid_count">
				<view class="left">
					
				</view>
				<view class="right">
					
				</view>
			</view>
			<view class="bot_box">
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	padding: 0 34rpx;
	box-sizing: border-box;
	position: relative;
	z-index: 10;
	.headerimg{
		margin-top: 200rpx;
		background-image: url(../../../static/icon/7055.png);
		background-size: 100% 100%;
		width: 100%;
		height: 270rpx;
		box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
	}
	.mid_l1_and_r2{
		display: flex;
		align-items: center;
		justify-content: space-between;
		view{
			width: 333rpx;
			height: 364rpx;
			border: 2rpx solid rgba(90, 232, 255, 0.6);
			background: linear-gradient(180deg, rgba(59, 242, 255, 0.6) 0%, rgba(5, 51, 159, 0.6) 100%);
			box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
			box-sizing: border-box;
		}
	}
	.mid_count{
		display: flex;
		align-items: center;
		justify-content: space-between;
		view{
			margin-top: 20rpx;
			width: 333rpx;
			height: 200rpx;
			border: 2rpx solid #5AE8FF;
			background: linear-gradient(180deg, #41C9FC 0%, #1C54B8 100%);
			box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
		}
	}
	.bot_box{
		margin-top: 20rpx;
		width: 682rpx;
		height: 539rpx;
		border: 2rpx solid #5AE8FF;
		background: linear-gradient(180deg, #41C9FC 0%, #1C54B8 100%);
		box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
	}
}
</style>
