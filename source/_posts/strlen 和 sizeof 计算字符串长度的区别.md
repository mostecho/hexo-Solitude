---
title: strlen 和 sizeof 计算字符串长度的区别
tags:
  - C++
  - C
  - C标准库
  - 学习日记
categories:
  - C
recommend: true
abbrlink: 4f10
date: 2025-09-08 15:00:05
series:
---

## 前言

首先，strlen() 是**函数**(C库函数 - strlen())，sizeof 是**运算操作符**，二者得到的结果类型为 size_t(64位系统上即 long unsigned int类型)。大部分编译程序在编译的时候就把 sizeof 计算过了，而 strlen 的结果要在运行的时候才能计算出来。

 

## 代码计算比较

对于以下语句：

```cpp
#include <stdio.h>
#include <string.h>
int main(){    
  char *str1 = "asdfgh";    
  char str2[] = "asdfgh";   
  char str3[8] = { 'a', 's', 'd' };    
  char str4[] = "as\0df";    
  printf("sizeof(str1)=%lu\n", sizeof(str1));    
  printf("strlen(str1)=%lu\n", strlen(str1));    
  printf("sizeof(str2)=%lu\n", sizeof(str2));    
  printf("strlen(str2)=%lu\n", strlen(str2));    
  printf("sizeof(str3)=%lu\n", sizeof(str3));    
  printf("strlen(str3)=%lu\n", strlen(str3));    
  printf("sizeof(str4)=%lu\n", sizeof(str4));    
  printf("strlen(str4)=%lu\n", strlen(str4));    
  return 0;
  }
```

执行结果是(注意，结果与操作系统位数有关，下面以ubuntu 64位为例)：

```cpp
sizeof(str1)=8
strlen(str1)=6

sizeof(str2)=7
strlen(str2)=6

sizeof(str3)=8
strlen(str3)=3

sizeof(str4)=6
strlen(str4)=2
```

str1 是字符指针变量，sizeof 获得的是该指针所占的地址空间，64 位[操作系统](http://lib.csdn.net/base/operatingsystem)对应 8 字节，所以结果是 8（32 位[操作系统](http://lib.csdn.net/base/operatingsystem)对应 4 字节，所以结果是 4）；strlen 返回的是该字符串的长度，遇到’\0’结束，’\0’本身不计算在内，故结果是 6。

str2 是字符数组，大小由字符串常量”asdfgh” 确定，sizeof 获得该数组所占内存空间大小，包括字符串结尾的’\0’，所以结果为 7；strlen 同理返回 6。

str3 也是字符数组，但大小确定为 8，故 sizeof 得到的结果是 8；strlen 统计’\0’之前所有字符的个数，即为 3；

str4 是常量字符数组，sizeof 得到字符总数即 6；strlen 计算至’\0’结束，因此返回 2；

## 总结:

sizeof 计算的是变量的大小，不受字符’\0’影响。
strlen 计算的是字符串的实际长度，以’\0’作为长度判定依据，遇到’\0’就停止，长度不包括’\0’。



原文链接:

- https://geekdaxue.co/read/ixxw@cpp/strlen_sizeof