<template>
	<view class="index">
		<headerTab title="探头统计"></headerTab>
		<view class="wrap">
			<view class="header_box">
				<view class="system_count">
					<text>系统总运行时间</text>
				</view>
				<text class="title">5478</text>
				<image class="mengban43" src="../../../static/icon/43.png" mode=""></image>
				<image class="bord_icon" src="../../../static/icon/15.png" mode=""></image>
			</view>
			<view class="mid_echart">
				<view class="left">
					<view class="equipment_text">
						<view class="equipment_states">
							<view class="green"></view>
							<text>正常设备</text>
						</view>
						<text class="count">5021</text>
					</view>
					<view class="equipment_text">
						<view class="equipment_states">
							<view class="yellow"></view>
							<text>预警设备</text>
						</view>
						<text class="count">5021</text>
					</view>
					<view class="equipment_text">
						<view class="equipment_states">
							<view class="red"></view>
							<text>超温设备</text>
						</view>
						<text class="count">5021</text>
					</view>
					
				</view>
				<view class="right">
					<image class="panel" src="../../../static/icon/14441.png" mode=""></image>
					<view class="circle">
					  <view class="circle-left"></view>
					  <view class="circle-right"></view>
					  <view class="circle-bottom-left"></view>
					  <view class="circle-bottom-right"></view>
					</view>
				</view>
			</view>
			<view class="bot_list">
				<view class="warning_count">
					<image class="icon" src="../../../static/icon/7057.png" mode=""></image>
					<view class="all_wraning">
						<text>总预警</text>
						<view class="text_count">
							<text>7845</text>
							<text style="font-size: 24rpx;color: FFFFFF;">次</text>
						</view>
					</view>
					<image class="bot_icon" src="../../../static/icon/13965.png" mode=""></image>
				</view>
				<view class="warning_count">
					<image class="icon" src="../../../static/icon/7058.png" mode=""></image>
					<view class="all_wraning">
						<text>总预警</text>
						<view class="text_count">
							<text>7845</text>
							<text style="font-size: 24rpx;color: FFFFFF;">次</text>
						</view>
					</view>
					<image class="bot_icon" src="../../../static/icon/13965.png" mode=""></image>
				</view>
				<view class="warning_count">
					<image class="icon" src="../../../static/icon/7059.png" mode=""></image>
					<view class="all_wraning">
						<text>总预警</text>
						<view class="text_count">
							<text>7845</text>
							<text style="font-size: 24rpx;color: FFFFFF;">次</text>
						</view>
					</view>
					<image class="bot_icon" src="../../../static/icon/13965.png" mode=""></image>
				</view>
				<view class="warning_count">
					<image class="icon" src="../../../static/icon/7060.png" mode=""></image>
					<view class="all_wraning">
						<text>总预警</text>
						<view class="text_count">
							<text>7845</text>
							<text style="font-size: 24rpx;color: FFFFFF;">次</text>
						</view>
					</view>
					<image class="bot_icon" src="../../../static/icon/13965.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	position: relative;
	top: 200rpx;
	width: 100%;
	padding: 0 34rpx;
	box-sizing: border-box;
	z-index: 9;
	
	.header_box{
		width: 100%;
		height: 171rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.6);
		background: linear-gradient(180deg, rgba(59, 242, 255, 0.6) 0%, rgba(5, 51, 159, 0.6) 100%);
		box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
		position: relative;
		text-align: center;
		.title{
			font-size: 48rpx;
			font-family: Roboto;
			font-weight: bold;
			line-height: 58rpx;
			color: #FFFCE6;
		}
		.system_count{
			width: 234rpx;
			height: 43rpx;
			background: #134A86;
			opacity: 1;
			border-radius: 24rpx;
			margin: 0 auto;
			margin: 24rpx auto 16rpx auto;
			text-align: center;
			text{
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 43rpx;
				color: #54D6FF;
			}
		}
		.mengban43{
			position: absolute;
			left: 0;
			top: 0;
			width: 243rpx;
			height: 171rpx;
		}
		.bord_icon{
			width: 100%;
			height: 30rpx;
			position: absolute;
			bottom: 0;
			left: 0;
		}
	}
	.mid_echart{
		margin-top: 20rpx;
		width: 100%;
		height: 413rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.6);
		background: linear-gradient(180deg,rgba(65, 201, 252, 0.6) 0%, rgba(28, 84, 184, 0.6) 100%);
		box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
		padding: 33rpx 28rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		.left{
			display: flex;
			flex-direction: column;
			align-items: center;
			.equipment_text{
				text-align: center;
				margin-bottom: 27rpx;
				.count{
					font-size: 36rpx;
					font-family: Roboto;
					font-weight: bold;
					line-height: 43rpx;
					color: #FFFCE6;
				}
				.equipment_states{
					margin-bottom: 10rpx;
					width: 192rpx;
					height: 43rpx;
					background: #134A86;
					opacity: 1;
					border-radius: 24rpx;
					display: flex;
					align-items: center;
					justify-content: space-evenly;
					text{
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 43rpx;
						color: #54D6FF;
					}
					.green{
						width: 17rpx;
						height: 17rpx;
						background: #60E2AA;
						border-radius: 50%;
					}
					.yellow{
						width: 17rpx;
						height: 17rpx;
						background: #F6B532;
						border-radius: 50%;
					}
					.red{
						width: 17rpx;
						height: 17rpx;
						background: #FF5283;
						border-radius: 50%;
					}
				}
			}
			
		}
		.right{
			background-image: url(../../../static/icon/400863698.png);
			background-size: 100% 100%;
			width: 340rpx;
			height: 340rpx;
			position: relative;
			.circle {
			  -webkit-mask: radial-gradient(transparent 80rpx, #000 80rpx);
			  width: 250rpx;
			  height: 250rpx;
			  overflow: hidden;
			  border-radius: 50%;
			  position: absolute;
			  left: 50%;
			  top: 50%;
			  transform: translate(-50%,-50%);
			  z-index: 999999;
			}
			 
			.circle-left {
			  width: 50%;
			  height: 100%;
			  background: #60E2AA;
			  transform-origin: 100% 50%;
			  position: absolute;
			  left: 0;
			  z-index: 0;
			  transform: rotate(-72deg);
			}
			 
			.circle-right {
			  width: 50%;
			  height: 100%;
			  background: #60E2AA;
			  transition: transform 1s linear;
			  transform-origin: 0% 50%;
			  position: absolute;
			  right: 0;
			  z-index: 2;
			  transform: rotate(36deg);
			}
			 
			.circle-bottom-left {
			  width: 50%;
			  height: 100%;
			  background: #F6B532;
			  position: absolute;
			  left: 0;
			  z-index: -1;
			}
			 
			.circle-bottom-right {
			  width: 50%;
			  height: 100%;
			  background: #FF5283;
			  position: absolute;
			  right: 0;
			  z-index: 1;
			}
			 
			.info {
			  width: 250rpx;
			  height: 250rpx;
			  line-height: 250rpx;
			  text-align: center;
			  margin-top: 250rpx;  
			}
			.panel{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
				width: 104rpx;
				height: 93rpx;
			}
		}
	}
	.bot_list{
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		.warning_count{
			margin-top: 20rpx;
			width: 333rpx;
			height: 200rpx;
			border: 2rpx solid rgba(90, 232, 255, 0.5);
			background: linear-gradient(180deg, rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
			box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			.all_wraning{
				margin-left: 20rpx;
				.text_count{
					text{
						font-size: 36rpx;
						font-family: Roboto;
						font-weight: bold;
						line-height: 43rpx;
						color: #FFFCE6;
					}
				}
				text{
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 35rpx;
					color: #FFFFFF;
				}
			}
			.icon{
				width: 87rpx;
				height: 87rpx;
			}
			.bot_icon{
				width: 60rpx;
				height: 27rpx;
				position: absolute;
				bottom: -14rpx;
				left: 50%;
				transform: translateX(-50%);
			}
			
		}
	}
}
</style>
