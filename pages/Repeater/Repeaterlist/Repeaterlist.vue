<template>
	<view class="index">
		<headerTab title="中继器列表" @serchdata="serchdata" :test="true" path="/screen/screen" @func="func"></headerTab>
		<view class="wrap">
			<view class="list" :class="item.state_text=='已离线'?'listopacity':''" v-for="(item,index) in list" :key="index" @click="jump(item.id)">
				<view class="list-top">
					<view class="list-top-left">
						<image src="../../../static/icon/wifi.png" mode=""></image>
						<text>{{ item.repeater_id }}</text>
					</view>
					<view class="list-top-right">
						<image v-if="item.state_text=='工作中'" src="../../../static/icon/6833.png" mode=""></image>
						<image v-if="item.state_text=='待激活'" src="../../../static/icon/6837.png" mode=""></image>
						<image v-if="item.state_text=='已离线'" src="../../../static/icon/6832.png" mode=""></image>
						<text>{{ item.state_text }}</text>
					</view>
				</view>
				<view class="list-mid">
					<view class="list-mid-left">
						<text>IP: {{ item.state_text=='待激活'?'- - -':item.ip }}</text>
						<text>设备名称: {{ item.repeater_name }}</text>
						<text>4G卡号: {{ item.state_text=='待激活'?'- - -':item.repeater_phone }}</text>
						<text>位置: {{ item.state_text=='待激活'?'- - -':item.tower_position }}</text>
					</view>
					<view class="list-mid-right">
						<text>关联探头</text>
						<text>{{ item.temp_sensor_number }}个</text>
					</view>
				</view>
				<view class="botborder"></view>
			</view>
			<uni-load-more :status="more"></uni-load-more>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword: "",
				list: [],
				limit: 6,
				obj: {},
				more: "more"
			};
		},
		onBackPress() {
			uni.switchTab({
				url:"../../index/index"
			})
			return true
		},
		created() {
		},
		onReachBottom() {
			this.more = 'loading'
			this.limit += 6
			if(JSON.stringify(this.obj)=="{}"){
				this.repeaterlist()
			}else{
				this.screen(this.obj)
			}
		},
		onLoad(option) {
			if(option.obj!=undefined){
				let obj = JSON.parse(option.obj)
				obj.limit = this.limit
				this.obj = obj
				this.limit = 6
				console.log(obj)
				setTimeout(() => {
					this.screen(obj)
				},0)
				
			}else{
				this.repeaterlist()
			}
		},
		onShow() {
			this.repeaterlist()
		},
		methods:{
			screen(obj){
				obj.limit = this.limit
				this.$api.postapi('/api/repeater/repeater_screen',obj).then(res => {
					console.log(123,res)
					if(this.limit>=res.data.count){
						this.more = 'nomore'
					}
					if(res.data.code==0){
						this.more = 'nomore'
						this.list = []
						return false
					}else{
						this.list = res.data.data
					}
				})
			},
			serchdata(keyword){
				this.keyword = keyword
				this.limit = 6
				this.repeaterlist()
			},
			jump(id){
				uni.navigateTo({
					url:"../Repeaterdetail/Repeaterdetail?id="+id
				})
			},
			repeaterlist(){
				this.$api.postapi('/api/repeater/selAllRepeater',{limit:this.limit,keyword:this.keyword}).then(res => {
					console.log(res)
					if(this.limit>=res.data.count){
						this.more = 'nomore'
					}
					if(res.data.data){
						this.list = res.data.data
					}else{
						this.list = [];
					}
					
				})
			},
			func(){
				uni.scanCode({
				    success: function (res) {
						console.log(res)
				        console.log('条码类型：' + res.scanType);
				        console.log('条码内容：' + res.result);
						let obj = JSON.parse(res.result)
						if(obj.type==0){
							uni.navigateTo({
								url:"../../scan/scanprobedetail/scanprobedetail?id="+obj.id
							})
						}else{
							uni.navigateTo({
								url:"../../scan/scanRepeater/scanRepeater?id="+obj.id
							})
						}
				    }
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.wrap{
		margin-top: 228rpx;
		padding: 34rpx;
		box-sizing: border-box;
		z-index: 99;
		.nodata{
			color: #FFFFFF;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
		}
		.listopacity{
			opacity: 0.5;
		}
		.list{
			margin: 20rpx 0;
			width: 100%;
			padding-bottom: 20rpx;
			border: 2rpx solid rgba(90, 232, 255, 0.4);
			background: linear-gradient(180deg, rgba(65, 201, 252, 0.7) 0%, rgba(28, 84, 184, 0.7) 100%);
			box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
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
				padding: 0 20rpx;
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
						width: 53rpx;
						height: 53rpx;
					}
				}
			}
			.list-bot{
				width: 94%;
				height: 50rpx;
				margin: 0 auto;
				background: rgba(214, 242, 255, 0.15);
				border-radius: 14rpx;
				overflow: hidden;
				display: flex;
				justify-content: center;
				align-items: center;
				position: relative;
				image{
					width: 50rpx;
					height: 50rpx;
				}
				text{
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 40rpx;
					color: #FFFFFF;
				}
				
				.background{
					position: absolute;
					left: 0;
					height: 50rpx;
					border-radius: 14rpx 0 0 14rpx;
				}
				
				.blue{
					background: linear-gradient(90deg, rgba(127, 229, 127, 0.5) 0%, rgba(65, 201, 252, 0.5) 100%);
				}
				.red{
					background: linear-gradient(270deg, rgba(244, 67, 54, 0.5) 0%, rgba(112, 12, 12, 0.5) 100%);
				}
			}
			.borderblue{
				border: 1rpx solid #5BC8CB;
			}
			.borderred{
				border: 1rpx solid #F44336;
				background: rgba(244, 67, 54, 0.17);
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
