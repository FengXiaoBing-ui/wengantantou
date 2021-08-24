<template>
	<view class="index">
		<view class="headtab">
			<image class="topimg" src="../../../static/icon/topimg.png" mode=""></image>
			<view class="header-tab">
				<image @click="backpage" src="../../../static/icon/left.png" mode=""></image>
				<text>输电塔详情</text>
				<view class="sw">
					<text>关闭告警</text>
					<switch :checked="checked" @change="switch1Change" color="#275e98" style="transform: scale(0.5,0.5);" />
				</view>
			</view>
			<image class="aimg" src="../../../static/icon/13879.png" mode=""></image>
			<view class="headtitle">
				<text>{{ pagoinfo.line_name }} {{ pagoinfo.tagan_name }}</text>
				<view class="gps" @click="jumpmap">
					<image style="width: 50rpx;height: 50rpx;" src="../../../static/icon/Gps.png" mode=""></image>
					<text>{{ pagoinfo.tower_position }}</text>
					<image style="width: 14rpx;height: 17rpx;margin-left: 10rpx;" src="../../../static/icon/minright.png" mode=""></image>
				</view>
			</view>
			<view class="screen">
				<view class="texttop">
					<text @click="screenlist(item)" v-for="item in screen" :key="item">{{ item }} {{ item=='探头'?pagoinfo.sensor_work_count:'' }}{{ item=='探头'?'/'+pagoinfo.sensor_all_count:pagoinfo.repeater_all_count }}</text>
					<view :class="{'left':active=='探头','right':active=='中继器'}"></view>
				</view>
				<view class="borde"></view>
				<view class="screenactive">
					<view v-for="(item,index) in arr" :key="index" :class="item.text==optionactive?'active':''" @click="option(item.text,index)">
						<text>{{ item.text }}</text>
						<image v-if="item.text==optionactive" src="../../../static/icon/13926.png" mode=""></image>
					</view>
				</view>
			</view>
		</view>
		
	
		<view class="wrap">
			<view class="probe-list" v-if="active=='探头'">
				<view class="probe-list-box" v-for="(item, index) in probelist" :key="index" @click="jump(item.id)">
					<view class="probe-list-box-top" :style="item.state_text == '已离线' ? 'opacity:0.4' : ''">
						<view class="box-top-left">
							<image src="../../../static/icon/6834.png" mode=""></image>
							<text>编号{{ item.device_id }}</text>
						</view>
						<view class="box-top-right">
							<image v-if="item.state_text == '工作中'" src="../../../static/icon/6833.png" mode=""></image>
							<image v-if="item.state_text == '已离线'" src="../../../static/icon/6832.png" mode=""></image>
							<image v-if="item.state_text == '待激活'" src="../../../static/icon/6837.png" mode=""></image>
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
							<image src="../../../static/icon/6820.png" mode=""></image>
							<text>电量</text>
							<text class="num">{{ item.state_text != '已离线'&&item.state_text != '待激活'&&item.state_text != '维修'&&item.state_text != '报废' ? item.power_number + '%' : '---' }}</text>
						</view>
						<view
							class="electric-right"
							:class="{
								'electric-right-blue': item.now_temperature < item.high_temperature&&item.state_text != '已离线'&&item.state_text != '待激活'&&item.state_text != '维修'&&item.state_text != '报废',
								'electric-right-origin': item.now_temperature >= item.high_temperature &&item.now_temperature < item.over_temperature && item.now_temperature > item.over_temperature&&item.state_text != '已离线'&&item.state_text != '待激活'&&item.state_text != '维修'&&item.state_text != '报废',
								'electric-right-red': item.now_temperature >= item.over_temperature&&item.state_text != '已离线'&&item.state_text != '待激活'&&item.state_text != '维修'&&item.state_text != '报废',
								'electric-left-no': item.state_text == '已离线'||item.state_text == '维修'||item.state_text == '报废',
								'electric-left-lixian': item.state_text == '待激活'
							}"
						>
							<image src="../../../static/icon/6823.png" mode=""></image>
							<text>温度</text>
							<text class="num">{{ item.state_text != '已离线'&&item.state_text != '待激活'&&item.state_text != '维修'&&item.state_text != '报废' ? (item.now_temperature + '℃') : '---' }}</text>
						</view>
					</view>
					<text class="bot-text" v-if="item.state_text != '待激活'" :style="item.state_text == '已离线' ? 'opacity:0.4' : ''">位置：{{ item.tower_position }}</text>
					<view class="box-foot"></view>
				</view>
			</view>
			<view class="list" :class="item.state_text=='已离线'?'listopacity':''" v-if="active=='中继器'" v-for="(item,index) in mylist" :key="index" @click="jump(item.id)">
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
						<text>4G卡号: {{ item.state_text=='待激活'?'- - -':item.repeater_phone }}</text>
						<text>位置: {{ item.state_text=='待激活'?'- - -':item.tower_position }}</text>
					</view>
					<view class="list-mid-right">
						<text>关联探头</text>
						<text>{{ item.temp_sensor_number }}个</text>
					</view>
				</view>
