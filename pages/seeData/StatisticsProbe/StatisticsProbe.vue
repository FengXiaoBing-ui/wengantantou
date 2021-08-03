<template>
	<view class="index">
		<headerTab title="探头统计"></headerTab>
		<view class="wrap">
			<!-- <view class="header_box">
				<view class="system_count">
					<text>系统总运行时间</text>
				</view>
				<text class="title">5478</text>
				<image class="mengban43" src="../../../static/icon/43.png" mode=""></image>
				<image class="bord_icon" src="../../../static/icon/15.png" mode=""></image>
			</view> -->
			<view class="mid_echart">
				<view class="left">
					<text class="title">当前预警率</text>
					<qiun-data-charts
						type="gauge"
						:opts="{
							fontSize: 10,
							fontColor: '#ffffff',
							title: { name: '8%', color: '#FFFCE6', fontSize: 24, offsetY: 50 },
							subtitle: { name: '' },
							extra: { gauge: { labelColor: '#fff', width: 8, splitLine: { childWidth: 8, width: 10 }, pointer: { width: 10 } } }
						}"
						:chartData="chartsDataGauge1"
					/>
				</view>
				<view class="right">
					<text class="title">当前在线率</text>
					<qiun-data-charts
						type="gauge"
						:opts="{
							fontSize: 10,
							fontColor: '#ffffff',
							title: { name: '88%', color: '#FFFCE6', fontSize: 24, offsetY: 50 },
							subtitle: { name: '' },
							extra: { gauge: { labelColor: '#fff', width: 8, splitLine: { childWidth: 8, width: 10 }, pointer: { width: 10 } } }
						}"
						:chartData="chartsDataGauge2"
					/>
				</view>
			</view>
			<view class="bot_list">
				<view class="warning_count" style="width: 216rpx;flex-direction: column;align-items: center;justify-content: center;">
					<image class="icon" style="width: 54rpx;height: 54rpx;" src="../../../static/icon/7026@2x.png" mode=""></image>
					<view class="all_wraning">
						<text style="color: #54C8F4;">正常</text>
						<view class="text_count">
							<text>7845</text>
							<text style="font-size: 24rpx;color: FFFFFF;opacity: 0.5;">支</text>
						</view>
					</view>
					<image class="bot_icon" src="../../../static/icon/13965.png" mode=""></image>
				</view>
				<view class="warning_count" style="width: 216rpx;flex-direction: column;align-items: center;justify-content: center;">
					<image class="icon" style="width: 54rpx;height: 54rpx;" src="../../../static/icon/7097@2x.png" mode=""></image>
					<view class="all_wraning">
						<text style="color: #FFE300;">正常</text>
						<view class="text_count">
							<text>7845</text>
							<text style="font-size: 24rpx;color: FFFFFF;opacity: 0.5;">次</text>
						</view>
					</view>
					<image class="bot_icon" src="../../../static/icon/13965.png" mode=""></image>
				</view>
				<view class="warning_count" style="width: 216rpx;flex-direction: column;align-items: center;justify-content: center;">
					<image class="icon" style="width: 54rpx;height: 54rpx;" src="../../../static/icon/7098@2x.png" mode=""></image>
					<view class="all_wraning">
						<text style="color: #FF8784;">正常</text>
						<view class="text_count">
							<text>7845</text>
							<text style="font-size: 24rpx;color: FFFFFF;opacity: 0.5;">次</text>
						</view>
					</view>
					<image class="bot_icon" src="../../../static/icon/13965.png" mode=""></image>
				</view>
			</view>
			<view class="bot_list">
				<view class="warning_count">
					<image class="icon" src="../../../static/icon/71002x.png" mode=""></image>
					<view class="all_wraning">
						<text>在线</text>
						<view class="text_count">
							<text>7845</text>
							<text style="font-size: 24rpx;color: FFFFFF;">次</text>
						</view>
					</view>
					<image class="bot_icon" src="../../../static/icon/13965.png" mode=""></image>
				</view>
				<view class="warning_count">
					<image class="icon" src="../../../static/icon/70992x.png" mode=""></image>
					<view class="all_wraning">
						<text>离线</text>
						<view class="text_count">
							<text>7845</text>
							<text style="font-size: 24rpx;color: FFFFFF;">次</text>
						</view>
					</view>
					<image class="bot_icon" src="../../../static/icon/13965.png" mode=""></image>
				</view>
			</view>
			<view class="footback">
				<image class="background" src="../../../static/icon/59@2x.png" mode=""></image>
				<image src="../../../static/icon/7101@2x.png" mode=""></image>
				<text style="color: #fff;">当前注册激活<text style="font-size: 36rpx;font-weight: bold;">45</text>支</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			chartsDataGauge1: {
				categories: [
					{
						value: 1,
						color: '#FF8784'
					}
				],
				series: [
					{
						name: '完成率',
						data: 0.08
					}
				]
			},
			chartsDataGauge2: {
				categories: [
					{
						value: 1,
						color: '#43FFF2'
					}
				],
				series: [
					{
						name: '完成率',
						data: 0.89
					}
				]
			}
		};
	}
};
</script>

