<template>
    <div
        class="text-center"
        :style="{
            width: width,
            height: height
        }"
        :class="{disabled: disabled}"
    >
        <p v-if="$attrs.title" class="bolder text-crblack uploader-title mb-2">
            {{ $attrs.title }}
        </p>
        <el-upload
            ref="uploader"
            v-loading="isLoading"
            class="avatar-uploader"
            :action="action"
            :dashboard-mode="false"
            :hide-button="false"
            :drag="drag"
            :http-request="axiosUpload"
            :show-file-list="false"
            :disabled="disabled"
        >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <slot v-else name="placeholder">
                <i class="el-icon-plus avatar-uploader-icon" />
            </slot>

            <div v-if="tip" slot="tip" class="el-upload__tip text-crgray">
                {{ tip }}
            </div>
        </el-upload>
        <!-- <button
            v-if="imageUrl && !disabled"
            class="btn btn-primary"
            :disabled="disabled"
            @click="openUploader"
        >
            Change Image
        </button> -->
    </div>
</template>

<script>
export default {
    props: {
        imageUrl: {
            type: String,
            default: ""
        },
        action: {
            type: String,
            default: "",
            required: true
        },
        tip: {
            type: String,
            default: ""
        },
        drag: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: "100%"
        },
        height: {
            type: String,
            default: "100%"
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            uploadPercentage: 0,
            isLoading: false
        }
    },
    methods: {
        openUploader() {
            this.$refs.uploader.$el.querySelector(".el-upload").click()
        },
        axiosUpload(data) {
            const formData = new FormData();
            formData.append("file", data.file)
            this.isLoading = true

            axios({
                method: "post",
                url: data.action,
                data: formData,
                onUploadProgress: (progressEvent) => {
                    this.uploadPercentage = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
                }
            }).then(({ data }) => {
                this.$emit("loaded", data)
            }).finally(() => {
                this.isLoading = false
            })
        }
    }

}
</script>

<style lang="scss">
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader{
    height: 100%;
    overflow: hidden;

    &-icon {
        font-size: 28px;
        color: #8c939d;
        width: 100%;
        height: 100%;
        line-height: 178px;
        text-align: center;
    }
  }

  .avatar {
    min-height: 178px;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

    .el-upload-dragger, .el-upload--text {
        width: 100%;
        height: 100%;
    }
  .disabled {
      cursor: not-allowed;
      .el-upload-dragger {
          cursor: not-allowed !important;
          width: 100%;
      }
      .btn {
          background: silver;
          border: none;
          cursor: not-allowed !important;
      }
  }
</style>
