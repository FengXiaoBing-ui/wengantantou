<template>
	<view class="content" :style="{height: appheight + 'px'}">
		<view class="content_wrap">
			<image class="topimg" src="../../static/icon/6791.png" mode=""></image>
			<image class="titleimg" src="../../static/icon/title.png" mode=""></image>
			<view class="serch">
				<view class="serch_left">
					<image src="../../static/icon/serch.png" mode=""></image>
					<input type="text" value="" placeholder="请输入设备名称或编号搜索..." placeholder-style="color: #D6F2FF;" v-model="keyword" />
				</view>
				<view class="serch_right" @click="Scancode">
					<image src="../../static/icon/scan.png" mode=""></image>
				</view>
			</view>
			<view class="menu-top">
				<view class="menu-top-left" @click="jump">
					<view class="imganime">
						<image src="../../static/icon/6816.png" mode=""></image>
						<view class="imgborder"></view>
					</view>
					<view class="righttext">
						<text>告警信息</text>
						<text>12</text>
					</view>
				</view>
				<view class="menu-top-right" @click="wait">
					<view class="imganime">
						<image src="../../static/icon/6817.png" mode=""></image>
						<view class="imgborder"></view>
					</view>
					<view class="righttext">
						<text>我的待办</text>
						<text>85</text>
					</view>
				</view>
				<view class="menu-top-bot"></view>
			</view>
			<view class="menu-bot">
				<view class="menu-bot-box" v-for="(item,index) in menulist" :key="index" @click="probejump(item.path)">
					<image :src="item.imgurl" mode=""></image>
					<text>{{ item.text }}</text>
					<image class="menu-bot-box_bot" src="../../static/icon/13965.png" mode=""></image>
				</view>
			</view>
		</view>
		<tab-bar :current="currentTabIndex" backgroundColor="#fbfbfb" color="#999" tintColor="#FFFFFF" @click="tabClick"></tab-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTabIndex:0,
				title: 'Hello',
				keyword: "",
				menulist: [
					{
						text: "探头管理",
						imgurl: require("../../static/icon/6810.png"),
						path: "../Probedetail/probe/probe"
					},
					{
						text: "中继器管理",
						imgurl: require("../../static/icon/6812.png"),
						path: "../Repeater/Repeaterlist/Repeaterlist"
					},
					{
						text: "输电塔设备",
						imgurl: require("../../static/icon/6814.png"),
						path: "../Pagoda/Pagodalist/Pagodalist"
					},
					{
						text: "消警记录",
						imgurl: require("../../static/icon/6811.png"),
						path: "../eliminate/eliminatewrnning/eliminatewrnning"
					},
					{
						text: "知识库",
						imgurl: require("../../static/icon/6813.png")
					},
					{
						text: "数据查看",
						imgurl: require("../../static/icon/6815.png")
					},
				]
			}
		},
		onShow() {
			uni.hideTabBar()
		},
		onLoad() {

		},
		created() {
			if(!uni.getStorageSync('loginId')){
				uni.redirectTo({
					url:"../login/login"
				})
			}
		},
		methods: {
			Scancode(){
				uni.scanCode({
				    onlyFromCamera: true,
				    success: function (res) {
						console.log(res)
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						uni.showModal({
							title:'条码类型：' + res.scanType+'条码内容：' + res.result
						})
						setTimeout(() => {
							uni.navigateTo({
								url:"../scan/scanprobedetail/scanprobedetail"
							})
						},1000)
				    }
				});
			},
			jump(){
				uni.switchTab({
					url:"../danger/danger"
				})
			},
			wait(){
				uni.switchTab({
					url:"../wait/wait"
				})
			},
			tabClick(index){
				this.currentTabIndex = index
			},
			probejump(url){
				
				uni.navigateTo({
					url:url
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		display: flex;
		flex-direction: column;
		background: #033785;
		.content_wrap{
			padding: 0 34rpx;
			box-sizing: border-box;
			text-align: center;
			z-index: 999;
			.serch{
				margin-top: 56rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				.serch_left{
					width: 602rpx;
					height: 72rpx;
					border: 1rpx solid #4492C2;
					background: linear-gradient(180deg, #0D4B88 0%, #013161 100%);
					box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
					display: flex;
					align-items: center;
					box-sizing: border-box;
					z-index: 999;
					image{
						width: 64rpx;
						height: 64rpx;
						margin: 1rpx;
					}
					input{
						width: 100%;
						text-align: start;
						padding-left: 5rpx;
						box-sizing: border-box;
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #D6F2FF;
						opacity: 0.56;
					}
				}
				.serch_right{
					width: 72rpx;
					height: 72rpx;
					background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
					box-shadow: 0px 0px 6rpx rgba(2, 2, 55, 0.28);
					display: flex;
					align-items: center;
					justify-content: center;
					box-sizing: border-box;
					z-index: 999;
					image{
						width: 65.88rpx;
						height: 63.01rpx;
					}
				}
			}
			.menu-top{
				margin-top: 30rpx;
				width: 682rpx;
				height: 208rpx;
				border: 2rpx solid rgba(90, 232, 255, 0.3);
				background: linear-gradient(180deg, rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
				box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.6);
				display: flex;
				align-items: center;
				justify-content: center;
				position: relative;
				.menu-top-bot{
					position: absolute;
					bottom: 0;
					height: 30rpx;
					width: 100%;
					background-image: url(../../static/icon/15.png);
					background-size: 100% 100%;
				}
				.menu-top-right{
					background-image: url(../../static/icon/2621.png);
					background-size: 100% 100%;
				}
				.menu-top-left,.menu-top-right{
					display: flex;
					flex: 1;
					align-items: center;
					justify-content: center;
					height: 208rpx;
					.righttext{
						text-align: start;
						margin-left: 20rpx;
						text{
							display: block;
							&:nth-child(1){
								font-size: 28rpx;
								font-family: Source Han Sans CN;
								font-weight: 400;
								line-height: 40rpx;
								color: #FFFFFF;
							}
							&:nth-child(2){
								font-size: 54rpx;
								font-family: Roboto;
								font-weight: bold;
								line-height: 65rpx;
								color: #FFFCE6;
							}
						}
					}
					.imganime{
						width: 123rpx;
						height: 123rpx;
						position: relative;
						image{
							position: absolute;
							top: 50%;
							left: 50%;
							transform: translate(-50%,-50%);
							width: 93rpx;
							height: 93rpx;
						}
						.imgborder{
							position: absolute;
							left: 10rpx;
							top: 9rpx;
							width: 100rpx;
							height: 100rpx;
							border-radius: 50%;
							border: 2rpx solid rgba(255,255,255,0.4);
							transition: 1s;
							animation:turn 3s linear infinite;
							&::before{
								content: '';
								display: inline-block;
								width: 8rpx;
								height: 8rpx;
								position: absolute;
								right: 8rpx;
								top: 8rpx;
								background: #FFFFFF;
								border-radius: 50%;
							}
							    @keyframes turn{
							      0%{-webkit-transform:rotate(0deg);}
							      25%{-webkit-transform:rotate(90deg);}
							      50%{-webkit-transform:rotate(180deg);}
							      75%{-webkit-transform:rotate(270deg);}
							      100%{-webkit-transform:rotate(360deg);}
							    }
						}
					}
					
				}
				
				
			}
			.menu-bot{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;
				.menu-bot-box{
					margin-top: 20rpx;
					width: 217rpx;
					height: 211rpx;
					border: 2rpx solid rgba(90, 232, 255, 0.3);
					background: linear-gradient(180deg, rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
					box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.5);
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					position: relative;
					box-sizing: border-box;
					.menu-bot-box_bot{
						width: 60rpx;
						height: 27rpx;
						position: absolute;
						bottom: -14rpx;
					}
					image{
						width: 81rpx;
						height: 78rpx;
					}
					text{
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 40rpx;
						color: #FFFFFF;
					}
				}
			}
			.titleimg{
				width: 644rpx;
				height: 125.53rpx;
				margin-top: 114rpx;
			}
			.topimg{
				width: 100%;
				height: 502rpx;
				position: absolute;
				top: 0;
				left: 0;
				z-index: -1;
			}
		}
	}
</style>
