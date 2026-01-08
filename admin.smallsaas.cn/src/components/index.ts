/**
 * 这个文件作为组件的目录
 * 目的是统一管理对外输出的组件，方便分类
 */
/**
 * 布局组件
 */
import Footer from './Footer';
import { Question } from './RightContent';
import { AvatarDropdown, AvatarName } from './RightContent/AvatarDropdown';
//end

/**
 * 通用组件
 */
import UploadFile from '@/components/UploadFile';
import OrgTreeV2 from './OrgTree';

export { AvatarDropdown, AvatarName, Footer, OrgTreeV2, Question, UploadFile };
