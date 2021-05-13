const httpurl = "http://wgtt.welamp.cn"
export default {
	postapi(myurl,data){
		return new Promise((resolve,reject) => {
			uni.request({
				url:httpurl + myurl,
				header:{
					'content-type':'application/x-www-form-urlencoded'
				},
				method:"POST",
				data:data,
				success(res) {
					resolve(res)
				},
				fail(err) {
					reject(err)
				}
			})
		})
	}
}