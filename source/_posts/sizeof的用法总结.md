---
title: sizeof的用法总结
tags:
  - C++
  - C
  - C标准库
  - 学习日记
  - 数据结构
categories:
  - C
recommend: true
date: 2025-09-10 21:00:05
series:
---

# C 语言---sizeof的用法总结

[C语言基础——sizeof的用法总结-CSDN博客](https://blog.csdn.net/u013812502/article/details/81198452)

sizeof是C语言中保留关键字，也可以认为是一种**运算符**，单目运算符。常见的使用方式：

```c
int a=10;
int arr={1,2,3};
char str[]="hello";
int len_a = sizeof(a);
int len_arr = sizeof(arr);
int len_str = sizeof(str)

printf("len_a=%d,len_arr=%d,len_str=%d\n",len_a,len_arr,len_str)
```

看了上面的代码，一般会认为结果是：len_a=1，len_arr=3，len_str=5

实际上的结果是：len_a=4，len_arr=12，len_str=6

sizeof还可以这么用：

```c
printf("len_int=%d,len_short=%d,len_double=%d", sizeof(int), sizeof(short), sizeof(double));
```

获取某个数据类型所占用空间的**字节**数。

再来看另外一段代码：

```c
#include<stdio.h>

void main(){
    int a = 10;
	char b = 'b';
	short c = 2;
	long d = 9;
	float e = 6.29f;
	double f = 95.0629;
	int arr[] = { 1,2,3 };
	char str[] = "hello";
	double *p=&f;
	int *i=&a;
	//分别对各个变量使用sizeof运算
	printf("a=%d,b=%d,c=%d,d=%d,e=%d,f=%d,arr=%d,str=%d,point_p=%d,point_i=%d\n",
		sizeof(a), sizeof(b), sizeof(c), sizeof(d), sizeof(e), sizeof(f),
		sizeof(arr), sizeof(str), sizeof(p), sizeof(i));

	system("pause");

}
```

**输出的结果是: a=4, b=1,c =2, d=4, e=4, f=8, arr=12, str=6，point_p=4, point_i=4**

看了这些结果，应该也能逆推出来sizeof的含义了吧。

sizeof实际上是获取了数据在内存中所占用的**存储空间**，以**字节**为单位来计数。

C语言会自动在在双引号" "括起来的内容的末尾补上"\0"代表结束，ASCII中的0号位也占用一个字符。

[ASCII码对照表，ASCII码一览表（非常详细） - C语言中文网](https://c.biancheng.net/c/ascii/)


```c
int arr[]={1,2,3};
for(int i=0;i<sizeof(arr);i++){
    printf("%d,",arr[i]);
}
```

除了会输出1，2，3以外，还会输出杂乱无章的数字，但一共是输出12个。
因为数组的内存是动态分配的，到了元素3以后的元素都是新分配的，并不一定是空。
因为数组是一片连续的空间，有可能元素3的空间是有数据的，那么C语言会将其读取出来，
当然是一些没有实际意义的杂乱无章的数字，但你不要想着去操作，否则可能导致数据错乱
所以有可能你运行好几次，后面的值都不会有变化。

改成下面的就没问题了。

```c
int arr[]={1,2,3};
for(int i=0;i<(sizeof(arr)/sizeof(int));i++){
    printf("%d,",arr[i]);
}
```

这两段代码的主要区别在于循环条件，导致遍历数组时的行为不同：

**1. 第一个代码段：**

```c
for(int i=0; i<sizeof(arr); i++)
```

- **问题**：sizeof(arr) 返回数组的总字节数（例如，3个int元素的数组在32/64位系统中通常占12字节），而不是元素个数。
- **结果**：循环次数为数组的总字节数（如12次），导致访问 arr[0] 到 arr[11]（严重越界），引发未定义行为（可能输出垃圾值或崩溃）。

**2. 第二个代码段：**

```c
for(int i=0; i<(sizeof(arr)/sizeof(int)); i++)
```

- **修正**：sizeof(arr)/sizeof(int) 计算实际元素个数（总字节数 ÷ 单个元素字节数）。
- **结果**：循环次数为3次（正确遍历 arr[0]、arr[1]、arr[2]），安全输出 1,2,3。

**关键区别**：

- 第一个循环错误地用**字节数**作为循环次数，导致越界。
- 第二个循环用**元素个数**作为循环次数，正确遍历。

**总结**：遍历数组时，应用 sizeof(arr)/sizeof(arr[0]) 动态计算元素数量，避免硬编码和越界问题。



C/C++中，sizeof()只是**运算符号**，是编译的时候确定大小的。动态分配是运行过程中得到大小的，也就是说C++中new出来的内存，sizeof都无法统计的，退一步说，即使是new出来的空间也有可能失败，所以sizeof无法统计动态分配的内存大小。

例如：

```c
//使用new关键字，在堆区开辟一个int数组
int* arr = new int[5]{1,2,3,4,5}; 
//并不是计算数组arr所占用的内存空间大小，而是计算指针所占内存大小，32位系统指针占4字节，64位系统指针占8字节
cout << sizeof(arr) << endl;
//解指针，因为arr指针指向的时数组的首元素，所以实际计算的是int类型的数据所占用内存空间，int类型占4字节
cout << sizeof(*arr) << endl;
```

参考：

- [C语言基础——sizeof的用法总结-CSDN博客](https://blog.csdn.net/u013812502/article/details/81198452)
- [ASCII码对照表，ASCII码一览表（非常详细） - C语言中文网](https://c.biancheng.net/c/ascii/)
