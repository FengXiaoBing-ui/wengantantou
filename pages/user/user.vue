<template>
	<view class="index">
		<image class="userbackgrouond" src="../../static/icon/userbackground.png" mode=""></image>
		<view class="headtitle">我的</view>
		<view class="wrap">
			<view class="userinfo">
				<view class="left">
					<image class="in" src="../../static/icon/2762.png" mode="aspectFill"></image>
					<image class="out" src="../../static/icon/6989.png" mode=""></image>
				</view>
				<view class="right">
					<view class="namephone">
						<text>刘德华</text>
						<text>186 5555 8568</text>
					</view>
					<view class="work">
						运维班长
					</view>
				</view>
			</view>
			<view class="menu">
				<view class="list" v-for="(item,index) in list" :key="index" @click="jump(item.path)">
					<view class="list-left">
						<image :src="item.img" mode=""></image>
						<text>{{ item.title }}</text>
					</view>
					<image class="minright" src="../../static/icon/minright.png" mode=""></image>
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
				currentTabIndex:3,
				title: 'Hello',
				list: [
					{
						title: "个人信息",
						img:require('../../static/icon/16982.png'),
						path: "../information/myinformation/myinformation"
					},
					{
						title: "操作帮助",
						img:require('../../static/icon/6982.png')
					},
					{
						title: "功能说明",
						img:require('../../static/icon/69822.png'),
						path: "../information/explain/explain"
					},
					{
						title: "意见反馈",
						img:require('../../static/icon/69823.png'),
						path: "../information/Feedback/Feedback"
					},
					{
						title: "版本说明",
						img:require('../../static/icon/69824.png'),
						path: "../information/edition/edition"
					},
					{
						title: "设置",
						img:require('../../static/icon/69825.png'),
						path: "../information/system/system"
					},
					
				]
			}
		},
		onShow() {
			uni.hideTabBar()
		},
		onLoad() {
		
		},
		methods: {
			jump(path){
				uni.navigateTo({
					url:path
				})
			},
			tabClick(index){
				this.currentTabIndex = index
			}
		}
	}
</script>

<style lang="less" scoped>
.userbackgrouond{
	width: 100%;
	height: 437rpx;
	position: absolute;
	top: 0;
}
.headtitle{
	position: relative;
	top: 40rpx;
	width: 100%;
	height: 128rpx;
	text-align: center;
	line-height: 128rpx;
	font-size: 42rpx;
	font-family: Source Han Sans CN;
	font-weight: bold;
	color: #FFFFFF;
}
.wrap{
	padding: 41rpx 34rpx 0 34rpx;
	box-sizing: border-box;
	position: relative;
	z-index: 9;
	.userinfo{
		width: 100%;
		height: 208rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.6);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.6) 0%, rgba(28, 84, 184, 0.6) 100%);
		box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.6);
		display: flex;
		align-items: center;
		.left{
			width: 40%;
			height: 208rpx;
			position: relative;
			.in{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
				width: 120rpx;
				height: 120rpx;
				border-radius: 50%;
			}
			.out{
				position: absolute;
				left:calc(50% - 82rpx);
				top: calc(50% - 82rpx);
				width: 164rpx;
				height: 164rpx;
				animation: useranim 3s linear infinite;
				@keyframes useranim{
				  0%{-webkit-transform:rotate(0deg);}
				  25%{-webkit-transform:rotate(90deg);}
				  50%{-webkit-transform:rotate(180deg);}
				  75%{-webkit-transform:rotate(270deg);}
				  100%{-webkit-transform:rotate(360deg);}
				}
			}
			
		}
		.right{
			display: flex;
			flex-direction: column;
			.namephone{
				text{
					&:nth-child(1){
						font-size: 32rpx;
						font-family: Source Han Sans CN;
						font-weight: bold;
						line-height: 46rpx;
						color: #FFFFFF;
						opacity: 1;
					}
					&:nth-child(2){
						font-size: 30rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 44rpx;
						color: #FFFFFF;
						opacity: 1;
					}
				}
			}
			.work{
				margin-top: 10rpx;
				width: 146rpx;
				height: 47rpx;
				border: 1rpx solid #5AE8FF;
				background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
				opacity: 1;
				border-radius: 29rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 47rpx;
				text-align: center;
				color: #FFFFFF;
			}
		}
	}
	.menu{
		margin-top: 24rpx;
		width: 100%;
		border: 2rpx solid rgba(90, 232, 255, 0.7);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.7) 0%, rgba(28, 84, 184, 0.7) 100%);
		box-shadow: 2rpx 3rpx 8px rgba(90, 232, 255, 0.7);
		padding-left: 24rpx;
		box-sizing: border-box;
		.list{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 30rpx 0;
			border-bottom: 1rpx solid rgba(90, 232, 255, 0.5);
			.minright{
				width: 14rpx;
				height: 17rpx;
				margin-right: 31rpx;
			}
			.list-left{
				display: flex;
				justify-content: space-between;
				align-items: center;
				text{
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 40rpx;
					color: #FFFFFF;
					margin-left: 16rpx;
				}
				image{
					width: 48rpx;
					height: 48rpx;
				}
			}
		}
	}
}
</style>
