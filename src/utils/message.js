import { ElMessage } from 'element-plus'

import { showToast, showSuccessToast, showFailToast, showLoadingToast } from 'vant';

import { useSettingStore } from "@/store/settingStore.js";

const settingsStore = useSettingStore()

const Message = (param) => {
  if(settingsStore.isMobile) {
    if(param.type === 'success') {
      showSuccessToast(param.message)
    } else if(param.type === 'error') {
      showFailToast(param.message)
    } else if(param.loading) {
      showLoadingToast({
        message: param.message,
        forbidClick: true
      })
    } else {
      showToast(param.message)
    }
  } else {
    ElMessage({
      message: param.message,
      type: param.type,
    })
  }
}

export default Message