<style lang="less" scoped>
.wrap {
	position: relative;
	top: 200rpx;
	width: 100%;
	padding: 0 34rpx;
	box-sizing: border-box;
	z-index: 9;
	.footback {
		margin-top: 20rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.4);
		background: linear-gradient(180deg, rgba(59, 242, 255, 0.4) 0%, rgba(5, 51, 159, 0.4) 100%);
		box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.5);
		background-size: 100% 100%;
		width: 100%;
		height: 143rpx;
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		image{
			width: 87rpx;
			height: 87rpx;
		}
		.background{
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 143rpx;
		}
	}

	.header_box {
		width: 100%;
		height: 171rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.6);
		background: linear-gradient(180deg, rgba(59, 242, 255, 0.6) 0%, rgba(5, 51, 159, 0.6) 100%);
		box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
		position: relative;
		text-align: center;
		.title {
			font-size: 48rpx;
			font-family: Roboto;
			font-weight: bold;
			line-height: 58rpx;
			color: #fffce6;
		}
		.system_count {
			width: 234rpx;
			height: 43rpx;
			background: #134a86;
			opacity: 1;
			border-radius: 24rpx;
			margin: 0 auto;
			margin: 24rpx auto 16rpx auto;
			text-align: center;
			text {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 43rpx;
				color: #54d6ff;
			}
		}
		.mengban43 {
			position: absolute;
			left: 0;
			top: 0;
			width: 243rpx;
			height: 171rpx;
		}
		.bord_icon {
			width: 100%;
			height: 30rpx;
			position: absolute;
			bottom: 0;
			left: 0;
		}
	}
	.mid_echart {
		margin-top: 20rpx;
		width: 100%;
		height: 413rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.6);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.6) 0%, rgba(28, 84, 184, 0.6) 100%);
		box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
		padding: 33rpx 28rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		.left {
			width: 300rpx;
			height: 300rpx;
			text-align: center;
			.title {
				display: inline-block;
				padding: 2rpx 16rpx;
				background: #134a86;
				opacity: 1;
				border-radius: 24rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 43rpx;
				color: #ff8784;
				margin-bottom: 20rpx;
			}
			.equipment_text {
				text-align: center;
				margin-bottom: 27rpx;
				.count {
					font-size: 36rpx;
					font-family: Roboto;
					font-weight: bold;
					line-height: 43rpx;
					color: #fffce6;
				}
				.equipment_states {
					margin-bottom: 10rpx;
					width: 192rpx;
					height: 43rpx;
					background: #134a86;
					opacity: 1;
					border-radius: 24rpx;
					display: flex;
					align-items: center;
					justify-content: space-evenly;
					text {
						font-size: 26rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 43rpx;
						color: #54d6ff;
					}
					.green {
						width: 17rpx;
						height: 17rpx;
						background: #60e2aa;
						border-radius: 50%;
					}
					.yellow {
						width: 17rpx;
						height: 17rpx;
						background: #f6b532;
						border-radius: 50%;
					}
					.red {
						width: 17rpx;
						height: 17rpx;
						background: #ff5283;
						border-radius: 50%;
					}
				}
			}
		}
		.right {
			width: 300rpx;
			height: 300rpx;
			position: relative;
			text-align: center;
			.title {
				display: inline-block;
				padding: 2rpx 16rpx;
				background: #134a86;
				opacity: 1;
				border-radius: 24rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 43rpx;
				color: #43fff2;
				margin-bottom: 20rpx;
			}
			.circle {
				-webkit-mask: radial-gradient(transparent 80rpx, #000 80rpx);
				width: 250rpx;
				height: 250rpx;
				overflow: hidden;
				border-radius: 50%;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				z-index: 999999;
			}

			.circle-left {
				width: 50%;
				height: 100%;
				background: #60e2aa;
				transform-origin: 100% 50%;
				position: absolute;
				left: 0;
				z-index: 0;
				transform: rotate(-72deg);
			}

			.circle-right {
				width: 50%;
				height: 100%;
				background: #60e2aa;
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
				background: #f6b532;
				position: absolute;
				left: 0;
				z-index: -1;
			}

			.circle-bottom-right {
				width: 50%;
				height: 100%;
				background: #ff5283;
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
			.panel {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				width: 104rpx;
				height: 93rpx;
			}
		}
	}
	.bot_list {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		.warning_count {
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
			.all_wraning {
				display: flex;
				flex-direction: column;
				align-items: center;
				.text_count {
					text {
						font-size: 36rpx;
						font-family: Roboto;
						font-weight: bold;
						line-height: 43rpx;
						color: #fffce6;
					}
				}
				text {
					font-size: 24rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 35rpx;
					color: #ffffff;
				}
			}
			.icon {
				width: 87rpx;
				height: 87rpx;
			}
			.bot_icon {
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
