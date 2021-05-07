<template>
	<view class="index">
		<headerTab title="探头告警" @option="option" @func="func" :record="record" :confirmed="true" :garbage="garbage"></headerTab>
		<view class="wrap">
			<view
				class="listwait"
				v-for="(item, index) in warninglist"
				:key="index"
				:class="{ listwaitactive: operation, listwaitnoactive: item.active == 'active' }"
				v-if="isshow"
				@longtap="longtap(index)"
				@click="active(index)"
			>
				<image v-if="item.active == 'active'" class="active" src="../../../static/icon/6979.png" mode=""></image>
				<image v-if="operation && item.active == ''" class="active" src="../../../static/icon/2747.png" mode=""></image>

				<view class="list-left">
					<view class="top">
						<image src="../../../static/icon/6707.png" mode=""></image>
						<text>{{ item.title }}</text>
					</view>
					<text class="mid">{{ item.num }}</text>
					<view class="bot">
						<image v-if="item.states == '超温警告'" src="../../../static/icon/6918.png" mode=""></image>
						<image v-if="item.states == '电量低'" src="../../../static/icon/6921.png" mode=""></image>
						<text :class="{ origin: item.states == '电量低', red: item.states == '超温警告' }">{{ item.states }}</text>
						<text>于{{ item.time }}</text>
					</view>
				</view>
				<view class="box-foot"></view>
			</view>
			<view class="list" v-if="!isshow" v-for="(item, index) in warninglist" :key="index" @click="jump">
				<view class="list-left">
					<view class="top">
						<image src="../../../static/icon/6707.png" mode=""></image>
						<text>{{ item.title }}</text>
					</view>
					<text class="mid">{{ item.num }}</text>
					<view class="bot">
						<image v-if="item.states == '超温警告'" src="../../../static/icon/6918.png" mode=""></image>
						<image v-if="item.states == '电量低'" src="../../../static/icon/6921.png" mode=""></image>
						<text :class="{ origin: item.states == '电量低', red: item.states == '超温警告' }">{{ item.states }}</text>
						<text>于{{ item.time }}</text>
					</view>
				</view>
				<view class="list-right"><image src="../../../static/icon/minright.png" mode=""></image></view>
				<image class="sure" src="../../../static/icon/OK.png" mode=""></image>
				<view class="box-foot"></view>
			</view>

			<view class="mybotactive" v-if="operation">
				<view class="left" @click="allactive">
					<image v-if="activeall" src="../../../static/icon/2747.png" mode=""></image>
					<image v-else src="../../../static/icon/6979.png" mode=""></image>
					<text>全选</text>
				</view>
				<view class="right" @click="sure">
					<image src="../../../static/icon/6932.png" mode=""></image>
					<text>确认所选告警</text>
				</view>
			</view>
			
			<uni-popup ref="popup" type="center">
				<view class="mycenter">
					<image class="in" src="../../../static/icon/6913.png" mode=""></image>
					<image class="out" src="../../../static/icon/6914.png" mode=""></image>
					<text class="tishi">是否批量确认告警信息？</text>
					<view class="btn">
						<view class="btn1" @click="close">是</view>
						<view class="btn2" @click="close">否</view>
					</view>
				</view>
			</uni-popup>
			
			<uni-load-more :status="more"></uni-load-more>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			garbage: true,
			record: true,
			activeall: true,
			indexes: 999,
			operation: false,
			more: 'nomore',
			isshow: true,
			warninglist: [
				{
					title: '110kV丹诗文线-N4',
					num: '探头编号T5B464668444447',
					states: '超温警告',
					time: '2021-12-21 15:24:20',
					active: ''
				},
				{
					title: '110kV丹诗文线-N4',
					num: '探头编号T5B464668444447',
					states: '电量低',
					time: '2021-12-21 15:24:20',
					active: ''
				},
				{
					title: '110kV丹诗文线-N4',
					num: '探头编号T5B464668444447',
					states: '超温警告',
					time: '2021-12-21 15:24:20',
					active: ''
				},
				{
					title: '110kV丹诗文线-N4',
					num: '探头编号T5B464668444447',
					states: '超温警告',
					time: '2021-12-21 15:24:20',
					active: ''
				}
			]
		};
	},
	onReachBottom() {
		this.more = 'loading';
	},
	methods: {
		func() {
			this.operation = true;
		},
		close(){
			this.$refs.popup.close()
			for (let i = 0; i < this.warninglist.length; i++) {
				this.warninglist[i].active = '';
			}
			this.operation = false
			this.record = true
		},
		sure(){
			this.$refs.popup.open()
		},
		allactive() {
			this.activeall = !this.activeall;
			if (this.activeall) {
				for (let i = 0; i < this.warninglist.length; i++) {
					this.warninglist[i].active = '';
					this.record = true;
				}
			} else {
				for (let i = 0; i < this.warninglist.length; i++) {
					this.warninglist[i].active = 'active';
					this.record = false;
				}
			}
		},
		active(index) {
				let arr = [];
			if (this.operation) {
				if (this.warninglist[index].active == '') {
					this.warninglist[index].active = 'active';
				} else {
					this.warninglist[index].active = '';
				}
				for (let i = 0; i < this.warninglist.length; i++) {
					if(this.warninglist[i].active == ''){
						arr.push(i)
					}
				}
				if(arr.length<this.warninglist.length){
					this.record = false
				}else{
					this.record = true
				}
			}
		},
		longtap(index) {
			this.operation = true;
			if (this.operation) {
				if (this.warninglist[index].active == '') {
					this.warninglist[index].active = 'active';
					this.record = false;
				} else {
					this.warninglist[index].active = '';
					this.record = true;
				}
			}
			uni.vibrateShort({
				
			});
		},
		jump() {
			uni.navigateTo({
				url: '../Confirmed/Confirmed'
			});
		},
		option(v) {
			if (v == '待确认') {
				this.isshow = true;
				this.garbage = true
			} else {
				this.isshow = false;
				this.garbage = false
			}
		}
	}
};
</script>

