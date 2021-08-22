<template>
	<view class="index">
		<headerTab title="激活探头"></headerTab>
		<view class="wrap">
			<view class="box" :class="reapisshow||objisshow?'boxnoopacity':''">
				<text>绑定中继器</text>
				<view class="Repeater" @click="jump">
					<view class="Repeater-box">
						<view class="left">
							<image src="../../../static/icon/wifi.png" mode=""></image>
							<text v-if="!reapisshow">点此选择中继器</text>
							<view class="hasdata" v-if="reapisshow">
								<text>{{ reap.name }}</text>
								<text>卡号：{{ reap.card }}</text>
							</view>
						</view>
						<image src="../../../static/icon/minright.png" mode=""></image>
					</view>
				</view>
				<text>绑定输电塔</text>
				<view class="Repeater" @click="pagoda">
					<view class="Repeater-box">
						<view class="left">
							<image src="../../../static/icon/6707.png" mode=""></image>
							<text v-if="!objisshow">点此选择输电塔位置</text>
							<view class="hasdata" v-if="objisshow">
								<text>{{ obj.title }}</text>
								<text>位置：{{ obj.phase_name }}-{{ obj.name }}-{{ obj.gps }}</text>
							</view>
						</view>
						<image src="../../../static/icon/minright.png" mode=""></image>
					</view>
					<image v-if="objisshow" class="pagoda" :src="obj.img" mode="aspectFit"></image>
					
				</view>
			</view>
			<view :class="btnshow?'activebotbtn':'botbtn'" @click="sure">
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
				reap: {},
				obj: {},
				objisshow: false,
				reapisshow: false,
				btnshow: false
			};
		},
		onBackPress(e) {
			uni.redirectTo({
				url:"../scanprobedetail/scanprobedetail?id="+this.$store.state.probeid
			})
			return true
		},
		onLoad(option) {
			
			this.reap = this.$store.state.repeater
			if(JSON.stringify(this.reap)=='{}'){
				this.reapisshow = false
			}else{
				this.reapisshow = true
			}
			this.obj = this.$store.state.pagoda
			if(JSON.stringify(this.obj)=='{}'){
				this.objisshow = false
			}else{
				this.objisshow = true
			}
			if(this.objisshow&&this.reapisshow){
				this.btnshow = true
			}else{
				this.btnshow = false
			}
		},
		methods:{
			jump(){
				uni.navigateTo({
					url:"../Repeaterlist/Repeaterlist"
				})
			},
			pagoda(){
				uni.navigateTo({
					url:"../pagoda/pagoda"
				})
			},
			sure(){
				if(this.btnshow){
					this.$api.postapi('/api/Sensor/activa_sensor1',{
						side_id:this.obj.side_id,
						repeater_id: this.reap.repeater_id,
						warefire_id: this.obj.id,
						id:this.$store.state.probeid
					}).then(res => {
						console.log('okoko',res)
						if(res.data.code==1){
							uni.navigateTo({
								url:"../result/result"
							})
						}
					})
				}else{
					
				}
				
			}
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	width: 100%;
	padding: 24rpx 34rpx;
	box-sizing: border-box;
	position: relative;
	top: 168rpx;
	z-index: 1;
	.box{
		width: 100%;
		border: 2rpx solid #5AE8FF;
		background: linear-gradient(180deg, #41C9FC 0%, #1C54B8 100%);
		box-shadow: 2rpx 4rpx 10rpx rgba(90, 232, 255, 0.8);
		opacity: 0.7;
		padding: 20rpx 17rpx;
		box-sizing: border-box;
		text{
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 40rpx;
			color: #FFFFFF;
		}
		.Repeater{
			margin: 13rpx 0;
			width: 100%;
			border: 1rpx solid #4492C2;
			background: linear-gradient(180deg, #0D4B88 0%, #013161 100%);
			box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
			opacity: 0.51;
			padding: 40rpx;
			box-sizing: border-box;
			.Repeater-box{
				display: flex;
				align-items: center;
				justify-content: space-between;
			}
			.left{
				display: flex;
				align-items: center;
				image{
					width: 120rpx;
					height: 120rpx;
				}
				.hasdata{
					display: flex;
					flex-direction: column;
					text{
						&:nth-child(1){
							font-size: 32rpx;
							font-family: Source Han Sans CN;
							font-weight: bold;
							line-height: 46rpx;
							color: #FFFFFF;
						}
						&:nth-child(2){
							
						}
					}
				}
			}
			image{
				width: 14rpx;
				height: 17rpx;
				margin-right: 20rpx;
			}
			.pagoda{
				width: 569rpx;
				height: 319rpx;
			}
		}
	}
	.boxnoopacity{
		opacity: 1;
		border: 2rpx solid rgba(90, 232, 255, 0.5);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
		.Repeater{
			border: 1rpx solid rgba(68, 146, 194, 0.5);
			background: linear-gradient(180deg, rgba(13, 75, 136, 0.5) 0%, rgba(1, 49, 97, 0.5) 100%);
			box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
			opacity: 1;
		}
	}
	.botbtn{
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
	.activebotbtn{
		margin-top: 50rpx;
		width: 100%;
		height: 100rpx;
		border: 1rpx solid #5AE8FF;
		background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
		box-shadow: -2rpx 0px 5rpx rgba(90, 232, 255, 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 1;
		image{
			width: 50rpx;
			height: 50rpx;
		}
		text{
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			line-height: 52rpx;
			color: #FFFFFF;
			opacity: 1;
		}
	}
}
</style>
