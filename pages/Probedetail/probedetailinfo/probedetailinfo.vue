<template>
	<view class="probedetailinfo">
		<headerTab title="探头详细信息"></headerTab>
		<view class="wrap">
			<view class="basic">
				<view class="headtitle">
					<image src="../../../static/icon/6834.png" mode=""></image>
					<text>基本信息</text>
				</view>
				<view class="list">
					<view class="list-content" v-for="(item,index) in listcontent" :key="index">
						<text>{{ item.title }}</text>
						<text>{{ item.text }}</text>
						<view></view>
					</view>
					<image class="bordbotimg" src="../../../static/icon/15.png" mode=""></image>
				</view>
			</view>
			<view class="basic">
				<view class="headtitle">
					<image src="../../../static/icon/6709.png" mode=""></image>
					<text>安装信息</text>
				</view>
				<view class="list">
					<text class="orig">已绑定的中继器</text>
					<view class="wifi">
						<view class="left">
							<image src="../../../static/icon/wifi.png" mode=""></image>
							<view class="wifi-right">
								<text>S181664</text>
								<text>卡号：192.168.0.4</text>
							</view>
						</view>
						<image class="right" src="../../../static/icon/minright.png" mode=""></image>
					</view>
					<text class="orig">已绑定的输电塔</text>
					<view class="wifi">
						<view class="left">
							<image src="../../../static/icon/6707.png" mode=""></image>
							<view class="wifi-right">
								<text>110kV丹诗文线-N4</text>
								<text>位置：A相位-大号侧-单子导线</text>
							</view>
						</view>
						<image class="right" src="../../../static/icon/minright.png" mode=""></image>
						<image style="width: 569rpx;height: 319rpx;margin-top: 45rpx;" src="../../../static/icon/13.png" mode="aspectFill"></image>
						
					</view>
					<view class="list">
						<view class="list-content">
							<text>探头状态</text>
							<text class="states">工作中</text>
							<view></view>
						</view>
						<view class="list-content">
							<text>投入使用时间</text>
							<text>2021年12月21日</text>
							<view></view>
						</view>
						<view class="list-content">
							<text>已使用</text>
							<text>200天</text>
							<view></view>
						</view>
						<image class="bordbotimg" src="../../../static/icon/15.png" mode=""></image>
					</view>
					<image class="bordbotimg" src="../../../static/icon/15.png" mode=""></image>
				</view>
				
			</view>
			<view class="basic">
				<view class="headtitle">
					<image src="../../../static/icon/6712.png" mode=""></image>
					<text>责任小组信息</text>
				</view>
				<view class="list">
					<view class="list-content">
						<text>运维专责</text>
						<text>周大理</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>运维班长</text>
						<text>王有才</text>
						<view></view>
					</view>
					<image class="bordbotimg" src="../../../static/icon/15.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				listcontent: [
					{
						title: "设备名称",
						text: "温感探头"
					},
					{
						title: "设备编号",
						text: "TT56456498464"
					},
					{
						title: "型号",
						text: "JYB-4089-E"
					},
					{
						title: "工作环境",
						text: "35kV-500kV"
					},
					{
						title: "测量温度",
						text: "-55℃~+130℃"
					},
					{
						title: "正常温度",
						text: "小于30℃"
					},
					{
						title: "告警温度",
						text: "31℃~49℃"
					},
					{
						title: "超温温度",
						text: "50℃以上"
					},
				]
			};
		}
	}
</script>

<style lang="less" scoped>
	.probedetailinfo{
		margin-top: 168rpx;
		background: rgba(3, 55, 133, 1);
		&::after{
			content: '';
			display: inline-block;
			width: 100%;
			height: 660rpx;
			background-image: url(../../../static/icon/13.png);
			background-size: 100% 100%;
			position: fixed;
			bottom: 0;
		}
		.wrap{
			padding: 24rpx 34rpx 52rpx 34rpx;
			.basic{
				position: relative;
				top: 0;
				width: 100%;
				border: 2rpx solid rgba(90, 232, 255, 0.2);
				background: linear-gradient(180deg, rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
				box-shadow: 2rpx 4rpx 10rpx rgba(90, 232, 255, 0.5);
				margin-bottom: 20rpx;
				z-index: 999;
				.headtitle{
					background: linear-gradient(268deg, rgba(0, 64, 174, 0.6) 0%, rgba(0, 30, 91, 0.6) 100%);
					height: 76rpx;
					display: flex;
					align-items: center;
					image{
						width: 48rpx;
						height: 48rpx;
						margin: 0 20rpx;
					}
					text{
						font-size: 38rpx;
						font-family: Source Han Sans CN;
						font-weight: bold;
						line-height: 55rpx;
						color: #FFFFFF;
					}
				}
				.list{
					padding: 20rpx 25rpx;
					box-sizing: border-box;
					.orig{
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 40rpx;
						color: #FBC965;
					}
					.wifi{
						margin-top: 10rpx;
						padding: 43rpx 40rpx 40rpx 40rpx;
						border: 1px solid rgba(68, 146, 194, 0.51);
						background: linear-gradient(180deg, rgba(13, 75, 136, 0.51) 0%, rgba(1, 49, 97, 0.51) 100%);
						box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
						display: flex;
						justify-content: space-between;
						align-items: center;
						flex-wrap: wrap;
						.list{
							width: 100%;
						}
						image{
							width: 120rpx;
							height: 120rpx;
						}
						.right{
							width: 15rpx;
							height: 17rpx;
						}
						.left{
							display: flex;
							align-items: center;
							.wifi-right{
								display: flex;
								flex-direction: column;
								text{
									&:nth-child(1){
										font-size: 32rpx;
										font-family: Source Han Sans CN;
										font-weight: bold;
										line-height: 46rpx;
										color: #FFFFFF;
									}
									&:nth-child(2){
										font-size: 28rpx;
										font-family: Source Han Sans CN;
										font-weight: 400;
										line-height: 40rpx;
										color: #FFFFFF;
										opacity: 0.53;
									}
								}
							}
						}
						
					}
					.bordbotimg{
						width: 100%;
						height: 30rpx;
						position: absolute;
						bottom: 0;
						left: 0;
					}
					.list-content{
						.states{
							position: relative;
							left: 50rpx;
							&::before{
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
						text{
							&:nth-child(1){
								font-size: 28rpx;
								font-family: Source Han Sans CN;
								font-weight: 400;
								line-height: 40rpx;
								color: #FBC965;
							}
							&:nth-child(2){
								margin-left: 24rpx;
								font-size: 30rpx;
								font-family: Source Han Sans CN;
								font-weight: 400;
								line-height: 44rpx;
								color: #FFFFFF;
							}
						}
						view{
							margin: 20rpx 0;
							border: 1rpx solid #5AE8FF;
							box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
							opacity: 0.61;
						}
						&:last-of-type{
							view{
								border: none;
							}
						}
					}
				}
			}
		}
	}

</style>
