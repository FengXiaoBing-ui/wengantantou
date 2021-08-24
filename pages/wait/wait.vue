<!-- <template>
	<view class="danger">
		<image class="headimg" src="../../static/icon/12.png" mode=""></image>
		
		<view class="wrap">
			<text class="title">中继器待办信息</text>
			<view class="radiusimg">
				<image class="animeimgborder" src="../../static/icon/6764.png" mode=""></image>
				<image class="animeimg" src="../../static/icon/6998.png" mode=""></image>
			</view>
			<view class="record">
				<view class="left" @click="missiondetailsubmit(0,'探头待办')">
					<image class="gray" src="../../static/icon/2488.png" mode=""></image>
					<image class="botimg" src="../../static/icon/13965.png" mode=""></image>
					<view class="twoimg">
						<image src="../../static/icon/1282.png" mode=""></image>
						<image src="../../static/icon/6766.png" mode=""></image>
					</view>
					<view class="text">
						<text>探头待办</text>
						<text>{{ sensor_task_count }}</text>
					</view>
				</view>
				<view class="right" @click="missiondetailsubmit(1,'中继器待办')">
					<image class="gray" src="../../static/icon/2488.png" mode=""></image>
					<image class="botimg" src="../../static/icon/13965.png" mode=""></image>
					<view class="twoimg">
						<image src="../../static/icon/6765.png" mode=""></image>
						<image src="../../static/icon/6766.png" mode=""></image>
					</view>
					<view class="text">
						<text>中继器待办</text>
						<text>{{ repeater_task_count }}</text>
					</view>
					
				</view>
			</view>
		</view>
		
		<image class="footimg" src="../../static/icon/13.png" mode=""></image>
		<tab-bar :current="currentTabIndex" backgroundColor="#fbfbfb" color="#999" tintColor="#FFFFFF" @click="tabClick"></tab-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentTabIndex:2,
				title: 'Hello',
				repeater_task_count: "",
				sensor_task_count: ""
			}
		},
		beforeCreate() {
			uni.navigateTo({
				url:"../WaitMission/MissiondetailSubmit/MissiondetailSubmit?type=0?title='探头待办'"
			})
		},
		onShow() {
			uni.navigateTo({
				url:"../WaitMission/MissiondetailSubmit/MissiondetailSubmit?type=0?title='探头待办'"
			})
			this.repeater_task_count = this.$store.state.count.repeater_task_count
			this.sensor_task_count = this.$store.state.count.sensor_task_count
			uni.hideTabBar()
		},
		onLoad() {
		
		},
		methods: {
			missiondetailsubmit(type,title){
				uni.navigateTo({
					url:"../WaitMission/MissiondetailSubmit/MissiondetailSubmit?type="+type+'&title='+title
				})
			},
			tabClick(index){
				this.currentTabIndex = index
			}
		}
	}
</script>

