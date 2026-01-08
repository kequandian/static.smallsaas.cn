import {
  Attachments,
  Bubble,
  Conversations,
  Sender,
  Welcome,
  useXAgent,
  useXChat,
} from '@ant-design/x';
import { createStyles } from 'antd-style';
import markdownit from 'markdown-it';
import OpenAI from 'openai';
import React, { useEffect } from 'react';

import { CloudUploadOutlined, PaperClipOutlined, PlusOutlined } from '@ant-design/icons';
import { Badge, Button, Flex, type GetProp, Space, Switch } from 'antd';
import axios from 'axios';
const md = markdownit({ html: true, breaks: true });

const defaultConversationsItems = [
  {
    key: '0',
    label: '新对话',
  },
];

const client = new OpenAI({
  baseURL: 'http://llm.xinzhisc.com/v1',
  apiKey: 'sk-PzWGSZgFYwlHrCUQAf0944B9B53f49D5Ac50Ea02D94b72B9',
  dangerouslyAllowBrowser: true,
});

const roles: GetProp<typeof Bubble.List, 'roles'> = {
  ai: {
    placement: 'start',
    typing: { step: 5, interval: 20 },
    styles: {
      content: {
        borderRadius: 16,
      },
    },
  },
  local: {
    placement: 'end',
    variant: 'shadow',
  },
};

const useStyle = createStyles(({ token, css }) => {
  return {
    layout: css`
      height: 100vh;
      width: 100%;
      min-width: 1000px;
      height: calc(100vh - 56px);
      border-radius: ${token.borderRadius}px;
      display: flex;
      background: ${token.colorBgContainer};
      font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;

      .ant-prompts {
        color: ${token.colorText};
      }
    `,
    menu: css`
      background: ${token.colorBgLayout}80;
      width: 280px;
      height: 100%;
      display: flex;
      flex-direction: column;
    `,
    conversations: css`
      padding: 0 12px;
      flex: 1;
      overflow-y: auto;
    `,
    chat: css`
      height: 100%;
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      padding: ${token.paddingLG}px;
      gap: 16px;
    `,
    messages: css`
      flex: 1;
    `,
    placeholder: css`
      padding-top: 32px;
    `,
    sender: css`
      box-shadow: ${token.boxShadow};
    `,
    logo: css`
      display: flex;
      height: 72px;
      align-items: center;
      justify-content: start;
      padding: 0 24px;
      box-sizing: border-box;

      img {
        display: inline-block;
        width: 24px;
        height: 24px;
      }

      span {
        display: inline-block;
        margin: 0 8px;
        color: ${token.colorText};
        font-weight: bold;
        font-size: 16px;
      }
    `,
    addBtn: css`
      background: #1677ff0f;
      border: 1px solid #1677ff34;
      width: calc(100% - 24px);
      margin: 0 12px 24px 12px;
    `,
  };
});

