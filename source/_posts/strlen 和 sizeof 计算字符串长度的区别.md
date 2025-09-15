---
title: strlen 和 sizeof 计算字符串长度的区别
tags:
  - C++
  - C
  - C标准库
  - 学习日记
  - 数据结构
categories:
  - C
recommend: true
abbrlink: 4f10
date: 2025-09-08 15:00:05
series:
---

## 前言

首先，strlen() 是**函数**(C库函数 - strlen()来自于C 标准库 - <string.h>)，sizeof 是**运算操作符**，二者得到的结果类型为 size_t(64位系统上即 long unsigned int类型)。大部分编译程序在编译的时候就把 sizeof 计算过了，而 strlen 的结果要在运行的时候才能计算出来。

## C 语言关于sizeof() 和 strlen()区别

[C 语言关于sizeof() 和 strlen()区别 | 菜鸟教程](https://www.runoob.com/w3cnote/c-sizeof-strlen.html)

sizeof() 和 strlen() 的主要区别在于：

- sizeof() 是一个运算符，而 strlen() 是一个函数。
- sizeof() 计算的是变量或类型所占用的内存字节数，而 strlen() 计算的是字符串中字符的个数。
- sizeof() 可以用于任何类型的数据，而 strlen() 只能用于以空字符 '\0' 结尾的字符串。
- sizeof() 计算字符串的长度，包含末尾的 '\0'，strlen() 计算字符串的长度，不包含字符串末尾的 '\0'。

sizeof() 函数是一个**运算符**而不是函数，用于计算一个类型或变量所占用的内存字节数。可以用它来获取任何类型的数据的字节数，包括基本数据类型、数组、结构体、共用体等等。

### sizeof()

sizeof() 的使用方法如下：

```c
sizeof(type)
sizeof(variable)
```

参数说明：

- type 是一个类型名
- variable 是一个变量名

```c
sizeof(int) *// 输出 4，即整型变量占用 4 个字节
int x;
sizeof(x) *// 输出 4，即整型变量 x 占用 4 个字节
```

sizeof()  计算字符串的长度，包含末尾的 '\0'

```c
char s[] = "Hello,world!";
sizeof(s) *// 输出 13，即字符串 s 中有 13 个字符（包括结尾的空字符 '\0'）
```

### strlen()

strlen() 函数用于计算一个字符串的长度，即它所包含的字符个数（不包括字符串结尾的空字符 '\0'）。

需要注意的是，strlen() 函数只能用于计算以空字符 '\0' 结尾的字符串的长度，如果字符串中没有空字符，则 strlen() 函数的行为是未定义的。

strlen() 的使用方法如下：

```c
strlen(string)
```

其中 string 是一个以空字符 '\0' 结尾的字符串，但是计算字符串的长度，不包含末尾的 '\0'。例如：

```c
char s[] = "Hello, world!";
strlen(s) *// 输出 13，即字符串 s 中有 13 个字符（不包括结尾的空字符 '\0'）
```

### 实例

以下是关于 sizeof() 和 strlen() 区别的完整实例：

```c
#include<stdio.h>
#include<stdlib.h>
#include<string.h>

void msg()
{
  char s[] = "Hello, world!";
  printf("s = %s\n", s);
  printf("sizeof(s) = %d\n", sizeof(s));
  printf("strlen(s) = %d\n", strlen(s));
}

int main(int argc, char* argv[], char* envp[])
{
  msg();
  return 0;
}
```

输出结果为：

```c
s = Hello, world!
sizeof(s) = 14
strlen(s) = 13
```



### 代码计算比较

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

str1 是**字符指针变量**，sizeof 获得的是该指针所占的地址空间，64 位操作系统对应 8 字节，所以结果是 8（32 位操作系统对应 4 字节，所以结果是 4）；strlen 返回的是该字符串的长度，遇到’\0’结束，’\0’本身不计算在内，故结果是 6。

str2 是字符数组，大小由字符串常量”asdfgh” 确定，sizeof 获得该数组所占内存空间大小，包括字符串结尾的’\0’，所以结果为 7；strlen 同理返回 6。

str3 也是字符数组，但大小确定为 8，故 sizeof 得到的结果是 8；strlen 统计’\0’之前所有字符的个数，即为 3；

str4 是常量字符数组，sizeof 得到字符总数即 6；strlen 计算至’\0’结束，因此返回 2；

### 总结:

sizeof 计算的是变量的大小，不受字符’\0’影响。
strlen 计算的是字符串的实际长度，以’\0’作为长度判定依据，遇到’\0’就停止，长度不包括’\0’。



参考：

- https://geekdaxue.co/read/ixxw@cpp/strlen_sizeof
- https://www.runoob.com/w3cnote/c-sizeof-strlen.html