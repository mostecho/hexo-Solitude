---
title: EasyX图形库游戏开发第二天
series: EasyX图形库游戏开发
cover: https://bu.dusays.com/2025/09/16/68c83fc27f316.png
tags:
  - C++
  - 游戏
  - EasyX
categories:
  - C++
abbrlink: b57a
date: 2025-04-27 23:08:33
---

# EasyX图形库游戏开发第二天

## 今日目标

昨天已经实现了图形主界面，今天要做的是鼠标检测功能和场景切换，让鼠标在点击图片后能触发开始或者退出



## 鼠标检测

首先要使用ExMessage先定义一个消息结构体



![微信图片_20250427173757.png](https://bu.dusays.com/2025/04/27/680dfafbca885.png)



这个结构体用于保存鼠标消息，定义如下（不用再定义）：

```cpp
struct ExMessage
{
	USHORT message;					// 消息标识
	union
	{
		// 鼠标消息的数据
		struct
		{
			bool ctrl		:1;		// Ctrl 键是否按下
			bool shift		:1;		// Shift 键是否按下
			bool lbutton	:1;		// 鼠标左键是否按下
			bool mbutton	:1;		// 鼠标中键是否按下
			bool rbutton	:1;		// 鼠标右键
			short x;				// 鼠标的 x 坐标
			short y;				// 鼠标的 y 坐标
			short wheel;			// 鼠标滚轮滚动值，为 120 的倍数
		};

		// 按键消息的数据
		struct
		{
			BYTE vkcode;			// 按键的虚拟键码
			BYTE scancode;			// 按键的扫描码（依赖于 OEM）
			bool extended	:1;		// 按键是否是扩展键
			bool prevdown	:1;		// 按键的前一个状态是否按下
		};

		// 字符消息的数据
		TCHAR ch;

		// 窗口消息的数据
		struct
		{
			WPARAM wParam;
			LPARAM lParam;
		};
	};
};
```



然后使用peekmessage获取鼠标消息并返回

![微信图片_20250427173642.png](https://bu.dusays.com/2025/04/27/680dfab1c7938.png)



```cpp
initgraph(WIDTH,HEIGTH);  //创建窗口 1280x720
startloadImg();           //加载主界面

while (true) {
    ExMessage msg={ 0 };   //定义消息结构体变量
    while (peekmessage(&msg,EX_MOUSE)){   //处理消息，不断地获取EX_MOUSE（鼠标消息）
    	startupScene(&msg);  //场景切换
    }
}
```



## 场景切换

需要先定义一个用于切换场景的函数，实现的功能是检测鼠标位置并对鼠标操作做出反馈

所以我先定义一个枚举类型[C enum(枚举) | 菜鸟教程](https://www.runoob.com/cprogramming/c-enum.html)

> 枚举是 C 语言中的一种基本数据类型，用于定义一组具有离散值的常量，它可以让数据更简洁，更易读。枚举类型通常用于为程序中的一组相关的常量取名字，以便于程序的可读性和维护性。

枚举类型是默认第一个枚举成员的默认值为整型的 0，后续枚举成员的值在前一个成员上加 1。

我们在这个实例中把第一个枚举成员的值定义为 1，第二个就为 2，以此类推。

```cpp
enum MenuOp
{
    Start=1,     //开始按钮，进入关卡。
    Quit,       //结束按钮，退出游戏。
    Home       //主界面
};
```

```cpp
initgraph(WIDTH,HEIGTH);  //创建窗口 1280x720
```



我们还需要准备一张图片用于场景切换后的新图片绘制，并在startloadImg()里加上一行

```cpp
loadimage(&gamebk, _T("image/gamebk.jpg"),1280,720); //后面的是用于图片拉伸覆盖整个窗口
```

下面这块代码是场景切换代码，里面的isInRect(msg,x,y,w,h)这个是用于下一步判断是否鼠标点击图片



```cpp
void startupScene(ExMessage *msg)
{
    //鼠标左边点击切换场景
    if (menuState==Home)
    {
        if(isInRect(msg,550,310,170,50)&&msg->message == WM_LBUTTONUP)  //根据物理窗口大小编写坐标
        {
            menuState=Start;  //开始游戏，绘制新图像
            putimage( 0,0,&gamebk);
        }
        else if (isInRect(msg,550,410,170,50)&&msg->message == WM_LBUTTONUP)
        {
            menuState=Quit; //退出游戏，关闭窗口
            exit(0);
        }
    }
}
```

![微信图片_20250426171624.png](https://bu.dusays.com/2025/04/26/680ca469010a2.png)



## 判断是否点击

我们需要判断鼠标是否在图片上并且点击图片，所以我们我们需要检测左键点击（按理来说应该检测左键是否松开，所以我写的是WM_LBUTTONUP，检测左键松开），我选择的是布尔类型bool，[C 语言的布尔类型(true 与 false) | 菜鸟教程](https://www.runoob.com/w3cnote/c-bool-true-false.html)

这样可以判断鼠标左键的松开是否在图片上，如果是true跳转下一个界面，如果是false就保持当前界面。

```cpp
bool isInRect(ExMessage *msg, int x, int y, int w, int h)
{
    if (msg->x>x&&msg->x<w+x&&msg->y>y&&msg->y<h+y)   //判断鼠标是否在图片上
        return true;
    else
        return false;
}
```













