<template>
	<view class="index">
		<headerTab title="意见反馈"></headerTab>
		<view class="wrap">
			<view class="box">
				<text>写下您遇到的问题和建议，我们将不断改进</text>
				<textarea value="" placeholder="" />
			</view>
			<view class="sumbit">
				<image src="../../../static/icon/6932.png" mode=""></image>
				<text>确认提交</text>
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
	padding: 24rpx 34rpx;
	position: relative;
	top: 168rpx;
	box-sizing: border-box;
	z-index: 1;
	.sumbit{
		margin-top: 32rpx;
		width: 100%;
		height: 100rpx;
		border: 1rpx solid #5AE8FF;
		background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
		box-shadow: -2rpx 0px 5rpx rgba(90, 232, 255, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			width: 50rpx;
			height: 50rpx;
		}
		text{
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			line-height: 52rpx;
			margin-left: 4rpx;
			color: #FFFFFF;
		}
	}
	.box{
		width: 100%;
		height: 476rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.5);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
		box-shadow: 2rpx 4rpx 10rpx rgba(90, 232, 255, 0.5);
		padding: 18rpx 24rpx;
		box-sizing: border-box;
		text{
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 37rpx;
			color: #FFFFFF;
			opacity: 0.6;
		}
		textarea{
			margin-top: 14rpx;
			width: 100%;
			height: 376rpx;
			background: #073B6E;
			border: 1rpx solid #4492C2;
			box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
			padding: 10rpx;
			box-sizing: border-box;
			font-size: 30rpx;
			font-family: Source Han Sans CN;
			margin-left: 4rpx;
			color: #FFFFFF;
		}
	}
}
</style>
