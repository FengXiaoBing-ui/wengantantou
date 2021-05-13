<template>
	<view class="index">
		<headerTab title="发布告警任务"></headerTab>
		<view class="wrap">
			<view class="from">
				<view class="from-box">
					<text>开始时间</text>
					<view class="time" @click="starttime">
						<text>{{ msgyear }}-{{ msgmonth }}-{{ msgday }} {{ hoursmsg }}:{{ minutesmsg }}:{{ secondmsg }}</text>
						<image src="../../../static/icon/13921.png" mode=""></image>
					</view>
				</view>
				<view class="from-box">
					<text>要求完成时间</text>
					<view class="time" @click="starttimetwo">
						<text>{{ msgyeartwo }}-{{ msgmonthtwo }}-{{ msgdaytwo }} {{ hoursmsgtwo }}:{{ minutesmsgtwo }}:{{ secondmsgtwo }}</text>
						<image src="../../../static/icon/13921.png" mode=""></image>
					</view>
				</view>
				<view class="from-box">
					<text>运维班长</text>
					<view class="add-box">
						<view class="add" v-if="people!=null">
							<text>{{ people.user_name }}</text>
							<image @click="deletename()" src="../../../static/icon/close.png" mode=""></image>
						</view>
						<view class="addto" @click="addpeople">
							<image src="../../../static/icon/add.png" mode=""></image>
							<text>添加</text>
						</view>
					</view>
				</view>
				<view class="from-box">
					<text>任务内容</text>
					<textarea value="" placeholder="请输入任务的内容描述..." v-model="content" />
				</view>
			</view>
			<uni-popup ref="popup" type="bottom">
				<view class="starttime">
					<image src="../../../static/icon/15.png" mode=""></image>
					<view v-if="visible" class="title">
						<image @click="close" src="../../../static/icon/close.png" mode=""></image>
						<text>选择日期</text>
						<view class="next"><text @click="next">下一步</text></view>
					</view>
					<view v-if="!visible" class="title">
						<image src="../../../static/icon/close.png" mode=""></image>
						<text>选择日期</text>
						<view class="sure"><text @click="sure">确定</text></view>
					</view>
					<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
						<picker-view-column>
							<view class="item" v-for="(item, index) in years" :key="index">{{ item }}年</view>
						</picker-view-column>
						<picker-view-column>
							<view class="item" v-for="(item, index) in months" :key="index">{{ item }}月</view>
						</picker-view-column>
						<picker-view-column>
							<view class="item" v-for="(item, index) in days" :key="index">{{ item }}日</view>
						</picker-view-column>
					</picker-view>
					<picker-view
						v-if="!visible"
						indicator-class="city-picker"
						:indicator-style="indicatorStyle"
						:value="values"
						@change="bindChangetwo"
						class="picker-view-two"
					>
						<picker-view-column><view></view></picker-view-column>
						<picker-view-column>
							<view class="item" v-for="(item, index) in 24" :key="index">{{ item }}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="item" v-for="(item, index) in 60" :key="index">{{ item }}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="item" v-for="(item, index) in 60" :key="index">{{ item }}</view>
						</picker-view-column>
						<picker-view-column><view></view></picker-view-column>
					</picker-view>
				</view>
			</uni-popup>
			
			<uni-popup ref="popuptwo" type="bottom">
				<view class="starttime">
					<image src="../../../static/icon/15.png" mode=""></image>
					<view v-if="visible" class="title">
						<image @click="close" src="../../../static/icon/close.png" mode=""></image>
						<text>选择日期</text>
						<view class="next"><text @click="nexttwo">下一步</text></view>
					</view>
					<view v-if="!visible" class="title">
						<image src="../../../static/icon/close.png" mode=""></image>
						<text>选择日期</text>
						<view class="sure"><text @click="suretwo">确定</text></view>
					</view>
					<picker-view v-if="visible" :indicator-style="indicatorStyle" :value="value" @change="bindChange" class="picker-view">
						<picker-view-column>
							<view class="item" v-for="(item, index) in years" :key="index">{{ item }}年</view>
						</picker-view-column>
						<picker-view-column>
							<view class="item" v-for="(item, index) in months" :key="index">{{ item }}月</view>
						</picker-view-column>
						<picker-view-column>
							<view class="item" v-for="(item, index) in days" :key="index">{{ item }}日</view>
						</picker-view-column>
					</picker-view>
					<picker-view
						v-if="!visible"
						indicator-class="city-picker"
						:indicator-style="indicatorStyle"
						:value="values"
						@change="bindChangetwo"
						class="picker-view-two"
					>
						<picker-view-column><view></view></picker-view-column>
						<picker-view-column>
							<view class="item" v-for="(item, index) in 24" :key="index">{{ item }}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="item" v-for="(item, index) in 60" :key="index">{{ item }}</view>
						</picker-view-column>
						<picker-view-column>
							<view class="item" v-for="(item, index) in 60" :key="index">{{ item }}</view>
						</picker-view-column>
						<picker-view-column><view></view></picker-view-column>
					</picker-view>
				</view>
			</uni-popup>
			<view class="sumbit" @click="sumbit">
				<image src="../../../static/icon/6932.png" mode=""></image>
				<text>提交任务</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		const date = new Date();
		const years = [];
		const year = date.getFullYear();
		const months = [];
		const month = date.getMonth() + 1;
		const days = [];
		const day = date.getDate();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const second = date.getSeconds();
		for (let i = year; i <= date.getFullYear() + 10; i++) {
			years.push(i);
		}
		for (let i = 1; i <= 12; i++) {
			months.push(i);
		}
		for (let i = 1; i <= 31; i++) {
			days.push(i);
		}
		return {
			title: 'picker-view',
			years,
			year,
			months,
			month,
			days,
			day,
			hours,
			minutes,
			second,
			hoursmsg: hours,
			minutesmsg: minutes,
			secondmsg: second,
			msgyear: year,
			msgmonth:month,
			msgday: day,
			hoursmsgtwo: hours,
			minutesmsgtwo: minutes,
			secondmsgtwo: second,
			msgyeartwo: year,
			msgmonthtwo:month,
			msgdaytwo: day,
			visible: true,
			content: "",
			indicatorStyle: `height: 50px;`,
			people: null,
			id: "",
			type: ""
		};
	},
	onLoad(option) {
		if(option.maker){
			let maker = JSON.parse(option.maker)
			this.id = maker.id
			this.type = maker.type
		}
		if(option.id&&option.type){
			this.id = option.id
			this.type = option.type
		}
		if(option.arr){
			let arr = JSON.parse(option.arr)
			this.people = arr
		}
		
	},
	computed: {
		value: function() {
			let arr = [];
			for (let i = 0; i < this.years.length; i++) {
				if (this.year == this.years[i]) {
					arr[0] = i;
				}
			}
			arr[1] = this.month - 1;
			arr[2] = this.day - 1;
			console.log(arr)
			return arr;
		},
		values: function(){
			let arr = [];
			arr[0] = 0;
			arr[1] = this.hours - 1;
			arr[2] = this.minutes - 1;
			arr[3] = this.second -1;
			arr[4] = 0
			console.log(arr)
			return arr;
		}
	},
	methods: {
		sumbit(){
			let newtime = this.msgyear+'-'+this.msgmonth +'-'+ this.msgday +' '+ this.hoursmsg +':'+ this.minutesmsg +':'+ this.secondmsg
			newtime = new Date(newtime).getTime()
			let oktime = this.msgyeartwo +'-'+ this.msgmonthtwo +'-'+ this.msgdaytwo +' '+ this.hoursmsgtwo +':'+ this.minutesmsgtwo +':'+ this.secondmsgtwo
			oktime = new Date(oktime).getTime()
			let obj = {
					begintime_str: newtime,
					endtime_str: oktime,
					duty_master_id: this.people.id,
					task_remark: this.content,
					type: this.type,
					alarm_id: this.id
				}
			obj = JSON.stringify(obj)
			this.$api.postapi('/api/pubtask/publish_warn_task',{
				loginId:uni.getStorageSync('loginId'),
				data: obj
			}).then(res => {
				console.log(res)
				if(res.data.code==1){
					uni.showToast({
						title:"提交成功"
					})
					setTimeout(() => {
						uni.switchTab({
							url:"../Confirmed/Confirmed"
						})
					},500)
				}
			})
		},
		addpeople(){
			uni.navigateTo({
				url:"../addpeople/addpeople"
			})
		},
		close(){
			this.$refs.popup.close()
		},
		nexttwo(){
			this.msgyeartwo = this.year
			this.msgmonthtwo = this.month
			this.msgdaytwo = this.day
			this.visible = false;
		},
		suretwo(){
			this.hoursmsgtwo = this.hours;
			this.minutesmsgtwo = this.minutes;
			this.secondmsgtwo = this.second;
			this.$refs.popuptwo.close()
		},
		next() {
			this.msgyear = this.year
			this.msgmonth = this.month
			this.msgday = this.day
			this.visible = false;
		},
		sure(){
			this.hoursmsg = this.hours;
			this.minutesmsg = this.minutes;
			this.secondmsg = this.second;
			this.$refs.popup.close()
		},
		deletename() {
			this.people = null
		},
		starttime() {
			if(this.visible==false){
				this.visible = true
			}
			this.$refs.popup.open();
		},
		starttimetwo() {
			if(this.visible==false){
				this.visible = true
			}
			this.$refs.popuptwo.open();
		},
		bindChange: function(e) {
			const val = e.detail.value;
			this.year = this.years[val[0]];
			this.month = this.months[val[1]];
			this.day = this.days[val[2]];
		},
		bindChangetwo: function(e){
			this.hours = e.detail.value[1]+1
			this.minutes = e.detail.value[2]+1
			this.second = e.detail.value[3]+1
		}
	}
};
</script>

