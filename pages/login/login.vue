<template>
	<view class="login" :style="{ height: appheight + 'px' }">
		<image class="top" src="../../static/icon/loginbackground.png" mode=""></image>
		<image class="titleimg" src="../../static/icon/title.png" mode=""></image>
		<image class="bot" src="../../static/icon/6892.png" mode=""></image>
		<view class="midinput">
			<view class="user">
				<view><image src="../../static/icon/loginuser.png" mode=""></image></view>
				<input type="text" value="" placeholder="输入账号名" v-model="username" />
			</view>
			<view class="pass">
				<view><image src="../../static/icon/loginpass.png" mode=""></image></view>
				<input type="password" value="" placeholder="输入登录密码" v-model="password" />
			</view>
			<view class="remember">
				<view class="active" @click="remember" v-if="isshow"><image src="../../static/icon/yes.png" mode=""></image></view>
				<view class="noactive" @click="remember" v-if="!isshow"></view>
				<text>记住密码</text>
			</view>
			<button class="loginbtn" type="default" @click="login">立即登录</button>
		</view>
		<uni-popup ref="popup" class="popup" type="center">
			<Edition @downloadapk="downloadapk" @nexttime="nexttime" :editiondata="editiondata"></Edition>
		</uni-popup>
		<uni-popup :maskClick="false" class="popup" ref="mypopup" type="center">
			<view class="progress">
				<text>安装包更新中...</text>
				<progress :percent="progress" show-info stroke-width="3" />
			</view>
		</uni-popup>
	</view>
</template>

<script>
import Edition from '../../components/edition.vue';
export default {
	components: {
		Edition
	},
	data() {
		return {
			apkurl: '',
			username: '',
			password: '',
			isshow: false,
			backButtonPress: 0,
			progress: '',
			editiondata:{}
			
		};
	},
	onBackPress(e) {
		this.backButtonPress++;
		if (this.backButtonPress >= 2) {
			plus.runtime.quit();
		} else {
			plus.nativeUI.toast('再次返回退出应用');
		}
		setTimeout(() => {
			this.backButtonPress = 0;
		}, 1000);
		return true;
	},
	computed: {
		appheight: function() {
			let windowheight = 0;
			uni.getSystemInfo({
				success(e) {
					windowheight = e.windowHeight;
				}
			});
			return windowheight;
		}
	},
	mounted() {},
	onShow() {
		this.edition();
	},
	created() {
		
		this.password = uni.getStorageSync('password');
		if (uni.getStorageSync('username')) this.username = uni.getStorageSync('username');
		if (uni.getStorageSync('remember')) {
			this.isshow = true;
			this.password = uni.getStorageSync('password');
		} else {
			this.isshow = false;
		}
		if (uni.getStorageSync('loginId')) {
			uni.switchTab({
				url: '../index/index'
			});
		}
	},
	methods: {
		//现在升级
		downloadapk() {
			this.$refs.popup.close();
			this.$refs.mypopup.open();
			const downloadTask = uni.downloadFile({
				url: this.apkurl,
				success: respose => {
					if (respose.statusCode === 200) {
						uni.saveFile({
							tempFilePath: respose.tempFilePath,
							success: resData => {
								uni.openDocument({
									filePath: resData.savedFilePath
								});
							}
						});
					}
				}
			});
			downloadTask.onProgressUpdate(res => {
				console.log('下载进度' + res.progress);
				this.progress = res.progress;
				if (res.progress == 100) {
					this.$refs.mypopup.close();
				}
			});
		},
		//下次升级
		nexttime(){
			this.$refs.popup.close();
			this.$refs.mypopup.close();
		},
		edition() {
			// console.log('ok', plus.runtime.version);
			this.$api.postapi('/api/fuc/check_update', { version: plus.runtime.version }).then(res => {
				console.log('ok',res);  
				if (res.data.code == 1) {
					this.editiondata = res.data.data
					this.$refs.popup.open();
					this.apkurl = res.data.data.url;

					// var urlStr = encodeURI(res.data.data)
					// plus.runtime.openURL(urlStr)
				} else {
					this.$refs.popup.close();
				}
			});
		},
		login() {
			uni.setStorageSync('username', this.username);
			if (uni.getStorageSync('remember')) {
				uni.setStorageSync('password', this.password);
			}
			if (this.username == '') {
				uni.showToast({
					title: '请输入账号名',
					icon: 'none'
				});
				return false;
			}
			if (this.password == '') {
				uni.showToast({
					title: '请输入密码',
					icon: 'none'
				});
				return false;
			}
			this.$api
				.postapi('/api/admin/app_login', {
					username: this.username,
					userpwd: this.password
				})
				.then(res => {
					console.log(res);
					if (res.data.code == 0) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
					}
					if (res.data.code == 1) {
						uni.showToast({
							title: res.data.msg
						});
						uni.setStorageSync('is_publish_task', JSON.stringify(res.data.is_publish_task));
						uni.setStorageSync('loginId', JSON.stringify(res.data.loginId));
						uni.setStorageSync('role', JSON.stringify(res.data.role));
						uni.switchTab({
							url: '../index/index'
						});
					}
				}).catch(err => {
					console.log(err)
				})
		},
		remember() {
			this.isshow = !this.isshow;
			if (!this.isshow) {
				uni.removeStorageSync('password');
				uni.removeStorageSync('remember');
			} else {
				uni.setStorageSync('password', this.password);
				uni.setStorageSync('remember', JSON.stringify(this.isshow));
			}
		}
	}
};
</script>

