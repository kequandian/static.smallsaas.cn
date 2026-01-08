import cache from '@/utils/cache';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar, message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import React, { useState } from 'react';

// const beforeUpload = (file: FileType) => {
//   const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//   if (!isJpgOrPng) {
//     message.error('You can only upload JPG/PNG file!');
//   }
//   const isLt2M = file.size / 1024 / 1024 < 2;
//   if (!isLt2M) {
//     message.error('Image must smaller than 2MB!');
//   }
//   return isJpgOrPng && isLt2M;
// };

interface IAppProps {
  imgUrl?: any;
  cbUrl: (info: any) => void;
}

const ProImgCrop: React.FC<IAppProps> = (props) => {
  const { imgUrl, cbUrl } = props;

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(imgUrl);

  const uploadButton = (
    <div style={{ border: 0, background: 'none' }} className=" flex justify-center items-center">
      {loading ? (
        <LoadingOutlined width={40} height={40} style={{ color: '#999', fontSize: 20 }} />
      ) : (
        <PlusOutlined width={40} height={40} style={{ color: '#999', fontSize: 20 }} />
      )}
      <div style={{ marginTop: 8 }}></div>
    </div>
  );

  const beforeUpload: any = async (file: any) => {
    const isJpgOrPng =
      file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/svg+xml';
    if (!isJpgOrPng) {
      message.error('请上传jpg/png/svg!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('请上传小于2M的图片!');
    }
    return (isJpgOrPng && isLt2M) || Upload.LIST_IGNORE;
  };

  return (
    <ImgCrop rotationSlider>
      <Upload
        name="file"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        action={UPLOAD_IMG}
        maxCount={1}
        beforeUpload={beforeUpload}
        onChange={async (info) => {
          if (info.file.status === 'uploading') {
            setLoading(true);
            return;
          }
          if (info.file.status === 'done') {
            // Get this url from response in real world.
            // await form.setFieldsValue({ [name]: info?.file?.response?.data?.fileUrl });
            cbUrl(info);
            await setImageUrl(info?.file?.response?.data?.fileUrl);

            setLoading(false);
          }
        }}
        headers={{ Authorization: `Bearer ${cache.getToken()}` }}
      >
        {imageUrl ? <Avatar src={imageUrl} size={100} /> : uploadButton}
      </Upload>
    </ImgCrop>
  );
};

export default ProImgCrop;
