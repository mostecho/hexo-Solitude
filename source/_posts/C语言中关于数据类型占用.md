---
title: C语言中关于数据类型占用
tags:
  - C++
  - C
categories:
  - C++
  - C
abbrlink: 6ea2
date: 2025-05-07 23:17:50
---

# bit、byte、KB、B、字节、位、字符之间关系详解

1. bit就是**位**，也叫**比特位**，是计算机表示数据最小的单位

2. byte就是**字节**     1byte=8bit

3. 1byte就是1B
4. 一个**字符**=2**字节**

5. 1KB=1024B
6. **字节**就是Byte，也是B
7. **位**就是bit也是b
8. 转换关系如下：1KB=1024B       1B=8b

## 字符与字节

ASCII码：一个英文字母（不分大小写）占一个**字节**的空间。一个二进制数字序列，在计算机中作为一个数字单元，一般为8位二进制数（二级制数即计算机中的0或1）。换算为十进制 ，最小值-128，最大值127。如一个ASCII码就是一个**字节**

UTF-8编码：一个英文**字符**等于一个**字节**，一个中文（含繁体）等于三个**字节**。中文标点占三个**字节**，英文标点占一个**字节**

Unicode编码：一个英文**字符**等于两个**字节**，一个中文（含繁体）等于两个**字节**。中文标点占两个**字节**，英文标点占两个**字节**

B与bit
数据存储是以**字节**（Byte）为单位，数据传输大多是以**位**（bit，又名“比特”）为单位，一个位就代表一个0或1（即二进制），每8个**位**（bit，简写为b）组成一个**字节**（Byte，简写为B），是最小一级的信息单位。

## B与iB

1KiB（Kibibyte）=1024byte

1KB（Kilobyte）=1000byte

1MiB（Mebibyte）=1048576byte

1MB（Megabyte）=1000000byte

硬盘生产商是以GB（十进制，即10的3次方=1000，如1MB=1000KB）计算的，而电脑（操作系统）是以GiB（2进制，即2的10次方， 如1MiB=1024KiB）计算的，但是国内用户一般理解为1MiB=1M=1024 KB, 所以为了便于中文化的理解，翻译MiB为MB也是可以的。同样根据硬盘厂商与用户对于1MB大小的不同理解，所以好多160G的硬盘实际容量按计算机实际的1MiB=1024KB算都不到160G，这也可以解释为什么新买的硬盘“缺斤短两”并没有它所标示的那么大。

# C 语言---sizeof的用法总结

