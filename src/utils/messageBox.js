import { ElMessageBox } from 'element-plus'

import { showDialog, showConfirmDialog } from 'vant';

import { useSettingStore } from "@/store/settingStore.js";

const settingsStore = useSettingStore()

const MessageBox = (type = 'alert',param,confirm,cancal) => {
  if(settingsStore.isMobile) {
    if(type === 'alert') {
      showDialog({
        title: param.title,
        message: param.message,
      }).then(() => {
        confirm()
      });
    } else if(type === 'confirm') {
      showConfirmDialog({
        title: param.title,
        message: param.message,
      }).then(() => {
        confirm();
      })
    }
  } else {
    if(type === 'alert') {
      ElMessageBox.alert(param.message, param.title, {
        confirmButtonText: param.confirmButtonText || '确认',
        callback: () => {
          confirm()
        }
      })
    } else if(type == 'confirm') {
      ElMessageBox.confirm(
        param.message,
        param.title,
        {
          confirmButtonText: param.confirmButtonText || '确认',
          cancelButtonText: param.cancelButtonText || '取消',
          type: param.type,
        }
      )
        .then(() => {
          confirm()
        })
    }
  }
}

export default MessageBox
