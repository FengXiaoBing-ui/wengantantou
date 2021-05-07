<template>
	<view class="index">
		<headerTab title="修改登录密码"></headerTab>
		<view class="wrap">
			<view class="anime">
				<image class="in" src="../../../static/icon/completed.png" mode=""></image>
				<image class="out" src="../../../static/icon/6764.png" mode=""></image>
			</view>
			<text class="modify">修改完成</text>
			<text>将为您跳转倒登录页面...{{ count }}s</text>
			<view class="login" @click="login">立即登录</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				miutep: 0,
				count: 3
			};
		},
		created() {
			this.miutep = 0
			let timer;
			timer = setInterval(() => {
				this.miutep++
				this.count--
				if(this.miutep>=3){
					clearInterval(timer)
					timer = null
					uni.redirectTo({
						url:"../../login/login"
					})
				}
			},1000)
		},
		methods:{
			login(){
				uni.redirectTo({
					url:"../../login/login"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	position: relative;
	top: 168rpx;
	z-index: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	text{
		font-size: 28rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		line-height: 40rpx;
		color: #FFFFFF;
	}
	.login{
		width: 60%;
		margin: 0 auto;
		height: 88rpx;
		border: 1rpx solid #5AE8FF;
		background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
		box-shadow: -2rpx 0px 5rpx rgba(90, 232, 255, 0.7);
		text-align: center;
		line-height: 88rpx;
		color: #FFFFFF;
		margin-top: 65rpx;
	}
	.modify{
		margin-top: 130rpx;
	}
	.anime{
		position: relative;
		width: 203rpx;
		height: 203rpx;
		top: 104rpx;
		.in{
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
			width: 143rpx;
			height: 143rpx;
		}
		.out{
			position: absolute;
			left: 0;
			top: 0;
			width: 203rpx;
			height: 203rpx;
			animation: outanime 3s linear infinite;
			@keyframes outanime{
				0%{-webkit-transform:rotate(0deg);}
				25%{-webkit-transform:rotate(90deg);}
				50%{-webkit-transform:rotate(180deg);}
				75%{-webkit-transform:rotate(270deg);}
				100%{-webkit-transform:rotate(360deg);}
			}
		}
	}
}
</style>
