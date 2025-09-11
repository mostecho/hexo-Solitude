---
title: 【C/C++】C++中的string、char、char*和char**区别与联系
tags:
  - C++
  - C
  - C标准库
  - 学习日记
categories:
  - C++
recommend: true
abbrlink: 6aff
date: 2025-09-11 16:03:31
series:
---

## 前言

本篇文章对指针等基础知识要求较高，请确保有基础后再观看更佳，因为博主自己也不是很懂，所以文章可能存在问题，可以在评论区于博主进行探讨。

## C++中两种风格的字符串：

- C-风格字符串

- C++引入的string类

### C-风格字符串

C-风格字符串起源于 C 语言，并在 C++ 中继续得到支持。C-风格字符串实际上是使用 null 字符 ‘\0’ 终止的一维字符数组。下面是C-风格字符串的两种写法：

```C
char a[6] = {'H', 'e', 'l', 'l', 'o', '\0'};
char a[] = "Hello";
```

这两种写法是等价的，若使用第二种写法，C++ 编译器在初始化数组时会自动把 ‘\0’ 放在字符串的末尾。

### C++中的string类

C++ 标准库提供了 string 类类型，定义字符串的方法如下：

```cpp
string a = "Hello";
```

string类有很多功能，这里就不详细叙述了。

## char系列

char、char*和char**都是C语言中用于处理字符数据的类型，它们的含义和用法有所不同。

### char

char是C语言中表示字符的类型，它占用1个字节（8位），可以存储ASCII码表中的任意一个字符。char类型变量通常用于存储单个字符或者字符串中的一个字符。例如：

```cpp
char c = 'a';   // 存储单个字符
char str[] = "hello world";  // 存储字符串
```

### char*
char*是C语言中表示指向字符的指针类型，它用于存储指向字符串或字符数组的指针。例如：

```cpp
char* str = "hello world";   // 存储指向字符串的指针
char arr[] = {'a', 'b', 'c'};   
char* ptr = arr;   // 存储指向字符数组的指针
```

在这个例子中，ptr指向字符数组arr的第一个元素，可以通过迭代指针来访问数组中的每个字符。

### char**

char**是C语言中表示指向指向字符的指针的指针类型，也称为二级指针。它通常用于动态创建指针数组或者字符串数组。例如：

```cpp
char** strArr = (char**)malloc(3 * sizeof(char*));  // 动态创建指针数组
strArr[0] = "hello";
strArr[1] = "world";
strArr[2] = "!";
```

在这个例子中，strArr是一个指向指向字符的指针数组，它有3个元素，每个元素都指向一个字符串常量。

### 之间的联系

`char*` 和 `char**` 都是指针类型，它们可以用于动态分配内存和创建指针数组。`char*` 和 `char**` 都可以用于表示字符串，但是`char*` 只能表示一个字符串，而 `char**` 可以表示多个字符串。

### 区别
char是一个基本数据类型，`char*`是指向字符的指针，`char**`是指向指向字符的指针的指针，它们在语义上是不同的。`char*`可以用于表示单个字符串，而`char**`用于表示多个字符串。另外，`char*`可以用于指向字符串常量或者字符数组，而`char**`只能指向指针数组。



## C++在定义字符串时，可能会出现以下几种形式：

- string
- char[]
- const char[]
- char*
- const char*
- char**
- char *const
- const char *const

有很多很多，我都搞不清楚了（指针、引用、const)

我们先来说一说string容易搞错的地方，然后再详细叙述其他的。

### string

