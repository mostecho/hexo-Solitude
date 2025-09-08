---
title: 【C/C++】 size_t和ssize_t的数据类型
series: 
date: 2025-09-08 14:14:31
tags:
  - C++
  - C
  - C标准库
  - 学习日记
  categories:
  - C
---

## size_t

### size_t介绍

**size_t** 在C标准库[<stddef.h>](https://www.runoob.com/cprogramming/c-standard-library-stddef-h.html)和[<stdio.h>](https://www.runoob.com/cprogramming/c-standard-library-stdio-h.html)中都有定义，size_t 类型表示**C中任何对象所能达到的最大长度**，它是**无符号整数**，是**sizeof操作符**返回的结果类型。

它是为了方便系统之间的移植而定义的，不同的系统上，定义size_t 可能不一样。size_t在32位系统上定义为 unsigned int，也就是32位无符号整型。在64位系统上定义为 unsigned long ，也就是64位无符号整形。

size_t 在数组下标和内存管理函数之类的地方广泛使用。例如，size_t 用做sizeof **操作符**的返回值类型，同时也是很多函数的参数类型，包括[malloc()](https://www.runoob.com/cprogramming/c-function-malloc.html) 和[strlen()](https://www.runoob.com/cprogramming/c-function-strlen.html)。

打印size_t 类型的值时要小心。这是无符号值，如果选错格式说明符，可能会得到不可靠的结果。推荐的格式说明符是%zu。不过，某些情况下不能用这个说明符， 作为替代，可以考虑%u 或%lu。下面这个例子将一个变量定义为size_t，然后用两种不同的格式说明符来打印：

```cpp
size_t sizet = -5;

printf("%d\n",sizet);
printf("%zu\n",sizet);
```

因为size_t 本来是用于表示正整数的，如果用来表示负数就会出问题。如果为其赋一个负数，然后用%d 和%zu 格式说明符打印，就得到如下结果：

```text
-5
4294967291
```

%d 把size_t 当做有符号整数，它打印出-5 因为变量中存放的就是-5。%zu 把size_t 当做无符号整数。当-5 被解析为有符号数时，高位置为1，表示这个数是负数。当它被解析为无符号数时，高位的1 被当做2 的乘幂。所以在用%zu 格式说明符时才会看到那个大整数。

```cpp
sizet = 5;

printf("%d\n",sizet); // 显示5
printf("%zu\n",sizet); // 显示5
```

因为size_t 是无符号的，所以一定要给这种类型的变量赋正数 。

### size_t 和 int 比较

- size_t在32位架构中定义为：typedef  unsigned int size_t；

- size_t在64位架构中被定义为：typedef  unsigned long size_t；

- size_t是无符号的，并且是平台无关的，表示0-MAXINT的范围；int为是有符号的；

- int在不同架构上都是4字节，size_t在32位和64位架构上分别是4字节和8字节，在不同架构上进行编译时需要注意这个问题。

	

	### C语言编程需要注意的64位和32机器的区别

	|            | char      | short      | int        | long       | long long   | 指针   |
	| :--------- | --------- | ---------- | ---------- | ---------- | ----------- | ------ |
	| 16 位 平台 | 1Byte 8位 | 2Byte 16位 | 2Byte 16位 | 4Byte 32位 |             | 2 Byte |
	| 32 位 平台 | 1Byte 8位 | 2Byte 16位 | 4Byte 32位 | 4Byte 32位 | 8 Byte 64位 | 4 Byte |
	| 64 位 平台 | 1Byte     | 2Byte      | 4Byte      | 8Byte      | 8Byte       | 8Byte  |

### 为什么需要size_t

在标准C库中的许多函数使用的参数或者返回值都是表示的用字节表示的对象大小，比如malloc(n) 函数的参数n指明了需要申请的空间大小、memcpy(s1, s2, n)的最后一个参数表明需要复制的内存大小、strlen(s)函数的返回值表明了以’\0’结尾的字符串的长度（不包括’\0’）。

或许你会认为这些参数或者返回值应该被申明为int类型（或者long或者unsigned），但是事实上并不是。C标准中将他们定义为size_t。标准中记载malloc、memcpy和strlen的声明：

```cpp
//malloc()
void *malloc(size_t n);
//memcpy()
void *memcpy(void *s1, void const *s2, size_t n);
//strlen()
size_t strlen(char const *s);
```

size_t还经常出现在C++标准库中，此外C++库中经常会使用一个相似的类型size_type。

size_t是全局定义的类型；size_type是STL类中定义的类型属性，用以保存任意string和vector类对象的长度
string::size_type 制类型一般就是unsigned int, 但是不同机器环境长度可能不同 win32 和win64上长度差别；size_type一般也是unsigned int



## ssize_t

### ssize_t介绍

ssize_t 和size_t类似,但必需是**signed有符号**（表示 [signed](https://so.csdn.net/so/search?q=signed&spm=1001.2101.3001.7020) size_t类型）， 用来**表示可以被执行读写操作的数据块的大小**。

**ssize_t**是**有符号**整型，在32位机器上等同与int，在64位机器上等同与 long int.

## 使用ssize_t和size_t

它们分别是unsigned和signed size of computer word size。它们也是表示计算机的字长，在32位机器上是int型，在64位机器上long型。使用它们对于增加平台的通用性有很大好处，记得使用它们需要引用stddef.h头文件。





参考：
- https://blog.csdn.net/qq_34018840/article/details/100884317
- https://blog.csdn.net/fuxiaoxiaoyue/article/details/82747332



