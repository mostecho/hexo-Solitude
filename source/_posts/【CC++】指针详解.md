---
title: 【C/C++】指针详解
cover: https://bu.dusays.com/2025/09/16/68c8516846180.jpg
Sticky: 1
tags:
  - C++
  - C
  - 学习日记
  - 数据结构
categories:
  - C++
recommend: true
abbrlink:
date: 2025-09-27 0:58:52
---

# 前言

本文花费了大约一个星期的时间来准备，然后又花了将近一个星期的课余时间来编写，课太多了，有时候一整天都没多少时间写文章，这篇文章前后花的时间不同，对指针理解程度也是在逐步加深的情况下慢慢写出来的，所以你会发现这篇文章前后的风格有很多不同。这篇文章也是在查阅了很多资料后才写出的总结，对新手来说也是很友好的，但是还是建议要有一定的C/C++语言基础再来阅读。

特别是要**注意文章中使用的语言**，C语言和C++还是有区别的，本文是更偏向于使用C++语言的，因为大二课程都是用的C++，C用的很少。

本文使用的编译器为：

CLion 2025.2.2 内部版本号 #CL-252.26199.153，2025年9月18日 构建 （**Windows系统**）

 运行时版本: 21.0.8+1-b1038.71 amd64 (JCEF 122.1.9)  VM: OpenJDK 64-Bit Server VM，JetBrains s.r.o.  .NET Core v8.0.11 x64 (Server GC)

CLion 2025.2.2  Build #CL-252.26199.153, built on September 18, 2025  （**mac系统**）
Source revision: 81b8711b6961c

For non-commercial use only.
Runtime version: 21.0.8+9-b1038.71 aarch64 (JCEF 122.1.9)
VM: OpenJDK 64-Bit Server VM by JetBrains s.r.o.
Toolkit: sun.lwawt.macosx.LWCToolkit
macOS 15.7
.NET Core v8.0.11 ARM64 (Server GC)
GC: G1 Young Generation, G1 Concurrent GC, G1 Old Generation

本文在中的代码，在两种系统上都有运行，分别为windows和mac这两种系统，但是大多时间都是在windows上进行测试，进入文章编写最后关头才使用的mac系统测试，因为文章编写花费了太多的时间，所以后续也就没有对文章前面进行修改了，可怜可怜我吧，我快被这指针干掉了 {% spoiler 'blur' '所以让我偷偷懒吧' %} ，不过大家也应该能看懂，而且很多人用的系统也大多都是Windows。

# 指针变量

## 常见的基本数据类型

