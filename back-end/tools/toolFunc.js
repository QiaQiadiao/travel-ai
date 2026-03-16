const ragService = require('@/services/rag_service');

/**
 * 本地工具函数分发器
 * @param {string} name   函数名，
 * @param {object} args   函数参数对象
 * @returns {Promise<any>} 接口返回的 JSON
 */
async function callLocalFuc(name, args) {
    try {
        switch(name) 
        {
            case 'search_knowledge_base':
            {
                return await ragService.search(args.query);
            }
            case 'query_train_tickets': 
            {
                // 从date中抽出年月日
                const split_date = args.date.split('-')
                const y = split_date[0]
                const m = split_date[1]
                const d = split_date[2]

                // apihz.cn 要求 POST + form 表单
                const payload = new URLSearchParams({
                    id:   process.env.APIHZ_ID,
                    key:  process.env.APIHZ_KEY,
                    add: args.from,
                    end: args.to,
                    y,
                    m,
                    d
                });

                // try {
                    const res = await fetch('http://124.222.204.22/api/12306/api.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: payload.toString()
                    })

                    if(!res.ok) {
                        return { _error: `HTTP ${res.status}` };
                    }

                    const data = await res.json();

                    if (data.code && data.code !== 200) {
                        return { _error: `${data.msg || '12306 查询失败'}` };
                    }

                    const list = Array.isArray(data) ? data : [data];   // 防一手单条/数组

                    const available = list.flatMap(train =>
                        train.seats.filter(s => s.stock === -1 || s.stock > 0)   // 有票：-1 或 >0
                        .map(seat => ({
                            depart_name:  train.depart_name,
                            arrive_name:  train.arrive_name,
                            depart_time:  train.depart_time,
                            arrive_time:  train.arrive_time,
                            duration:     train.duration,
                            train_number: train.train_number,
                            seat_type:    seat.type,
                            seat_stock:   seat.stock === -1 ? '充足' : seat.stock
                        }))
                    );

                    return available;

                // } catch (err) {
                    // console.error('apihz error', err.message);

                    // throw new Error('查询火车票失败，请稍后再试');
                // }
            }   

            case 'get_weather':
            {
                const payload = new URLSearchParams({
                    id:   process.env.APIHZ_ID,
                    key:  process.env.APIHZ_KEY,
                    sheng: args.sheng,
                    place: args.place
                });
                // try {
                    const res = await fetch('http://124.220.49.230/api/tianqi/tqybmoji15.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: payload.toString()
                    })

                    if(!res.ok) {
                        return { _error: `HTTP ${res.status}` };
                    }

                    const Data = await res.json();

                    if (Data.code && Data.code !== 200) {
                        return { _error: `${Data.msg || '天气查询失败'}` }
                    }

                    const list = Array.isArray(Data.data) ? Data.data : [Data.data];   // 防一手单条/数组

                    const processData = list.map((item) => {
                        return {
                            week2: item?.week2 ?? '',// 日期
                            img1: item?.img1 ?? '',
                            img2: item?.img2 ?? '',
                            wea1: item?.wea1 ?? '',
                            wea2: item?.wea2 ?? '',
                            wendu1: item?.wendu1 ?? '',
                            wendu2: item?.wendu2 ?? ''
                        }
                    })
                
                    return processData;

                // } catch (err) {
                //     console.error('apihz error', err.message);
                    
                //     throw new Error('查询天气失败，请稍后再试');
                // }
            }

            default:
                return { _error: `未知函数: ${name}` };
        }
    } catch(err) {
        return { _error: err.message || '内部错误'}
    }
}

module.exports = callLocalFuc