[C语言基础——sizeof的用法总结-CSDN博客](https://blog.csdn.net/u013812502/article/details/81198452)

sizeof是C语言中保留关键字，也可以认为是一种**运算符**，单目运算符。常见的使用方式：

```c
int a=10;
int arr=[1,2,3];
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
	printf("a=%d,b=%d,c=%d,d=%d,e=%d,f=%d,arr=%d,str=%d point_p=%d,point_i=%d\n",
		sizeof(a), sizeof(b), sizeof(c), sizeof(d), sizeof(e), sizeof(f),
		sizeof(arr), sizeof(str), sizeof(p), sizeof(i));

	system("pause");

}
```

**输出的结果是:a=4,b=1,c=2,d=4,e=4,f=8,arr=12,str=6 point_p=4,point_i=4**

看了这些结果，应该也能逆推出来sizeof的含义了吧。

sizeof实际上是获取了数据在内存中所占用的存储空间，以字节为单位来计数。

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
- **问题**：`sizeof(arr)` 返回数组的总字节数（例如，3个int元素的数组在32/64位系统中通常占12字节），而不是元素个数。
- **结果**：循环次数为数组的总字节数（如12次），导致访问 `arr[0]` 到 `arr[11]`（严重越界），引发未定义行为（可能输出垃圾值或崩溃）。

**2. 第二个代码段：**

```c
for(int i=0; i<(sizeof(arr)/sizeof(int)); i++)
```
- **修正**：`sizeof(arr)/sizeof(int)` 计算实际元素个数（总字节数 ÷ 单个元素字节数）。
- **结果**：循环次数为3次（正确遍历 `arr[0]`、`arr[1]`、`arr[2]`），安全输出 `1,2,3`。

**关键区别**：

- 第一个循环错误地用**字节数**作为循环次数，导致越界。
- 第二个循环用**元素个数**作为循环次数，正确遍历。

**总结**：遍历数组时，应用 `sizeof(arr)/sizeof(arr[0])` 动态计算元素数量，避免硬编码和越界问题。



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



# C 语言关于sizeof() 和 strlen()区别

[C 语言关于sizeof() 和 strlen()区别 | 菜鸟教程](https://www.runoob.com/w3cnote/c-sizeof-strlen.html)

sizeof() 和 strlen() 在 C 语言中两个非常常用，它们都与计算内存大小有关，但是它们的作用是不同的。

sizeof() 和 strlen() 的主要区别在于：

- `sizeof()` 是一个运算符，而 `strlen()` 是一个函数。
- `sizeof()` 计算的是变量或类型所占用的内存字节数，而 `strlen()` 计算的是字符串中字符的个数。
- `sizeof()` 可以用于任何类型的数据，而 `strlen()` 只能用于以空字符 '\0' 结尾的字符串。
- sizeof() 计算字符串的长度，包含末尾的 '\0'，strlen() 计算字符串的长度，不包含字符串末尾的 '\0'。

sizeof() 函数是一个**运算符**而不是函数，用于计算一个类型或变量所占用的内存字节数。可以用它来获取任何类型的数据的字节数，包括基本数据类型、数组、结构体、共用体等等。

### sizeof()

sizeof() 的使用方法如下：

```
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
char s[] = "Hello, world!";
sizeof(s) *// 输出 14，即字符串 s 中有 14 个字符（包括结尾的空字符 '\0'）
```



### strlen()

strlen() 函数用于计算一个字符串的长度，即它所包含的字符个数（不包括字符串结尾的空字符 '\0'）。

需要注意的是，strlen() 函数只能用于计算以空字符 '\0' 结尾的字符串的长度，如果字符串中没有空字符，则 strlen() 函数的行为是未定义的。

strlen() 的使用方法如下：

```
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
  printf("s = %s**\n**", s);
  printf("sizeof(s) = %d**\n**", sizeof(s));
  printf("strlen(s) = %d**\n**", strlen(s));
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



# C语言各种基本数据类型字节大小和取值范围

[C语言各种基本数据类型字节大小和取值范围](https://config.net.cn/tools/basic-data-types-and-value-ranges-of-c.html)

[C 数据类型 | 菜鸟教程](https://www.runoob.com/cprogramming/c-data-types.html)

- C语言中各种数据类型的字节占用和取值范围主要与所用的编译器(16位编译器，32位编译器等)和数据类型的定义规则有关，当然也会受到目标平台的字长(计算机进行整数运算所能处理的二进制数据的位数)的影响
- 如何知道当前编译环境下c语言中的基本数据类型的占用字节大小呢？ 举例：sizeof(int)即可获取int类型的字节占用大小
- 如何知道当前编译环境下c语言中的基本数据的取值范围呢？ 基于极限值符号（极限值符号在limits.h头文件中有定义)获得,CHAR_MIN, CHAR_MAX代表char的min和max值

## 基本数据类型

**1.1.有符号整数类型(signed)**

|          类型名称          | 占用字节数(bytes) |                         取值范围                          |
| :------------------------: | :---------------: | :-------------------------------------------------------: |
|        signed char         |         1         |                  -2^7(-128) ~ 2^7-1(127)                  |
|     short int 或 short     |         2         |              -2^15(-32 768) ~ 2^15-1(32 767)              |
|            int             |         4         |       -2^31(-2 147 483 648) ~ 2^31-1(2 147 483 647)       |
|      long int 或 long      |         4         |       -2^31(-2 147 483 648) ~ 2^31-1(2 147 483 647)       |
| long long int 或 long long |         8         | -2^63(-9.2233720368548e+18) ~ 2^63-1(9.2233720368548e+18) |

**1.2.无符号整数类型(unsigned)**

|                   类型名称                   | 占用字节数(bytes) |            取值范围            |
| :------------------------------------------: | :---------------: | :----------------------------: |
|                unsigned char                 |         1         |         0 ~ 2^8-1(255)         |
|     unsigned short int 或 unsigned short     |         2         |       0 ~ 2^16-1(65 535)       |
|                 unsigned int                 |         4         |   0 ~ 2^32-1(4 294 967 295)    |
|      unsigned long int 或 unsigned long      |         4         |   0 ~ 2^32-1(4 294 967 295)    |
| unsigned long long int 或 unsigned long long |         8         | 0 ~ 2^64-1(1.844674407371e+19) |

**2.1.浮点类型**

|  类型名称   | 占用字节数(bytes) |            取值范围            |
| :---------: | :---------------: | :----------------------------: |
|    float    |         4         |   -/+3.4e38（精确到6位小数）   |
|   double    |         8         |  -/+1.7e308（精确到15位小数）  |
| long double |        12         | -/+1.19e4932（精确到18位小数） |

**3.1.表示有符号整数类型的极限值符号**

| 类型名称  | 下限(min) | 上限(max) |
| :-------: | :-------: | :-------: |
|   char    | CHAR_MIN  | CHAR_MAX  |
|   short   | SHRT_MIN  | SHRT_MAX  |
|    int    |  INT_MIN  |  INT_MAX  |
|   long    | LONG_MIN  | LONG_MAX  |
| long long | LLONG_MIN | LLONG_MAX |

**3.2.表示无符号整数类型的极限值符号**

|      类型名称      | 下限(min) | 上限(max)  |
| :----------------: | :-------: | :--------: |
|   unsigned char    |     0     | UCHAR_MAX  |
|   unsigned short   |     0     | USHRT_MAX  |
|    unsigned int    |     0     |  UINT_MAX  |
|   unsigned long    |     0     | ULONG_MAX  |
| unsigned long long |     0     | ULLONG_MAX |

**3.3.表示浮点类型的极限值符号**

|  类型名称   | 下限(min) | 上限(max) |
| :---------: | :-------: | :-------: |
|    float    |  FLT_MIN  |  FLT_MAX  |
|   double    |  DBL_MIN  |  DBL_MAX  |
| long double | LDBL_MIN  | LDBL_MAX  |

1byte（字节）=8bit（比特）

则int类型的占用4bytes（字节）=32bits（比特）

**0**0000000 00000000 00000000 00000000  

第一bit 0用于表示符号（正负），剩下的31bit用于决定数字，int类型的取值范围就为 -2^31(-2 147 483 648) ~ 2^31-1(2 147 483 647)

那么为什么后面是2 147 483 647而不是2 147 483 648，因为还有一个0，-2 147 483 648 ~ 0 ~ 2 147 483 647

## 其他数据类型

### 枚举类型



[C语言enum占几个字节？它在底层是哪种整数类型？ - C语言中文网](https://c.biancheng.net/view/kblsiom.html)

[C语言枚举类型占几个字节？（非常详细） - C语言中文网](https://c.biancheng.net/view/3tt1i73.html)

[C enum(枚举) | 菜鸟教程](https://www.runoob.com/cprogramming/c-enum.html)

在C语言中，enum（枚举类型）是一种用户自定义的数据类型，它允许程序员为一组相关的常量赋予有意义的名称。enum 的本质是一种整形常量，它的大小和底层表示方式可能会因编译器和目标平台的不同而有所差异。


enum 的内存占用通常取决于编译器如何选择存储枚举值，大多数现代编译器会选择能够容纳枚举中最大值的最小整数类型。这意味着 enum 的大小可能是 1、2、4 或 8 字节，具体取决于枚举值的范围和编译器的实现。


为了更好地理解这一点，我们来看一个具体的例子：

```c
enum Color {
    RED,
    GREEN,
    BLUE
};

enum LargeEnum {
    ZERO,
    ONE,
    TWO,
    VERY_LARGE = 1000000
};

int main() {
    printf("Size of enum Color: %zu bytes\n", sizeof(enum Color));
    printf("Size of enum LargeEnum: %zu bytes\n", sizeof(enum LargeEnum));
    return 0;
}
```

在大多数 32 位或 64 位系统上，这段代码的输出可能是：

```c
Size of enum Color: 4 bytes
Size of enum LargeEnum: 4 bytes
```

在这个例子中，enum Color 只包含小的正整数值（0、1、2），而 enum LargeEnum 包含一个较大的值（1000000）。尽管如此，它们在大多数系统上都占用 4 字节，因为编译器通常会选择 int 作为默认的底层类型。


然而，需要注意的是，C 标准并没有严格规定 enum 的大小，一些编译器可能会根据枚举值的范围选择更小的类型。例如，如果所有枚举值都小于 256，编译器可能会使用 unsigned char 作为底层类型，从而使 enum 只占用 1 字节。**但一般来说在C 语言中，枚举类型是被当做 int 或者 unsigned int 类型来处理的。**


关于 enum 的底层整数类型，C 标准规定它必须是某种带符号或无符号的整数类型。在大多数实现中，默认情况下会使用 int 类型。但是，如果枚举值超出了 int 的范围，编译器可能会选择更大的类型，如 long 或 long long。


为了确保跨平台的一致性，C99 标准引入了固定大小的整数类型，如 int32_t 或 uint32_t。一些编译器可能会使用这些类型作为 enum 的底层表示，以提供更可预测的行为。


值得一提的是，[C++](https://c.biancheng.net/cplus/) 对 enum 的处理方式略有不同。C++11 引入了“枚举类”（enum class），它允许程序员明确指定底层类型：

```c
enum class Color : uint8_t {
    RED,
    GREEN,
    BLUE
};
```

在这个 C++ 的例子中，我们明确指定 Color 枚举使用 uint8_t 作为底层类型，因此它将始终占用 1 字节。


对于C语言开发者来说，了解 enum 的内存占用和底层表示很重要，特别是在进行底层系统编程、嵌入式开发或需要精确控制内存布局的场景中。如果你需要确保 enum 使用特定大小的整数类型，可以考虑使用类型定义（typedef）结合固定大小的整数类型来模拟枚举：

```c
#include <stdint.h>

typedef enum {
    RED,
    GREEN,
    BLUE
} Color;

typedef uint8_t ColorType;

#define COLOR_RED   ((ColorType)0)
#define COLOR_GREEN ((ColorType)1)
#define COLOR_BLUE  ((ColorType)2)
```

[C语言数据类型及typedef下的uint8_t / uint32_t_typedef uint8-CSDN博客](https://blog.csdn.net/m0_64770246/article/details/124209343)

ColorType被显式定义为 `uint8_t`（1字节无符号整数），确保固定内存占用

这种方法可以让你更精确地控制枚举值的大小和类型，但代价是失去了一些 enum 提供的类型安全性和可读性。


总之，enum 在C语言中的大小和底层类型可能会因编译器和平台而异。大多数情况下，它会被实现为 int 类型并占用 4 字节，但这并不是绝对的。在编写跨平台或对内存布局敏感的代码时，建议使用 sizeof 运算符来确定实际大小，并考虑使用固定大小的整数类型来获得更可预测的行为。
