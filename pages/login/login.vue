<template>
	<view class="login" :style="{height:appheight+'px'}">
		<image class="top" src="../../static/icon/loginbackground.png" mode=""></image>
		<image class="titleimg" src="../../static/icon/title.png" mode=""></image>
		<image class="bot" src="../../static/icon/6892.png" mode=""></image>
		<view class="midinput">
			<view class="user">
				<view>
					<image src="../../static/icon/loginuser.png" mode=""></image>
				</view>
				<input type="text" value="" placeholder="输入账号名" v-model="username" />
			</view>
			<view class="pass">
				<view>
					<image src="../../static/icon/loginpass.png" mode=""></image>
				</view>
				<input type="password" value="" placeholder="输入登录密码" v-model="password" />
			</view>
			<view class="remember">
				<view class="active" @click="remember" v-if="isshow">
					<image src="../../static/icon/yes.png" mode=""></image>
				</view>
				<view class="noactive" @click="remember" v-if="!isshow"></view>
				<text>记住密码</text>
			</view>
			<button class="loginbtn" type="default" @click="login">立即登录</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				username: "",
				password: "",
				isshow: false,
				backButtonPress: 0
			};
		},
		onBackPress(e) {
			this.backButtonPress++
			if(this.backButtonPress>=2){
				plus.runtime.quit()
			}else{
				plus.nativeUI.toast('再次返回退出应用')
			}
			setTimeout(() => {
				this.backButtonPress = 0
			},1000)
			return true
		},
		computed:{
			appheight:function(){
				let windowheight = 0
				uni.getSystemInfo({
					success(e) {
						windowheight = e.windowHeight;
					}
				});
				return windowheight
			}
		},
		created() {
			this.password = uni.getStorageSync('password')
			if(uni.getStorageSync('username')) this.username = uni.getStorageSync('username')
			if(uni.getStorageSync('remember')){
				this.isshow = true
				this.password = uni.getStorageSync('password')
			}else{
				this.isshow = false
			}
			if(uni.getStorageSync('loginId')){
				uni.switchTab({
					url:"../index/index"
				})
			}
		},
		methods:{
			login(){
				uni.setStorageSync('username',this.username)
				if(uni.getStorageSync('remember')){
					uni.setStorageSync('password',this.password)
				}
				if(this.username == ""){
					uni.showToast({
						title:"请输入账号名",
						icon:"none"
					})
					return false
				}
				if(this.password == ""){
					uni.showToast({
						title:"请输入密码",
						icon:"none"
					})
					return false
				}
				this.$api.postapi('/api/admin/app_login',{
					username: this.username,
					userpwd: this.password
				}).then(res => {
					console.log(res)
					if(res.data.code==0){
						uni.showToast({
							title:res.data.msg,
							icon:"none"
						})
					}
					if(res.data.code==1){
						uni.showToast({
							title:res.data.msg
						})
						uni.setStorageSync('is_publish_task',JSON.stringify(res.data.is_publish_task))
						uni.setStorageSync('loginId',JSON.stringify(res.data.loginId))
						uni.setStorageSync('role',JSON.stringify(res.data.role))
						uni.switchTab({
							url:"../index/index"
						})
					}
				})
			},
			remember(){
				this.isshow = !this.isshow
				if(!this.isshow){
					uni.removeStorageSync('password')
					uni.removeStorageSync('remember')
				}else{
					uni.setStorageSync('password',this.password)
					uni.setStorageSync('remember',JSON.stringify(this.isshow))
				}
			}
		}
	}
</script>

<style lang="less" scoped>
.login{
	width: 100%;
	background: #033785;
	.midinput{
		position: absolute;
		top: 332rpx;
		left: 50%;
		transform: translateX(-50%);
		width: 96%;
		height: 570rpx;
		background-image: url(../../static/icon/6952.png);
		background-size: 100% 100%;
		padding-top: 73rpx;
		box-sizing: border-box;
		z-index: 999;
		position: relative;
		.remember{
			width: 634rpx;
			margin: 0 auto;
			margin-top: 23rpx;
			display: flex;
			align-items: center;
			text{
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				margin-left: 10rpx;
			}
			.noactive{
				width: 30rpx;
				height: 30rpx;
				background: #2C3C63;
				border: 1px solid #5AE8FF;
			}
			.active{
				width: 30rpx;
				height: 30rpx;
				border: 1rpx solid #5AE8FF;
				background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
				display: flex;
				align-items: center;
				image{
					width: 31rpx;
					height: 25rpx;
				}
			}
			
		}
		.user,.pass{
			margin: 0 auto;
			width: 634rpx;
			height: 92rpx;
			display: flex;
			align-items: center;
			view{
				width: 90rpx;
				height: 92rpx;
				background: #073B6E;
				border: 1rpx solid #4492C2;
				box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
				image{
					width: 100%;
					height: 92rpx;
				}
			}
			input{
				width: 544rpx;
				height: 92rpx;
				background: #073B6E;
				padding-left: 10rpx;
				box-sizing: border-box;
				font-size: 30rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 44rpx;
				color: rgba(255,255,255,0.7);
			}
		}
		.user{
			margin-bottom: 24rpx;
		}
		.loginbtn{
			width: 90%;
			position: absolute;
			bottom: 16%;
			left: 50%;
			transform: translateX(-50%);
			border: 1rpx solid #5AE8FF;
			background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
			box-shadow: -2rpx 0px 5rpx rgba(90, 232, 255, 0.7);
			font-size: 40rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #FFFFFF;
		}
	}
	.top{
		width: 100%;
		height: 355rpx;
		position: absolute;
		top: 0;
	}
	.titleimg{
		width: 686.66rpx;
		height: 134rpx;
		position: absolute;
		top: 177rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.bot{
		width: 100%;
		height: 660rpx;
		position: absolute;
		bottom: 0;
	}
}
</style>