<style lang="less" scoped>
.login {
	width: 100%;
	background: #033785;
	.popup {
		position: absolute;
		z-index: 999;
		.progress {
			width: 300rpx;
			background: #ffffff;
			border-radius: 10rpx;
			padding: 32rpx;
		}
		.upgrade {
			position: fixed;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			width: 620rpx;
			padding-bottom: 30rpx;
			border: 1rpx solid #5ae8ff;
			background: linear-gradient(180deg, #41c9fc 0%, #1c54b8 100%);
			z-index: 9999999;
			opacity: 0.9;
			text-align: center;
			.upgrade_logo {
				transform: translateY(-74rpx);
				width: 620rpx;
				height: 207rpx;
			}
			.btn {
				margin-top: 20rpx;
				display: flex;
				align-items: center;
				justify-content: space-evenly;
				.btn_left {
					width: 271rpx;
					height: 88rpx;
					border: 1rpx solid #5ae8ff;
					background: linear-gradient(180deg, #5ae8ff 0%, #1c54b8 100%);
					box-shadow: -2rpx 0rpx 5rpx rgba(90, 232, 255, 0.7);
					line-height: 88rpx;
				}
				.btn_right {
					width: 271rpx;
					height: 88rpx;
					border: 1rpx solid #5ae8ff;
					background: linear-gradient(180deg, #3e6e80 0%, #001b4a 100%);
					opacity: 0.62;
					line-height: 88rpx;
				}
				.btn_left text,
				.btn_right text {
					font-size: 30rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #ffffff;
				}
			}
			.bot_icon {
				width: 100%;
				height: 30rpx;
				position: absolute;
				bottom: 0;
				left: 0;
			}
			.upgrade_content {
				padding: 22rpx 50rpx;
				display: flex;
				flex-direction: column;
				text-align: start;
				flex-wrap: wrap;
				.gengxin {
					width: 143rpx;
					height: 55rpx;
					text-align: start;
				}
				text {
					margin-top: 10rpx;
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #ffffff;
				}
			}
			.size_package {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 35rpx;
				color: #ffffff;
				opacity: 0.6;
			}
			.title {
				font-size: 36rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #ffffff;
				position: relative;
				top: -40rpx;
			}
			.edition {
				width: 516rpx;
				height: 120rpx;
				background: rgba(3, 47, 94, 0.15);
				border-radius: 22rpx;
				margin: 0 auto;
				position: relative;
				display: flex;
				justify-content: space-evenly;
				.icon {
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					top: 40rpx;
					width: 39rpx;
					height: 38rpx;
				}
				.old_edition,
				.new_edition {
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 40rpx;
					color: #ffffff;
				}
				.old_edition {
					opacity: 0.6;
				}
				.new_edition {
					opacity: 1;
				}
			}
		}
	}

	.midinput {
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
		.remember {
			width: 634rpx;
			margin: 0 auto;
			margin-top: 23rpx;
			display: flex;
			align-items: center;
			text {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #ffffff;
				margin-left: 10rpx;
			}
			.noactive {
				width: 30rpx;
				height: 30rpx;
				background: #2c3c63;
				border: 1px solid #5ae8ff;
			}
			.active {
				width: 30rpx;
				height: 30rpx;
				border: 1rpx solid #5ae8ff;
				background: linear-gradient(180deg, #5ae8ff 0%, #1c54b8 100%);
				display: flex;
				align-items: center;
				image {
					width: 31rpx;
					height: 25rpx;
				}
			}
		}
		.user,
		.pass {
			margin: 0 auto;
			width: 634rpx;
			height: 92rpx;
			display: flex;
			align-items: center;
			view {
				width: 90rpx;
				height: 92rpx;
				background: #073b6e;
				border: 1rpx solid #4492c2;
				box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
				image {
					width: 100%;
					height: 92rpx;
				}
			}
			input {
				width: 544rpx;
				height: 92rpx;
				background: #073b6e;
				padding-left: 10rpx;
				box-sizing: border-box;
				font-size: 30rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 44rpx;
				color: rgba(255, 255, 255, 0.7);
			}
		}
		.user {
			margin-bottom: 24rpx;
		}
		.loginbtn {
			width: 90%;
			position: absolute;
			bottom: 16%;
			left: 50%;
			transform: translateX(-50%);
			border: 1rpx solid #5ae8ff;
			background: linear-gradient(180deg, #5ae8ff 0%, #1c54b8 100%);
			box-shadow: -2rpx 0px 5rpx rgba(90, 232, 255, 0.7);
			font-size: 40rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			color: #ffffff;
		}
	}
	.top {
		width: 100%;
		height: 355rpx;
		position: absolute;
		top: 0;
	}
	.titleimg {
		width: 686.66rpx;
		height: 134rpx;
		position: absolute;
		top: 177rpx;
		left: 50%;
		transform: translateX(-50%);
	}
	.bot {
		width: 100%;
		height: 660rpx;
		position: absolute;
		bottom: 0;
	}
}
</style>
