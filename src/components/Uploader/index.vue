<template>
  <ul class="upload-image-view">
    <template v-if="showImage">
      <li v-for="(item, index) in imagesList" :key="index">
        <div class="img-box" @click="preview(index)">
          <img :src="item.fileUrl"/>

          <div class="progress" v-if="item.show">
            <div class="progress-text">{{item.text}}</div>
          </div>
        </div>
        <i class="icon-font" @click='removeImage(index)'>&#xe62b;</i>
      </li>
    </template>

    <li class="upload-btn" v-show="showFile">
      <img src="@/assets/images/plus.jpg">
      <input v-if="isReady" type="file" class="upload" accept="image/*" :multiple="multiple" @change="onChange"/>
    </li>
  </ul>
</template>

<script>
  import {utils} from '@/common'

  export default {
    props: {
      action: {
        type: String,
        default: ''
      },
      maxlength: {
        type: Number,
        default: 8
      },
      multiple: {
        type: Boolean,
        default: true
      }
    },

    data() {
      return {
        imagesList: [],
        previewImagesList: [],
        imageLength: 0,
        isReady: true
      }
    },

    activated () {
      this.imagesList = [];
    },

    computed: {
      showFile() {
        return !(this.imagesList.length > this.maxlength - 1);
      },

      showImage() {
        return this.imagesList.length;
      }
    },

    methods: {
      onChange(e) {
        let files = e.target.files || e.dataTransfer.files;

        if (!files.length) {
          return;
        }

        files = Array.prototype.slice.call(files);

        if ((files.length + this.imagesList.length) > 8) {
          this.$toast.show({text: `最多上传${this.maxlength - this.imagesList.length}张图片`, time: 1000});
          return
        }

        if (files.length > +this.maxlength) {
          this.$toast.show({text: `最多上传${this.maxlength}张图片`, time: 1000});
          return
        }

        this.createImage(files);

        e.target.value = '';
      },

      // 创建图片
      createImage(files) {
        if (typeof FileReader === 'undefined') {
          this.$toast.show({text: '您的浏览器不支持图片上传，请升级您的浏览器', time: 1000});
          return false;
        }

        this.imageLength = this.imagesList.length;

        for (let i = 0; i < files.length; i++) {
          let form = new FormData();
          let reader = new FileReader();
          reader.readAsDataURL(files[i]);

          reader.onload = (e) => {
            let result = e.target.result;

            this.compress(result, {width: 750}, res => {
              let blob = this.convertBase64UrlToBlob(res);
              form.append('file', blob, `file_${Date.parse(new Date())}.jpg`);
              this.imagesList.push({fileUrl: res, show: false, text: '0%'});

              this.upload(form, i, utils.uuid());
            });
          }
        }
      },

      // 移除图片
      removeImage(index) {
        this.imagesList.splice(index, 1);
        this.previewImagesList.splice(index, 1);
        this.$emit('remove', index);
      },

      // 预览图片
      preview(index) {
        DCBJSApp.netPhotoBrowser(index, this.previewImagesList);
      },

      /*
      * 三个参数
      * file: 一个是文件（类型是图片格式）,
      * obj: {
      *   width:  一个是文件压缩后的宽度，宽度越小，字节越小
      *   quality: 图片质量
      * }
      * */
      compress(file, obj, callback) {
        let img = new Image();
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        let quality = 1;

        img.src = file;
        img.onload = () => {
          let [w, h] = [img.width, img.height], scale = w / h;

          w = obj.width || w;
          h = obj.height || (w / scale);

          let anw = document.createAttribute('width');
          let anh = document.createAttribute('height');
          anw.nodeValue = w;
          anh.nodeValue = h;

          canvas.setAttributeNode(anw);
          canvas.setAttributeNode(anh);
          ctx.drawImage(img, 0, 0, w, h);

          if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = obj.quality;
          }

          let base64 = canvas.toDataURL('image/png', quality);

          callback(base64)
        }
      },

      /*
      * 将base64的图片url数据转Blob
      * @param urlData
      * */
      convertBase64UrlToBlob(urlData) {
        let arr = urlData.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);

        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }

        return new Blob([u8arr], {type: mime});
      },

      // 上传到服务器
      upload(form, index, uuid) {
        let config = {
          white: true,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          transformRequest: [function (data) {
            return data;
          }],
          onUploadProgress: progressEvent => {
            let complete = (progressEvent.loaded / progressEvent.total * 100 | 0) >= 98 ? '98%' : (progressEvent.loaded / progressEvent.total * 100 | 0) + '%';

            this.isReady = false;
            if (this.imagesList[this.imageLength + index]) {
              this.imagesList[this.imageLength + index].show = true;
              this.imagesList[this.imageLength + index].text = complete;
            }
          }
        };

        this.$http.post(this.action, form, config).then(({status, msg, data}) => {
          if (status === 200) {
            this.previewImagesList.push(data);
            this.$emit('fetch', data);

            if (this.imagesList[this.imageLength + index]) {
              this.$set(this.imagesList[this.imageLength + index], 'text', '100%');
              this.$set(this.imagesList[this.imageLength + index], 'show', false);
            }
          } else {
            if (this.imagesList[this.imageLength + index]) {
              this.imagesList[this.imageLength + index].show = true;
              this.imagesList[this.imageLength + index].text = '上传失败';
            }
          }
        }).finally(() => {
          this.isReady = true;
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .upload {
    &-image-view {
      display: flex;

      li {
        margin-right: 9px;
        text-align: center;
        user-select: none;
        position: relative;

        &:nth-child(4n) {
          margin-right: 0;
        }

        .img-box {
          width: 108px;
          height: 108px;
          background-color: #cccccc;
          border-radius: 4px;
          overflow: hidden;
        }

        img {
          display: block;
          height: 100%;
          width: 100%;
        }

        .progress {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          border-radius: 4px;
          z-index: 100;
          background-color: rgba(0, 0, 0, 0.3);
          display: flex;
          flex-direction: column;
          justify-content: center;

          &-text {
            color: #ffffff;
            font-size: 12px;
            text-align: center;
            white-space: nowrap;
          }
        }

        i {
          -webkit-border-radius: 50%;
          -moz-border-radius: 50%;
          border-radius: 50%;
          position: absolute;
          right: -8px;
          top: -6px;
          width: 16px;
          height: 16px;
          color: rgba(255, 150, 10, 1);
          line-height: 16px;
          font-size: 20px;
          text-indent: -4px;
          z-index: 200;
        }
      }
    }

    &-btn {
      width: 108px;
      height: 108px;
      border-radius: 4px;
      position: relative;
    }

    &-wrapper {
      position: relative;

      input {
        position: absolute;
        left: 0;
        top: 0;
        width: 108px;
        height: 108px;
        opacity: 0;
      }
    }
  }
</style>
