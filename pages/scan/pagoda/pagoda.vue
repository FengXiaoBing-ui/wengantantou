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
			<view class="list" v-for="(item,index) in list" :key="index">
				<view class="list-top">
					<text>{{ item.title }}</text>
					<view class="line"></view>
					<image v-if="item.isshow" @click="dropdown(item.isshow,index)" src="../../../static/icon/open.png" mode=""></image>
					<image v-else @click="dropdown(item.isshow,index)" src="../../../static/icon/openbot.png" mode=""></image>
				</view>
				<view class="listcontent" v-for="(itemes,index) in item.arr" :key="index" v-if="item.isshow" @click="jump">
					<view class="titletop">
						<image src="../../../static/icon/6707.png" mode=""></image>
						<text>{{ itemes.title }}</text>
					</view>
					<view class="content-mid">
						<view>A相</view>
						<view>B相</view>
						<view>C相</view>
					</view>
					
					<view class="bordbot"></view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
				active: "",
				list: [
					{
						isshow: false,
						title: "110kV丹诗文线",
						arr: [
							{
								title: "N4塔杆",
								num: "27/27"
							},
							{
								title: "N4塔杆",
								num: "27/27"
							}
						]
					},
					{
						isshow: false,
						title: "110kV丹诗文线",
						arr: [
							{
								title: "N4塔杆",
								num: "27/27"
							},
							{
								title: "N4塔杆",
								num: "27/27"
							}
						]
					},
					{
						isshow: false,
						title: "110kV丹诗文线",
						arr: [
							{
								title: "N4塔杆",
								num: "27/27"
							},
							{
								title: "N4塔杆",
								num: "27/27"
							}
						]
					},
					{
						isshow: false,
						title: "110kV丹诗文线",
						arr: [
							{
								title: "N4塔杆",
								num: "27/27"
							},
							{
								title: "N4塔杆",
								num: "27/27"
							}
						]
					},
				]
			};
		},
		methods:{
			backpage(){
				uni.navigateBack({
					delta:1
				})
			},
			jump(){
				uni.navigateTo({
					url:"../location/location"
				})
			},
			dropdown(isshow,index){
				if(this.list[index].isshow == false){
					this.list[index].isshow = true
				}else{
					this.list[index].isshow = false
				}
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
	position: relative;
	top: 225rpx;
	width: 100%;
	padding: 24rpx 34rpx;
	box-sizing: border-box;
	z-index: 1;
	.list{
		.list-top{
			display: flex;
			align-items: center;
			justify-content: space-between;
			image{
				width: 77rpx;
				height: 77rpx;
			}
			text{
				font-size: 36rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				line-height: 52rpx;
				color: #FFFFFF;
				margin-left: 20rpx;
				position: relative;
				&::before{
					content: '';
					display: inline-block;
					width: 6rpx;
					height: 34rpx;
					background: linear-gradient(180deg, #D6F2FF 0%, #5AE8FF 100%);
					position: absolute;
					top: 50%;
					left: -20rpx;
					transform: translateY(-50%);
				}
			}
			.line{
				max-width: 100%;
				min-width: 30%;
				height: 0px;
				border: 1rpx dotted #9EA5AE;
				opacity: 1;
			}
		}
		.listcontent{
			width: 100%;
			margin-top: 18rpx;
			border: 2rpx solid rgba(90, 232, 255, 0.7);
			background: linear-gradient(180deg, rgba(65, 201, 252, 0.7) 0%, rgba(28, 84, 184, 0.7) 100%);
			box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.7);
			position: relative;
			.content-mid{
				width: 100%;
				margin-top: 10rpx;
				padding: 10rpx 0;
				display: flex;
				align-items: center;
				justify-content: space-evenly;
				view{
					width: 31%;
					height: 76rpx;
					border: 1rpx solid rgba(90, 232, 255, 0.54);
					background: linear-gradient(180deg, rgba(90, 232, 255, 0.54) 0%, rgba(0, 46, 128, 0.54) 100%);
					text-align: center;
					line-height: 76rpx;
					color: #FFFFFF;
				}
			}
			.titletop{
				width: 100%;
				height: 61rpx;
				background: linear-gradient(90deg, rgba(2, 31, 75, 0.6) 0%, rgba(9, 55, 101, 0.6) 100%);
				display: flex;
				align-items: center;
				image{
					width: 40rpx;
					height: 40rpx;
					margin-left: 17rpx;
				}
				text{
					font-size: 32rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					line-height: 46rpx;
					color: #FFFFFF;
				}
			}
			.bordbot{
				position: absolute;
				bottom: -2rpx;
				left: 50%;
				transform: translateX(-50%);
				width: 114rpx;
				height: 4rpx;
				background: #54D6FF;
				box-shadow: 0px 0px 8rpx #9EF2FF;
				opacity: 1;
			}
		}
	}
}
</style>