[C++ 数据类型 | 菜鸟教程](https://www.runoob.com/cplusplus/cpp-data-types.html)

**C++** 为程序员提供了种类丰富的内置数据类型和用户自定义的数据类型。下表列出了七种基本的 C++ 数据类型：

| 类型     | 关键字  |
| :------- | :------ |
| 布尔型   | bool    |
| 字符型   | char    |
| 整型     | int     |
| 浮点型   | float   |
| 双浮点型 | double  |
| 无类型   | void    |
| 宽字符型 | wchar_t |

有很多人可能没听说过wchar_t （我也没有听说过）

```cpp
typedef short int wchar_t; //占用2字节
```

所以 wchar_t 就相当于C语言里面的 short int

### 空指针

在学习指针时容易出现很多问题，就包括了指针赋值的事情，空指针是一个很好的解决办法。

在变量声明的时候，如果没有确切的地址可以赋值，为指针变量赋一个 NULL 值是一个良好的编程习惯。赋为 NULL 值的指针被称为**空**指针。NULL 指针是一个定义在标准库中的值为零的常量。

在C++11 新增了类型nullptr，关键字nullptr表示空指针字面量。它是一个类型为 [std::nullptr_t](https://cppreference.cn/w/cpp/types/nullptr_t) 的 [纯右值](https://cppreference.cn/w/cpp/language/value_category)。存在从 nullptr到任何指针类型和任何成员指针类型的空指针值的[隐式转换](https://cppreference.cn/w/cpp/language/implicit_conversion)。对于任何空指针常量也存在类似的转换，其中包括类型为 [std::nullptr_t](https://cppreference.cn/w/cpp/types/nullptr_t) 的值以及宏 [NULL](https://cppreference.cn/w/cpp/types/NULL)。

加入nullptr的原因：[c++中nullptr_c++ nullptr-CSDN博客](https://blog.csdn.net/hancoder/article/details/89814638)这篇文章有解释，我就不做过多解释了。

| nullptr（c++ 11新增） | 空指针常量         | int* ptr = nullptr;      |
| --------------------- | ------------------ | ------------------------ |
| null                  | 通常被定义为整数 0 | #define NULL ((void *)0) |



## 整型（int)

- int p  -- 这是一个普通整形变量，占用字节数为 4 bytes，保存的是整数

- int p[5]  -- 这是一个普通整形数组变量，占用字节数为 5×4=20 bytes，可以保存5个整数

- int *p -- 这是一个**整型指针**变量，p是指向整型的指针变量，占用字节数为 64 bit/8 = 8 bytes（64位系统），指针变量p保存的是**地址**，表示p所指向的地址里面存放的是一个int类型的值。

- int *p[5] -- 这是一个整型**指针数组**变量，p是指向整型指针的数组，占用字节数为5×8=40 bytes（64位系统），**数组**p保存的也是地址，它保存了5个指针变量为元素，其中每一个元素都是地址，所指向的地址里面存放的是一个int类型的值。（数组名p是**数组**首元素的地址，等于&p[0]和&p ，但是&p是指向**整个数组**指针的指针 int * ( * )[5]，&p[0] 的类型是指向指针的指针 int ** ，他们的地址值是相同的，但是类型不同）

- int (*p)[5] -- 这也是一个整型**指针变量**，p是一个指向整型数组的指针变量，占用字节数为8 bytes（64位系统），数组指针p保存的还是地址，但是p是一个指向包含5个整型的数组的**指针变量**，p保存的是整个数组的地址，而不是数组的首地址，虽然**数值上**，整个数组的地址和首元素地址是相同的，p++相当于位移了整个数组的字节大小。

  看下面的代码，更好理解：

```cpp
int a = 6;
int *p = &a;  //int* 指向int类型数据的地址，p是指针类型的变量名，用于存放指针类型的地址
int *q = p;  //p保存的就是地址，所以不用 &
int arr[3] = {10, 20, 30};  // 一个包含3个整型的数组
int *arr1[3] = {&arr[0], &arr[1]}; //这是一个指针数组，保存的元素都是地址，arr1[3]没有赋值
int (*t)[3] = &arr;  //t是指向整个arr数组的指针,[]里必须要有值，C/C++不允许将完整类型的指针赋值给不完整类型的指针

printf("%d ",a); cout << a <<" "<< a+1 <<endl;  //直接输出a的值
printf("%p ",&a); cout << &a <<" "<< &a+1 << endl;  //输出a的地址，a的地址位移一个int类型的地址（4字节）
printf("------------\n");
printf("%p ",p); cout << p << endl;  //输出指针变量p保存的地址，p保存的a的地址，所以p输出的是a的地址
printf("%p ",&p); cout << &p << endl;   //& 可以被称为取地址符，用于取出保存变量的值
printf("%d ",*p); cout << *p << endl;   //* 被称为解引用运算符，用于还原地址指向的值
printf("------------\n");
printf("%p ",q); cout << q << endl;  //输出q的地址，q保存的p的地址，p保存的又是a的地址，所以q输出的是a的地址
printf("%d ",*q); cout << *q << endl;  //解引用q，最后还原到a，最后输出a的值
printf("------------\n");
printf("%p ",arr); cout << arr <<" "<< &arr <<" "<< arr+1 <<" "<< &arr+1 << endl; //数组名是首元素的地址，&arr是取整个数组的地址，但是它的值和数组首元素地址相同，arr+1是相当于位移了一个int类型的地址（4字节），&arr+1是相当于位移了一整个int类型数组的大小地址（3×4=12字节）
printf("%d ",arr[0]); cout << arr[0] <<" "<< &arr[0] << endl;  //arr[0]是首元素，取出的地址和上面的arr数组名的地址一样
printf("------------\n");
printf("%p ",arr1); cout << arr1 <<" "<< &arr1 <<" "<< arr1+1 <<"  "<< &arr1+1 << endl;  //arr1是输出数组中首元素的地址，&arr1是取整个指针数组的地址，arr1+1是位移了一个指针变量的地址（8字节），&arr1+是位移一整个指针类型数组的地址（3×8 = 24字节）
printf("%p ",arr1[0]); cout << arr1[0] <<" "<< &arr1[0] << endl;  //arr1[0]是arr第一个元素的地址，&arr1[0]是指针数组arr1的首元素地址
printf("%p ",arr1[1]); cout << arr1[1] <<" "<< &arr1[1] << endl;  //arr1[1]是arr第二个元素的地址，&arr1[1]是指针数组arr1的第二个元素地址
printf("%p ",arr1[2]); cout << arr1[2] <<" "<< &arr1[2] << endl;  //编译器为了防止错误，默认是0，&arr1[1]是是指针数组arr1的第三个元素地址
printf("------------\n");
printf("%p ",t); cout << t <<" "<< &t << endl;  //指针t是指向整个int类型数组的地址，最后一个是指针变量t自己的地址
printf("%p ",t); cout << t[0] <<" "<< &t[0]<<endl; //因为t是指向数组的指针，t[0]相当于解引用操作，等于*t，得到的是这个数组本身，所以t[0]输出地址
printf("%p ",*t); cout << (*t)[0] <<" "<< (*t)[1] <<" " << *t[1] << endl; //(*t)解引用后得到数组本身,所以(*t)[0]输出整数，最后的是无效地址
    cout << sizeof((*t)[3]) << endl;  //计算的是arr[3]的大小，但是并没有arr[3]，sizeof是编译时运算符，不访问实际内存，所以并不会报错
    cout << sizeof((*t)[0]) << endl;  //计算的是arr[0]的大小
    cout << sizeof((*t)) << endl;  //（*t）相当于 指向数组的指针 int (*)[3]，计算的是arr整个数组的大小
    cout << sizeof(*t) << endl;    //(*t) = *t
    cout << sizeof(*t[0]) << endl; //t[0]等价于*(t+0)=*t=arr（整个数组），arr数组名就相当于数组首元素的指针，*t[0]就等于*arr[0]等于int类型的数值
    cout << sizeof(t) << endl;     //计算的是指针变量t的大小，指针变量大小受系统影响
```

输出结果：

```cpp
6 6 7
0000009f43fffdd8 0x9f43fffdd8 0x9f43fffddc
------------
0000009f43fffdd8 0x9f43fffdd8
0000009f43fffdd0 0x9f43fffdd0
6 6
------------
0000009f43fffdd8 0x9f43fffdd8
6 6
------------
0000009f43fffdc4 0x9f43fffdc4 0x9f43fffdc4 0x9f43fffdc8 0x9f43fffdd0
10 10 0x9f43fffdc4
------------
0000009f43fffda0 0x9f43fffda0 0x9f43fffda0 0x9f43fffda8  0x9f43fffdb8
0000009f43fffdc4 0x9f43fffdc4 0x9f43fffda0
0000009f43fffdc8 0x9f43fffdc8 0x9f43fffda8
0000000000000000 0 0x9f43fffdb0
------------
0000009f43fffdc4 0x9f43fffdc4 0x9f43fffd98
0000009f43fffdc4 0x9f43fffdc4 0x9f43fffdc4
0000009f43fffdc4 10 20 1140850136
4
4
12
12
4
8
```



## 字符型（char）

- char a;  -- 这是一个普通字符型变量，占用字节数为1 byte，用于存储单个字符。

- char a[5];  -- 这是一个字符数组，占用字节数为5×1= 5 bytes，用于存储字符串。

- char *a; -- 这是一个字符指针变量，占用字节数为8 bytes（64位系统），指针a保存的是地址，用于指向字符串或者动态内存分配。

- char *a[5];  -- 这是一个字符指针数组，占用字节数为5 × 8 = 40 bytes（64位系统），指针数组a保存的是地址，用于储存字符串数组。

- string s; -- 这是C++的string类，与C语言的string截然不同，详细见[C++ string标准库  | 菜鸟教程](https://www.runoob.com/cplusplus/cpp-libs-string.html)，这句的作用是声明字符串变量s，占用字节数为32 bytes，用于存储字符串。

看下面的代码，更好理解：

```cpp
string s = "Hello!World"; //使用的是C++标准库中的string类
char a = 's';  //定义一个字符变量a并赋值
char c[6]="hello"; //声明字符数组，为“\0”预留一个空间
char *d = &a;  //这是一个字符指针变量，指向字符变量a的地址
char *e = c;   //这是一个字符指针变量，指向字符数组c的地址
char *str[] = {&a,c};  //这是一个字符指针数组,里面的元素都是字符型元素的地址，相当于两个字符指针。
char (* str1)[6] = &c; //这是一个指向数组的字符型指针变量，占用8字节大小，[]里必须要有值，C/C++不允许将完整类型的指针赋值给不完整类型的指针
// str[0][0] = 's';    //修改字符数组c的第一个元素

printf("%s ",s.c_str());  cout << s << endl;  //c_str()是返回C风格的字符串（以null结尾)，如果不使用会输出乱码
printf("%p ",&s); cout << &s << endl;  //输出字符串变量s的地址
printf("sizeof(s)=%zu\n", sizeof(s));  //string 声明的变量占用32字节
printf("sizeof(string)=%zu\n", sizeof(string));  //string类占用32字节
printf("------------\n");
printf("%c ",a);  cout << a << endl;  //输出单个字符
printf("%p ",&a);  cout << (void*)&a << endl;  //我们想要输出a的地址，如果不加(void*)会导致乱码，下面有解释。
cout << sizeof(a) << endl;  //单个字符 1 字节
printf("------------\n");
printf("%p %p %s %s %c %p %c %p %s %p %p \n",
    c,     // %p - 数组名退化为指针char *，输出首元素地址
    &c,    // %p - 取整个字符数组的地址（与c值相同但类型不同）
    c,     // %s - 从c的首元素开始输出字符串直到遇到\0
    &c,    // %s - 将数组地址当作字符串起始地址(警告操作）
    c[0],  // %c - 输出字符数组的第一个元素
    &c[0], // %p - 取字符数组的首元素地址（与c相同）
    c[1],  // %c - 输出字符数组的第二个元素
    &c[1], // %p - 取字符数组第二个元素的地址
    &c[1], // %s - 从第二个元素开始输出，遇到\0结束
    c+1,   // %p - 相当于输出c[0+1]
    &c+1   // %p - 移动了一整个字符数组c的大小6字节
    );
cout << *&c <<" "<< c <<" "<< &c <<" "<< &c[0] <<" "<< &c[1] <<" "<< c[0] <<" "<< c[1] <<" "<< (void*)&c[0] <<" "<< static_cast<void *>(&c[1]) <<endl;
//*&c是取c的地址后再解引用，相当于输出整个数组。 c是输出整个数组。 &c取整个字符数组自己的地址。 &c[0]从首元素地址一直输出到\0， &c[1]从第二个元素地址一直输出到\0。 (void*)&c[0]输出首元素的地址，(void*)请看下面的解释。
cout << sizeof(c) << endl;
printf("------------\n");
printf("%p %p %p %p %p \n",
    d,     // %p - 输出指向的字符变量a的地址
    &d,    // %p - 输出字符指针变量d自己的地址
    d+1,   // %p - d指向的是a的地址，移动了一字节（char）
    d+2,   // %p - 移动了二字节
    &d+1   // %p - 移动了八字节，因为d是字符指针变量，指针变量（8字节）
    );
cout << *d <<" "<< &d <<" "<< (void*)d <<" "<< (void*)(d+1) << endl;
//*d 解引用输出字符变量a保存的值。 &d 输出字符指针变量d自己的地址。 (void*)d输出指向的字符变量a的地址。 (void*)(d+1)，d是指向a的地址，相当于&a+1，位移一字节大小。
cout << sizeof(d) << endl;
printf("------------\n");
printf("%p %p %s %s  %c %s %p %p %p %p \n",
    e,      // %p - 输出指向的字符数组c的首元素地址
    &e,     // %p - 输出字符指针变量e自己的地址
    e,      // %s - 输出指向的字符数组c中保存的字符串
    &e,     // %s - 这一句是有问题的，&e是取字符指针变量e自己的地址，然后输出字符串直到\0，但是他自己的地址并没有值，所以会乱码
    e[0],   // %c - 输出指向的字符数组c的第一个元素
    &e[0],  // %s - 从字符数组c的第一个元素开始输出，遇到\0结束
    &e[0],  // %p - 取指向的字符数组c的第一个元素的地址 与 字符指针变量e的值一样
    &e[1],  // %p - 取指向的字符数组c的第二个元素的地址
    e+1,    // %p - 相当于&e[1]，取指向的字符数组c的第二个元素的地址
    &e+1    // %p - 移动了八字节，因为e是字符指针变量，指针变量（8字节）
    );
cout << e <<" "<< *e <<" "<< &e <<" "<< e[0] <<" "<< &e[0] <<" "<< &e[1] <<" "<< (void*)&e[0] <<" "<< (void*)(e+1) << endl;
//e是输出指向的字符数组c的字符串。 *e是输出指向的字符数组c的首元素。 &e取字符指针变量e自己的地址。 e[0]是指向的字符数组c的第一个元素。 &e[0]从字符数组c第一个元素开始输出直到\0。 &e[1]从字符数组c第二个元素开始输出直到\0。 (void*)&e[0]是取字符数组c第一个元素的地址。 (void*)(e+1)是是取字符数组c第二元素的地址
cout << sizeof(e) << endl;
printf("------------\n");
printf("%p %p %p %p %s  %p %p %s %p %c %p %c %p %c \n",
str,        // %p - 指针数组str的起始地址（第一个元素的地址）
&str,       // %p - 指针数组str本身的地址（与str值相同但类型不同）
str+1,      // %p - 相当于str[0+1]的地址，位移了一个指针变量（指针数组元素）的大小8字节（指向指针数组的第二个元素）
&str+1,     // %p - &str相当于取数组自己的地址，&str+1就相当于位移了一整个指针数组的大小-16字节
str[0],     // %s - 这个输出是正确的，str[0]相当于第一个元素&a，但是因为字符变量a是单个字符，并没有\0终止符，所以会一直输出，在输出s后就会乱码，除非第二个元素紧跟第一个元素
str[0],     // %p - 输出指针数组首元素的地址，相当于字符a的地址（&a）
&str[0],    // %p - 指针数组第一个元素str[0]的地址
str[1],     // %s - str[1]是字符指针数组的第二个元素c，直接输出保存的字符串
str[1],     // %p - 字符数组c的首元素地址
str[1][0],  // %c - 输出字符数组c的第一个元素  h
&str[1],    // %p - 指针数组第二个元素str[1]的地址，相当于str+1
str[0][0],  // %c - 输出的是指针变量指向的第一个元素&a的第一个字符  s
&str[0][0], // %p - 输出的是指针变量指向的第一个元素&a的第一个字符的地址，相当于 &str[0]
str[0][1]   // %c - 访问a后面的内存,windows会输出乱码
);
cout << str[0][0] <<" "<< str <<" "<< &str <<" "<< str[0][1] <<" "<< str[1][1] <<" "<< &str[1] <<" "<< &str[1][0]<< endl;
//str[0]是&a（指向字符's'的指针）。 str是指针数组名，退化为指向首元素的地址。  &str是整个指针数组变量自己的地址，相当于指针数组首元素的地址（类型不同）。 str[0][1]是指针数组中第一个元素的第二个元素，但是并没有，所以输出了空格(windows)。 str[1][1]是指针数组中第二个元素的第二个元素。 &str[1]是指针数组中第二个元素的地址，而不是指向的第二个元素的地址，正好比首元素地址大8字节。 &str[1][0]直接输出整个字符串，而不是输出地址
printf("sizeof(str[0])=%zu\n", sizeof(str[0]));   //一个指针变量占用8字节
printf("sizeof(str)=%zu\n", sizeof(str));   //指针数组占用16字节，因为其中有两个指针变量
printf("------------\n");
printf("%p %p %s %s %p %p %p %p \n",
str1,       // %p - 输出str1指针的值，数组c首元素的地址
&str1,      // %p - 输出str1指针变量本身的地址
str1,       // %s - 类型不匹配但能工作：将数组指针当作字符串指针输出，直到遇到\0
str1[0],    // %s - str1[0]等价于*str1，相当于数组c本身，直接输出"hello"
str1[0],    // %p - 输出str1[0]的地址，字符数组c首元素的地址，与str1的值相同
str1[1],    // %p - 相当于*(str1+1),指向字符数组c之后（6个字节）的位置（跳过整个c数组）
str1+1,     // %p - 相当于str1[1]，指向的地址是位移了一整个字符数组（6字节）后的地址
&str1+1     // %p - 输出的地址是位移了一个指针变量（8字节）后的地址，&str1是取了指针变量自己的地址
);
cout << sizeof(str1) << endl; //指针变量占用8字节
```

输出结果（下面的仅供参考，下面的结果是在mac系统上运行出来的，与Windows系统上还是有很多不同的）：

```cpp
Hello!World Hello!World
0x16eeeb1b8 0x16eeeb1b8
sizeof(s)=24

sizeof(string)=24
------------

s s
0x16eeeb1b7 0x16eeeb1b7

1
------------

0x16eeeb1b0 0x16eeeb1b0 hello hello h 0x16eeeb1b0 e 0x16eeeb1b1 ello 0x16eeeb1b1 0x16eeeb1b6 
hello hello 0x16eeeb1b0 hello ello h e 0x16eeeb1b0 0x16eeeb1b1

6
------------

0x16eeeb1b7 0x16eeeb1a8 0x16eeeb1b8 0x16eeeb1b9 0x16eeeb1b0 
s 0x16eeeb1a8 0x16eeeb1b7 0x16eeeb1b8

8
------------

0x16eeeb1b0 0x16eeeb1a0 hello ���n  h hello 0x16eeeb1b0 0x16eeeb1b1 0x16eeeb1b1 0x16eeeb1a8 
hello h 0x16eeeb1a0 h hello ello 0x16eeeb1b0 0x16eeeb1b1

8
------------

0x16eeeb1d8 0x16eeeb1d8 0x16eeeb1e0 0x16eeeb1e8 sHello!World  0x16eeeb1b7 0x16eeeb1d8 hello 0x16eeeb1b0 h 0x16eeeb1e0 s 0x16eeeb1b7 H 
s 0x16eeeb1d8 0x16eeeb1d8 H e 0x16eeeb1e0 hello
sizeof(str[0])=8

sizeof(str)=16
------------

0x16eeeb1b0 0x16eeeb198 hello hello 0x16eeeb1b0 0x16eeeb1b6 0x16eeeb1b6 0x16eeeb1a0 
8
```



## 疑问解答

cout << &a 为什么乱码？
cout<<(void*)&a 为什么是正确的？

这是因为cout 对 char* 有特殊处理：
**cout 的设计逻辑：**

- 当遇到 char* 类型时，cout 认为这是一个**C风格字符串的起始地址**
- 它会从该地址开始，**连续输出字符，直到遇到 null 终止符 (\0)**
- 由于 &a 只是单个字符的地址，后面没有 \0，所以会继续输出后面的内存内容，这就导致了乱码。

解决办法：C 风格的强制转换类型为 void * 或者使用 C++强制类型转换运算符 static_cast <void *>，这两种效果都是一样的。



# 总结

注意事项

1.C/C++ 不允许将完整类型的指针赋值给不完整类型的指针

2.给变量赋值前，要弄清值的类型，防止类型不同而导致报错

3.数组在表达式中会自动退化为指针

4.cout遇到char* 类型时，会连续输出字符，直到遇到\0



参考引用：

- [C++ 数据类型 | 菜鸟教程](https://www.runoob.com/cplusplus/cpp-data-types.html)

- [C 指针详解 | 菜鸟教程](https://www.runoob.com/w3cnote/c-pointer-detail.html)

- [C++ Null 指针 | 菜鸟教程](https://www.runoob.com/cplusplus/cpp-null-pointers.html)

- [nullptr，空指针字面量 (C++11 起) - cppreference.cn - C++参考手册](https://cppreference.cn/w/cpp/language/nullptr)

- [c++中nullptr_c++ nullptr-CSDN博客](https://blog.csdn.net/hancoder/article/details/89814638)

- [C++ string标准库  | 菜鸟教程](https://www.runoob.com/cplusplus/cpp-libs-string.html)

- [C++强制类型转换运算符（static_cast、reinterpret_cast、const_cast和dynamic_cast） - C语言中文网](https://c.biancheng.net/view/410.html)

	最后感谢deepseek为我解答众多难题 [DeepSeek**探索未至之境**](https://chat.deepseek.com/)