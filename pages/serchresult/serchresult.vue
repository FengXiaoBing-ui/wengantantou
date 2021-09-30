<template>
	<view class="index">
		<view class="header">
			<image class="backpage" @click="backpage" src="../../static/icon/left.png" mode=""></image>
			<text class="title">搜索结果</text>
			<view class="serch-box">
				<view class="serch">
					<image src="../../static/icon/6645.png" mode=""></image>
					<input confirm-type="search" @confirm="serchdata" type="text" value="" v-model="keyword" placeholder="请输入任务单号/内容/设备编号..." placeholder-class="place" />
					<image @click="delete_keyword" class="close" src="../../static/icon/delete.png" mode=""></image>
				</view>
				<view class="serch-text" @click="serchdata">搜索</view>
			</view>
			
			<view class="screen">
				<view class="list">
					<text :class="item == active ? 'actevetext' : ''" v-for="(item, index) in option" :key="index" @click="activeoption(item, index)">{{ item }}</text>
					<view class="bordbot" :class="{ left: active == '探头', mid: active == '中继器', right: active == '文章' }"></view>
				</view>
			</view>
		</view>
		<view class="serch-num" v-if="probelist.length>0">共搜索到 <text style="color: #59E6FE;"> {{ count }} </text> 条结果</view>
		
		<view class="probe-list" v-if="active == '探头'">
			<view class="probe-list-box" v-for="(item, index) in probelist" :key="index" @click="jump(item.id)">
				<view class="probe-list-box-top" :style="item.state_text == '已离线' ? 'opacity:0.4' : ''">
					<view class="box-top-left">
						<image src="../../static/icon/6834.png" mode=""></image>
						<text>编号{{ item.device_id }}</text>
					</view>
					<view class="box-top-right">
						<image v-if="item.state_text == '工作中'" src="../../static/icon/6833.png" mode=""></image>
						<image v-if="item.state_text == '已离线'" src="../../static/icon/6832.png" mode=""></image>
						<image v-if="item.state_text == '待激活'" src="../../static/icon/6837.png" mode=""></image>
						<text>{{ item.state_text }}</text>
					</view>
				</view>
				<view class="electric" :style="item.state_text == '已离线' ? 'opacity:0.4' : ''">
					<view
						class="electric-left"
						:class="{
							'electric-left-blue': item.power_number > $store.state.electric&&item.state_text != '已离线'&&item.state_text != '待激活'&&item.state_text != '维修'&&item.state_text != '报废',
							'electric-left-red': item.power_number <= $store.state.electric&&item.state_text != '已离线'&&item.state_text != '待激活'&&item.state_text != '维修'&&item.state_text != '报废',
							'electric-left-no': item.state_text == '已离线'||item.state_text == '维修'||item.state_text == '报废',
							'electric-left-lixian': item.state_text == '待激活'
						}"
					>
						<view
							class="electric-num-left"
							:class="{ blue: item.power_number > $store.state.electric, red: item.power_number <= $store.state.electric }"
							:style="{ width: item.state_text != '已离线'&&item.state_text != '待激活'&&item.state_text != '维修'&&item.state_text != '报废'?(item.power_number + '%'):0 }"
						></view>
						<image src="../../static/icon/6820.png" mode=""></image>
						<text>电量</text>
						<text class="num">{{ item.state_text != '已离线'&&item.state_text != '待激活'&&item.state_text != '维修'&&item.state_text != '报废' ? item.power_number + '%' : '---' }}</text>
					</view>
					<view
						class="electric-right"
						:class="{
							'electric-right-blue': item.now_temperature <= item.over_temperature&&item.state_text != '已离线'&&item.state_text != '待激活'&&item.state_text != '维修'&&item.state_text != '报废',
							'electric-right-origin': item.now_temperature >= item.high_temperature && item.now_temperature < item.over_temperature&&item.state_text != '已离线'&&item.state_text != '待激活'&&item.state_text != '维修'&&item.state_text != '报废',
							'electric-right-red': item.now_temperature > item.over_temperature&&item.state_text != '已离线'&&item.state_text != '待激活'&&item.state_text != '维修'&&item.state_text != '报废',
							'electric-left-no': item.state_text == '已离线'||item.state_text == '维修'||item.state_text == '报废',
							'electric-left-lixian': item.state_text == '待激活'
						}"
					>
						<image src="../../static/icon/6823.png" mode=""></image>
						<text>温度</text>
							<text class="num">{{ item.state_text != '已离线'&&item.state_text != '待激活'&&item.state_text != '维修'&&item.state_text != '报废' ? (item.now_temperature + '℃') : '---' }}</text>
						</view>
				</view>
				<text class="bot-text" v-if="item.state_text != '待激活'" :style="item.state_text == '已离线' ? 'opacity:0.4' : ''">位置：{{ item.tower_position }}</text>
				<view class="box-foot"></view>
			</view>
			<uni-load-more v-if="probelist.length>0" :status="more"></uni-load-more>
		</view>
		
		<view class="wrap" v-if="active == '中继器'">
			<view class="list" :class="item.state_text=='已离线'?'listopacity':''" v-for="(item,index) in probelist" :key="index" @click="repjump(item.id)">
				<view class="list-top">
					<view class="list-top-left">
						<image src="../../static/icon/wifi.png" mode=""></image>
						<text>{{ item.repeater_id }}</text>
					</view>
					<view class="list-top-right">
						<image v-if="item.state_text=='工作中'" src="../../static/icon/6833.png" mode=""></image>
						<image v-if="item.state_text=='待激活'" src="../../static/icon/6837.png" mode=""></image>
						<image v-if="item.state_text=='已离线'" src="../../static/icon/6832.png" mode=""></image>
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
<!-- 				<view class="list-bot" :class="{'borderred':item.electric_quality<=30,'borderblue':item.electric_quality>30}">
					<image src="../../static/icon/6820.png" mode=""></image>
					<text>电量 </text>
					<text> {{ item.state_text=='工作中'?(item.electric_quality+'%'):'- - -' }}</text>
					<view class="background" :class="{'blue':item.electric_quality>30,'red':item.electric_quality<=30}" :style="{width: item.state_text=='工作中'?(item.electric_quality+'%'):0}"></view>
				</view> -->
				<view class="botborder"></view>
			</view>
			<uni-load-more v-if="probelist.length>0" :status="more"></uni-load-more>
		</view>
		
		<view class="wraptwo" v-if="active == '文章'">
			<view class="list" v-for="item in probelist" :key="item.id" @click="articlejump(item.id)">
				<text>{{ item.title }}</text>
				<image class="minright" src="../../static/icon/minright.png" mode=""></image>
				<image class="leftbord" src="../../static/icon/vertical.png" mode=""></image>
			</view>
			<uni-load-more v-if="probelist.length>0" status="nomore"></uni-load-more>
		</view>
		
		<view class="nodata" v-if="probelist.length<=0">
			<view class="nodata-icon">
				<image class="out" src="../../static/icon/6764.png" mode=""></image>
				<image class="in" src="../../static/icon/nodata.png" mode=""></image>
			</view>
			<view style="margin-top: 150rpx;font-size: 32rpx;">没有所搜到相关结果</view>
			<view style="opacity: 0.51;font-size: 28rpx;">请换个关键词重试</view>
		</view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			keywordarr: [],
			count: "",
			keyword: '',
			active: '探头',
			type: 0,
			activetext: 'activetext',
			option: ['探头', '中继器', '文章'],
			limit: 8,
			more: 'more',
			probelist: []
		};
	},
	onShow() {
		this.keywordarr = JSON.parse(uni.getStorageSync('keyword'))
	},
	onReachBottom() {
		this.limit += 6
		this.more = "loading"
		this.queryprobelist();
	},
	onLoad(option) {
		this.keyword = option.keyword
		this.queryprobelist();
	},
	methods: {
		articlejump(id){
			uni.navigateTo({
				url:"../information/upgradedetail/upgradedetail?id="+id+"&&title=文章详情"
			})
		},
		repjump(id){
			uni.navigateTo({
				url:"../Repeater/Repeaterdetail/Repeaterdetail?id="+id
			})
		},
		jump(id){
			uni.navigateTo({
				url:"../Probedetail/probeDetail/probeDetail?id="+id
			})
		},
		serchdata(){
			this.limit = 8
			if(this.keyword!=""){
				this.keywordarr.unshift(this.keyword)
				uni.setStorageSync('keyword',JSON.stringify(this.keywordarr))
			}
			this.queryprobelist();
		},
		delete_keyword(){
			this.keyword = ""
			this.queryprobelist();
		},
		backpage() {
			uni.redirectTo({
				url:"../serchall/serchall"
			})
		},
		activeoption(item,index) {
			this.active = item;
			this.type = index
			this.limit = 8
			this.queryprobelist();
		},
		queryprobelist() {
			this.$api.postapi('/api/Search/search_content', { limit: this.limit, keyword: this.keyword,type:this.type }).then(res => {
				// console.log(res)
				if(res.data.code==0){
					this.more = 'nomore';
					this.probelist = []
					return false
				}
				this.count = res.data.count
				if (this.limit >= res.data.count) {
					this.more = 'nomore';
				}
				this.probelist = res.data.data;
				this.$forceUpdate()
			});
		}
	}
};
</script>

