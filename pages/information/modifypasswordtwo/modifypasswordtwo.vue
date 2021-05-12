<template>
	<view class="index">
		<headerTab title="修改登录密码"></headerTab>
		<view class="wrap">
			<view class="inputbox">
				<text>设置新的登录密码</text>
				<input type="password" value="" v-model="newpassword" />
				<text>重复输入新密码</text>
				<input type="password" value="" v-model="newpasswordtoo" />
			</view>
			<view class="outlogin" @click="sure">
				<image src="../../../static/icon/6932.png" mode=""></image>
				<text>确认修改</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newpassword: "",
				newpasswordtoo: ""
			};
		},
		methods:{
			sure(){
				if(this.newpassword==""){
					uni.showToast({
						title:"请输入新的登录密码",
						icon:"none"
					})
					return false
				}
				if(this.newpasswordtoo==""){
					uni.showToast({
						title:"请重复输入新的登录密码",
						icon:"none"
					})
					return false
				}
				if(this.newpassword!=this.newpasswordtoo){
					uni.showToast({
						title:"两次密码不一致",
						icon:"none"
					})
					return false
				}
				this.$api.postapi('/api/user/upd_new_pwd',{loginId:uni.getStorageSync('loginid'),pwd: this.newpassword}).then(res => {
					console.log(res)
					if(res.data.code==1){
						uni.navigateTo({
							url:"../modifycompleted/modifycompleted"
						})
					}
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
	.inputbox{
		width: 100%;
		border: 2rpx solid rgba(90, 232, 255, 0.5);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
		box-shadow: 2rpx 4rpx 10rpx rgba(90, 232, 255, 0.5);
		padding: 24rpx;
		box-sizing: border-box;
		text{
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 37rpx;
			color: #FFFFFF;
			opacity: 0.6;
		}
		input{
			margin-top: 10rpx;
			width: 100%;
			height: 64rpx;
			background: #073B6E;
			border: 1rpx solid #4492C2;
			box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
			color: #FFFFFF;
			padding-left: 20rpx;
			box-sizing: border-box;
		}
	}
	.outlogin{
		margin-top: 70rpx;
		width: 100%;
		height: 100rpx;
		border: 1rpx solid rgba(90, 232, 255, 1);
		background: linear-gradient(180deg, rgba(90, 232, 255, 1) 0%, rgba(28, 84, 184, 1) 100%);
		box-shadow: -2px 0px 5px rgba(90, 232, 255, 0.7);
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
