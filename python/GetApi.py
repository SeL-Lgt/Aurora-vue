"""
修改时间
2020-6-25
"""

import json
import requests
from requests.auth import HTTPBasicAuth
from urllib.request import Request, urlopen
class GetApi:

    """
    aurora 网络赛 api数据获取
    url: api地址
    headers ： 坐标头地址
    admin： 登录账号
    pwd ： 用户登录密码
    
    使用方法：
    api_url = "https://....."
    headers = {'content-type':"application/json"}
    admin = 'admin'
    pwd = '123456'

    aa = GetApi(api_url,headers,admin,pwd)
    aa.GetApiXML()
    """
    
    # 构造函数
    def __init__(self,url,head,admin,pwd):
        self.url = url
        self.head = head
        self.admin = admin
        self.pwd = pwd
        self.user = HTTPBasicAuth(self.admin,self.pwd)


    def __get(self):
        try:
            requests.packages.urllib3.disable_warnings()
            requ_post = requests.post(self.url,headers = self.head ,auth = self.user)
            get_data = requ_post.json()
            return get_data
        except json.JSONDecodeError:
            print("请输入正确的url")
        except KeyError:
            print("请输入正确的用户名或者密码,以及获取的api参数")    
            
            
    def GetApiJson(self):
        """获取json格式的数据，是str格式"""
        data = self.__get()
        json_data = json.dumps(data, ensure_ascii=False)
        return json_data
        
        
    def GetApiDic(self):
        """获取字典格式的数据"""
        return self.__get()   
        
        
    def GetApiXML(self):
        """获取XML格式的数据,注意这是str格式，需要导入xml文件才能使用 """  
        data = self.__get()
        data_xml = []
        for k in data.keys():
            v = data.get(k)  # 取出字典中key对应的value
            data_xml.append('<{key}>{value}</{key}>'.format(key=k, value=v))
        xml = '<xml>{}</xml>'.format(''.join(data_xml))
        return  xml             
        
        
