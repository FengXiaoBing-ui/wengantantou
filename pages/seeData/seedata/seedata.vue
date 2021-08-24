<template>
	<view class="index">
		<headerTab title="设备数据总览"></headerTab>
		<view class="wrap">
			<view class="headerimg">
				<image id="mengban1" src="../../../static/icon/mengban1.png" mode=""></image>
				<image id="mengban2" src="../../../static/icon/mengban2.png" mode=""></image>
				<view class="system_time">
					<text>系统总运行时间</text>
				</view>
				<view class="all_time">
					<text>{{ screening.days }}</text>
					<text>天</text>
					<text>{{ screening.hours }}</text>
					<text>小时</text>
					<text>{{ screening.minutes }}</text>
					<text>分钟</text>
				</view>
				<view class="last_time"> 
					<text>上次重启于：{{ screening.restart_time }}</text>
				</view>
			</view>
			<view class="mid_l1_and_r2">
				<navigator url="../StatisticsProbe/StatisticsProbe">
					<view class="left">
						<view class="anime_icon">
							<image class="in" src="../../../static/icon/6816_1.png" mode=""></image>
							<image class="out" src="../../../static/icon/6989.png" mode=""></image>
						</view>
						<view class="content">
							<text>注册激活探头</text>
							<text>{{ screening.sensor_count }}</text>
							<view class="detail_box">
								<text>详细统计</text>
								<image src="../../../static/icon/right.png" mode=""></image>
							</view>
						</view>
						
						<image class="bot_bord" src="../../../static/icon/mengban15.png" mode=""></image>
					</view>
				</navigator>
				<navigator url="../repeaterStatistics/repeaterStatistics">
					<view class="right">
					<view class="anime_icon">
						<image class="in" src="../../../static/icon/7024.png" mode=""></image>
						<image class="out" src="../../../static/icon/6989.png" mode=""></image>
					</view>
					<view class="content">
						<text>注册中继器</text>
						<text>{{ screening.repeater_count }}</text>
						<view class="detail_box">
							<text>详细统计</text>
							<image src="../../../static/icon/right.png" mode=""></image>
						</view>
					</view>
					<image class="bot_bord" src="../../../static/icon/mengban15.png" mode=""></image>
				</view>
				</navigator>
			</view>
			<view class="mid_count">
				<view class="left">
					<image class="top_icon" src="../../../static/icon/7052.png" mode=""></image>
					<text class="name">登记输电塔</text>
					<text class="count">{{ screening.tagan_count }} <text style="font-size: 24rpx;opacity: 0.6;">座</text></text>
					<image class="bot_bord" src="../../../static/icon/13967.png" mode=""></image>
				</view>
				<view class="right">
					<image class="top_icon" src="../../../static/icon/line_7053.png" mode=""></image>
					<text class="name">登记输电线路</text>
					<text class="count">{{ screening.line_count }}<text style="font-size: 24rpx;opacity: 0.6;">条</text></text>
					<image class="bot_bord" src="../../../static/icon/13967.png" mode=""></image>
				</view>
			</view>
			<view class="mid_count">
				<view class="left" style="flex-direction: unset;justify-content: center;">
					<image class="top_icon" style="width: 87rpx;height: 87rpx;" src="../../../static/icon/7100@2x.png" mode=""></image>
					<view class="count_box">
						<text class="name">维护班组</text>
						<text class="count">{{ screening.maintenance_team_count }}<text class="name">个</text></text>
						<image class="bot_bord" src="../../../static/icon/13967.png" mode=""></image>
					</view>
				</view>
				<view class="right" style="flex-direction: unset;justify-content: center;">
					<image class="top_icon" style="width: 87rpx;height: 87rpx;" src="../../../static/icon/7099@2x.png" mode=""></image>
					<view class="count_box">
						<text class="name">维护人员</text>
						<text class="count">{{ screening.maintenance_people_count }} <text class="name">个</text> </text>
						<image class="bot_bord" src="../../../static/icon/13967.png" mode=""></image>
					</view>
					
				</view>
			</view>