<style lang="less" scoped>
.danger{
	width: 100%;
	.wrap{
		width: 100%;
		position: relative;
		top: 0;
		text-align: center;
		padding-top: 82rpx;
		box-sizing: border-box;
		z-index: 999;
		.title{
			font-size: 42rpx;
			font-family: Source Han Sans CN;
			font-weight: bold;
			line-height: 61rpx;
			color: #FFFFFF;
		}
		.radiusimg{
			margin: 0 auto;
			width: 251rpx;
			height: 251rpx;
			border-radius: 50%;
			position: relative;
			.animeimg{
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%,-50%);
				width: 151rpx;
				height: 151rpx;
			}
			.animeimgborder{
				width: 251rpx;
				height: 251rpx;
				position: absolute;
				left: 0;
				top: 0;
				animation: borderimg 3s linear infinite;
				@keyframes borderimg{
					0%{-webkit-transform:rotate(0deg);}
					25%{-webkit-transform:rotate(90deg);}
					50%{-webkit-transform:rotate(180deg);}
					75%{-webkit-transform:rotate(270deg);}
					100%{-webkit-transform:rotate(360deg);}
				}
			}
		}
		.record{
			width: 100%;
			padding: 38rpx 34rpx;
			box-sizing: border-box;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.left,.right{
				width: 48%;
				height: 303rpx;
				border: 2rpx solid rgba(90, 232, 255, 0.3);
				background: linear-gradient(180deg, rgba(65, 201, 252, 0.6) 0%, rgba(28, 84, 184, 0.6) 100%);
				box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
				position: relative;
				padding: 36rpx 0;
				box-sizing: border-box;
				.text{
					margin-top: 15rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					text{
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						line-height: 40rpx;
						color: #FFFFFF;
						&:nth-child(2){
							font-size: 54rpx;
							font-family: Roboto;
							font-weight: bold;
							line-height: 65rpx;
							color: #FF7672;
							opacity: 1;
						}
					}
				}
				.twoimg{
					width: 111rpx;
					height: 111rpx;
					position: relative;
					left: 50%;
					transform: translateX(-50%);
					image{
						&:nth-child(1){
							width: 111rpx;
							height: 111rpx;
						}
						&:nth-child(2){
							position: absolute;
							right: -6rpx;
							bottom: 0;
							width: 42rpx;
							height: 36rpx;
						}
					}
				}
				.gray{
					position: absolute;
					bottom: 54rpx;
					left: 0;
					width: 100%;
					height: 61rpx;
				}
				.botimg{
					width: 60rpx;
					height: 37rpx;
					position: absolute;
					bottom: -18rpx;
					left: 50%;
					transform: translateX(-50%);
				}
			}
		}
	}
	.headimg{
		width: 100%;
		height: 437rpx;
		position: absolute;
		top: 0;
	}
	.footimg{
		width: 100%;
		height: 660rpx;
		position: absolute;
		bottom: 0;
	}
	
}
</style>
 -->
 <template>
 	<view class="wait">
 		<view class="header">
 			<text class="title">{{ title }}</text>
 			<view class="serch">
 				<image src="../../static/icon/6645.png" mode=""></image>
 				<input confirm-type="search" @confirm="serchdata" type="text" value="" v-model="keyword" placeholder="请输入任务单号/内容/设备编号..." placeholder-class="place" />
 			</view>
 			<view class="screen">
 				<view class="list">
 					<text :class="item==active?'actevetext':''" v-for="(item,index) in list" :key="index" @click="activeoption(item,index)">{{ item }}</text>
 					<view class="bordbot" :class="{'left':active=='待处理','mid':active=='处理中','right':active=='已完成'}"></view>
 				</view>
 			</view>
 		</view>
 		
 		<view class="wrap" v-if="!nodata">
 			<view @click="jump(item.id)" class="list" v-for="(item, index) in warninglist" :key="index" v-if="isshow">
 				<view class="list-left">
 					<view class="top">
 						<image src="../../static/icon/6707.png" mode=""></image>
 						<text>{{ item.tagan }}</text>
 					</view>
 						<text class="mid">任务编号:{{ item.task_number }}</text>
 						<text class="bot">计划完成时间:{{ item.endtime_str }}</text>
 				</view>
 				<view class="list-right"><image src="../../static/icon/minright.png" mode=""></image>
 				</view>
 				<view class="sure">
 					<text>消警任务</text>
 				</view>
 				<view class="box-foot"></view>
 			</view>
 			<uni-load-more :status="more"></uni-load-more>
 		</view>
 		
 		<text class="nodata" v-if="nodata">暂无数据...</text>
 		<image class="footimg" src="../../static/icon/13.png" mode=""></image>
 		<tab-bar :current="currentTabIndex" backgroundColor="#fbfbfb" color="#999" tintColor="#FFFFFF" @click="tabClick"></tab-bar>
 	</view>
 </template>
 
 <script>
 	export default {
 		data() {
 			return {
 				more: "nomore",
 				type: 0,
 				index: "",
 				keyword: "",
 				nodata: false,
 				active: "待处理",
 				isshow: true,
 				currentTabIndex:2,
 				title: '探头待办',
 				list: ["待处理","处理中","已完成"],
 				warninglist: [],
 				limit: 6
 			}
 		},
 		created() {
 			uni.showLoading({
 				title:"loadding..."
 			})
 			this.waitdata(0)
 		},
 		onReachBottom() {
 			this.limit += 4
 			this.more = 'loading'
 			this.waitdata(this.type)
 		},
 		onShow() {
			this.$api.postapi('/api/Alarmlog/sel_warn_task_count').then(res => {
				this.$store.commit('count',res.data)
				this.count = this.$store.state.count.total_warn_count
				this.waitcount = this.$store.state.count.task_count
			})
			this.waitdata(0)
 			uni.hideTabBar()
 		},
 		onLoad(option) {
 			this.index = option.type
 			// this.title = option.title
 		},
 		methods: {
 			serchdata(){
 				this.waitdata(this.type)
 			},
 			backpage(){
 				uni.navigateBack({
 					delta:1
 				})
 			},
 			activeoption(item,index){
 				this.type = index
 				this.active = item
 				this.waitdata(index)
 			},
 			waitdata(type){
 				if(this.keyword==""){
 					this.$api.postapi('/api/pubtask/sel_tasks',{type:type,limit:this.limit,index: this.index}).then(res => {
 						
 						if(this.limit>=res.data.count){
 							this.more = 'nomore'
 						}
 						if(res.data.code==0){
 							this.nodata = true
 						}else{
 							this.nodata = false
 							this.warninglist = res.data.data
 						}
 						uni.hideLoading()
 					})
 				}else{
 					this.$api.postapi('/api/pubtask/sel_tasks',{type:type,limit:this.limit,index: this.index,keyword:this.keyword}).then(res => {
 						
 						if(this.limit>=res.data.count){
 							this.more = 'nomore'
 						}
 						if(res.data.code==0){
 							this.nodata = true
 						}else{
 							this.nodata = false
 							this.warninglist = res.data.data
 						}
 						uni.hideLoading()
 					})
 				}
 			},
 			jump(id){
 				this.$api.postapi('/api/pubtask/check_task',{id:id,loginId:uni.getStorageSync('loginId')}).then(res => {
 					
 					const code = res.data.code
 					uni.navigateTo({
 						url:"../WaitMission/Missiondetails/Missiondetails?code="+code+'&id='+id
 					})
 				})
 			},
 			tabClick(index){
 				this.currentTabIndex = index
 			}
 		}
 	}
 </script>
 
 <style lang="less" scoped>
 .wait{
 	width: 100%;
 	.header{
 		width: 100%;
 		height: 225rpx;
 		position: fixed;
 		background-image: url(../../static/icon/6972.png);
 		background-size: 100% 100%;
 		text-align: center;
 		z-index: 99;
 		.backpage{
 			position: absolute;
 			left: 20rpx;
 			width: 54rpx;
 			height: 54rpx;
 			top: 50rpx;
 		}
 		.title{
 			padding-top: 40rpx;
 			display: block;
 			height: 88rpx;
 			font-size: 36rpx;
 			font-family: Source Han Sans CN;
 			font-weight: 400;
 			line-height: 88rpx;
 			color: #FFFFFF;
 		}
 		.serch{
 			width: 90%;
 			margin: 0 auto;
 			height: 72rpx;
 			border: 1rpx solid #4492C2;
 			background: linear-gradient(180deg, #0D4B88 0%, #013161 100%);
 			box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
 			display: flex;
 			align-items: center;
 			image{
 				width: 64rpx;
 				height: 64rpx;
 			}
 			input{
 				width: 100%;
 				text-align: start;
 				font-size: 28rpx;
 				font-family: Source Han Sans CN;
 				font-weight: 400;
 				color: #D6F2FF;
 				opacity: 0.56;
 			}
 			.place{
 				font-size: 28rpx;
 				font-family: Source Han Sans CN;
 				font-weight: 400;
 				line-height: 40rpx;
 				color: #D6F2FF;
 				opacity: 0.56;
 			}
 		}
 		.screen{
 			width: 100%;
 			height: 100rpx;
 			background: #032F5E;
 			.list{
 				width: 60%;
 				height: 100rpx;
 				margin: 0 auto;
 				display: flex;
 				align-items: center;
 				justify-content: space-between;
 				position: relative;
 				text{
 					width: 33.3%;
 					font-family: Source Han Sans CN;
 					font-weight: 400;
 					color: #FFFFFF;
 					line-height: 44rpx;
 					font-size: 30rpx;
 					opacity: 0.6;
 				}
 				.actevetext{
 					opacity: 1;
 					line-height: 49px;
 					font-size: 34rpx;
 				}
 				.bordbot{
 					position: absolute;
 					bottom: 0;
 					width: 33.3%;
 					height: 6rpx;
 					border: 1rpx solid #5AE8FF;
 					background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
 					transition: 0.3s;
 				}
 				.left{
 					left: 0;
 				}
 				.mid{
 					left: 33.3%;
 				}
 				.right{
 					left: 66.6%;
 				}
 			}
 		}
 	}
 	
 	.wrap{
 		padding: 7rpx 34rpx 38rpx 34rpx;
 		box-sizing: border-box;
 		position: relative;
 		top: 300rpx;
 		padding-bottom: 100rpx;
 		.list {
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
 			align-items: center;
 			justify-content: space-between;
 			z-index: 1;
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
 					font-size: 28rpx;
 					font-family: Source Han Sans CN;
 					font-weight: 400;
 					line-height: 40rpx;
 					color: #ffffff;
 					opacity: 0.5;
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
 				position: absolute;
 				top: 17rpx;
 				right: 25rpx;
 				width: 132rpx;
 				height: 43rpx;
 				background: rgba(0, 86, 136, 0.51);
 				border: 1rpx solid #5AE8FF;
 				opacity: 0.92;
 				border-radius: 10rpx;
 				box-sizing: border-box;
 				display: flex;
 				align-items: center;
 				justify-content: center;
 				text{
 					font-size: 28rpx;
 					font-family: Source Han Sans CN;
 					font-weight: 400;
 					color: #FBC965;
 				}
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
 	}
 	.footimg{
 		width: 100%;
 		height: 660rpx;
 		position: fixed;
 		bottom: 0;
 	}
 	.nodata{
 		position: absolute;
 		top: 50%;
 		left: 50%;
 		transform: translate(-50%,-50%);
 		color: #FFFFFF;
 		z-index: 1;
 	}
 }
 </style>
 