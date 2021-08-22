<template>
	<view class="index">
		<view class="headtab">
			<view style="height: 40rpx;"></view>
			<view class="headertitle">
				<image @click="backpage" src="../../../static/icon/left.png" mode=""></image>
				<text>输电塔管理</text>
				<view class="righticon" @click="sure">
					<image src="../../../static/icon/6932.png" mode=""></image>
					<text>确认</text>
				</view>
			</view>
			<view class="redtext">
				<image src="../../../static/icon/6707.png" mode=""></image>
				<text>{{ title }}</text>
			</view>
			<view class="record">
				<view class="screen">
					<text @click="anime(item.side_name)" :class="item.side_name == active ? 'activetext' : ''" v-for="item in list" :key="item.side_id">{{ item.side_name }}</text>
					<view :class="{ activeleft: active == '大号侧', activemid: active == '小号侧'}"></view>
				</view>
			</view>
		</view>
		<view class="list-bigbox">
			<view class="list" :class="choiceactive==index?'listto':''" v-for="(item,index) in inlist" :key="index" @click="choice(index)">
				<text>{{ item.warefire_name }}</text>
				<image v-if="choiceactive==index" :src="item.ware_picture" mode="aspectFit"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: "",
				phase_id: "",
				choiceactive: -1,
				active: "大号侧",
				option: ["大号侧","小号侧"],
				list: [],
				inlist:[],
				phase_name: "",
				side_id:''
			};
		},
		onLoad(option) {
			this.phase_name = option.name
			this.phase_id = option.id
			this.detailinfolist()
		},
		methods:{
			detailinfolist(){
				this.$api.postapi('/api/sensor/choose_warefire',{phase_id:this.phase_id}).then(res => {
					console.log(res)
					this.title = res.data.tower_position
					this.list = res.data.data
					this.inlist = this.list[0].warefire
					this.side_id = this.list[0].side_id
				})
			},
			anime(item){
				this.active = item
				this.choiceactive = -1
				if(item=='大号侧'){
					this.inlist = this.list[0].warefire
					this.side_id = this.list[0].side_id
				}else{
					this.inlist = this.list[1].warefire
					this.side_id = this.list[1].side_id
				}
			},
			sure(){
				let obj = {
					name: this.active,
					gps:this.inlist[this.choiceactive].warefire_name,
					id: this.inlist[this.choiceactive].warefire_id,
					img: this.inlist[this.choiceactive].ware_picture,
					phase_name: this.phase_name,
					title: this.title,
					side_id: this.side_id
				}
				this.$store.commit('pagoda',obj)
				uni.redirectTo({
					url:"../choice/choice"
				})
			},
			choice(index){
				this.choiceactive = index
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
	height: 306rpx;
	background-image: url(../../../static/icon/6972.png);
	background-size: 100% 100%;
	z-index: 9;
	.headertitle{
		padding: 20rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		image{
			width: 54rpx;
			height: 54rpx;
			margin-left: 16rpx;
		}
		.righticon{
			width: 20%;
			position: absolute;
			right: 0;
			image{
				margin: 0;
				width: 38rpx;
				height: 38rpx;
				margin-right: 10rpx;
			}
			text{
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 40rpx;
				color: #FFFFFF;
			}
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
	.redtext{
		margin-top: 20rpx;
		width: 100%;
		height: 61rpx;
		background: linear-gradient(90deg, rgba(220, 28, 28, 0.6) 0%, rgba(255, 118, 114, 0.6) 100%);
		display: flex;
		align-items: center;
		justify-content: center;
		image{
			width: 40rpx;
			height: 40rpx;
		}
		text{
			font-size: 32rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			line-height: 46rpx;
			color: #FFFFFF;
		}
	}
	.record{
		width: 100%;
		background-position: bottom;
		.screen{
			width: 40%;
			height: 100rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			text{
				display: inline-block;
				width: 100%;
				font-size: 30rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 44rpx;
				color: #FFFFFF;
				opacity: 0.6;
				text-align: center;
				&:nth-child(1){
					transform: translateX(-30rpx);
				}
				&:nth-child(2){
					transform: translateX(30rpx);
				}
			}
			.activetext{
				font-size: 34rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				line-height: 49rpx;
				color: #FFFFFF;
				opacity: 1;
			}
			.activeleft{
				left: 0;
				transform: translateX(-30rpx);
			}
			.activemid{
				left: 50%;
				transform: translateX(30rpx);
			}
			view{
				position: absolute;
				bottom: 0;
				width: 50%;
				height: 6rpx;
				border: 1rpx solid #5AE8FF;
				background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
				transition: 0.3s;
			}
		}
	}
}
.list-bigbox{
	box-sizing: border-box;
	position: relative;
	z-index: 1;
	top: 300rpx;
	.list{
		padding: 0 30rpx;
		box-sizing: border-box;
		text{
			display: block;
			font-size: 32rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 46rpx;
			color: #FFFFFF;
			padding: 24rpx 0rpx;
			
			border-bottom: 1rpx solid rgba(90, 232, 255, 0.5);
		}
		image{
			padding: 20rpx 0;
			display: block;
			margin: 0 auto;
			width: 526rpx;
			height: 295rpx;
		}
	}
	.listto{
		border: 2rpx solid rgba(90, 232, 255, 0.7);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.7) 0%, rgba(28, 84, 184, 0.7) 100%);
		box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
	}
}
</style>