<!-- 			<view class="bot_box">
				<view class="header_data">
					<view class="equipment">
						<text>正常设备</text>
						<text>7854</text>
						<view class="bord" style="background: #60E2AA;"></view>
					</view>
					<view class="equipment">
						<text>正常设备</text>
						<text>7854</text>
						<view class="bord" style="background: #FF5283;"></view>
					</view>
					<view class="equipment">
						<text>正常设备</text>
						<text>7854</text>
						<view class="bord" style="background: #F6B532;"></view>
					</view>
					<view class="equipment">
						<text>正常设备</text>
						<text>7854</text>
						<view class="bord" style="background: #72E5FF;"></view>
					</view>
				</view>
				<view class="charts-box">
				  <qiun-data-charts type="pie" :opts="{'color':color,fontColor:'#fff',legend:{show: false}}" :chartData="chartsDataRose1"/>
				</view>
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				color:[
					'#60E2AA','#F6B532','#72E5FF','#FF5283'
				],
				chartsDataRose1:{
					series: [{
						"data": [
					    {
					    	"name": "正常",
					    	"value": 60
					    }, {
					    	"name": "异常",
					    	"value": 20
					    }, {
					    	"name": "待维修",
					    	"value": 10
					    }, {
					    	"name": "待检修",
					    	"value": 10
					    }
					  ]
					}]
				},
				screening:{},
			};
		},
		created() {
			this.datascreening()
		},
		onShow() {
			this.datascreening()
		},
		methods:{
			datascreening(){
				this.$api.postapi('/api/Watchdata/device_run_data_message').then(res => {
					console.log(res)
					this.screening = res.data
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	padding: 0 34rpx;
	box-sizing: border-box;
	position: relative;
	z-index: 10;
	.charts-box{
		width: 682rpx;
		height: 380rpx;
	}
	.headerimg{
		margin-top: 200rpx;
		width: 100%;
		height: 270rpx;
		border: 2px solid rgba(90, 232, 255, 0.6);
		background: linear-gradient(180deg, rgba(59, 242, 255, 0.6) 0%, rgba(5, 51, 159, 0.6) 100%);
		box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
		box-sizing: border-box;
		position: relative;
		.system_time{
			margin: 0 auto;
			margin-top: 24rpx;
			width: 234rpx;
			height: 43rpx;
			background: #134A86;
			opacity: 1;
			border-radius: 24rpx;
			text-align: center;
			text{
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 43rpx;
				color: #FFFFFF;
			}
		}
		.all_time{
			text-align: center;
			margin-top: 24rpx;
			text{
				font-size: 48rpx;
				font-family: Roboto;
				font-weight: bold;
				line-height: 58rpx;
				color: #FFFCE6;
				&:nth-child(2n){
					color: #FFFFFF;
					opacity: 0.6;
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 40rpx;
					margin: 0 16rpx 0 8rpx;
				}
			}
		}
		.last_time{
			margin: 0 auto;
			width: 400rpx;
			height: 46rpx;
			background: rgba(3, 7, 12, 0.08);
			border-radius: 24rpx;
			text-align: center;
			margin-top: 24rpx;
			text{
				font-size: 24rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 35rpx;
				color: #54D6FF;
			}
		}
		#mengban1{
			position: absolute;
			right: 0;
			bottom:0;
			width: 137rpx;
			height: 155rpx;
		}
		#mengban2{
			position: absolute;
			left: 0;
			top:0;
			width: 125rpx;
			height: 182rpx;
		}
	}
	.mid_l1_and_r2{
		margin-top: 16rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.left,.right{
			width: 333rpx;
			height: 364rpx;
			border: 2rpx solid rgba(90, 232, 255, 0.6);
			background: linear-gradient(180deg, rgba(59, 242, 255, 0.6) 0%, rgba(5, 51, 159, 0.6) 100%);
			box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
			box-sizing: border-box;
			position: relative;
			.bot_bord{
				position: absolute;
				width: 333rpx;
				height: 30rpx;
				bottom: 0;
			}
			.anime_icon{
				margin-top: 22rpx;
				background: none;
				border: none;
				box-shadow: none;
				left: 50%;
				transform: translateX(-50%);
				width: 127rpx;
				height: 125rpx;
				position: relative;
				.in{
					position: absolute;
					width: 97rpx;
					height: 97rpx;
					left: 50%;
					top: 50%;
					transform: translate(-50%,-50%);
				}
				.out{
					position: absolute;
					width: 127rpx;
					height: 125rpx;
					animation:turn 3s linear infinite;
					@keyframes turn{
					  0%{-webkit-transform:rotate(0deg);}
					  25%{-webkit-transform:rotate(90deg);}
					  50%{-webkit-transform:rotate(180deg);}
					  75%{-webkit-transform:rotate(270deg);}
					  100%{-webkit-transform:rotate(360deg);}
					}
				}
			}
			.content{
				display: flex;
				flex-direction: column;
				align-items: center;
				color: #FFFFFF;
				text{
					&:nth-child(1){
						margin-top: 10rpx;
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 40rpx;
						}
					&:nth-child(2){
						font-size: 48rpx;
						font-family: Roboto;
						font-weight: bold;
						line-height: 58rpx;
						color: #FFFCE6;
					}
				}
				.detail_box{
					margin-top: 16rpx;
					width: 159rpx;
					height: 53rpx;
					border: 1px solid #5AE8FF;
					background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
					box-shadow: -2rpx 0px 5rpx rgba(90, 232, 255, 0.7);
					display: flex;
					justify-content: center;
					align-items: center;
					text{
						margin: 0;
						font-size: 24rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 35rpx;
						color: #FFFFFF;
					}
					image{
						width: 8rpx;
						height: 10rpx;
						margin-left: 10rpx;
					}
				}
			}
		}
	}
	.mid_count{
		display: flex;
		align-items: center;
		justify-content: space-between;
		.left,.right{
			margin-top: 20rpx;
			width: 333rpx;
			height: 200rpx;
			border: 2rpx solid #5AE8FF;
			background: linear-gradient(180deg, #41C9FC 0%, #1C54B8 100%);
			box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			.count_box{
				display: flex;
				flex-direction: column;
				margin-left: 20rpx;
			}
			.top_icon{
				margin-top: 21rpx;
				width: 60rpx;
				height: 66rpx;
			}
			.name{
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 40rpx;
				color: #FFFFFF;
			}
			.count{
				margin-top: 6rpx;
				font-size: 36rpx;
				font-family: Roboto;
				font-weight: bold;
				line-height: 43rpx;
				color: #FFFCE6;
			}
			.bot_bord{
				position: absolute;
				left: 50%;
				bottom: -14rpx;
				transform: translateX(-50%);
				width: 60rpx;
				height: 27rpx;
			}
		}
	}
	.bot_box{
		margin-top: 20rpx;
		width: 682rpx;
		height: 539rpx;
		border: 2rpx solid #5AE8FF;
		background: linear-gradient(180deg, #41C9FC 0%, #1C54B8 100%);
		box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
		.header_data{
			width: 100%;
			height: 162rpx;
			background: linear-gradient(180deg,rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
			display: flex;
			align-items: center;
			justify-content: space-evenly;
			.equipment{
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-evenly;
				text{
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 37rpx;
					color: #FFFFFF;
					&:nth-child(2){
						font-size: 36rpx;
						font-family: Roboto;
						font-weight: bold;
						line-height: 43rpx;
						color: #FFFCE6;
					}
				}
				.bord{
					margin-top: 10rpx;
					width: 36rpx;
					height: 5rpx;
				}
			}
		}
	}
}
</style>
