const tools = [
    {
        "type": "function",
        "function": {
            "name": "get_weather",
            "description": "获取相应省份城市或区县级名称的天气状况。只能查询中国大陆地区的天气（不包含港澳台）",
            "parameters": {
                "type": "object",
                "properties": {
                    "sheng": { "type": "string","description": "要查询的省份名称，如果查询失败请去掉地名后缀。例：sheng=北京，sheng=北京市，sheng=四川省，sheng=四川"},
                    "place": { "type": "string","description": "要查询的地点，城市或区县级名称，如果查询失败请去掉地名后缀。例：place=大兴区，place=大兴，place=高新区，place=高新，place=游仙镇，place=游仙"}
                },
                "required": ["sheng","place"]
            },
        }
    },
    {
        "type": "function",
        "function": {
            "name": "query_train_tickets",
            "description": "查询指定日期、出发-到达站的火车票余票及价格信息。不可以自行补充时间，要用用户主动给出的时间。",
            "parameters": {
                "type": "object",
                "properties": {
                    "from": { "type": "string", "description": "出发站中文名，如：北京" },
                    "to":   { "type": "string", "description": "到达站中文名，如：上海" },
                    "date": { "type": "string", "description": "乘车日期，格式 YYYY-MM-DD" }
                },
                "required": ["from","to","date"]
            },
        }
    },
    {
        "type": "function",
        "function": {
            "name": "search_knowledge_base",
            "description": "在旅游知识库中搜索相关的旅游攻略、景点介绍、美食推荐等信息。",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": { "type": "string", "description": "搜索关键词或问题" }
                },
                "required": ["query"]
            },
        }
    }
]

module.exports = tools