[C++ 标准库  | 菜鸟教程](https://www.runoob.com/cplusplus/cpp-libs-string.html)

string是一个C++类库中的一个类，其本质是字符数组（char类型的数组）。它包含了对字符串的各种常用操作，它较char*的优势是内容可以动态拓展，以及对字符串操作的方便快捷，用 “+” 号进行字符串的连接是最常用的操作。有下面一段代码：

```cpp
string a = "hello";
cout << &a << endl;
cout << &a[0] << endl;
cout << *&a[0] << endl;
```
输出结果是：
```cpp
001DFCA8
hello
h
```

这里或许就有疑问了，a[0] 表示 a 的第一个字符，对第一个字符取地址，为什么得到的不是首字符，而是整个字符串呢？

这是因为：==&a[0] 是 char* 类型， cout 会把 char* 当做C-风格字符串处理一直输出直到"\0"，而对 &a[0] 解引用 *&a[0] 得到的才是首字符==。

### char[]、const char[]、char*、const char*

在讲它们之前，先看下面这道很经典的题：

```cpp
char str1[] = "abc";
char str2[] = "abc";
const char str3[] = "abc";
const char str4[] = "abc";
const char *str5 = "abc";
const char *str6 = "abc";
char *str7 = "abc";
char *str8 = "abc";
cout << (str1 == str2) << endl; 
cout << (str3 == str4) << endl;
cout << (str5 == str6) << endl;
cout << (str7 == str8) << endl;
```


要解决这道题，首先要清楚定义字符串时，数据是如何分布的：

`char str1[] = “abc”`
这里的 “abc” 是一个常量，首先会在常量存储区里存储 “abc” 这个常量；
然后，因为 “abc” 被赋值给str1[]，所以在栈中开辟一段内存，内存大小为4个节点（char数组后会自动加一个’\0’），因此又有一个"abc"被保存在栈中。
同理，str2[]中的"abc"也是保存在栈中，地址不同。

到此，有三个"abc"被保存起来，一个在常量存储区，另外两个在栈中。

`const char str3[] = “abc”`
对于这种被 const 修饰起来的变量，一般也是被保存在常量存储区，但是，但是对于const 数组来讲，系统不确定符号表是否有足够的空间来存放 const 数组，所以还是为const 数组分配内存的。因此，str3指向的是栈上的"abc"。

同理，str4[] 也是保存在栈中，地址不同。

`const char *str5 = “abc”`
因为"abc"在常量存储区中保存有一份（即使没保存，这样的操作也会新建一份），这里 str5 定义的时候，就可以开心的直接指向 “abc” 所在的常量区的地址。

同理str6，str7 和 str8 与 const 没有任何关系，const 只是使得 str5 和 str6 无法指向新的字符串常量（也就是新的地址）。

搞清楚以上这些，答案也就不言而喻了：

```text
0
0
1
1
```

#### 数组名char[] 和 数组指针char *

关于数组名和数组指针，我相信很多人都会有疑问，数组名究竟是不是指针？如果不是为什么它表现的行为又和指针那么像呢？现在就来一一解答。
总的来说，char[]与char*与许多相同点，char[] 代表字符数组，可以对应一个字符串，例如：

```cpp
char *a="string1";
char b[]="string2";
```

指针和数组存在着一些本质的区别。当然，在某种情况下，比如数组作为函数的参数进行传递时，由于该数组自动退化为同类型的指针，所以在函数内部，作 为函数参数传递进来的指针与数组 确实具有一定的一致性，但这只是一种比较特殊的情况而已，在本质上，两者是有区别的。

**下面来看看详细的介绍。**

`char *a = "hello" `中的a是指向第一个字符‘h'的一个指针

`char a[20] = "hello" `中数组名a也是指向数组第一个字符‘h'的指针

但二者并不相同

**看实例：把两个字符串相加**

[C 库函数 – strcat() | 菜鸟教程](https://www.runoob.com/cprogramming/c-function-strcat.html)

```c
#define _CRT_SECURE_NO_WARNINGS

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() 
{
	char* d = "0123456789";
	char s[20] = "hello";

	strcat(s, d);
	printf("%s\n", s);

	system("pause");
	return 0;
}
```

运行结果为：

```text
hello123456789
```

反过来

```c
#define _CRT_SECURE_NO_WARNINGS

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main()
{
	char* d = "0123456789";
	char s[20] = "hello";

	strcat(d, s);  //将s和d互换位置
	printf("%s\n", s);

	system("pause");
	return 0;
}
```

运行结果为：

```text
segmentation fault
```

==把字符串加到指针所指的字串上去，出现段错误，本质原因：char\* d="0123456789"存放在常量区，是无法修改的。而数组是存放在栈中，是可以修改的。==

##### 数组名和数组指针的显著不同点：

- 数组名 b 可以看作指针常量（只能看作，并不是指针常量，具体代表什么后面会说），对应着数组的首地址，其值不能改变；b 对应的内存区域总是可写。

- 数组指针 a 是变量，值可以改变；a 指向的区域有时可写，有时只读。
  

比如：

```cpp
char *a="string1"; //编译器会报警告
char b[]="string2";
gets(a); //试图将读入的字符串保存到a指向的区域，运行崩溃！ 
gets(b) //正确
```


解释：a指向的是一个字符串常量，即指向的内存区域只读，一旦尝试通过a改变字符串常量的值就会使程序崩溃！ 因此，char * a=“string1”; 这句代码虽然不是错的，但是编译器会报警告，规范的写法是在前面加上 const；b始终指向他所代表的数组（保存在栈区）在内存中的位置，始终可写。

但是如果加上一句代码 a=b; 结果又是如何呢？

```cpp
char * a="string1";
char b[]="string2";
a=b; //a,b指向同一个区域
gets(a); //正确
printf("%s",b); //会出现gets(a)时输入的结果
```


解释：a的值变成了是字符数组首地址，即&b[0]，根据之前的叙述我们可以知道，字符数组b被保存在栈区，该区域可读可写，因此 gets(a) 不会再报错。

##### 数组名和数组指针的其它不同点

##### **1、声明不同**

**1.1 声明一个char\*字符串**

你可以这样：直接赋值

```cpp
char* str = "test"; //str是一个指针，存放在栈区，"test"是一个常量，存放在常量区，VS2017要求这句声明前面必须加上const，因为它所指向的常量字符串是不可更改的
//或者这样
char* str2 = {"test2"};
```

还可以这样：动态内存申请malloc()

```cpp
char* str = (char*)malloc(10 * sizeof(char));
strcpy(str, "qwewqe");　　//对其进行赋值
printf("%s\n", str);
free(str);
str = NULL;
```

还可以这样：动态内存申请new

```cpp
char* str =new char[20] { 'a' };  //直接将字符串内所有的元素都设为字符 'a'
delete str;
str = nullptr;
```

 

**1.2 声明一个char []字符串**

你可以这样：

```cpp
char cat[4] = { 'T', 'O', 'M', '\0' }; //如果最后一个字符不是 '\0' ，那么cat就只是一个字符数组，而不是字符串了
//或者这样
char str[5] = {"123"};
```

还可以这样：

```cpp
char cat[4] = "cat";　　//注意字符数是3，而cat的大小是4
```

或者这样：

```cpp
char cat[] = "cat";　　//让编译器自动判断大小
有以下代码：
```

##### **2、概念不同**

c语言中没有特定的字符串类型，常用以下两种方式定义字符串：1）字符数组；2）指向字符串的指针。

- char *str声明的是一个指针，这个指针可以指向任何字符串常量。
- char str[]声明的是一个字符数组，数组的内容可以是任何内容，严格意义上说，末尾加上'\0'之后才能算是字符串。

 

##### **3、变量不同**

- char *str的str是指针变量，str的值未初始化（局部变量的话，全局则自动初始化为NULL）
- char str[]的str是地址常量，str的值是str[]的地址

 

##### **4、内存的分配方式不同**

内存分配可分为三种：静态存储区、栈区、堆区

- 1、静态存储区：该内存在程序编译的时候就已经分配好，这块内存在程序的整个运行期间都存在，它主要存放静态数据、全局数据和常量。
- 2、栈区：它的用途是完成函数的调用。在执行函数时，函数内局部变量及函数参数的存储单元在栈上创建，函数调用结束时这些存储单元自动被释放。
- 3、堆区：程序在运行时使用库函数为变量申请内存，在变量使用结束后再调用库函数释放内存。动态内存的生存期是由我们决定的，如果我们不释放内存，就会导致内存泄露。

**char []定义的是字符串数组，该字符数组保存在全局数据区或栈区，因此数组的内容是可以改变的：**

```cpp
char str[6] = {"hello"}; //虽然只初始化了5个元素，但由于编译器会自动在末尾加'\0'，所以size为6
str[0] = 'H'; //合法
```

**char \*定义的是字符串指针变量，该指针变量指向一个字符串，该指针的值是该字符串在内存中的地址，所以可以修改指针的值，但不能修改指针指向的值：**

```cpp
char *str = {"hello"};
str[0] = 'H'; //非法
```

**把字符串 h 改成 H，出现段错误，本质原因：\*str="hello"存放在常量区，是无法修改的。而数组是存放在栈中，是可以修改的。**

 

##### 5、char *作为函数返回值时

指针作为返回值时会出现：在函数返回后，指针指向的内存单元被释放了，这样就会导致指针成了野指针。

```cpp
//这样会报错，因为str数组元素为局部变量，存储在栈内，函数结束后，内容失效
char* func(char* name)
{
    char str[5];
    strcpy(str,name);
    return str;
}
```

 

错误分析：

str为地址，返回值为char*,是进行了值传递，没有问题，但是，数组中的元素为局部变量，存储在栈中，函数外无效。

解决方法1：将数组定义为static

```cpp
char* func(char *name)
{
   static char str[5];
   strcpy(str,name);
   return str;
}
```

解决方法2：字符串为静态常量（存储在常量区）

```cpp
char* func()
{
    char *str= "hello";
    //char str[]= "hello";
    return str;
}
```

解决方法3：设置为动态数组

```cpp
char* func(char* name)
{
    char *str= (char*)malloc(5*sizeof(char));
    strcpy(str,name);
    return str;
}
```

解决方法4：设置为全局变量

```cpp
char str[10];
char* func(char* name)
{
    strcpy(str,name);
    return str;
}
```

 

小结：通过以上方法，返回字符串，只要返回字符串首地址即可。

1）调用函数时，若直接输出的话，用一个字符指针接受即可：`char *result = func();`

2）调用函数时，若要获取返回的字符串：`char result[5]; strcpy(result, func());`

 

 

##### **6、char\*可以直接赋值原因**

今天看到了gets()与puts()函数，发现了一个奇怪的点：字符串可以直接赋值给字符指针变量。例如以下：

```c
char * p="hello";
puts(p);    //输出结果为hello
```


学过指针让我清楚明白了指针变量是不能直接赋值的，而这里的字符指针却直接被赋值字符串。这让我深感疑惑了，经过查阅，才知道：

char * p="hello"; 双引号在这里做了这三件事情：

- 1. 申请了空间(在常量区)，存放了字符串
- 2. 在字符串尾加上了'/0'   
- 3. 返回该字符串的首地址

先来看puts()这个函数 

函数原型

```c
int puts(const char *string);
```

参数

输入：字符串指针

输入可以是字符串数组，也可以是字符串常量，例如：

```c
char a[15]="1234";    //字符串数组
char * p="hello";     //字符串常量
p=a;    //将a的首地址赋值给p，p指向了a字符串数组
puts(p);    //输出结果为1234
```

 

puts()函数的输入是一个字符串指针。当使用一个字符串数组名作为输入时，数组名此时表示一个指向数组的指针值，这符合puts()的输入要求，并能够正确输出。但是，当输入为一个字符串常量时，函数仍然能够正常的输出字符串。 
理由如下： 

如上所述，双引号的加入，返回了字符串常量的地址值，即指针，这样才能够满足puts()函数对输入参数的要求，而这个指针应该指向了字符串常量实际所在的地址。 
程序运行时，双引号分配了常量区空间，字符串常量将占用内存空间，这样才能保证puts()函数能通过指针找到要输出的数据。 既然字符串常量占用内存，那么应该就能够通过得到它的地址并输出。
另外看一下下面的这组区别，char a[10] = “hello”; 这是数组的初始化，和a[0] = ‘h’ a[1] = ‘e’…是一个道理，但是换成char a [10]，然后a = “hello”就不行了 “hello”赋值的值是一个地址，而a虽然也有地址，但是这与指针是不一样的，指针的值是地址，而数组的值虽然也是地址，但是却是一个地址常量，所以不能给常量赋值。所以，可以把字符串赋值给指向字符指针变量p，而不能把字符串赋值给一个字符数组

##### 7、计算字符串长度

```cpp
#include <iostream>
using namespace std;

int main()
{
    //使用sizeof统计字符串长度
    char cat[] = {"abc123"};
    int len = sizeof(cat) / sizeof(cat[0]);
    printf("cat = %s len = %d\n", cat, len);

    //使用strlen统计字符串长度
    const char* str = {"abc123"};
    int len2 = strlen(str) + 1;
    printf("str = %s len2 = %d\n", str, len2);

    return 0;
}
```

[] 内如果要限定大小，只能用const size_type，包括字面值。

运行结果：

```cpp
cat = abc123 len = 7
str = abc123 len2 = 7
```

 **数组名指代一种数据结构**：**数组**

```cpp
char str[10];
cout << sizeof(str);
```

打印结果为整个数组的大小10，这是因为数组名 str 的内涵为一种数据结构，即一个长度为 10 的 char 型数组，所以 sizeof(str) 的结果为这个数据结构占据的内存大小：10字节。

cout 打印字符数组名会得到整个字符串（仅字符数组）：

```cpp
char str[] = "I Love U";
int intArray[5] = {1,2,3,4,5};
cout << str << endl;
cout << intArray << endl;  //数组名就是指针常量
```
下面是结果：
```cpp
I Love U
0x7ec2fc616c50
```

这是因为， cout 对于 char[] 有重载，这是一个特例，只有**字符串数组**才会输出整个数组，如果是 **int** 或**其它类型**的**数组**，只会输出数组的首地址。

（2） 数组名作为函数形参时，在函数体内，其失去了本身的内涵，仅仅只是一个指针。在失去其内涵的同时，它还失去了其常量特性，可以作自增、自减等操作，可以被修改。

举个例子：

```cpp
void fun1 ( char *p1,  char p2[]){
 	printf("%s %d %d\n",p1,p1,&p1);
 	printf("%s %d %d\n",p2,p2,&p2);
	p2="asdf"; //通过! 说明p2不是常量！ 
	printf("%s %d %d\n",p2,p2,&p2);
}

void main(）{
	char a[]="Hello";
	fun1(a,a);
}
```

因此，在作为函数的形参时，char [] 被当做 char * 来处理，两种写法是完全等效的。




参考：

- [char、char*和char**区别与联系(入门级)-CSDN博客](https://blog.csdn.net/qq_50635297/article/details/129217630)
- [C++中的string与char[]、char*详解_c++中char数组和string的关系-CSDN博客](https://blog.csdn.net/m0_37433111/article/details/107347101)
- 