<!-- 				<view class="list-bot" :class="{'borderred':item.electric_quality<=30,'borderblue':item.electric_quality>30}">
					<image src="../../../static/icon/6820.png" mode=""></image>
					<text>电量 </text>
					<text> {{ item.state_text=='工作中'?(item.electric_quality+'%'):'- - -' }}</text>
					<view class="background" :class="{'blue':item.electric_quality>30,'red':item.electric_quality<=30}" :style="{width: item.state_text=='工作中'?(item.electric_quality+'%'):0}"></view>
				</view> -->
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
				line_id:"",
				tagan_id: "",
				limit: 4,
				more: "nomore",
				pstate: 0,
				rstate:0,
				optionactive: '全部',
				location: "",
				pagoinfo: {},
				active: "探头",
				checked: false,
				mylist: [],
				probelist: [],
				screen: ["探头","中继器"],
				arr: [],
				screenactive: [
					{
						text: "全部"
					},
					{
						text: "电量低"
					},
					{
						text: "已超温"
					},
					{
						text: "高温"
					},
					{
						text: "已离线"
					},
				],
				screenactivetwo: [
					{
						text: "全部"
					},
					{
						text: "电量低"
					},
					{
						text: "已离线"
					},
				]
			};
		},
		created() {
			this.arr = this.screenactive
		},
		onShow() {
			this.arr = this.screenactive
		},
		onReachBottom() {
			this.more = "loading"
			if(this.active=='探头'){
				this.limit += 4
				this.tantou()
			}else{
				this.limit += 4
				this.zhongjiqi()
			}
		},
		onLoad(option) {
			this.line_id = option.line_id
			this.tagan_id = option.tagan_id
			this.detaillist(option.line_id,option.tagan_id)
		},
		methods:{
			detaillist(line_id,tagan_id){
				this.$api.postapi('/api/tower/selTowerDetail',{line_id:line_id,tagan_id:tagan_id}).then(res => {
					console.log(res)
					this.pagoinfo = res.data.data
					this.tantou()
				})
			},
			tantou(){
				this.$api.postapi('/api/tower/selSensorByTowerId',{line_id:this.line_id,tagan_id:this.tagan_id,state:this.pstate,limit:this.limit}).then(res => {
					console.log(11,res)
					if(this.limit>=res.data.count){
						this.more = "nomore"
					}
					this.probelist = res.data.data
				})
			},
			zhongjiqi(){
				this.$api.postapi('/api/tower/selRepeaterByTowerId',{line_id:this.line_id,tagan_id:this.tagan_id,state:this.rstate,limit:this.limit}).then(res => {
					console.log(22,res)
					if(this.limit>=res.data.count){
						this.more = "nomore"
					}
					this.mylist = res.data.data
				})
			},
			switch1Change(){
				
			},
			backpage(){
				uni.navigateBack({
					delta:1
				})
			},
			jumpmap(){
				
				uni.navigateTo({
					url:"../map/map?loction="+this.pagoinfo.tower_position
				})
			},
			screenlist(item){
				this.active = item
				this.optionactive = "全部"
				this.pstate = 0
				this.rstate = 0
				this.limit = 4
				if(this.active=='探头'){
					this.arr = this.screenactive
					this.tantou()
				}else{
					this.arr = this.screenactivetwo
					this.zhongjiqi()
				}
			},
			option(text,index){
				this.optionactive = text
				if(this.active=='探头'){
					this.pstate = index
					this.tantou()
				}else{
					this.rstate = index
					this.zhongjiqi()
				}
			},
			jump(id){
				console.log(this.active)
				if(this.active=='探头'){
					uni.navigateTo({
						url:"../../Probedetail/probeDetail/probeDetail?id="+id
					})
				}else{
					uni.navigateTo({
						url:"../../Repeater/Repeaterdetail/Repeaterdetail?id="+id
					})
				}
				
			},
			repeaterjump(id){
				uni.navigateTo({
					url:"../../Repeater/Repeaterdetail/Repeaterdetail?id="+id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.headtab{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 99;
		.topimg {
			width: 100%;
			height: 506rpx;
			position: absolute;
		}
		.header-tab {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 40rpx;
			height: 88rpx;
			.sw {
				position: absolute;
				right: 0;
				display: flex;
				align-items: center;
				text {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #ffffff;
				}
			}
			image {
				position: absolute;
				left: 0;
				width: 54rpx;
				height: 54rpx;
			}
			text {
				font-size: 36rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #ffffff;
				opacity: 1;
				z-index: 999;
			}
		}
		.aimg {
			width: 180rpx;
			height: 206rpx;
			position: absolute;
			left: 50%;
			top: 164rpx;
			transform: translateX(-50%);
		}
		.headtitle {
			width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			position: absolute;
			top: 205rpx;
			left: 50%;
			transform: translateX(-50%);
			z-index: 999;
			.gps{
				width: 60%;
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 9rpx;
				image{
					
				}
				text{
					width: 90%;
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 40rpx;
					color: #ffffff;
					opacity: 0.6;
				}
			}
			text {
					font-size: 36rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					line-height: 52rpx;
					color: #ffffff;
			}
		}
		.screen{
			position: relative;
			top: 320rpx;
			width: 92%;
			left: 50%;
			transform: translateX(-50%);
			border: 2rpx solid #5AE8FF;
			background: linear-gradient(180deg, #41C9FC 0%, #1C54B8 100%);
			box-shadow: 2rpx 3rpx 8rspx rgba(90, 232, 255, 0.8);
			.texttop{
				width: 60%;
				margin: 0 auto;
				display: flex;
				align-items: center;
				padding: 24rpx 0;
				position: relative;
				text{
					width: 50%;
					text-align: center;
					color: #FFFFFF;
					font-size: 32rpx;
					font-family: Source Han Sans CN;
					font-weight: bold;
					line-height: 46rpx;
				}
				view{
					width: 50%;
					position: absolute;
					bottom: -3rpx;
					height: 6rpx;
					border: 1px solid #5AE8FF;
					background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
					transition: 0.3s;
				}
				.left{
					left: 0;
				}
				.right{
					left: 50%;
				}
			}
			.borde{
				width: 100%;
				height: 0px;
				border: 2rpx solid #5AE8FF;
				opacity: 0.5;
			}
			.screenactive{
				width: 100%;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				padding: 10rpx 0;
				
				view{
					min-width: 126rpx;
					padding: 0 10rpx;
					height: 54rpx;
					background: rgba(214, 242, 255, 0.15);
					border: 1rpx solid #5BC8CB;
					opacity: 1;
					border-radius: 80rpx;
					text-align: center;
					box-sizing: border-box;
					display: flex;
					align-items: center;
					justify-content: space-evenly;
					margin: 5rpx;
					image{
						width: 16rpx;
						height: 13rpx;
					}
					text{
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
						opacity: 0.58;
					}
				}
				.active{
					background: linear-gradient(180deg, #5AE8FF 0%, #1C54B8 100%);
					box-shadow: 0px 0px 6rpx rgba(2, 2, 55, 0.28);
					opacity: 1;
					border-radius: 80rpx;
					text{
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
						opacity: 1;
					}
				}
			}
		}
	}
	.wrap{
	padding: 0 34rpx 50rpx 34rpx;
	box-sizing: border-box;
	position: relative;
	top: 660rpx;
	z-index: 1;
	.probe-list {
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
