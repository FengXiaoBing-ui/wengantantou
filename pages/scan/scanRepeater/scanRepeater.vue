<template>
	<view class="index">
		<headerTab title="中继器详细信息"></headerTab>
		<view class="wrap">
			<view class="basic">
				<view class="headtitle">
					<image src="../../../static/icon/6834.png" mode=""></image>
					<text>基本信息</text>
				</view>

				<view class="list">
					<view class="list-content">
						<text>设备名称</text>
						<text>{{ listcontent.repeater_name }}</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>设备编号</text>
						<text>{{ listcontent.repeater_id }}</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>型号</text>
						<text>{{ listcontent.class }}</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>工作环境</text>
						<text>{{ listcontent.work_environment }}</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>防护等级</text>
						<text>{{ listcontent.protect_state }}</text>
						<view></view>
					</view>
					<image class="bordbotimg" src="../../../static/icon/15.png" mode=""></image>
				</view>
			</view>
			<view class="basic" v-if="listcontent.state != -1">
				<view class="headtitle">
					<image src="../../../static/icon/6709.png" mode=""></image>
					<text>安装信息</text>
				</view>
				<view class="list">
						<view class="list-content">
							<text>中继器IP</text>
							<text>{{ listcontent.repearter_ip }}</text>
							<view></view>
						</view>
						<view class="list-content">
							<text>4G卡号</text>
							<text>{{ listcontent.repeater_phone }}</text>
							<view></view>
						</view>
						<view class="list-content">
							<text>安装位置</text>
							<text>{{ listcontent.tower_position }}</text>
							<view></view>
						</view>
						<text class="orig">关联服务器</text>
						<view class="wifi">
							<view class="left">
								<image src="../../../static/icon/6873.png" mode=""></image>
								<view class="wifi-right">
									<text>{{ listcontent.repearter_url }}</text>
									<text>IP：{{ listcontent.repearter_ip }}</text>
								</view>
							</view>
						</view>
						<view class="list-content">
							<text>安装情况说明</text>
							<text>{{ listcontent.install_detail }}</text>
							<view></view>
						</view>
					<image class="bordbotimg" src="../../../static/icon/15.png" mode=""></image>
				</view>
			</view>
			<view class="basic" v-if="listcontent.state != -1">
				<view class="headtitle">
					<image src="../../../static/icon/6712.png" mode=""></image>
					<text>责任小组信息</text>
				</view>
				<view class="list">
					<view class="list-content">
						<text>运维专责</text>
						<text>{{ listcontent.duty_admin }}</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>运维班长</text>
						<text>{{ listcontent.duty_master }}</text>
						<view></view>
					</view>
					<image class="bordbotimg" src="../../../static/icon/15.png" mode=""></image>
				</view>
			</view>
			<view class="Tips" v-if="listcontent.is_collect == 0">
				<image src="../../../static/icon/tips.png" mode=""></image>
				<text>设备库暂无该设备，若暂不需要激活，可将设备预先加入设备库</text>
			</view>
			<view class="botbtn">
				<view class="btnleft" @click="add" v-if="listcontent.is_collect == 0">
					<image src="../../../static/icon/addtwo.png" mode=""></image>
					<text>加入设备库</text>
				</view>
				<view class="btnright" @click="activation" v-if="listcontent.is_collect == 0 && listcontent.state == -1">
					<image src="../../../static/icon/15144.png" mode=""></image>
					<text>激活设备</text>
				</view>
				<view class="bigbtn" v-if="listcontent.state == -1 && listcontent.is_collect == 1" @click="activation">
					<image src="../../../static/icon/15144.png" mode=""></image>
					<text>激活设备</text>
				</view>
			</view>
		</view>
		<uni-popup type="center" ref="popup" class="pop">
			<view class="poppp">
				<view class="anime">
					<image class="out" src="../../../static/icon/6764.png" mode=""></image>
					<image class="ok" src="../../../static/icon/completed.png" mode=""></image>
				</view>
				<view class="midtext"><text>加入成功，若需激活可到设备详情页进行激活</text></view>
				<view class="botbtn">
					<view class="botbtn-left" @click="open">继续添加</view>
					<view class="botbtn-right" @click="back">
						<image src="../../../static/icon/15144.png" mode=""></image>
						<text>去激活</text>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	data() {
		return {
			listcontent: {},
			deviceIdStr: '',
			type1: false,
			type2: false,
			id: ''
		};
	},
	onBackPress() {
		uni.switchTab({
			url:"../../index/index"
		})
		return true
	},
	onLoad(option) {
		this.id = option.id;
		console.log(this.id)
		this.$store.commit('repeaterid', this.id);
		this.repeater_detail();
	},
	onShow() {
		this.repeater_detail();
		this.$store.state.activerepeater.postion = {}
		this.$store.state.activerepeater.server = {}
	},
	methods: {
		repeater_detail(id) {
			console.log(6453,{ id: this.id, loginId: uni.getStorageSync('loginId') })
			this.$api.postapi('/api/repeater/sel_repeater_detail', { id: this.id, loginId: uni.getStorageSync('loginId') }).then(res => {
				console.log(res);
				this.listcontent = res.data.data;
			});
		},
		activation() {
			this.$store.state.activerepeater.postion = {}
			this.$store.state.activerepeater.server = {}
			uni.navigateTo({
				url: '../activationrepeater/activationrepeater'
			});
		},
		open() {
			this.$refs.popup.close();
			uni.switchTab({
				url: '../../index/index'
			});
		},
		back() {
			this.$refs.popup.close();
			this.$store.state.activerepeater.postion = ''
			this.$store.state.activerepeater.server = ''
			uni.navigateTo({
				url: '../activationrepeater/activationrepeater'
			});
		},
		add() {
			this.$api.postapi('/api/repeater/collect_repeater', { id: this.id, loginId: uni.getStorageSync('loginId') }).then(res => {
				console.log(res);
				if (res.data.code == 1) {
					this.$refs.popup.open();
				}
			});
		}
	}
};
</script>

