<template>
	<view class="index">
		<headerTab title="选择人员" :sure="true" @func="func"></headerTab>
		<view class="wrap">
			<view class="list" :class="item.active=='active'?'activebackground':''" v-for="(item,index) in list" :key="index" @click="active(index)">
				<text>{{ item.name }}</text>
				<image v-if="item.active!='active'" src="../../../static/icon/2747.png" mode=""></image>
				<image v-if="item.active=='active'" src="../../../static/icon/6979.png" mode=""></image>
				<view></view>
			</view>
			<uni-load-more status="nomore"></uni-load-more>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [
					{
						name: "张大力",
						active: ""
					},
					{
						name: "柳德喜",
						active: ""
					},
					{
						name: "发飞洒",
						active: ""
					},
					{
						name: "手动阀二",
						active: ""
					},
					{
						name: "供奉的是",
						active: ""
					},
					{
						name: "陨坑",
						active: ""
					},
					{
						name: "语课",
						active: ""
					},
				]
			};
		},
		methods:{
			active(index){
				if(this.list[index].active==""){
					this.list[index].active = 'active'
				}else{
					this.list[index].active = ''
				}
			},
			func(){
				let arr = []
				this.list.forEach(e => {
					if(e.active == 'active'){
						arr.push(e.name)
					}
				})
				arr = JSON.stringify(arr)
				uni.navigateTo({
					url:"../release/release?arr="+arr
				})
			}
		}
	}
</script>

<style lang="less" scoped>
.wrap{
	width: 100%;
	position: relative;
	top: 268rpx;
	box-sizing: border-box;
	z-index: 999;
	.activebackground{
		background: linear-gradient(180deg, rgba(90, 232, 255, 0.6) 0%, rgba(28, 84, 184, 0.6) 100%);
		box-shadow: 0px 0px 6rpx rgba(2, 2, 55, 0.28);
	}
	.list{
		display: flex;
		align-items: center;
		padding: 21rpx 5% 24rpx 5%;
		justify-content: space-between;
		margin: 0 auto;
		position: relative;
		image{
			width: 41rpx;
			height: 41rpx;
		}
		text{
			font-size: 32rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
		}
		view{
			position: absolute;
			bottom: 1rpx;
			left: 50%;
			transform: translateX(-50%);
			width: 90%;
			height: 2rpx;
			background: rgba(90, 232, 255, 0.5);
		}
	}
}
</style>
