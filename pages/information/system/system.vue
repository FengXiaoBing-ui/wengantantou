<template>
	<view class="index">
		<headerTab title="系统设置"></headerTab>
		<view class="wrap">
			<view class="pass" @click="modifypass">
				<view class="pass-left">
					<image src="../../../static/icon/lock.png" mode=""></image>
					<text>修改登录密码</text>
				</view>
				<image src="../../../static/icon/minright.png" mode=""></image>
			</view>
			<view class="outlogin" @click="logout">
				<image src="../../../static/icon/out.png" mode=""></image>
				<text>退出登录</text>
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
			modifypass(){
				uni.navigateTo({
					url:"../modifypassword/modifypassword"
				})
			},
			logout(){
				uni.removeStorageSync('loginId')
				uni.redirectTo({
					url:"../../login/login"
				})
			}
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
	.pass{
		width: 100%;
		border: 2rpx solid rgba(90, 232, 255, 0.7);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.7) 0%, rgba(28, 84, 184, 0.7) 100%);
		box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.7);
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 30rpx;
		box-sizing: border-box;
		.pass-left{
			display: flex;
			align-items: center;
			text{
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 40rpx;
				color: #FFFFFF;
			}
			image{
				margin-right: 16rpx;
				width: 48rpx;
				height: 48rpx;
			}
		}
		image{
			width: 14rpx;
			height: 17rpx;
		}
	}
	.outlogin{
		margin-top: 70rpx;
		width: 100%;
		height: 100rpx;
		border: 1rpx solid #FF6B6B;
		background: linear-gradient(180deg, #FF7F75 0%, #C1161C 100%);
		opacity: 0.9;
		display: flex;
		justify-content: center;
		align-items: center;
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
		}
	}
}
</style>
