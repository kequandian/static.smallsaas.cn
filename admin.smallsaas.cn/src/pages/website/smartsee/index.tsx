import cache from '@/utils/cache';
import { DownloadOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import {
  PageContainer,
  ProCard,
  ProFormGroup,
  ProFormUploadButton,
} from '@ant-design/pro-components';
import { Button, Input, message, Modal, Space, Upload } from 'antd';
import * as React from 'react';
import { useEffect, useState } from 'react';

const { TextArea } = Input;

const Smartsee: React.FC = () => {
  const [jsonContent, setJsonContent] = useState<string>('');
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');

  // 文件名常量，集中管理
  const SMARTSEE_FILENAME = 'smartseeData.json';

  const downloadUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://meeting-test.xinzhisc.com/minio/smartsee/smartseeData.json'
      : '/minio/smartsee/smartseeData.json';
  // const downloadUrl = `${}/websiwebsite/smartseeData.json`

  // 获取JSON内容
  const fetchJsonContent = async () => {
    try {
      const response = await fetch(`${downloadUrl}?_=${Date.now()}`);
      const text = await response.text();

      // 验证是否为有效的JSON
      try {
        JSON.parse(text);
        setJsonContent(text);
        return text;
      } catch (e) {
        message.error('获取到的内容不是有效的JSON格式');
      }
    } catch (error) {
      message.error('获取内容失败');
    }
  };

  useEffect(() => {
    fetchJsonContent();
  }, []);

  // 格式化JSON显示
  const formatJsonContent = (content: string) => {
    try {
      return JSON.stringify(JSON.parse(content), null, 2);
    } catch (e) {
      return '无效的JSON格式';
    }
  };

  // 查看内容
  const handleView = () => {
    message.loading('打开json文件中...');
    fetchJsonContent()
      .then(() => {
        setIsViewModalVisible(true);
        message.destroy();
      })
      .catch((err) => {
        const msg = err instanceof Error ? err.message : '获取内容失败';
        message.error(msg);
      });
  };
  // 编辑内容
  const handleEdit = () => {
    message.loading('打开json文件中...');
    fetchJsonContent()
      .then(() => {
        setEditContent(jsonContent);
        setIsEditModalVisible(true);
        message.destroy();
      })
      .catch((err) => {
        const msg = err instanceof Error ? err.message : '获取内容失败';
        message.error(msg);
      });
  };

  // 保存编辑内容
  const handleSaveEdit = async () => {
    try {
      // 验证JSON格式
      JSON.parse(editContent);

      const formData = new FormData();
      const blob = new Blob([editContent], { type: 'application/json' });
      formData.append('file', blob, SMARTSEE_FILENAME);

      const response = await fetch(
        `/api/adm/fs/uploadByForm?filePath=/smartsee/&module=operatingPlatform&fileName=${SMARTSEE_FILENAME}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${cache.getToken()}`,
          },
          body: formData,
        },
      );

      if (response.ok) {
        message.success('保存成功');
        setIsEditModalVisible(false);
        fetchJsonContent();
      } else {
        message.error('保存失败');
      }
    } catch (error) {
      message.error('JSON格式不正确');
    }
  };

  // 下载文件
  const handleDownload = async () => {
    message.loading('下载中...');
    try {
      const jsonContent = await fetchJsonContent();
      if (!jsonContent) throw new Error('获取内容失败');
      const blob = new Blob([jsonContent], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = SMARTSEE_FILENAME;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      message.success('下载成功');
    } catch (error) {
      message.error(error instanceof Error ? error.message : '下载失败');
    } finally {
      message.destroy();
    }
  };

  return (
    <PageContainer title={false}>
      <ProCard>
        <Space direction="vertical" style={{ width: '100%' }} size="large">
          {/* 下载和操作按钮 */}
          <Space>
            <Button icon={<DownloadOutlined />} type="primary" onClick={handleDownload}>
              下载官网当前json内容
            </Button>
            <Button icon={<EyeOutlined />} onClick={handleView}>
              预览内容
            </Button>
            <Button icon={<EditOutlined />} onClick={handleEdit}>
              在线编辑
            </Button>
          </Space>

          {/* 上传区域 */}
          <ProFormGroup title="上传后刷新官网">
            <ProFormUploadButton
              accept=".json"
              fieldProps={{
                name: 'file',
                multiple: false,
                maxCount: 1,
                headers: {
                  Authorization: `Bearer ${cache.getToken()}`,
                },
                beforeUpload: (file) => {
                  // 检查文件名是否为 smartseeData.json
                  if (file.name !== SMARTSEE_FILENAME) {
                    message.error(`文件名必须为 ${SMARTSEE_FILENAME}`);
                    return Upload.LIST_IGNORE;
                  }
                  return true;
                },
                onChange: (info) => {
                  if (info.file.status === 'done') {
                    message.success('上传成功');
                    fetchJsonContent();
                  }
                },
              }}
              max={1}
              label="官网内容上传"
              name="imgUrl"
              action={`/api/adm/fs/uploadByForm?filePath=/smartsee/&module=operatingPlatform&fileName=${SMARTSEE_FILENAME}`}
            />
          </ProFormGroup>

          {/* 图片上传区域 */}
          <ProFormGroup
            title={
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span>图片上传</span>
                {currentImageUrl && (
                  <div
                    style={{
                      fontSize: '14px',
                      color: '#666',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#f5f5f5',
                      padding: '8px',
                      borderRadius: '4px',
                    }}
                  >
                    <Input value={currentImageUrl} readOnly size="small" style={{ flex: 1 }} />
                    <Button
                      size="small"
                      onClick={() => {
                        navigator.clipboard.writeText(currentImageUrl);
                        message.success('URL已复制');
                      }}
                    >
                      复制
                    </Button>
                  </div>
                )}
              </div>
            }
          >
            <ProFormUploadButton
              name="pic"
              label="上传官网图片"
              accept=".jpg,.jpeg,.png,.svg,.gif"
              fieldProps={{
                name: 'file',
                multiple: false,
                maxCount: 1,
                listType: 'picture-card',
                headers: {
                  Authorization: `Bearer ${cache.getToken()}`,
                },
                onChange: (info) => {
                  const { status, response } = info.file;
                  if (status === 'done') {
                    if (response?.code === 200 && response?.data?.fileUrl) {
                      const url = response.data.fileUrl;
                      setCurrentImageUrl(url);
                      setImageUrls((prev) => [...prev, url]);
                      message.success('图片上传成功');
                    } else {
                      message.error(response?.msg || '上传失败');
                    }
                  } else if (status === 'error') {
                    message.error('图片上传失败');
                  }
                },
              }}
              action={'/api/adm/fs/uploadByForm?filePath=/smartsee/&module=operatingPlatform'}
            />
          </ProFormGroup>

          {/* 历史图片URL列表 */}
          {imageUrls.length > 0 && (
            <ProCard title="历史上传记录" bordered headerBordered>
              <Space direction="vertical" style={{ width: '100%' }}>
                {imageUrls.map((url, index) => (
                  <div
                    key={index}
                    style={{
                      padding: '12px',
                      background: '#fafafa',
                      borderRadius: '4px',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={url}
                      alt={`上传图片 ${index + 1}`}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '4px',
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <Input value={url} readOnly style={{ marginBottom: '8px' }} />
                      <Space>
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => {
                            navigator.clipboard.writeText(url);
                            message.success('URL已复制');
                          }}
                        >
                          复制链接
                        </Button>
                        <Button
                          size="small"
                          onClick={() => {
                            window.open(url, '_blank');
                          }}
                        >
                          查看图片
                        </Button>
                      </Space>
                    </div>
                  </div>
                ))}
              </Space>
            </ProCard>
          )}
        </Space>
      </ProCard>

      {/* 查看对话框 */}
      <Modal
        title="查看JSON内容"
        open={isViewModalVisible}
        onCancel={() => setIsViewModalVisible(false)}
        footer={null}
        width={800}
      >
        <pre
          style={{
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            background: '#f5f5f5',
            padding: '16px',
            borderRadius: '4px',
          }}
        >
          {formatJsonContent(jsonContent)}
        </pre>
      </Modal>

      {/* 编辑对话框 */}
      <Modal
        title="编辑JSON内容"
        open={isEditModalVisible}
        onOk={handleSaveEdit}
        onCancel={() => setIsEditModalVisible(false)}
        width={800}
      >
        <TextArea
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          style={{
            height: '500px',
            marginBottom: '16px',
            fontFamily: 'monospace',
          }}
        />
      </Modal>
    </PageContainer>
  );
};

export default Smartsee;