<style lang="less" scoped>
.wrap {
	padding: 7rpx 34rpx 38rpx 34rpx;
	box-sizing: border-box;
	position: relative;
	top: 268rpx;
	z-index: 1;
	.mycenter{
		width:620rpx;
		height: 500rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		background-image: url(../../../static/icon/6980.png);
		background-size: 100% 100%;
		z-index: 999;
		position: relative;
		.btn{
			width: 100%;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 10%;
			.btn1{
				width: 271rpx;
				height: 88rpx;
				border: 1rpx solid #5AE8FF;
				background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
				box-shadow: -2rpx 0px 5rpx rgba(90, 232, 255, 0.7);
				box-sizing: border-box;
				color: #FFFFFF;
				text-align: center;
				line-height: 88rpx;
			}
			.btn2{
				width: 271rpx;
				height: 88rpx;
				border: 1rpx solid rgba(90, 232, 255, 0.6);
				background: linear-gradient(180deg, rgba(62, 110, 128, 0.6) 0%, rgba(0, 27, 74, 0.6) 100%);
				box-sizing: border-box;
				color: #FFFFFF;
				text-align: center;
				line-height: 88rpx;
			}
		}
		.tishi{
			font-size: 32rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 46rpx;
			color: #FFFFFF;
			position: absolute;
			width: 100%;
			text-align: center;
			left: 50%;
			transform: translateX(-50%);
			bottom: 180rpx;
		}
		.in{
			position: absolute;
			top: 88rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 143rpx;
			height: 143rpx;
			z-index: 9999;
		}
		.out{
			animation: anim 3s linear infinite;
			@keyframes anim{
			  0%{-webkit-transform:rotate(0deg);}
			  25%{-webkit-transform:rotate(90deg);}
			  50%{-webkit-transform:rotate(180deg);}
			  75%{-webkit-transform:rotate(270deg);}
			  100%{-webkit-transform:rotate(360deg);}
			}
			position: absolute;
			top: 60rpx;
			left: 34%;
			width: 203rpx;
			height: 203rpx;
			z-index: 9999;
			
		}
	}
	.mybotactive {
		width: 100%;
		height: 100rpx;
		background: #ffffff;
		opacity: 1;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999999;
		display: flex;
		transition: 0.3s;
		.left {
			width: 55%;
			height: 100rpx;
			border: 1rpx solid #4492c2;
			background: linear-gradient(180deg, #0d4b88 0%, #013161 100%);
			box-shadow: 0px -6px 12px rgba(44, 28, 28, 0.08);
			display: flex;
			align-items: center;
			image {
				width: 41rpx;
				height: 41rpx;
				margin-left: 55rpx;
			}
			text {
				margin-left: 20rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				line-height: 42rpx;
				color: #5ae8ff;
			}
		}
		.right {
			width: 45%;
			height: 100rpx;
			border: 1rpx solid #5ae8ff;
			background: linear-gradient(180deg, #5ae8ff 0%, #1c54b8 100%);
			box-shadow: -2rpx 0px 5rpx rgba(90, 232, 255, 0.7);
			display: flex;
			justify-content: center;
			align-items: center;
			image {
				width: 50rpx;
				height: 50rpx;
			}
			text {
				font-size: 36rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 52rpx;
				color: #ffffff;
			}
		}
	}
	.list,
	.listwait {
		margin: 20rpx 0;
		width: 100%;
		height: 182rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.6);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.6) 0%, rgba(28, 84, 184, 0.6) 100%);
		box-shadow: 2px 3px 8px rgba(90, 232, 255, 0.4);
		position: relative;
		padding: 10rpx 20rpx 20rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		z-index: 99;
		.active {
			width: 41rpx;
			height: 41rpx;
		}
		.list-left {
			.top {
				display: flex;
				align-items: center;
				text {
					font-size: 32rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					color: #ffffff;
				}
				image {
					width: 48rpx;
					height: 48rpx;
				}
			}
			.mid {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 40rpx;
				color: #ffffff;
			}
			.bot {
				display: flex;
				align-items: center;
				.origin {
					color: #fbc965;
					opacity: 1;
				}
				.red {
					color: #ff7672;
					opacity: 1;
				}
				text {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 40rpx;
					color: #ffffff;
					opacity: 0.5;
					margin-left: 10rpx;
				}
				image {
					width: 26rpx;
					height: 38rpx;
				}
			}
		}
		.list-right {
			image {
				width: 14rpx;
				height: 17rpx;
			}
		}
		.sure {
			width: 151rpx;
			height: 118rpx;
			position: absolute;
			right: 56rpx;
			top: 0;
		}
		.box-foot {
			width: 114rpx;
			height: 4rpx;
			background: #54d6ff;
			box-shadow: 0px 0px 8rpx #9ef2ff;
			position: absolute;
			bottom: -2rpx;
			left: 50%;
			transform: translateX(-50%);
		}
	}
	.list {
		align-items: center;
		justify-content: space-between;
	}
	.listwait {
		align-items: center;
		.active {
			margin-right: 24rpx;
		}
	}

	.listwaitactive {
		border: 2rpx solid rgba(90, 232, 255, 0.3);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.3) 0%, rgba(28, 84, 184, 0.3) 100%);
		box-shadow: 2px 3px 8px rgba(90, 232, 255, 0.4);
	}
	.listwaitnoactive {
		border: 2rpx solid rgba(90, 232, 255, 0.8);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.8) 0%, rgba(28, 84, 184, 0.8) 100%);
		box-shadow: 2px 3px 8px rgba(90, 232, 255, 0.4);
	}
}
</style>