<style lang="less" scoped>
.wrap {
	position: relative;
	z-index: 999;
	width: 100%;
	top: 128rpx;
	padding: 24rpx 34rpx 50rpx 24rpx;
	box-sizing: border-box;
	.from {
		width: 100%;
		border: 2rpx solid rgba(90, 232, 255, 0.5);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.5) 0%, rgba(28, 84, 184, 0.5) 100%);
		box-shadow: 2rpx 4rpx 10rpx rgba(90, 232, 255, 0.5);
		padding: 0 24rpx 24rpx 24rpx;
		box-sizing: border-box;
		.from-box {
			margin-top: 27rpx;
			text {
				font-size: 26rpx;
				font-family: Source Han Sans CN;
				font-weight: 400;
				line-height: 37rpx;
				color: #ffffff;
				opacity: 0.53;
			}
			textarea {
				margin-top: 10rpx;
				width: 100%;
				height: 413rpx;
				background: #073b6e;
				border: 1px solid #4492c2;
				box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
				opacity: 1;
				padding: 12rpx 23rpx;
				box-sizing: border-box;
				color: #ffffff;
			}
			.add-box {
				width: 100%;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				.addto {
					width: 128rpx;
					height: 58rpx;
					border: 1rpx solid #5ae8ff;
					background: linear-gradient(180deg, #5ae8ff 0%, #1c54b8 100%);
					box-shadow: -2rpx 0px 5rpx rgba(90, 232, 255, 0.7);
					opacity: 1;
					border-radius: 29rpx;
					margin-top: 13rpx;
					display: flex;
					align-items: center;
					justify-content: space-evenly;
					text {
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #ffffff;
						opacity: 1;
					}
					image {
						width: 24rpx;
						height: 24rpx;
					}
				}
				.add {
					padding: 0 9rpx 0 19rpx;
					min-width: 128rpx;
					box-sizing: border-box;
					height: 58rpx;
					border: 1rpx solid #4492c2;
					background: linear-gradient(180deg, #0d4b88 0%, #013161 100%);
					box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
					opacity: 1;
					border-radius: 29rpx;
					margin-right: 10rpx;
					margin-top: 13rpx;
					display: flex;
					align-items: center;
					justify-content: space-evenly;
					text {
						font-size: 28rpx;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #ffffff;
						opacity: 1;
					}
					image {
						padding: 10rpx;
						width: 17rpx;
						height: 17rpx;
					}
				}
			}
			.time {
				margin-top: 9rpx;
				padding: 0 26rpx 0 23rpx;
				box-sizing: border-box;
				width: 100%;
				height: 64rpx;
				background: #073b6e;
				border: 1rpx solid #4492c2;
				box-shadow: 0px -6rpx 12rpx rgba(44, 28, 28, 0.08);
				display: flex;
				align-items: center;
				justify-content: space-between;
				text {
					font-size: 28rpx;
					font-family: Source Han Sans CN;
					font-weight: 400;
					line-height: 40rpx;
					color: #ffffff;
					opacity: 1;
				}
				image {
					width: 18rpx;
					height: 15rpx;
				}
			}
		}
	}
	.starttime {
		width: 100%;
		height: 600rpx;
		border: 2rpx solid rgba(90, 232, 255, 0.7);
		background: linear-gradient(180deg, rgba(65, 201, 252, 0.8) 0%, rgba(28, 84, 184, 0.8) 100%);
		box-shadow: 2rpx 3rpx 8rpx rgba(90, 232, 255, 0.8);
		.title {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 20rpx 24rpx 20rpx;
			box-sizing: border-box;
			border-bottom: 1px solid rgba(90, 232, 255, 0.5);
			image {
				width: 40rpx;
				height: 40rpx;
				transform: translateY(10rpx);
			}
			text {
				font-size: 32rpx;
				font-family: Source Han Sans CN;
				font-weight: bold;
				color: #ffffff;
				transform: translateX(40%);
			}
			.sure {
				width: 128rpx;
				height: 58rpx;
				border: 1rpx solid #5ae8ff;
				background: linear-gradient(180deg, #5ae8ff 0%, #1c54b8 100%);
				box-shadow: -2rpx 0px 5rpx rgba(90, 232, 255, 0.7);
				opacity: 1;
				text-align: center;
				text {
					line-height: 58rpx;
				}
			}
			.next {
				width: 128rpx;
				height: 58rpx;
				border: 1rpx solid #ffb85a;
				background: linear-gradient(180deg, #ffde5a 0%, #b8741c 100%);
				opacity: 1;
				text-align: center;
				text {
					line-height: 58rpx;
				}
			}
		}
		image {
			position: relative;
			top: -10rpx;
			width: 100%;
			height: 30rpx;
			left: 0;
		}
		.picker-view,
		.picker-view-two {
			height: 484rpx;
			background: none;
			color: #ffffff;
		}
		.item {
			height: 50px;
			align-items: center;
			justify-content: center;
			text-align: center;
			line-height: 100rpx;
		}
	}
	.sumbit {
		margin-top: 46rpx;
		width: 100%;
		height: 100rpx;
		border: 1rpx solid #5ae8ff;
		background: linear-gradient(180deg, #5ae8ff 0%, #1c54b8 100%);
		box-shadow: -2rpx 0px 5rpx rgba(90, 232, 255, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
		image {
			width: 50rpx;
			height: 50rpx;
		}
		text {
			margin-left: 10rpx;
			font-size: 36rpx;
			font-family: Source Han Sans CN;
			font-weight: 400;
			line-height: 52rpx;
			color: #ffffff;
		}
	}
}
</style>
