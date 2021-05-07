<template>
	<view class="index">
		<headerTab title="中继器详细信息"></headerTab>
		<view class="wrap">
			<view class="info-box">
				<view class="input-box">
					<text>中继器IP</text>
					<input type="text" value="" placeholder="输入中继器的IP地址" placeholder-class="placeholder" />
				</view>
				<view class="input-box">
					<text>4G卡号IP</text>
					<input type="text" value="" placeholder="输入4G卡卡号" placeholder-class="placeholder" />
				</view>
				<view class="input-box">
					<text>4G卡号IP</text>
					<view class="active-box" @click="gps">
						<text>选择中继器的安装位置</text>
						<image src="../../../static/icon/13921.png" mode=""></image>
					</view>
				</view>
				<view class="input-box">
					<text>关联服务器</text>
					<view class="server" @click="jump">
						<view>
							<image class="serverimg" src="../../../static/icon/6873.png" mode=""></image>
							<text>点此选择服务器</text>
						</view>
						<image class="minright" src="../../../static/icon/minright.png" mode=""></image>
					</view>
				</view>
				<view class="input-box">
					<text>安装情况说明（非必填）</text>
					<textarea value="" placeholder="输入情况说明..." placeholder-class="placeholder" />
				</view>
			</view>
			<view class="botimg">
				<image src="../../../static/icon/6932.png" mode=""></image>
				<text>确认激活</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			gps(){
				uni.navigateTo({
					url:"../choicetower/choicetower"
				})
			},
			jump(){
				uni.navigateTo({
					url:"../server/server"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	position: relative;
	z-index: 1;
	top: 168rpx;
	width: 100%;
	padding: 20rpx 34rpx;
	box-sizing: border-box;
	.info-box{
		width: 100%;
		border: 2rpx solid rgba(90, 232, 255, 0.5);
		background: linear-gradient(180deg,rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
		box-shadow: 2rpx 4rpx 10rpx rgba(90, 232, 255, 0.5);
		padding: 24rpx;
		box-sizing: border-box;
		.input-box{
			margin-bottom: 27rpx;
			textarea{
				width: 100%;
				height: 208rpx;
				background: #073B6E;
				border: 1rpx solid #4492C2;
				box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
				opacity: 1;
				padding: 12rpx 23rpx;
				box-sizing: border-box;
				color: rgba(255,255,255,0.7);
			}
			text{
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 37rpx;
				color: #FFFFFF;
				opacity: 0.5;
			}
			input{
				margin-top: 10rpx;
				background: rgba(7, 59, 110, 0.7);
				border: 1rpx solid #4492C2;
				box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 40rpx;
				color: #FFFFFF;
				padding: 12rpx 20rpx;
			}
			.placeholder{
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 40rpx;
				color: #FFFFFF;
				opacity: 0.7;
			}
			.active-box{
				margin-top: 10rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				border: 1rpx solid #4492C2;
				background: linear-gradient(180deg, #0D4B88 0%, #013161 100%);
				box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
				padding: 12rpx 20rpx;
				box-sizing: border-box;
				text{
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 40rpx;
					color: #FFFFFF;
				}
				image{
					width: 17rpx;
					height: 14rpx;
				}
			}
			.server{
				margin-top: 10rpx;
				border: 1rpx solid #4492C2;
				background: linear-gradient(180deg, #0D4B88 0%, #013161 100%);
				box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
				opacity: 0.51;
				padding: 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				view{
					display: flex;
					align-items: center;
					.serverimg{
						width: 120rpx;
						height: 120rpx;
						margin-right: 21rpx;
					}
				}
				
				.minright{
					width: 14rpx;
					height: 17rpx;
				}
			}
		}
		
	}
	.botimg{
		margin-top: 50rpx;
		width: 100%;
		height: 100rpx;
		background: #012E61;
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			width: 50rpx;
			height: 50rpx;
			opacity: 0.51;
		}
		text{
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			line-height: 52rpx;
			color: #FFFFFF;
			opacity: 0.51;
		}
	}
}
</style>
