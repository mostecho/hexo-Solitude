---
title: EasyX图形库游戏开发第三天
series: EasyX图形库游戏开发
date: 2025-04-28 17:41:26
tags:
    - C++
    - 游戏
    - EasyX
categories:
    - C++
    - 游戏
---

# EasyX图形库游戏开发第三天

## 今日目标

昨天已经实现了鼠标检测功能和场景切换，今天要做的是控制移动和边界限制，最后为了方便管理我与同学上的代码的不同情况，我决定为项目建立一个git仓库方便管理，虽然clion的code with me功能也很好用，但是我和我同学的课程不同，所以code with me 功能并不能满足我们的要求，git就成了我们的选择，这样谁都可以对代码进行更新。

我找了一些素材，下面这些就是我游戏中用到的图片

游戏背景
![gamebk.jpg](https://bu.dusays.com/2025/04/28/680f5563265ac.jpg)


地面背景
![dimian.jpg](https://bu.dusays.com/2025/04/28/680f55631f344.jpg)


退出按钮
![quit.jpg](https://bu.dusays.com/2025/04/28/680f556325baf.jpg)


开始按钮
![start.jpg](https://bu.dusays.com/2025/04/28/680f556327058.jpg)


主菜单背景
![background.png](https://bu.dusays.com/2025/04/25/680b5e97f02f0.png)



## 游戏场景布置

这是上文中图片我的加载代码

```cpp
loadimage(&bk, _T("image/background.png"),WIDTH,HEIGTH);  //背景
loadimage(&start, _T("image/start.jpg"));  //开始游戏
loadimage(&quit, _T("image/quit.jpg"));  //退出游戏
loadimage(&gamebk, _T("image/gamebk.jpg"),1280,720);
loadimage(&dimian, _T("image/dimian.jpg"));
```

我定义了一个putgamebk函数用来生成游戏场景，因为图片是三块砖，所以我选择了循环for绘制，将地面铺了出来





```cpp
void putgamebk()
{
    cleardevice();
    putimage(0,0,&gamebk);  //游戏背景  
    for (int i=0;i<20;i++)  //铺设地面砖块，右边的在窗口外面用于后面的场景
    {
        for (int j=0;j<5;j++)  //5层高的地面
        {
            putimage(i*120,(10+j)*48, &dimian);
        }
    }
}
```



![界面.png](https://bu.dusays.com/2025/04/28/680f577c885cd.png)



## 游戏角色控制和边界判断

目前先用一个小球代替，接下来要实现的是控制小球移动

首先在头文件game.h中定义一个枚举类型用于实现移动逻辑

[C enum(枚举) | 菜鸟教程](https://www.runoob.com/cprogramming/c-enum.html)

```cpp
enum DIR  //枚举类型
{
    UP,
    DOWN,
    LEFT,
    RIGHT,
    ZERO
};                                                                                         
```

我们还需要定义一个人物坐标，我选择POINT结构体  ~~有现成的我直接使用~~

[C语言 POINT结构体 / 点类型_c语言point-CSDN博客](https://blog.csdn.net/qq_45735810/article/details/114905780)

Windows API 中的 POINT 结构体，在windef.h中，定义如下：

```cpp
typedef struct tagPOINT {
    LONG x;  // 横坐标
    LONG y;  // 纵坐标
} POINT;
```

我定义了一个playerPos用来记录初始位置

```cpp
POINT playerPos={30,450};  //初始小球的圆心
```


下面是角色移动代码实现

```cpp
void palyGame()
{
    int kx=0,ky=0;  //初始
    int sheep=10; //每次位移的距离
    DIR currentDir =ZERO;  //初始化
    if ((GetAsyncKeyState('W') || GetAsyncKeyState('w'))
        && currentDir != 's')
    {
        currentDir = UP;
    }
    else if ((GetAsyncKeyState('S') || GetAsyncKeyState('s'))
        && currentDir != 'w')
    {
        currentDir = DOWN;
    }
    else if ((GetAsyncKeyState('A') || GetAsyncKeyState('a'))
        && currentDir != 'd')
    {
        currentDir = LEFT;
    }
    else if ((GetAsyncKeyState('D') || GetAsyncKeyState('d'))
        && currentDir !='a')
    {
        currentDir = RIGHT;
    }

    switch (currentDir)
    {
        case UP:ky = -1;
            break;
        case DOWN:ky = 1;
            break;
        case LEFT:kx = -1;
            break;
        case RIGHT:kx = 1;
            break;
        default:
            break;
    }
    if (playerPos.y+sheep*ky<=450&&playerPos.x+sheep*kx>20)  //边界判断，左边界和地面边界
    {
        playerPos.x+=sheep*kx;  //人物移动
        playerPos.y+=sheep*ky;
    }
}
```

## 主程序部分

BeginBatchDraw()的作用[EasyX 文档 - BeginBatchDraw](https://docs.easyx.cn/zh-cn/BeginBatchDraw)

EndBatchDraw()的作用[EasyX 文档 - EndBatchDraw](https://docs.easyx.cn/zh-cn/EndBatchDraw)

solidcircle(playerPos.x,playerPos.y,30)的作用[EasyX 文档 - solidcircle](https://docs.easyx.cn/zh-cn/solidcircle)

Sleep(50)的作用[【C语言】Sleep()函数----详解_sleep函数-CSDN博客](https://blog.csdn.net/2201_75743654/article/details/131784102)

**如果不加最上面两句会使得小球之前移动的位置还留着一个小球**







```cpp
int main()
{
    initgraph(WIDTH,HEIGTH);  //创建窗口 1280x720
    startloadImg();                       //加载主界面

    while (true) {
        ExMessage msg={0};  //处理消息，不断地获取鼠标消息。
        while (peekmessage(&msg,EX_MOUSE))
        {
            BeginBatchDraw();     //批量绘图，减少绘图闪烁现象
            startupScene(&msg);   //场景切换
            EndBatchDraw();      //用于结束批量绘制，并执行未完成的绘制任务
            if (menuState == Start)  
            {
                while (menuState == Start)
                {
                    BeginBatchDraw();
                    putgamebk(); 
                    setfillcolor(WHITE);  //设置线条颜色
                    solidcircle(playerPos.x,playerPos.y,30);  //绘制小球
                    EndBatchDraw();
                    palyGame();  //人物控制
                    Sleep(50);  //控制延时0.05s
                }
            }
        }
    }
}
```



## git仓库配置（额外教程）



[Git 详细安装教程（详解 Git 安装过程的每一个步骤）git安装-CSDN博客](https://blog.csdn.net/mukes/article/details/115693833)

[Git 分支交互式学习](https://learngitbranching.js.org/)（通过可视化练习掌握分支操作）

[Git 官方文档](https://git-scm.com/doc)

[Git - 安装 Git](https://git-scm.com/book/zh/v2/起步-安装-Git)（windows安装）



## 一、Git 基础概念与安装配置

### 1. Git 是什么？

Git 是一款**分布式版本控制系统**，由 Linus Torvalds 为管理 Linux 内核开发而设计。与传统的集中式版本控制系统（如 SVN）不同，Git 允许每个开发者拥有完整的代码仓库副本，支持离线操作和高性能分支管理

### 2. 安装与基础配置

- **安装**：从 [Git 官网](https://git-scm.com/) 下载对应系统的安装包，按默认选项完成安装

- **配置用户信息**：

  ```bash
  git config --global user.name "你的名字"
  git config --global user.email "你的邮箱"
  ```

  此配置会应用到本机的所有仓库59。

### 3. 仓库初始化

- 创建本地仓库：

  ```bash
  git init
  ```

  初始化后，目录下会生成隐藏的 `.git` 文件夹，包含版本库的所有信息



## 二、核心操作：提交、分支与版本控制

### 1. 提交代码的三步曲

1. **添加文件到暂存区**：

   ```bash
   git add <文件名>  # 添加单个文件
   git add .        # 添加所有修改
   ```

2. 提交到本地仓库

   ```bash
   git commit -m "提交说明"
   ```

3. **推送到远程仓库**：

   ```bash
   git push origin <分支名>
   ```

**注意**：

- **提交注释规范**：建议首行用简短动词（如 `Fix: 修复登录问题`），第二行空行后补充细节
- **避免提交垃圾文件**：通过 `.gitignore` 忽略临时文件、编译产物等（如 `.idea/`、`node_modules/`）



### 2. 分支管理

- **创建与切换分支**：

  ```bash
  git branch <分支名>    # 创建分支
  git checkout <分支名>  # 切换分支
  git checkout -b <分支名> # 创建并切换
  ```

- **合并分支**：

  ```bash
  git merge <分支名>     # 将指定分支合并到当前分支
  ```

  **冲突解决**：手动编辑冲突文件后，执行 `git add` 和 `git commit` 完成合并



### 3. 版本回退与撤销

- **查看历史版本**：

  ```bash
  git log          # 完整日志
  git log --oneline # 简洁日志
  ```

- **回退到指定版本**：

  ```bash
  git reset --hard <commit-id>
  ```

  若丢失版本号，可用 `git reflog` 查看操作历史。

- **撤销工作区修改**：

  ```bash
  git checkout -- <文件名>  # 撤销未暂存的修改
  git reset HEAD <文件名>    # 撤销暂存区的修改
  ```



## 三、高频问题与解决方案

### 1. 推送代码失败

- **认证失败**：

  - **HTTPS 方式**：改用 SSH 密钥认证（生成密钥：`ssh-keygen -t ed25519`，并添加到远程平台如 GitHub
  - **权限不足**：检查远程仓库的权限设置，或取消分支保护

- **冲突提示**：

  ```bash
  git pull  # 拉取远程代码
  # 解决冲突后重新提交
  git add . && git commit -m "解决冲突"
  git push
  ```

### 2. 误提交文件到远程仓库

- **删除远程文件但保留本地**：

  ```bash
  git rm --cached <文件名>  # 从版本库移除
  git commit -m "移除文件"
  git push
  ```

  同时更新 `.gitignore` 避免再次提交



### 3. 代码开发中途切换任务

- **暂存当前修改**：

  ```bash
  git stash save -u "任务描述"  # 保存未提交的修改
  git stash list               # 查看暂存列表
  git stash pop                # 恢复最近一次暂存
  ```

  此方法适用于需要临时处理其他任务时保留当前进度。



## 四、进阶技巧与最佳实践

### 1. 使用 SSH 替代 HTTPS

- **生成密钥**：

  ```bash
  ssh-keygen -t ed25519 -C "your_email@example.com"
  ```

- **配置远程仓库**：将公钥（`~/.ssh/id_ed25519.pub`）添加到 GitHub/Gitee 的 SSH 设置中，提升安全性与便捷性

### 2. 子模块管理

- **添加子模块**：

  ```bash
  git submodule add <仓库URL> <路径>
  ```

- **更新子模块**：

  ```bash
  git submodule update --remote
  ```

  适用于依赖第三方库的场景。



最还是选择SSH，前段时间github屏蔽了国内用户，只有SSH能用，所以也用得惯，不过SSH确实比HTTPS上传成功率大得多，虽然对新手来说确实很麻，但是教程也有不少，新手小白可以自行百度搜索

[配置SSH连接Git教程 - Only(AR) - 博客园](https://www.cnblogs.com/OnlyAR/p/16155406.html)

[github配置SSH-Key保姆级教程 - 知乎](https://zhuanlan.zhihu.com/p/688103044)

[ssh密钥进行github身份验证，ssh公私密钥使用详解，github密钥配置与使用，git密钥使用详解，git入门教程_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1dV411G77N/?spm_id_from=333.337.search-card.all.click&vd_source=0745e8ffb440abc06104e505e82972f5)



## 我的配置经过

我的配置过程充满坎坷，clion还是太难操作了，而且因为网络问题（后面才知道的），一直上传不了，我就只好选择了vscode上传，经过百度查询，我才明白了是网络的问题，但是我还遇到了分支合并的问题（我只有一个主分支main），我的仓库半个月前就创建了，现在才启用，配置也是很麻烦，下次还是直接新建仓库再clone下来用，这样就会少很多麻烦。

[ 深入理解与解决Git中的“fatal: refusing to merge unrelated hi ](https://segmentfault.com/a/1190000044807470) **分支合并**