<style lang="less" scoped>
.header {
	width: 100%;
	height: 225rpx;
	position: fixed;
	background-image: url(../../static/icon/6972.png);
	background-size: 100% 100%;
	text-align: center;
	z-index: 999;
	.backpage {
		position: absolute;
		left: 20rpx;
		width: 54rpx;
		height: 54rpx;
		top: 50rpx;
	}
	.title {
		padding-top: 40rpx;
		display: block;
		height: 88rpx;
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		line-height: 88rpx;
		color: #ffffff;
	}
	.serch-box{
		padding: 0 34rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		.serch {
			width: 86%;
			margin: 0 auto;
			height: 72rpx;
			border: 1rpx solid #4492c2;
			background: linear-gradient(180deg, #0d4b88 0%, #013161 100%);
			box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
			display: flex;
			align-items: center;
			image {
				width: 64rpx;
				height: 64rpx;
			}
			.close{
				width: 42rpx;
				height: 42rpx;
			}
			input {
				width: 80%;
				text-align: start;
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #d6f2ff;
				opacity: 0.56;
			}
			.place {
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 40rpx;
				color: #d6f2ff;
				opacity: 0.56;
			}
		}
		.serch-text{
			width: 14%;
			font-size: 28rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 40rpx;
			color: #59E6FE;
		}
	}
	
	.screen {
		width: 100%;
		height: 100rpx;
		background: #032f5e;
		.list {
			width: 60%;
			height: 100rpx;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;
			position: relative;
			text {
				width: 33.3%;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #ffffff;
				line-height: 44rpx;
				font-size: 30rpx;
				opacity: 0.6;
			}
			.actevetext {
				opacity: 1;
				line-height: 49px;
				font-size: 34rpx;
			}
			.bordbot {
				position: absolute;
				bottom: 0;
				width: 33.3%;
				height: 6rpx;
				border: 1rpx solid #5ae8ff;
				background: linear-gradient(180deg, #5ae8ff 0%, #1c54b8 100%);
				transition: 0.3s;
			}
			.left {
				left: 0;
			}
			.mid {
				left: 33.3%;
			}
			.right {
				left: 66.6%;
			}
		}
	}
}
.serch-num{
	position: relative;
	z-index: 9;
	top: 320rpx;
	font-size: 28rpx;
	font-family: Source Han Sans CN;
	font-weight: 400;
	line-height: 40rpx;
	color: #FFFFFF;
	opacity: 0.53;
	text-align: center;
}
.probe-list {
	position: relative;
	z-index: 99;
	top: 320rpx;
	padding: 20rpx 36rpx;
	box-sizing: border-box;
	.nodata {
		position: fixed;
		left: 50%;
		top: 50%;
		color: #ffffff;
		transform: translate(-50%, -50%);
	}
	.probe-list-box {
		width: 100%;
		border: 2rpx solid rgba(90, 232, 255, 0.7);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.7) 0%, rgba(28, 84, 184, 0.7) 100%);
		box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
		margin-bottom: 20rpx;
		padding-bottom: 20rpx;
		position: relative;
		.probe-list-box-top {
			width: 100%;
			height: 53rpx;
			background: linear-gradient(90deg, #021f4b 0%, #093765 100%);
			opacity: 0.6;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 20rpx;
			box-sizing: border-box;
			.box-top-right {
				display: flex;
				align-items: center;
				image {
					width: 53rpx;
					height: 53rpx;
				}
				text {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #ffffff;
				}
			}
			.box-top-left {
				display: flex;
				align-items: center;
				image {
					width: 26rpx;
					height: 26rpx;
				}
				text {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #ffffff;
					margin-left: 6rpx;
				}
			}
		}
		.electric {
			margin-top: 21rpx;
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			.electric-left-lixian {
				background: rgba(214, 242, 255, 0.15);
			}
			.electric-left-no {
				background: rgba(214, 242, 255, 0.2);
			}
			.electric-right-blue {
				background: linear-gradient(180deg, rgba(255, 252, 230, 0.35) 0%, rgba(65, 201, 252, 0.35) 100%);
			}
			.electric-right-origin {
				background: linear-gradient(180deg, rgba(219, 229, 127, 0.7) 0%, rgba(248, 108, 16, 0.7) 100%);
			}
			.electric-right-red {
				background: linear-gradient(180deg, rgba(244, 67, 54, 0.9) 0%, rgba(113, 1, 5, 0.9) 100%);
			}
			.electric-right {
				width: 317rpx;
				height: 94rpx;
				border-radius: 14rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				image {
					width: 50rpx;
					height: 50rpx;
				}
				.num {
					font-size: 32rpx;
					font-family: Roboto;
					font-weight: bold;
					color: #ffffff;
					margin-left: 10rpx;
				}
				text {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #ffffff;
				}
			}
			.electric-left-red {
				background: rgba(244, 67, 54, 0.17);
				border: 1px solid rgba(244, 67, 54, 0.5);
			}
			.electric-left-blue {
				background: rgba(214, 242, 255, 0.15);
				border: 1rpx solid #5bc8cb;
			}
			.electric-left {
				width: 317rpx;
				height: 94rpx;
				opacity: 1;
				border-radius: 14rpx;
				position: relative;
				overflow: hidden;
				display: flex;
				align-items: center;
				justify-content: center;
				box-sizing: border-box;
				image {
					width: 50rpx;
					height: 50rpx;
					z-index: 999;
				}
				.num {
					font-size: 32rpx;
					font-family: Roboto;
					font-weight: bold;
					color: #ffffff;
					z-index: 999;
					margin-left: 10rpx;
				}
				text {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #ffffff;
					z-index: 999;
				}
				.electric-num-left {
					position: absolute;
					left: 0;
					top: 0;
					height: 90rpx;
					border-radius: 14rpx 0 0 14rpx;
				}
				.blue {
					background: linear-gradient(90deg, rgba(127, 229, 127, 0.5) 0%, rgba(65, 201, 252, 0.5) 100%);
				}
				.red {
					background: linear-gradient(270deg, rgba(244, 67, 54, 0.9) 0%, rgba(112, 12, 12, 0.9) 100%);
				}
			}
		}
		.bot-text {
			display: inline-block;
			width: 100%;
			padding: 0 20rpx;
			font-size: 26rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			margin-top: 13rpx;
			color: #f6b532;
			box-sizing: border-box;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.box-foot {
			position: absolute;
			left: 50%;
			bottom: -2rpx;
			transform: translateX(-50%);
			width: 114rpx;
			height: 4rpx;
			background: #54d6ff;
			box-shadow: 0px 0px 8rpx #9ef2ff;
		}
	}
}
.wrap{
	position: relative;
		top: 300rpx;
		padding: 20rpx 34rpx;
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
								background-image: url(../../static/icon/link.png);
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
.wraptwo{
		padding: 20rpx 34rpx;
		position: relative;
		top: 300rpx;
		z-index: 1;
		.list{
			margin-top: 24rpx;
			width: 100%;
			height: 139rpx;
			border: 2rpx solid rgba(90, 232, 255, 0.6);
			background: linear-gradient(180deg, rgba(65, 201, 252, 0.6) 0%, rgba(28, 84, 184, 0.6) 100%);
			box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.6);
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 26rpx 34rpx 26rpx 20rpx;
			box-sizing: border-box;
			position: relative;
			.leftbord{
				position: absolute;
				left: -14rpx;
				top: 50%;
				width: 28rpx;
				height: 83rpx;
				transform: translateY(-50%);
			}
			text{
				font-size: 28rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 40rpx;
				color: #FFFFFF;
			}
			.minright{
				width: 14rpx;
				height: 17rpx;
			}
		}
}

.nodata{
	position: relative;
	top: 500rpx;
	left: 50%;
	transform: translate(-50%,-50%);
	width: 100%;
	height: 500rpx;
	z-index: 9;
	.nodata-icon{
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 253rpx;
		height: 253rpx;
		.out{
			width: 253rpx;
			height: 253rpx;
			animation:turn 3s linear infinite;
			@keyframes turn{
			  0%{-webkit-transform:rotate(0deg);}
			  25%{-webkit-transform:rotate(90deg);}
			  50%{-webkit-transform:rotate(180deg);}
			  75%{-webkit-transform:rotate(270deg);}
			  100%{-webkit-transform:rotate(360deg);}
			}
		}
		.in{
			width: 96rpx;
			height: 86rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
		}
	}
	view{
		margin-top: 20rpx;
		text-align: center;
		 color: #FFFFFF;
	}
}
</style>