const Independent: React.FC = () => {
  // ==================== Style ====================
  const { styles } = useStyle();
  const [R1, setR1] = React.useState(false);

  // ==================== State ====================
  const [headerOpen, setHeaderOpen] = React.useState(false);

  const [content, setContent] = React.useState('');

  const [conversationsItems, setConversationsItems] = React.useState(defaultConversationsItems);

  const [activeKey, setActiveKey] = React.useState(defaultConversationsItems[0].key);

  const [attachedFiles, setAttachedFiles] = React.useState<GetProp<typeof Attachments, 'items'>>(
    [],
  );

  // ==================== Runtime ====================
  const [agent] = useXAgent({
    request: async (info, callbacks) => {
      const { messages, message } = info;

      const { onSuccess, onUpdate } = callbacks;

      // current message
      console.log('message', message);

      // history messages
      console.log('messages', messages);

      let content: string = '';

      try {
        const stream = await client.chat.completions.create({
          model: R1 ? 'deepseek-reasoner' : 'deepseek-r1-bf16',
          // if chat context is needed, modify the array
          messages: [{ role: 'user', content: message }],
          // stream mode
          stream: true,
        });

        for await (const chunk of stream) {
          content += chunk.choices[0]?.delta?.content || '';
          console.log(content);

          onUpdate(content);
        }

        onSuccess(content);
      } catch (error) {
        // handle error
        // onError();
      }
    },
  });

  const { onRequest, messages, setMessages } = useXChat({
    agent,
  });

  useEffect(() => {
    if (activeKey !== undefined) {
      setMessages([]);
    }
  }, [activeKey]);

  // ==================== Event ====================
  const onSubmit = (nextContent: string) => {
    console.log('nextContent', nextContent);
    // axios
    //   .post(
    //     '/rag//ask/',
    //     { question: nextContent },
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     },
    //   )
    //   .then((response) => {
    //     console.log(response);
    //   });

    if (!nextContent) return;
    onRequest(nextContent);
    setContent('');
  };

  const onAddConversation = () => {
    setConversationsItems([
      ...conversationsItems,
      {
        key: `${conversationsItems.length}`,
        label: `新对话 ${conversationsItems.length}`,
      },
    ]);
    setActiveKey(`${conversationsItems.length}`);
  };

  const onConversationClick: GetProp<typeof Conversations, 'onActiveChange'> = (key) => {
    setActiveKey(key);
  };
  console.log('activeKey', R1);

  const handleFileChange: GetProp<typeof Attachments, 'onChange'> = (info) => {
    console.log('info', info);
    // const formData = new FormData();
    // formData.append('file', info.file);
    // console.log('formData', formData);
    axios
      .post(
        '/rag/upload-pdf/',
        { file: info.file },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then((response) => {
        console.log(response);
      });

    setAttachedFiles(info.fileList);
  };

  // ==================== Nodes ====================
  const placeholderNode = (
    <Space direction="vertical" size={16} className={styles.placeholder}>
      <Welcome
        variant="borderless"
        icon="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp"
        title="你好, 请输入你的问题"
        description="DeepSeek-V3~"
      // extra={
      //   <Space>
      //     <Button icon={<ShareAltOutlined />} />
      //     <Button icon={<EllipsisOutlined />} />
      //   </Space>
      // }
      />
    </Space>
  );

  const items: GetProp<typeof Bubble.List, 'items'> = messages.map(({ id, message, status }) => ({
    key: id,
    // loading: status === 'loading',
    role: status === 'local' ? 'local' : 'ai',
    // content: <ReactMarkdown>{message}</ReactMarkdown>,
    content: (
      <div className="markdownit" dangerouslySetInnerHTML={{ __html: md.render(message) }} />
    ),
  }));

  const attachmentsNode = (
    <Badge dot={attachedFiles.length > 0 && !headerOpen}>
      <Button type="text" icon={<PaperClipOutlined />} onClick={() => setHeaderOpen(!headerOpen)} />
    </Badge>
  );

  const senderHeader = (
    <Sender.Header
      title="Attachments"
      open={headerOpen}
      onOpenChange={setHeaderOpen}
      styles={{
        content: {
          padding: 0,
        },
      }}
    >
      <Attachments
        beforeUpload={() => false}
        items={attachedFiles}
        onChange={handleFileChange}
        placeholder={(type) =>
          type === 'drop'
            ? { title: 'Drop file here' }
            : {
              icon: <CloudUploadOutlined />,
              title: 'Upload files',
              description: 'Click or drag files to this area to upload',
            }
        }
      />
    </Sender.Header>
  );

  const logoNode = (
    <div className={styles.logo}>
      <img
        src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*eco6RrQhxbMAAAAAAAAAAAAADgCCAQ/original"
        draggable={false}
        alt="logo"
      />
      <span>CHAT</span>
    </div>
  );

  // ==================== Render =================
  return (
    <div className={styles.layout}>
      <div className={styles.menu}>
        {/* 🌟 Logo */}
        {logoNode}
        {/* 🌟 添加会话 */}
        <Button
          onClick={onAddConversation}
          type="link"
          className={styles.addBtn}
          icon={<PlusOutlined />}
        >
          New Conversation
        </Button>
        {/* 🌟 会话管理 */}
        <Conversations
          items={conversationsItems}
          className={styles.conversations}
          activeKey={activeKey}
          onActiveChange={onConversationClick}
        />
      </div>
      <div className={styles.chat}>
        {/* 🌟 消息列表 */}
        <Bubble.List
          items={items.length > 0 ? items : [{ content: placeholderNode, variant: 'borderless' }]}
          roles={roles}
          className={styles.messages}
        />
        {/* 🌟 提示词 */}
        {/* <Prompts items={senderPromptsItems} onItemClick={onPromptsItemClick} /> */}
        {/* 🌟 输入框 */}
        <Flex vertical gap="middle" align="flex-start">
          <Switch
            value={R1}
            checkedChildren="深度思考R1"
            onChange={() => setR1(!R1)}
            unCheckedChildren="深度思考R1"
            disabled
          />
          <Sender
            value={content}
            header={senderHeader}
            onSubmit={onSubmit}
            onChange={setContent}
            prefix={attachmentsNode}
            loading={agent.isRequesting()}
            className={styles.sender}
          />
        </Flex>
      </div>
    </div>
  );
};

export default Independent;
