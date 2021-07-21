<template>
	<view class="header-tab">
		<view class="tabbar">
			<image @click="backroute" src="../static/icon/left.png" mode=""></image>
			<text class="tit">{{ title }}</text>
			<view @click="func">
				<switch v-if="myswitch" :checked="checked"  @change="switch1Change" color="#275e98" style="transform: scale(0.5,0.5);" />
				<image src="../static/icon/scan.png" mode=""  v-if="screen"></image>
				<text  v-if="screen">新增</text>
				<image v-if="record&&garbage" src="../static/icon/6646.png" mode=""></image>
				<text v-if="record&&garbage">批量处理</text>
				<image v-if="record==false&&garbage" src="../static/icon/garbage.png" mode=""></image>
				<text v-if="record==false&&garbage">删除所选</text>
				<image v-if="sure" src="../static/icon/6932.png" mode=""></image>
				<text v-if="sure">确认</text>
				<image v-if="implement" src="../static/icon/6932.png" mode=""></image>
				<text v-if="implement">保存</text>
			</view>
		</view>
		<view class="sureserch" v-if="sure">
			<view class="serch_left">
				<image src="../static/icon/serch.png" mode=""></image>
				<input style="width: 80%;" type="text" value="" confirm-type="search" @confirm="serchdata" placeholder="请输入设备名称或编号搜索..." placeholder-style="color: #D6F2FF;" v-model="keyword" />
				<!-- <view class="serchbtn">搜索</view> -->
			</view>
		</view>
		<view class="serch" v-if="screen">
			<view class="serch_left">
				<image src="../static/icon/serch.png" mode=""></image>
				<input style="width: 80%;" type="text" value="" confirm-type="search" @confirm="serchdata" placeholder="请输入设备名称或编号搜索..." placeholder-style="color: #D6F2FF;" v-model="keyword" />
				<!-- <view class="serchbtn">搜索</view> -->
			</view>
			<view class="serch_right">
				<image src="../static/icon/668.png" mode=""></image>
				<text @click="screenjump">筛选</text>
			</view>
		</view>
		<view class="record" v-if="confirmed">
			<view class="screen">
				<text @click="anime(item)" :class="item == active ? 'activetext' : ''" v-for="item in option" :key="item">{{ item }}</text>
				<view :class="{ activeleft: active == '待确认'||active == '待处理', activemid: active == '已确认'||active == '已处理'}"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			implement: {
				type:Boolean
			},
			screen: {
				type:Boolean
			},
			title: {
				type:String
			},
			myswitch: {
				type:Boolean
			},
			path: {
				type:String
			},
			record: {
				type:Boolean
			},
			confirmed: {
				type:Boolean
			},
			garbage: {
				type:Boolean
			},
			sure: {
				type:Boolean
			},
			option: {
				type:Array,
				default(){
					return ['待确认', '已确认']
				},
			}
		},
		data() {
			return {
				checked: false,
				keyword: "",
				active: this.option[0],
				activetext: 'activetext',
			};
		},
		methods:{
			serchdata(){
				this.$emit('serchdata',this.keyword)
			},
			func(){
				this.$emit('func')
			},
			anime(item) {
				this.$emit('option',item)
				this.active = item;
			},
			screenjump(){
				uni.navigateTo({
					url:".."+this.path
				})
			},
			backroute(){
				uni.navigateBack({
					delta: 1
				});
			},
			switch1Change(e){
				this.checked = e.detail.value
			}
		}
	}
</script>

<style lang="less" scoped>
	.header-tab {
		width: 100%;
		position: fixed;
		top: 0;
		background-image: url(../static/icon/headertab.png);
		background-size: 100% 100%;
		text-align: center;
		padding: 0 34rpx;
		box-sizing: border-box;
		z-index: 99999;
		padding-top: 40rpx;
		.tabbar {
			height: 128rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			z-index: 999;
			.tit{
				position: absolute;
				left: 50%;
				transform: translateX(-50%);
			}
			view {
				display: flex;
				align-items: center;
				justify-content: space-between;
				text {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 40rpx;
					color: #ffffff;
				}
				image {
					width: 36rpx;
					height: 36rpx;
				}
			}
			text {
				font-size: 36rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #ffffff;
			}
			image {
				width: 54rpx;
				height: 54rpx;
				transform: translateX(-10rpx);
			}
		}
	
		.serch,.sureserch {
			margin-top: 8rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 20rpx;
			.serch_left {
				width: 75%;
				height: 72rpx;
				border: 1rpx solid #4492c2;
				background: linear-gradient(180deg, #0d4b88 0%, #013161 100%);
				box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
				display: flex;
				align-items: center;
				box-sizing: border-box;
				z-index: 999;
				.serchbtn{
					width: 72rpx;
					height: 72rpx;
					color: #FFFFFF;
					line-height: 72rpx;
					font-size: 26rpx;
					border: 1rpx solid #4492c2;
					box-sizing: border-box;
				}
				image {
					width: 64rpx;
					height: 64rpx;
					margin: 1rpx;
				}
				input {
					text-align: start;
					padding-left: 5rpx;
					box-sizing: border-box;
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #d6f2ff;
					opacity: 0.56;
				}
			}
			.serch_right {
				width: 20%;
				height: 72rpx;
				border: 1rpx solid #4492c2;
				background: linear-gradient(180deg, #10569b 0%, #033b74 100%);
				box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
				display: flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				z-index: 999;
				image {
					width: 36rpx;
					height: 36rpx;
				}
				text {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #ffffff;
				}
			}
		}
		.sureserch{
			.serch_left{
				width: 100%;
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
</style>
