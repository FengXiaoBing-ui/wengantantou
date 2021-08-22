<template>
	<view class="index">
		<headerTab title="版本说明"></headerTab>
		<view class="wrap">
			<view class="logo">
				<image src="../../../static/icon/logo.png" mode=""></image>
				<text>无线温度探头监测预警平台</text>
				<view class="edition">V {{ version }}</view>
			</view>
			<view class="box">
				<view class="list" @click="jump">
					<view class="list-left">
						<image src="../../../static/icon/16982.png" mode=""></image>
						<text>升级记录</text>
					</view>
					<image src="../../../static/icon/minright.png" mode=""></image>
				</view>
				<view class="bord"></view>
				<view class="list" @click="edition">
					<view class="list-left">
						<image src="../../../static/icon/6982.png" mode=""></image>
						<text>检查更新</text>
					</view>
					<image src="../../../static/icon/minright.png" mode=""></image>
				</view>
			</view>
			<view class="agreement">
				<text @click="agreement('用户协议',1)">《用户协议》</text>和<text @click="agreement('隐私政策',2)">《隐私政策》</text>
			</view>
			<uni-popup ref="downloadpopup" class="popup" type="center">
				<Edition @downloadapk="downloadapk" @nexttime="nexttime" :editiondata="editiondata"></Edition>
			</uni-popup>
			<uni-popup :maskClick="false" ref="popup" type="center">
				<view class="progress">
					<text>安装包更新中...</text>
					<progress :percent="progress" show-info stroke-width="3" />
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import Edition from '../../../components/edition.vue';
	export default {
		components: {
			Edition
		},
		data() {
			return {
				version: "",
				progress: 0,
				editiondata: {}
			};
		},
		created() {
			this.version = plus.runtime.version
		},
		methods: {
			jump() {
				uni.navigateTo({
					url: "../upgradelist/upgradelist"
				})
			},
			agreement(title, type) {
				uni.navigateTo({
					url: "../agreement/agreement?title=" + title + '&type=' + type
				})
			},
			nexttime(){
				var _this = this
				_this.$refs.downloadpopup.close();
			},
			downloadapk() {
				var _this = this
				_this.$refs.downloadpopup.close();
				_this.$refs.popup.open()
				const downloadTask = uni.downloadFile({
					url: _this.editiondata.url,
					success: (respose) => {
						if (respose.statusCode === 200) {
							uni.saveFile({
								tempFilePath: respose.tempFilePath,
								success: (resData) => {
									uni.openDocument({
										filePath: resData.savedFilePath,
									});
								},
							});
						}
					},
				});
				downloadTask.onProgressUpdate((res) => {
					console.log('下载进度' + res.progress);
					_this.progress = res.progress
					if (res.progress == 100) {
						_this.$refs.popup.close()
					}
				})
			},
			edition() {
				var _this = this
				this.$api.postapi('/api/fuc/check_update', {
					version: plus.runtime.version
				}).then(res => {
					if (res.data.code == 1) {
						_this.$refs.downloadpopup.open()
						_this.editiondata = res.data.data

						// var urlStr = encodeURI(res.data.data)
						// plus.runtime.openURL(urlStr)
					} else {
						uni.showToast({
							title: "当前版本已是最新版本",
							icon: "none"
						})
					}
				})

			}
		}
	}
</script>

<style lang="less" scoped>
	.wrap {
		padding: 24rpx 34rpx;
		position: relative;
		top: 168rpx;
		box-sizing: border-box;
		z-index: 1;

		.progress {
			width: 300rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			padding: 32rpx;
		}

		.logo {
			height: 360rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: space-evenly;

			image {
				width: 138rpx;
				height: 138rpx;
			}

			text {
				font-size: 36rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				line-height: 52rpx;
				color: #FFFFFF;
			}

			.edition {
				width: 146rpx;
				height: 52rpx;
				border: 1rpx solid #5AE8FF;
				opacity: 1;
				border-radius: 29rpx;
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				line-height: 52rpx;
				color: #FFFFFF;
				text-align: center;
			}
		}

		.box {
			margin-top: 30rpx;
			padding-left: 24rpx;
			box-sizing: border-box;
			width: 100%;
			border: 2rpx solid rgba(90, 232, 255, 0.7; );
			background: linear-gradient(180deg, rgba(65, 201, 252, 0.7; ) 0%, rgba(28, 84, 184, 0.7; ) 100%);
			box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.7);

			.bord {
				width: 100%;
				height: 1rpx;
				background: rgba(90, 232, 255, 0.5);
			}

			.list {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 30rpx 0;

				.list-left {
					display: flex;
					align-items: center;

					text {
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 40rpx;
						color: #FFFFFF;
					}

					image {
						width: 48rpx;
						height: 48rpx;
						margin-right: 16rpx;
					}
				}

				image {
					width: 14rpx;
					height: 17rpx;
					margin-right: 31rpx;
				}
			}
		}

		.agreement {
			margin-top: 120rpx;
			text-align: center;
			color: rgba(255, 255, 255, 0.5);

			text {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 40rpx;
				color: #5AE8FF;
				text-decoration: underline;
				opacity: 1;
			}
		}
	}
</style>
