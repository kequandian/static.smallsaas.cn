import { request } from '@umijs/max';

/**
 * 用户鉴权
 * @param data 请求参数
 * @returns 返回token
 * http://202.63.172.185:60000/login/checkdownload
 * @loginname bigscreen
 * @password bigscreen
 * @isdownload 2
 */

export async function getCheckdownload(data: any) {
  return request(`/login/checkdownload`, {
    method: 'GET',
    params: data,
  });
}
// http://202.63.172.185:60000/api/queryrecord

/**
 * 查询录像文件
 * @param data 请求参数
 * @returns 返回mp4
 * @conf_name 750175522006125
 * @type mp4
 */
// http://202.63.172.178:8000/api/farend/queryrecord?conf_name=750175522006125&type=mp4

export async function getQueryrecord(data: any) {
  return request(`/api/farend/queryrecord`, {
    method: 'GET',
    params: data,
  });
}

/**
 * 录像文件播放/查询
 * @param data 请求参数
 * @returns 返回mp4
 * @conf_name 750175522006125
 * @type mp4
 */
export async function getQueryrecordDownload(data: any) {
  return request(`/api/farend/download`, {
    method: 'GET',
    params: data,
  });
}
