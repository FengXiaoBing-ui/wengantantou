<template>
	<view class="index">
		<view class="headtab">
			<view style="height: 40rpx;"></view>
			<view class="headertitle">
				<image @click="backpage" src="../../../static/icon/left.png" mode=""></image>
				<text>输电塔管理</text>
			</view>
			<view class="serch">
				<image src="../../../static/icon/serch.png" mode=""></image>
				<input type="text" value="" placeholder="请输入线路名称和塔杆名称搜索..." placeholder-class="plac" />
			</view>
		</view>
		<view class="wrap">
			<view class="list" v-for="(item,index) in list" :key="index" @click="choice(item.imgshow,index)">
				<view class="list-top">
					<view class="list-top-left">
						<image src="../../../static/icon/wifi.png" mode=""></image>
						<text>{{ item.num }}</text>
					</view>
					<view class="list-top-right">
						<image v-if="active==index" src="../../../static/icon/choice.png" mode=""></image>
					</view>
				</view>
				<view class="list-mid">
					<view class="list-mid-left">
						<text>{{ item.ip }}</text>
						<text>{{ item.cardnumber }}</text>
						<text>{{ item.gps }}</text>
					</view>
					<view class="list-mid-right">
						<text>关联探头</text>
						<text>50个</text>
					</view>
				</view>
				<view class="botborder"></view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: -1,
				list: [
					{
						imgshow: false,
						num: "编号T5B464668444447",
						states: "工作中",
						ip: "IP：192.168.1.102",
						cardnumber: "4G卡号：18655458878",
						gps: "位置：110kV丹诗文线-N4塔杆",
						dianliang: "85"
					},
					{
						imgshow: false,
						num: "编号T5B464668444447",
						states: "工作中",
						ip: "IP：192.168.1.102",
						cardnumber: "4G卡号：18655458878",
						gps: "位置：110kV丹诗文线-N4塔杆",
						dianliang: "28"
					},
					{
						imgshow: false,
						num: "编号T5B464668444447",
						states: "已离线",
						ip: "IP：192.168.1.102",
						cardnumber: "4G卡号：18655458878",
						gps: "位置：110kV丹诗文线-N4塔杆",
						dianliang: "85"
					},
					{
						imgshow: false,
						num: "编号T5B464668444447",
						states: "待激活",
						ip: "IP：192.168.1.102",
						cardnumber: "4G卡号：18655458878",
						gps: "位置：110kV丹诗文线-N4塔杆",
						dianliang: "85"
					},
				]
			};
		},
		methods:{
			choice(img,index){
				this.active = index
				uni.navigateBack({
					delta:1
				})
			},
			backpage(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.headtab{
	position: fixed;
	top: 0;
	width: 100%;
	height: 225rpx;
	background-image: url(../../../static/icon/6972.png);
	background-size: 100% 100%;
	z-index: 9;
	.serch{
		width: 90%;
		height: 72rpx;
		border: 1rpx solid #4492C2;
		background: linear-gradient(180deg, #0D4B88 0%, #013161 100%);
		box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
		margin: 0 auto;
		margin-top: 28rpx;
		display: flex;
		align-items: center;
		image{
			width: 64rpx;
			height: 64rpx;
		}
		input,.plac{
			width: 100%;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 40rpx;
			color: #D6F2FF;
			opacity: 0.56;
		}
	}
	.headertitle{
		display: flex;
		align-items: center;
		justify-content: space-between;
		image{
			width: 54rpx;
			height: 54rpx;
			margin-left: 16rpx;
		}
		text{
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 52rpx;
			color: #FFFFFF;
		}
	}
}
.wrap{
		margin-top: 188rpx;
		padding: 34rpx;
		box-sizing: border-box;
		z-index: 99;
		.list{
			margin: 20rpx 0;
			width: 100%;
			padding-bottom: 20rpx;
			border: 2rpx solid rgba(90, 232, 255, 0.3);
			background: linear-gradient(180deg, rgba(65, 201, 252, 0.3) 0%, rgba(28, 84, 184, 0.3) 100%);
			box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.3);
			position: relative;
			.list-mid{
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 20rpx;
				box-sizing: border-box;
				.list-mid-left{
					display: flex;
					flex: 3;
					flex-direction: column;
					border-right: 2rpx dashed #B8B8B8;
					text{
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 40rpx;
						color: #FFFFFF;
					}
				}
				.list-mid-right{
					display: flex;
					flex: 1;
					flex-direction: column;
					padding: 0 20rpx;
					box-sizing: border-box;
					text{
						text-align: center;
						&:nth-child(1){
							font-size: 28rpx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							line-height: 40rpx;
							color: #FFFFFF;
							display: flex;
							align-items: center;
							&::before{
								content: '';
								display: inline-block;
								background-image: url(../../../static/icon/link.png);
								background-size: 100% 100%;
								width: 30rpx;
								height: 30rpx;
							}
						}
						&:nth-child(2){
							font-size: 36rpx;
							font-family: Roboto;
							font-weight: bold;
							line-height: 43rpx;
							color: #FFFFFF;
						}
					}
				}
			}
			.list-top{
				height: 60rpx;
				background: linear-gradient(90deg, rgba(2, 31, 75, 0.6) 0%, rgba(9, 55, 101, 0.6) 100%);
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding-left:20rpx;
				box-sizing: border-box;
				.list-top-left{
					display: flex;
					align-items: center;
					text{
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 40rpx;
						color: #FFFFFF;
					}
					image{
						width: 43rpx;
						height: 43rpx;
						margin-right: 5rpx;
					}
				}
				.list-top-right{
					display: flex;
					align-items: center;
					text{
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 40rpx;
						color: #FFFFFF;
					}
					image{
						width: 41rpx;
						height: 41rpx;
					}
				}
			}
			.botborder{
				width: 114rpx;
				height: 4rpx;
				background: #54D6FF;
				box-shadow: 0px 0px 8rpx #9EF2FF;
				position: absolute;
				bottom: -4rpx;
				left: 50%;
				transform: translateX(-50%);
			}
		}
	}
</style>
