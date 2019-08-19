/*
* 手厅H5 JSBridge 之跳转至插件（仅安卓 >=3.6.2）
* =============================================
* Author: bester
* Creat Date: 2017-09-05
* @param login 0代表不需要登录  1代表需要登录 int
* @param pluginPackageName 插件包名
* @param pluginName 插件中文名称
* @param pluginDownloadUrl 插件下载地址
* @param pluginFileSize 插件大小（单位：M）
* @param pluginMD5 插件的MD5
* @param pluginVersion 插件版本号
* @param pluginCjNo 插件编号（例如：安心小号 safeNum）
* @param needGesture 1为需要手势密码 0为不需要 int
*/

function gotoPlugin(login,pluginPackageName,pluginName,pluginDownloadUrl,pluginFileSize,pluginMD5,pluginVersion,pluginCjNo,needGesture){
  window.stub.gotoPlugin(parseInt(login),pluginPackageName,pluginName,pluginDownloadUrl,pluginFileSize,pluginMD5,pluginVersion,pluginCjNo,parseInt(needGesture));
}