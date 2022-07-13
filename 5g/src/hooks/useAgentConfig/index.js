
import promiseAjax from 'zero-element-boot/lib/components/utils/promiseAjax';

const api = ''

/**
 * 查询订单列表
 */
function query(){
    const resp = request(api);
    if (resp && resp.code === 200) {
        let data = resp.data;
        if(Array.isArray(data) || Array.isArray(data.records)){
            return data || records
        }else{
            return []
        }
    }else{
        return resp
    }
}

/**
 * 订单详情
 * @param { 订单 id } id 
 */
function get(id){
    const query = { id }
    const resp = request(api, query);
    if (resp && resp.code === 200) {
        if(data){
            return data
        }else{
            return {}
        }
    }else{
        return resp
    }
}

/**
 * 新增
 * @param { 订单信息 } query 
 */
function set(query){
    const resp = request(api, query, {method: 'POST'});
    return resp
}

/**
 * 更新
 * @param { 订单 id } id 
 * @param { 订单信息 } query 
 */
function update(id, query){
    const apiPath = `${api}/${id}`
    const resp = request(apiPath, query, {method: 'PUT'});
    return resp
}


function request(api, reqData, options) {
    if(!api){
        console.error('未设置订单api')
    }
    promiseAjax(api, reqData, options)
        .then(responseData => {
            return responseData
        })
}

export { query, get, set, update }