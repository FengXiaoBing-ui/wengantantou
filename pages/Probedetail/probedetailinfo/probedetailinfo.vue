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
					<view class="list-content">
						<text>设备名称</text>
						<text>{{ listcontent.device_name }}</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>设备编号</text>
						<text>{{ listcontent.device_id }}</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>型号</text>
						<text>{{ listcontent.class_name }}</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>工作环境</text>
						<text>{{ listcontent.normal_lower }}~{{listcontent.normal_upper}}℃</text>
						<view></view>
					</view>
					<!-- <view class="list-content">
						<text>测量温度</text>
						<text>{{ listcontent.measure_lower }}℃-{{ listcontent.measure_upper }}℃</text>
						<view></view>
					</view>
					<view class="list-content">
						<text>正常温度</text>
						<text>{{ listcontent.normal_lower }}℃-{{ listcontent.normal_upper }}℃</text>
						<view></view>
					</view>-->
					<view class="list-content">
						<text>异常告警温度</text>
						<text>(含){{ listcontent.high_temperature }}~(不含){{ listcontent.over_temperature }}℃</text>
						<view></view>
					</view> 
					<view class="list-content">
						<text>超温温度</text>
						<text> ≥{{ listcontent.over_temperature }}℃</text>
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
					<text class="orig" v-if="listcontent.state_text=='工作中'">已绑定的中继器</text>
					<view class="wifi" v-if="listcontent.state_text=='工作中'">
						<view class="left">
							<image src="../../../static/icon/wifi.png" mode=""></image>
							<view class="wifi-right">
								<text>{{ listcontent.state_text }}</text>
								<text>卡号：{{ listcontent.repeater_ip }}</text>
							</view>
						</view>
					</view>
					<text class="orig" v-if="listcontent.state_text=='工作中'">已绑定的输电塔</text>
					<view class="wifi" v-if="listcontent.state_text=='工作中'">
						<view class="left">
							<image src="../../../static/icon/6707.png" mode=""></image>
							<view class="wifi-right">
								<text>{{ listcontent.line_tagan_position }}</text>
								<text>位置：{{ listcontent.detail_position }}</text>
							</view>
						</view>
						<image style="width: 569rpx;height: 319rpx;margin-top: 45rpx;" :src="listcontent.ware_picture" mode="aspectFill"></image>
						
					</view>
					<view class="list">
						<view class="list-content">
							<text>探头状态</text>
							<text :class="{'statesword':listcontent.state_text=='工作中','stateswait':listcontent.state_text=='待激活','statesout':listcontent.state_text=='已离线'}">{{ listcontent.state_text }}</text>
							<view></view>
						</view>
						<view class="list-content">
							<text>投入使用时间</text>
							<text>{{ listcontent.run_time }}</text>
							<view></view>
						</view>
						<view class="list-content">
							<text>已使用</text>
							<text>{{ listcontent.run_day }}天</text>
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
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: "",
				listcontent: {}
			};
		},
		created() {
		},
		onLoad(option) {
			this.id = option.id
			this.info()
		},
		methods:{
			info(){
				this.$api.postapi('/api/Sensor/selSensorBaseDetial',{id:this.id,loginId:uni.getStorageSync('loginId')}).then(res => {
					console.log(res)
					this.listcontent = res.data.data
				})
			}
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
						.statesword{
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
						.stateswait{
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
								background-image: url(../../../static/icon/6837.png);
								background-size: 100% 100%;
							}
						}
						.statesout{
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
								background-image: url(../../../static/icon/6832.png);
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
