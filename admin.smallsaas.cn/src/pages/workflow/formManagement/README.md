# 表单管理模块

## 功能概述

表单管理模块是工作流系统的重要组成部分，用于创建、配置和管理工作流中使用的表单。该模块基于 amis 表单渲染引擎，实现了表单的可视化配置和管理。

## 主要功能

1. **表单实体管理**：创建、编辑、删除表单实体
2. **表单字段管理**：为表单添加、编辑、删除字段，支持多种字段类型
3. **表单预览**：实时预览表单效果
4. **表单数据管理**：管理表单提交的数据

## 技术实现

- 前端框架：React + TypeScript
- UI 组件库：Ant Design
- 表单渲染引擎：amis
- 数据交互：RESTful API

## 组件结构

- `FormList.tsx`：表单列表组件，展示所有表单实体
- `FormEditor.tsx`：表单编辑器，用于创建和编辑表单实体
- `FormFieldsManager.tsx`：表单字段管理器，用于管理表单字段
- `FormPreview.tsx`：表单预览组件，用于预览表单效果
- `FormDataManager.tsx`：表单数据管理组件，用于管理表单数据

## API 接口

### 表单实体接口

- `GET /api/adm/cfg/entities`：获取表单实体列表
- `GET /api/adm/cfg/entities/{entityName}`：获取表单实体详情
- `POST /api/adm/cfg/entities`：创建表单实体
- `PUT /api/adm/cfg/entities/{entityName}`：更新表单实体
- `DELETE /api/adm/cfg/entities/{entityName}`：删除表单实体

### 表单字段接口

- `GET /api/adm/cfg/attribute/{entityName}`：获取表单字段列表
- `POST /api/adm/cfg/attribute/{entityName}`：添加表单字段
- `POST /api/adm/cfg/attribute/{entityName}/list`：批量添加表单字段
- `PUT /api/adm/cfg/attribute/{entityName}/attributes/{attributeName}`：更新表单字段
- `DELETE /api/adm/cfg/attribute/{entityName}/attributes/{attributeName}`：删除表单字段

### 表单数据接口

- `GET /api/pub/data/services/{entityName}`：获取表单数据列表
- `GET /api/pub/data/services/{entityName}/{id}`：获取表单数据详情
- `POST /api/pub/data/services/{entityName}`：添加表单数据
- `PUT /api/pub/data/services/{entityName}/{id}`：更新表单数据
- `DELETE /api/pub/data/services/{entityName}/{id}`：删除表单数据

## 与工作流的集成

表单管理模块与工作流系统紧密集成，可以在工作流的不同节点中使用不同的表单，实现业务流程的自动化。

## 使用说明

1. 创建表单：点击"新建表单"按钮，填写表单基本信息
2. 配置字段：在表单列表中点击"字段管理"，添加和配置表单字段
3. 预览表单：在表单列表中点击"预览"，查看表单效果
<!-- 4. 管理数据：在表单列表中点击"数据管理"，管理表单提交的数据 -->
