import React, { useState, useEffect } from 'react';
import { Input, Alert } from 'antd';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

interface JsonEditorProps {
  value: string;
  onChange: (value: string, isValid: boolean) => void;
  rows?: number;
  placeholder?: string;
}

const JsonEditor: React.FC<JsonEditorProps> = ({
  value,
  onChange,
  rows = 10,
  placeholder = '{"key1": "value1", "key2": "value2"}'
}) => {
  const [jsonStr, setJsonStr] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(true);

  // Initialize with the provided value
  useEffect(() => {
    setJsonStr(value);
    validateJson(value);
  }, [value]);

  const validateJson = (jsonString: string) => {
    if (!jsonString.trim()) {
      setError('JSON 不能为空');
      setIsValid(false);
      onChange(jsonString, false);
      return;
    }

    try {
      const parsed = JSON.parse(jsonString);
      
      // Check if it's an object and not an array or null
      if (typeof parsed !== 'object' || Array.isArray(parsed) || parsed === null) {
        setError('JSON 必须是一个有效的对象（Map结构）');
        setIsValid(false);
        onChange(jsonString, false);
        return;
      }
      
      setError(null);
      setIsValid(true);
      onChange(jsonString, true);
    } catch (e) {
      if (e instanceof Error) {
        setError(`JSON 格式错误: ${e.message}`);
      } else {
        setError('JSON 格式错误');
      }
      setIsValid(false);
      onChange(jsonString, false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setJsonStr(newValue);
    validateJson(newValue);
  };

  return (
    <div>
      <Input.TextArea
        value={jsonStr}
        onChange={handleChange}
        rows={rows}
        placeholder={placeholder}
        style={{ 
          fontFamily: 'monospace',
          fontSize: '14px',
          marginBottom: error ? '8px' : '0'
        }}
      />
      {error ? (
        <Alert
          message={error}
          type="error"
          showIcon
          style={{ marginTop: '8px' }}
        />
      ) : (
        <div style={{ color: '#52c41a', marginTop: '8px', display: 'flex', alignItems: 'center' }}>
          <CheckCircleFilled style={{ marginRight: '8px' }} />
          JSON 格式有效
        </div>
      )}
    </div>
  );
};

export default JsonEditor; 