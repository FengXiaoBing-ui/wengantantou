<template>
	<view class="tabbar">
		<view class="tabbar-box" v-for="(item,index) in tablist" :key="index" :class="currentTabIndex == index ? 'active' : ''" @tap="switchTab(index)">
			<view class="navigator" :class="currentTabIndex == index ? 'on' : ''" >
				<view class="icon">
					<image style="width: 60rpx;height: 60rpx;" class="iconfont" :src="currentTabIndex == index ? item.select : item.icon"></text>
					<text v-if="item.badge" class="uni_badge" >{{ item.badge }}</text>
					<text v-if="item.badgeDot" class="uni_badge uni_badge_dot"></text>
				</view>
				<view class="text" :style="[currentTabIndex == index ? {'color': tintColor} : {'color': color}]">
					{{ item.text }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				tablist: [
					{
						icon: require("../static/icon/172.png"),
						text: "主页",
						select: require('../static/icon/172select.png'),
					},
					{
						icon: require("../static/icon/171.png"),
						text: "告警",
						select: require('../static/icon/171select.png'),
						badge: 0
					},
					{
						icon: require("../static/icon/174.png"),
						select: require('../static/icon/174select.png'),
						text: "待办",
						badge: 0
					},
					{
						icon: require("../static/icon/173.png"),
						select: require('../static/icon/173select.png'),
						text: "我的"
					},
				],
				currentTabIndex: this.current
			}
		},
		props:{
			current: {
				type: Number,
				default: 0
			},
			backgroundColor: {
				type:String,
				default: '#fbfbfb'
			},
			color: {
				type:String,
				default: '#999'
			},
			tintColor: {
				type:String,
				default: 'rgba(255,255,255,0.6)'
			}
		},
		created() {
			this.countdata()
		},
		methods:{
			countdata(){
				this.$api.postapi('/api/Alarmlog/sel_warn_task_count').then(res => {
					this.$store.commit('count',res.data)
					this.tablist[1].badge = this.$store.state.count.total_warn_count
					this.tablist[2].badge = this.$store.state.count.task_count
					
				})
			},
			switchTab(index){
				let routepath;
				this.$emit('click',index)
				switch (index){
					case 0: routepath = "../index/index"; break;
					case 1: routepath = "../danger/danger"; break;
					case 2: routepath = "../wait/wait"; break;
					case 3: routepath = "../user/user"; break;
				}
				this.countdata()
				uni.switchTab({
					url:routepath,
					fail(err) {
						console.log(err)
					}
				})
			}
		},
	}
</script>

<style lang="less" scoped>
	.tabbar{
		position: fixed;
		bottom: 0;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		z-index: 9999;
		
		.tabbar-box{
			padding: 5rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			height: 98rpx;
			flex: 1;
			background: linear-gradient(180deg, #0D4B88 0%, #013161 100%);
			box-shadow: 0px -6px 12px rgba(44, 28, 28, 0.08);
			box-sizing: border-box;
			.navigator{
				text-align: center;
				.icon{
					position: relative;
					height: 60rpx;
					.uni_badge{
						position: absolute;
						right: -10rpx;
						top: -10rpx;
						width: 37rpx;
						height: 37rpx;
						border-radius: 50%;
						background-color: #FE7369;
						text-align: center;
						color: #FFFFFF;
						font-size: 24rpx;
						font-family: Roboto;
						font-weight: 400;
					}
				}
				.text{
					font-size: 26rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
				}
			}
			
		}
		.active{
			border: 1px solid #5AE8FF;
			background: linear-gradient(180deg, #41C9FC 0%, #1C54B8 100%);
			box-shadow: 2px 0px 5px rgba(90, 232, 255, 0.8);
			border-style: solid solid none solid;
			box-sizing: border-box;
		}
	}
</style>
