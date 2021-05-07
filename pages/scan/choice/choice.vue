<template>
	<view class="index">
		<headerTab title="激活探头"></headerTab>
		<view class="wrap">
			<view class="box">
				<text>绑定中继器</text>
				<view class="Repeater" @click="jump">
					<view class="left">
						<image src="../../../static/icon/wifi.png" mode=""></image>
						<text>点此选择中继器</text>
					</view>
					<image src="../../../static/icon/minright.png" mode=""></image>
				</view>
				<text>绑定输电塔</text>
				<view class="Repeater" @click="pagoda">
					<view class="left">
						<image src="../../../static/icon/6707.png" mode=""></image>
						<text>点此选择输电塔位置</text>
					</view>
					<image src="../../../static/icon/minright.png" mode=""></image>
				</view>
			</view>
			<view class="botbtn" @click="sure">
				<image src="../../../static/icon/6932.png" mode=""></image>
				<text>确认激活</text>
			</view>
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
					url:"../Repeaterlist/Repeaterlist"
				})
			},
			pagoda(){
				uni.navigateTo({
					url:"../pagoda/pagoda"
				})
			},
			sure(){
				uni.navigateTo({
					url:"../result/result"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	width: 100%;
	padding: 24rpx 34rpx;
	box-sizing: border-box;
	position: relative;
	top: 168rpx;
	z-index: 1;
	.box{
		width: 100%;
		height: 601rpx;
		border: 2rpx solid #5AE8FF;
		background: linear-gradient(180deg, #41C9FC 0%, #1C54B8 100%);
		box-shadow: 2rpx 4rpx 10rpx rgba(90, 232, 255, 0.8);
		opacity: 0.5;
		padding: 20rpx 17rpx;
		box-sizing: border-box;
		text{
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 40rpx;
			color: #FFFFFF;
		}
		.Repeater{
			margin: 13rpx 0;
			width: 100%;
			height: 203rpx;
			border: 1rpx solid #4492C2;
			background: linear-gradient(180deg, #0D4B88 0%, #013161 100%);
			box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
			opacity: 0.51;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 40rpx;
			box-sizing: border-box;
			.left{
				display: flex;
				align-items: center;
				image{
					width: 120rpx;
					height: 120rpx;
				}
			}
			image{
				width: 14rpx;
				height: 17rpx;
				margin-right: 20rpx;
			}
		}
	}
	.botbtn{
		margin-top: 50rpx;
		width: 100%;
		height: 100rpx;
		background: #012E61;
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
			color: #FFFFFF;
			opacity: 0.51;
		}
	}
}
</style>
