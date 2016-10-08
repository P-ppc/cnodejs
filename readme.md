##利用cnodejs网站提供的api实现一个桌面客户端([cnodejs社区](https://cnodejs.org/))

###运行截图
1. 登录
![image](https://github.com/P-ppc/cnodejs/blob/master/imgPreview/login@2x.png)
2. 主页
![image](https://github.com/P-ppc/cnodejs/blob/master/imgPreview/index@2x.png)
3. 话题
![image](https://github.com/P-ppc/cnodejs/blob/master/imgPreview/topicInfo@2x.png)
4. 消息
![image](https://github.com/P-ppc/cnodejs/blob/master/imgPreview/message@2x.png)
5. 收藏
![image](https://github.com/P-ppc/cnodejs/blob/master/imgPreview/collection@2x.png)
6. 用户信息
![image](https://github.com/P-ppc/cnodejs/blob/master/imgPreview/userInfo@2x.png)
7. 创建话题
![image](https://github.com/P-ppc/cnodejs/blob/master/imgPreview/createTopic@2x.png)

###快速开始
 ```
    git clone git@github.com:P-ppc/cnodejs.git
    cd cnodejs
    npm install
    npm start
```

###如何安装
1. git clone git@github.com:P-ppc/cnodejs.git
2. cd cnodejs
3. npm install
4. 根据自己pc的系统运行编译命令, 对应如下:
    - mac: npm run build:mac
    - win64: npm run build:win64
    - win32: npm run build:win32
5. 安装dist目录下编译后的安装包即可

###主要功能
1. 利用accesstoken进行登录
2. 查看用户发表的话题
3. 收藏和回复
4. 查看自己的消息和收藏的话题
5. 查看自己和其他用户的一些基本信息
6. 发表话题

###未实现功能
1. 回复和发表话题时不能上传本地图片
2. 不能对用户的回复点赞
3. 不能编辑自己的信息

###备注
本项目使用比较基础的Jquery等技术, 比较适合前端入门同学进行学习。<br>
在使用中有任何Bug或者建议, 欢迎提交issue和pull request。

