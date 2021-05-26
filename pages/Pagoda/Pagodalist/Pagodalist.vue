<template>
	<view class="index">
		<view class="headtab">
			<view style="height: 80rpx;"></view>
			<view class="headertitle">
				<image @click="backpage" src="../../../static/icon/left.png" mode=""></image>
				<text>输电塔管理</text>
			</view>
			<view class="serch">
				<image src="../../../static/icon/serch.png" mode=""></image>
				<input confirm-type="search" @confirm="searchdata" type="text" v-model="keyword" value="" placeholder="请输入线路名称和塔杆名称搜索..." placeholder-class="plac" />
			</view>
		</view>
		<view class="wrap">
			<view class="list" v-for="(item,index) in list" :key="index">
				<view class="list-top">
					<text>{{ item.line_name }}</text>
					<view class="line"></view>
					<image v-if="item.isshow" @click="dropdown(item.isshow,index)" src="../../../static/icon/open.png" mode=""></image>
					<image v-else @click="dropdown(item.isshow,index)" src="../../../static/icon/openbot.png" mode=""></image>
				</view>
				<view class="listcontent" v-for="(itemes,index) in item.tagan" :key="index" v-if="item.isshow" @click="jump(item.id,itemes.id)">
					<view class="titletop">
						<image src="../../../static/icon/6707.png" mode=""></image>
						<text>{{ itemes.tagan_name }}</text>
					</view>
					<view class="content-mid">
						<view class="left">
							<view class="left-top">
								<image src="../../../static/icon/1282.png" mode=""></image>
								<text>探头数</text>
								<text>{{ itemes.sensor_work_count }}/{{ itemes.sensor_all_count }}</text>
							</view>
							<view class="left-bot">
								<view>
									<text ref="gaowen">高温</text>
									<text :class="itemes.sensor_high_temp_count<=0?'num-zero':'origin'">{{ itemes.sensor_high_temp_count }}</text>
								</view>
								<view>
									<text>超温</text>
									<text :class="itemes.sensor_over_high_count<=0?'num-zero':'red'">{{ itemes.sensor_over_high_count }}</text>
								</view>
								<view>
									<text>电量低</text>
									<text :class="itemes.sensor_low_power_count<=0?'num-zero':'origin'">{{ itemes.sensor_low_power_count }}</text>
								</view>
								<view>
									<text>已离线</text>
									<text :class="{'num-zero':itemes.sensor_out_line_count<=0}">{{ itemes.sensor_out_line_count }}</text>
								</view>
							</view>
						</view>
						<view class="right">
							<view class="left-top">
								<image src="../../../static/icon/wifi.png" mode=""></image>
								<text>中继器</text>
								<text>{{ itemes.repeater_all_count }}</text>
							</view>
							<view class="left-bot">
								<view>
									<text>电量低</text>
									<text :class="itemes.repeater_low_power_count<=0?'num-zero':'origin'">{{ itemes.repeater_low_power_count }}</text>
								</view>
								<view>
									<text>已离线</text>
									<text>{{ itemes.repeater_line_out_count }}</text>
								</view>
							</view>
						</view>
					</view>
					
					<view class="bordbot"></view>
				</view>
				
			</view>
			<uni-load-more :status="more"></uni-load-more>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				active: "",
				list: [],
				limit:20,
				more:"more",
				keyword: "",
			};
		},
		created() {
			this.pagodalist()
		},
		onReachBottom() {
			this.limit += 10
			this.more = 'loading'
			this.pagodalist()
		},
		methods:{
			searchdata(){
				this.limit = 20
				this.pagodalist()
			},
			pagodalist(){
				if(this.keyword == ""){
					this.$api.postapi('/api/tower/selAllTower',{limit:this.limit}).then(res=> {
						console.log(res)
						if(res.data.code==0){
							this.more = "nomore"
							this.list = []
						}else{
							if(this.limit>=res.data.count){
								this.more = "nomore"
							}
							let arr = []
							for(let i = 0; i < this.list.length;i ++){
								if(this.list[i].isshow == true){
									arr.push(i)
								}
							}
							this.list = res.data.data
							for(let i = 0; i < this.list.length;i ++){
								this.list[i].isshow = false
								arr.forEach( e => {
									this.list[e].isshow = true
								})
							}
						}
					})
				}else{
					this.$api.postapi('/api/tower/selAllTower',{limit:this.limit,keyword:this.keyword}).then(res=> {
						console.log(res)
						if(res.data.code==0){
							this.more = "nomore"
							this.list = []
						}else{
							if(this.limit>=res.data.count){
								this.more = "nomore"
							}
							let arr = []
							for(let i = 0; i < this.list.length;i ++){
								if(this.list[i].isshow == true){
									arr.push(i)
								}
							}
							this.list = res.data.data
							for(let i = 0; i < this.list.length;i ++){
								this.list[i].isshow = false
								arr.forEach( e => {
									this.list[e].isshow = true
								})
							}
						}
					})
				}
				
			},
			backpage(){
				uni.navigateBack({
					delta:1
				})
			},
			jump(line_id,tagan_id){
				uni.navigateTo({
					url:"../pagodadetail/pagodadetail?line_id="+line_id+"&tagan_id="+tagan_id
				})
			},
			dropdown(isshow,index){
				if(this.list[index].isshow == false){
					this.list[index].isshow = true
				}else{
					this.list[index].isshow = false
				}
				this.$forceUpdate()
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
		margin-bottom: 20rpx;
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
				max-width: 80%;
				min-width: 20%;
				height: 0px;
				border: 1rpx dotted #9EA5AE;
				opacity: 1;
			}
		}
		.listcontent{
			width: 100%;
			height: 278rpx;
			margin-top: 18rpx;
			border: 2rpx solid rgba(90, 232, 255, 0.7);
			background: linear-gradient(180deg, rgba(65, 201, 252, 0.7) 0%, rgba(28, 84, 184, 0.7) 100%);
			box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.7);
			position: relative;
			.content-mid{
				width: 100%;
				margin-top: 10rpx;
				display: flex;
				align-items: center;
				justify-content: space-evenly;
				.left,.right{
					width: 55%;
					height: 186rpx;
					background: rgba(0, 15, 22, 0.15);
					border: 1rpx solid #5BC8CB;
					border-radius: 14rpx;
					box-sizing: border-box;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					.left-top{
						display: flex;
						justify-content: center;
						align-items: center;
						image{
							width: 30rpx;
							height: 30rpx;
							margin-right: 5rpx;
						}
						text{
							font-size: 28rpx;
							font-family: Source Han Sans CN;
							font-weight: 400;
							line-height: 40rpx;
							color: #FFFFFF;
							margin: 0 5rpx;
							&:nth-child(3){
								font-size: 32rpx;
								font-family: Roboto;
								line-height: 38rpx;
							}
						}
					}
					.left-bot{
						word-spacing: 100%;
						display: flex;
						align-items: center;
						view{
							display: flex;
							flex-direction: column;
							align-items: center;
							margin: 0 10rpx;
							text{
								font-size: 28rpx;
								color: #FFFFFF;
							}
							.num-zero{
								opacity: 0.5;
							}
							.origin{
								color: rgba(251, 201, 101, 1);
							}
							.red{
								color: rgba(255, 118, 114, 1);
							}
						}
					}
				}
				.right{
					width: 40%;
					height: 186rpx;
					background: linear-gradient(180deg, rgba(148, 255, 211, 0.35) 0%, rgba(65, 201, 252, 0.35) 100%);
					border-radius: 14rpx;
					box-sizing: border-box;
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