<style lang="less" scoped>
.pop {
	position: absolute;
	z-index: 99999;
	.poppp {
		width: 620rpx;
		height: 503rpx;
		background-image: url(../../../static/icon/6952.png);
		background-size: 100% 100%;
		.anime {
			width: 203rpx;
			height: 203rpx;
			position: relative;
			left: 50%;
			top: 80rpx;
			transform: translateX(-50%);
			.out {
				width: 203rpx;
				height: 203rpx;
				animation: anmie 3s linear infinite;
				@keyframes anmie {
					0% {
						-webkit-transform: rotate(0deg);
					}
					25% {
						-webkit-transform: rotate(90deg);
					}
					50% {
						-webkit-transform: rotate(180deg);
					}
					75% {
						-webkit-transform: rotate(270deg);
					}
					100% {
						-webkit-transform: rotate(360deg);
					}
				}
			}
			.ok {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				width: 146rpx;
				height: 143rpx;
			}
		}
		.midtext {
			margin-top: 100rpx;
			display: flex;
			flex-direction: column;
			align-items: center;
			text {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 40rpx;
				color: #ffffff;
				opacity: 1;
			}
		}
		.botbtn {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 80%;
			margin: 0 auto;
			margin-top: 27rpx;
			.botbtn-left {
				width: 48%;
				height: 88rpx;
				border: 1rpx solid #5ae8ff;
				background: linear-gradient(180deg, #3e6e80 0%, #001b4a 100%);
				opacity: 0.62;
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 46rpx;
				color: #ffffff;
				text-align: center;
				line-height: 88rpx;
			}
			.botbtn-right {
				width: 48%;
				height: 88rpx;
				border: 1rpx solid #5ae8ff;
				background: linear-gradient(180deg, #5ae8ff 0%, #1c54b8 100%);
				box-shadow: -2rpx 0px 5rpx rgba(90, 232, 255, 0.7);
				opacity: 1;
				display: flex;
				align-items: center;
				justify-content: center;
				text {
					font-size: 32rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 46rpx;
					color: #ffffff;
				}
				image {
					width: 50rpx;
					height: 50rpx;
				}
			}
		}
	}
}
.wrap {
	padding: 24rpx 34rpx 52rpx 34rpx;
	.basic {
		position: relative;
		top: 168rpx;
		width: 100%;
		border: 2rpx solid rgba(90, 232, 255, 0.2);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
		box-shadow: 2rpx 4rpx 10rpx rgba(90, 232, 255, 0.5);
		margin-bottom: 20rpx;
		z-index: 999;
		.headtitle {
			background: linear-gradient(268deg, rgba(0, 64, 174, 0.6) 0%, rgba(0, 30, 91, 0.6) 100%);
			height: 76rpx;
			display: flex;
			align-items: center;
			image {
				width: 48rpx;
				height: 48rpx;
				margin: 0 20rpx;
			}
			text {
				font-size: 38rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				line-height: 55rpx;
				color: #ffffff;
			}
		}
		.list {
			padding: 20rpx 25rpx;
			box-sizing: border-box;
			.orig {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 40rpx;
				color: #fbc965;
			}
			.wifi {
				margin-top: 10rpx;
				padding: 43rpx 40rpx 40rpx 40rpx;
				margin: 20rpx 0;
				border: 1px solid rgba(68, 146, 194, 0.51);
				background: linear-gradient(180deg, rgba(13, 75, 136, 0.51) 0%, rgba(1, 49, 97, 0.51) 100%);
				box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
				display: flex;
				justify-content: space-between;
				align-items: center;
				flex-wrap: wrap;
				.list {
					width: 100%;
				}
				image {
					width: 120rpx;
					height: 120rpx;
				}
				.right {
					width: 15rpx;
					height: 17rpx;
				}
				.left {
					display: flex;
					align-items: center;
					.wifi-right {
						display: flex;
						flex-direction: column;
						text {
							&:nth-child(1) {
								font-size: 32rpx;
								font-family: Source Han Sans CN;
								font-weight: bold;
								line-height: 46rpx;
								color: #ffffff;
							}
							&:nth-child(2) {
								font-size: 28rpx;
								font-family: Source Han Sans CN;
								font-weight: 400;
								line-height: 40rpx;
								color: #ffffff;
								opacity: 0.53;
							}
						}
					}
				}
			}
			.bordbotimg {
				width: 100%;
				height: 30rpx;
				position: absolute;
				bottom: 0;
				left: 0;
			}
			.list-content {
				.states {
					position: relative;
					left: 50rpx;
					&::before {
						content: '';
						display: inline-block;
						position: absolute;
						top: 50%;
						left: -50rpx;
						transform: translateY(-50%);
						width: 53rpx;
						height: 53rpx;
						background-image: url(../../../static/icon/6833.png);
						background-size: 100% 100%;
					}
				}
				text {
					&:nth-child(1) {
						display: inline-block;
						min-width: 20%;
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 40rpx;
						color: #fbc965;
					}
					&:nth-child(2) {
						margin-left: 24rpx;
						font-size: 30rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 44rpx;
						color: #ffffff;
					}
				}
				view {
					margin: 20rpx 0;
					border: 1rpx solid #5ae8ff;
					box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
					opacity: 0.61;
				}
				&:last-of-type {
					view {
						border: none;
					}
				}
			}
		}
	}
	.botbtn {
		position: relative;
		bottom: -200rpx;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		box-sizing: border-box;
		.bigbtn {
			width: 100%;
			height: 100rpx;
			border: 1rpx solid #5ae8ff;
			background: linear-gradient(180deg, #5ae8ff 0%, #1c54b8 100%);
			box-shadow: -2rpx 0px 5rpx rgba(90, 232, 255, 0.7);
			opacity: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			image {
				width: 50rpx;
				height: 50rpx;
			}
			text {
				font-size: 36rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 52rpx;
				color: #ffffff;
			}
		}
		.btnleft,
		.btnright {
			width: 55%;
			height: 100rpx;
			border: 1rpx solid #4492c2;
			background: linear-gradient(180deg, #0d4b88 0%, #013161 100%);
			box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
			opacity: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			text {
				font-size: 36rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 52rpx;
				color: #ffffff;
			}
			image {
				width: 50rpx;
				height: 50rpx;
			}
		}
		.btnright {
			border: 1rpx solid #5ae8ff;
			background: linear-gradient(180deg, #5ae8ff 0%, #1c54b8 100%);
			box-shadow: -2rpx 0px 5rpx rgba(90, 232, 255, 0.7);
		}
	}
	.Tips {
		position: relative;
		top: 190rpx;
		z-index: 1;
		width: 100%;
		height: 120rpx;
		background: rgba(255, 252, 230, 0.13);
		border-radius: 8rpx;
		display: flex;
		align-items: flex-start;
		padding: 20rpx 0;
		box-sizing: border-box;
		image {
			width: 36rpx;
			height: 24rpx;
			margin: 0 20rpx;
			margin-top: 10rpx;
		}
		text {
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #ffffff;
		}
	}
}
</style>
