<template>
	<view class="index">
		<headerTab title="告警记录"></headerTab>
		<view class="record">
			<view class="screen">
				<text @click="anime(item)" :class="item == active ? 'activetext' : ''" v-for="item in option" :key="item">{{ item }}</text>
				<view :class="{ activeleft: active == '全部', activemid: active == '待消警', activeright: active == '已消警' }"></view>
			</view>
		</view>
		<view class="recordlist" v-for="(item,index) in recordlist" :key="index" @click="gaojingdetail(item.id)">
			<view class="left">
				<view class="top">
					<text>{{ item.title }}</text>
					<text>于{{item.create_time}}</text>
				</view>
				<view class="mid">
					<view>已确认</view>
					<view v-if="item.is_remove_warning==0" style="background: linear-gradient(180deg, rgba(255, 238, 128, 0.35) 0%, rgba(254, 43, 43, 0.35) 100%);">待消警</view>
					<view v-if="item.is_remove_warning==1">已消警</view>
				</view>
			</view>
			<image class="minright" src="../../../static/icon/minright.png" mode=""></image>
		</view>
		<uni-load-more :status="more"></uni-load-more>
	</view>
</template>

<script>
export default {
	data() {
		return {
			id:"",
			more: "nomore",
			active: '全部',
			activetext: 'activetext',
			option: ['全部', '待消警', '已消警'],
			recordlist: []
		};
	},
	onReachBottom() {
		this.more = "loading"
	},
	onLoad(option) {
		this.id = option.id
	},
	created() {
		this.alrmlog(-1)
	},
	methods: {
		alrmlog(type){
			this.$api.postapi('/api/Sensor/sel_alarm_log',{id:this.id,type:type,limit:40}).then(res => {
				this.recordlist =res.data.data
			})
		},
		anime(item) {
			this.active = item;
			if(this.active=="全部"){
				this.alrmlog(-1)
			}
			if(this.active=="待消警"){
				this.alrmlog(0)
			}
			if(this.active=="已消警"){
				this.alrmlog(1)
			}
		},
		gaojingdetail(id){
			uni.navigateTo({
				url:"../warning/warning?id="+id
			})
		}
	}
};
</script>

<style lang="less" scoped>
.record{
	margin-top: 148rpx;
	width: 100%;
	background-image: url(../../../static/icon/headertab.png);
	background-size: 100% 1000%;
	background-position: bottom;
	.screen{
		width: 60%;
		height: 100rpx;
		margin: 0 auto;
		display: flex;
		align-items: center;
		position: relative;
		text{
			display: flex;
			flex: 1;
			justify-content: center;
			font-size: 30rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 44rpx;
			color: #FFFFFF;
			opacity: 0.6;
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
		}
		.activemid{
			left: 33.3%;
		}
		.activeright{
			left: 66.6%;
		}
		view{
			position: absolute;
			bottom: 0;
			width: 33.3%;
			height: 6rpx;
			border: 1rpx solid #5AE8FF;
			background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
			transition: 0.3s;
		}
	}
}
.recordlist{
	margin: 24rpx auto;
	width: 94%;
	height: 167rpx;
	border: 2rpx solid rgba(90, 232, 255, 0.3);
	background: linear-gradient(180deg, rgba(65, 201, 252, 0.6) 0%, rgba(28, 84, 184, 0.6) 100%);
	box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
	z-index: 9999;
	padding: 14rpx 34rpx 14rpx 20rpx;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
	.left{
		.top{
			display: flex;
			align-items: center;
			text{
				&:nth-child(1){
					font-size: 32rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 46rpx;
					color: #FF7672;
					display: flex;
					align-items: center;
					margin-right: 10rpx;
					&::before{
						content: '';
						width: 28rpx;
						height: 38rpx;
						display: inline-block;
						background-image: url(../../../static/icon/6918.png);
						background-size: 100% 100%;
					}
				}
				&:nth-child(2){
					font-size: 32rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 46rpx;
					color: #FFFFFF;
					}
			}
		}
		.mid{
			display: flex;
			margin-top: 10rpx;
			view{
				width: 139rpx;
				height: 70rpx;
				background: linear-gradient(180deg, rgba(128, 255, 140, 0.35) 0%, rgba(14, 189, 255, 0.35) 100%);
				border-radius: 14rpx;
				text-align: center;
				line-height: 70rpx;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				margin-right: 10rpx;
			}
		}
	}
	.minright{
		width: 14rpx;
		height: 17rpx;
	}
}
</style>
