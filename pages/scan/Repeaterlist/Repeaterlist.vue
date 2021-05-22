<template>
	<view class="index">
		<view class="headtab">
			<view style="height: 40rpx;"></view>
			<view class="headertitle">
				<image @click="backpage" src="../../../static/icon/left.png" mode=""></image>
				<text>选择中继器</text>
			</view>
			<view class="serch">
				<image src="../../../static/icon/serch.png" mode=""></image>
				<input type="text" confirm-type="search" @confirm="serchdata" v-model="keyword" value="" placeholder="请输入线路名称和塔杆名称搜索..." placeholder-class="plac" />
			</view>
		</view>
		<view class="wrap">
			<view class="list" v-for="(item,index) in list" :key="index" @click="choice(item,index)">
				<view class="list-top">
					<view class="list-top-left">
						<image src="../../../static/icon/wifi.png" mode=""></image>
						<text>{{ item.repeater_id }}</text>
					</view>
					<view class="list-top-right">
						<image v-if="active==index" src="../../../static/icon/choice.png" mode=""></image>
					</view>
				</view>
				<view class="list-mid">
					<view class="list-mid-left">
						<text>IP: {{ item.ip }}</text>
						<text>4G卡号: {{ item.repeater_phone }}</text>
						<text>位置: {{ item.tower_position }}</text>
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
				more: "nomore",
				keyword: "",
				limit: 6,
				active: -1,
				list: []
			};
		},
		created() {
			this.allrepeater()
		},
		onReachBottom() {
			this.more = "loading"
			this.limit += 6
			this.allrepeater()
		},
		methods:{
			serchdata(){
				this.allrepeater()
			},
			allrepeater(){
				if(this.keyword==" "){
					this.$api.postapi('/api/repeater/selAllRepeater',{limit:this.limit,isall:1}).then(res => {
						console.log(res)
						if(this.limit>=res.data.count){
							this.more = 'nomore'
						}
						this.list = res.data.data
					})
				}else{
					this.$api.postapi('/api/repeater/selAllRepeater',{limit:this.limit,isall:1,keyword:this.keyword}).then(res => {
						console.log(999,res)
						if(this.limit>=res.data.count){
							this.more = 'nomore'
						}
						this.list = res.data.data
					})
				}
				this.$forceUpdate()
			},
			choice(item,index){
				this.active = index
				let obj = {
					name:item.repeater_name,
					card:item.repeater_phone,
					repeater_id: item.id
				}
				this.$store.commit('repeater',obj)
				uni.redirectTo({
					url:"../choice/choice"
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
	z-index: 99;
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
		z-index: 9;
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
