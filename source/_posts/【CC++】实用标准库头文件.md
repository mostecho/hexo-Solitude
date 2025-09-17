---
title: 【C/C++】实用标准库头文件
cover: https://bu.dusays.com/2025/09/16/68c8516846180.jpg
tags:
  - C++
  - C
  - C++标准库
  - 学习日记
  - 数据结构
categories:
  - C++
recommend: true
abbrlink: 7bed
date: 2025-09-15 14:20:05
---

## 前言

我们在写程序时，可能会遇到很多的麻烦问题，这个时候可以通过引用一些已经写好的头文件来帮助我们更快的解决问题，减少我们的需要编写的代码。

下面的一些头文件，是我经常使用和觉得有用的，你们也可以在评论区打出你们经常使用的。

不过请注意辨别，到底是在C语言中使用还是在C++中使用。

## C++ vector 容器

[C++ vector 容器 | 菜鸟教程](https://www.runoob.com/cplusplus/cpp-vector.html)

C++ 中的 vector 是一种序列容器，它允许你在运行时动态地插入和删除元素。

vector 是基于数组的数据结构，但它可以自动管理内存，这意味着你不需要手动分配和释放内存。

与 C++ 数组相比，vector 具有更多的灵活性和功能，使其成为 C++ 中常用的数据结构之一。

vector 是 C++ 标准模板库（STL）的一部分，提供了灵活的接口和高效的操作。

**基本特性:**

- **动态大小**：`vector` 的大小可以根据需要自动增长和缩小。
- **连续存储**：`vector` 中的元素在内存中是连续存储的，这使得访问元素非常快速。
- **可迭代**：`vector` 可以被[迭代](https://c.biancheng.net/view/6675.html)，你可以使用循环（如 `for` 循环）来访问它的元素。
- **元素类型**：`vector` 可以存储任何类型的元素，包括内置类型、对象、指针等。

**使用场景：**

- 当你需要一个可以动态增长和缩小的数组时。
- 当你需要频繁地在序列的末尾添加或移除元素时。
- 当你需要一个可以高效随机访问元素的容器时。 

`<vector>` 库提供了许多函数，允许您对向量（vector）执行各种操作。

以下表格列出了常用的向量函数。

[C++ vector 库](https://www.w3school.com.cn/cpp/cpp_ref_vector.asp)

| 函数                                                         | 描述                                                     |
| :----------------------------------------------------------- | :------------------------------------------------------- |
| [assign()](https://www.w3school.com.cn/cpp/ref_vector_assign.asp) | 用多个值填充向量。                                       |
| [at()](https://www.w3school.com.cn/cpp/ref_vector_at.asp)    | 返回向量中指定索引位置的元素。                           |
| [back()](https://www.w3school.com.cn/cpp/ref_vector_back.asp) | 返回向量的最后一个元素。                                 |
| [begin()](https://www.w3school.com.cn/cpp/ref_vector_begin.asp) | 返回一个指向向量开头的迭代器。                           |
| capacity()                                                   | 返回向量预留内存能够存储的元素数量。                     |
| [clear()](https://www.w3school.com.cn/cpp/ref_vector_clear.asp) | 移除向量中的所有内容。                                   |
| [data()](https://www.w3school.com.cn/cpp/ref_vector_data.asp) | 返回指向存储向量元素的内存块的指针。                     |
| [empty()](https://www.w3school.com.cn/cpp/ref_vector_empty.asp) | 检查向量是否为空。                                       |
| [end()](https://www.w3school.com.cn/cpp/ref_vector_end.asp)  | 返回指向向量末尾的迭代器。                               |
| [erase()](https://www.w3school.com.cn/cpp/ref_vector_erase.asp) | 从向量中移除一定数量的元素。                             |
| [front()](https://www.w3school.com.cn/cpp/ref_vector_front.asp) | 返回向量的第一个元素。                                   |
| [insert()](https://www.w3school.com.cn/cpp/ref_vector_insert.asp) | 向向量中插入一定数量的元素。                             |
| [max_size()](https://www.w3school.com.cn/cpp/ref_vector_max_size.asp) | 返回向量能够拥有的最大元素数量。                         |
| [pop_back()](https://www.w3school.com.cn/cpp/ref_vector_pop_back.asp) | 移除向量的最后一个元素。                                 |
| [push_back()](https://www.w3school.com.cn/cpp/ref_vector_push_back.asp) | 向向量的末尾添加一个元素。                               |
| [rbegin()](https://www.w3school.com.cn/cpp/ref_vector_rbegin.asp) | 返回指向向量最后一个元素的反向迭代器。                   |
| [rend()](https://www.w3school.com.cn/cpp/ref_vector_rend.asp) | 返回指向向量第一个元素之前位置的反向迭代器。             |
| reserve()                                                    | 为向量预留内存。                                         |
| [resize()](https://www.w3school.com.cn/cpp/ref_vector_resize.asp) | 更改向量的大小，必要时添加或移除元素。                   |
| shrink_to_fit()                                              | 如有必要，将向量的预留内存减少到恰好适合元素数量的程度。 |
| [size()](https://www.w3school.com.cn/cpp/ref_vector_size.asp) | 返回向量中的元素数量。                                   |
| [swap()](https://www.w3school.com.cn/cpp/ref_vector_swap.asp) | 将一个向量的内容与另一个向量交换。                       |



## C++ ctime 时间库

[C++ 标准库  | 菜鸟教程](https://www.runoob.com/cplusplus/cpp-libs-ctime.html)

[C++ ctime 库](https://www.w3school.com.cn/cpp/cpp_ref_ctime.asp)

`<ctime>` 库提供了一系列用于处理日期和时间测量的函数。

| 函数                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [asctime()](https://www.w3school.com.cn/cpp/ref_ctime_asctime.asp) | 将 `tm` 结构体中的时间转换为 C 风格字符串表示。              |
| [clock()](https://www.w3school.com.cn/cpp/ref_ctime_clock.asp) | 返回程序运行至今的处理器时间（以时钟周期为单位）。           |
| [ctime()](https://www.w3school.com.cn/cpp/ref_ctime_ctime.asp) | 将时间戳转换为可读的 C 风格字符串表示。                      |
| [difftime()](https://www.w3school.com.cn/cpp/ref_ctime_difftime.asp) | 计算两个时间戳之间的差值（以秒为单位）。                     |
| [gmtime()](https://www.w3school.com.cn/cpp/ref_ctime_gmtime.asp) | 将时间戳转换为表示 GMT 时区时间的 `tm` 结构体。              |
| [localtime()](https://www.w3school.com.cn/cpp/ref_ctime_localtime.asp) | 将时间戳转换为表示本地时区时间的 `tm` 结构体。               |
| [mktime()](https://www.w3school.com.cn/cpp/ref_ctime_mktime.asp) | 将 `tm` 结构体转换为时间戳表示。                             |
| [strftime()](https://www.w3school.com.cn/cpp/ref_ctime_strftime.asp) | 按照指定格式将 `tm` 结构体中的时间信息格式化为 C 风格字符串。 |
| [time()](https://www.w3school.com.cn/cpp/ref_ctime_time.asp) | 获取当前系统时间的时间戳。                                   |



## C++ string 标准库

[C++ 标准库  | 菜鸟教程](https://www.runoob.com/cplusplus/cpp-libs-string.html)

C++ 标准库（Standard Template Library, STL）是 C++ 的核心组成部分之一，提供了丰富的数据结构和算法。

`<string>` 是 C++ 标准库中用于处理字符串的头文件。

在 C++ 中，字符串是由字符组成的序列。`<string>` 头文件提供了 `std::string` 类，它是对 C 风格字符串的封装，提供了更安全、更易用的字符串操作功能。

要在 C++ 程序中使用 `<string>` 库，首先需要包含这个头文件：

下面是一个常见的 std::string 成员函数的汇总:

| 函数名                | 描述                                           | 示例代码                                       |
| :-------------------- | :--------------------------------------------- | :--------------------------------------------- |
| `size()`              | 返回字符串的长度（字符数）。                   | `std::cout << str.size();`                     |
| `length()`            | 与 `size()` 相同，返回字符串的长度。           | `std::cout << str.length();`                   |
| `empty()`             | 判断字符串是否为空。                           | `std::cout << (str.empty() ? "Yes" : "No");`   |
| `operator[]`          | 访问字符串中指定位置的字符。                   | `std::cout << str[0];`                         |
| `at()`                | 访问字符串中指定位置的字符（带边界检查）。     | `std::cout << str.at(0);`                      |
| `substr()`            | 返回从指定位置开始的子字符串。                 | `std::string sub = str.substr(0, 5);`          |
| `find()`              | 查找子字符串在字符串中的位置。                 | `std::cout << str.find("sub") << std::endl;`   |
| `rfind()`             | 从字符串末尾开始查找子字符串的位置。           | `std::cout << str.rfind("sub") << std::endl;`  |
| `replace()`           | 替换字符串中的部分内容。                       | `str.replace(pos, length, "new_substring");`   |
| `append()`            | 在字符串末尾添加内容。                         | `str.append(" more");`                         |
| `insert()`            | 在指定位置插入内容。                           | `str.insert(pos, "inserted");`                 |
| `erase()`             | 删除指定位置的字符或子字符串。                 | `str.erase(pos, length);`                      |
| `clear()`             | 清空字符串。                                   | `str.clear();`                                 |
| `c_str()`             | 返回 C 风格的字符串（以 null 结尾）。          | `const char* cstr = str.c_str();`              |
| `data()`              | 返回指向字符数据的指针（C++11 及之后的版本）。 | `const char* data = str.data();`               |
| `compare()`           | 比较两个字符串。                               | `int result = str.compare("other");`           |
| `find_first_of()`     | 查找第一个匹配任意字符的位置。                 | `size_t pos = str.find_first_of("aeiou");`     |
| `find_last_of()`      | 查找最后一个匹配任意字符的位置。               | `size_t pos = str.find_last_of("aeiou");`      |
| `find_first_not_of()` | 查找第一个不匹配任意字符的位置。               | `size_t pos = str.find_first_not_of("aeiou");` |
| `find_last_not_of()`  | 查找最后一个不匹配任意字符的位置。             | `size_t pos = str.find_last_not_of("aeiou");`  |



## C++ algorithm 算法库

[C++ 算法库  | 菜鸟教程](https://www.runoob.com/cplusplus/cpp-libs-algorithm.html)

[C++ 算法](https://www.w3school.com.cn/cpp/cpp_algorithms.asp)

C++ 标准库中的 `<algorithm>` 头文件提供了一组用于操作容器（如数组、向量、列表等）的算法。这些算法包括排序、搜索、复制、比较等，它们是编写高效、可重用代码的重要工具。

`<algorithm>` 头文件定义了一组模板函数，这些函数可以应用于任何类型的容器，只要容器支持迭代器。这些算法通常接受两个或更多的迭代器作为参数，表示操作的起始和结束位置。

`<algorithm>` 库提供了许多可用于操作数据结构中数据范围的函数。

以下是算法库中的实用函数列表：

[C++ algorithm 库](https://www.w3school.com.cn/cpp/cpp_ref_algorithm.asp)

| 函数                                                         | 描述                                               |
| :----------------------------------------------------------- | :------------------------------------------------- |
| [adjacent_find()](https://www.w3school.com.cn/cpp/ref_algorithm_adjacent_find.asp) | 在数据范围中查找相邻的重复元素。                   |
| [all_of()](https://www.w3school.com.cn/cpp/ref_algorithm_all_of.asp) | 检查数据范围内所有元素是否都满足指定条件。         |
| [any_of()](https://www.w3school.com.cn/cpp/ref_algorithm_any_of.asp) | 检查数据范围内是否存在至少一个满足条件的元素。     |
| [binary_search()](https://www.w3school.com.cn/cpp/ref_algorithm_binary_search.asp) | 在有序数据范围中高效查找指定值。                   |
| [copy()](https://www.w3school.com.cn/cpp/ref_algorithm_copy.asp) | 将数据范围复制到另一个位置。                       |
| [count()](https://www.w3school.com.cn/cpp/ref_algorithm_count.asp) | 统计指定值在数据范围中出现的次数。                 |
| [count_if()](https://www.w3school.com.cn/cpp/ref_algorithm_count_if.asp) | 统计满足特定条件的元素数量。                       |
| [fill()](https://www.w3school.com.cn/cpp/ref_algorithm_fill.asp) | 用指定值填充数据范围。                             |
| [find()](https://www.w3school.com.cn/cpp/ref_algorithm_find.asp) | 在数据范围中查找指定值。                           |
| [find_first_of()](https://www.w3school.com.cn/cpp/ref_algorithm_find_first_of.asp) | 查找与任一指定值匹配的第一个元素。                 |
| [find_if()](https://www.w3school.com.cn/cpp/ref_algorithm_find_if.asp) | 查找第一个满足条件的元素。                         |
| [find_if_not()](https://www.w3school.com.cn/cpp/ref_algorithm_find_if_not.asp) | 查找第一个不满足条件的元素。                       |
| [for_each()](https://www.w3school.com.cn/cpp/ref_algorithm_for_each.asp) | 对数据范围中的每个元素应用指定函数。               |
| [includes()](https://www.w3school.com.cn/cpp/ref_algorithm_includes.asp) | 检查一个有序范围是否包含另一个有序范围的所有元素。 |
| [is_permutation()](https://www.w3school.com.cn/cpp/ref_algorithm_is_permutation.asp) | 检查两个范围是否为彼此的排列组合。                 |
| [is_sorted()](https://www.w3school.com.cn/cpp/ref_algorithm_is_sorted.asp) | 检查数据范围是否已排序。                           |
| [is_sorted_until()](https://www.w3school.com.cn/cpp/ref_algorithm_is_sorted_until.asp) | 查找数据范围中不再保持排序的位置。                 |
| [lower_bound()](https://www.w3school.com.cn/cpp/ref_algorithm_lower_bound.asp) | 在有序范围中查找不小于给定值的第一个元素。         |
| [max_element()](https://www.w3school.com.cn/cpp/ref_algorithm_max_element.asp) | 查找数据范围中的最大元素。                         |
| [merge()](https://www.w3school.com.cn/cpp/ref_algorithm_merge.asp) | 合并两个有序范围。                                 |
| [min_element()](https://www.w3school.com.cn/cpp/ref_algorithm_min_element.asp) | 查找数据范围中的最小元素。                         |
| [none_of()](https://www.w3school.com.cn/cpp/ref_algorithm_none_of.asp) | 检查数据范围中是否没有元素满足条件。               |
| [random_shuffle()](https://www.w3school.com.cn/cpp/ref_algorithm_random_shuffle.asp) | 随机重排数据范围中的元素。                         |
| [replace()](https://www.w3school.com.cn/cpp/ref_algorithm_replace.asp) | 替换数据范围中所有匹配指定值的元素。               |
| [replace_copy()](https://www.w3school.com.cn/cpp/ref_algorithm_replace_copy.asp) | 创建替换指定值后的范围副本。                       |
| [replace_copy_if()](https://www.w3school.com.cn/cpp/ref_algorithm_replace_copy_if.asp) | 创建替换满足条件元素后的范围副本。                 |
| [replace_if()](https://www.w3school.com.cn/cpp/ref_algorithm_replace_if.asp) | 替换数据范围中所有满足条件的元素。                 |
| [reverse()](https://www.w3school.com.cn/cpp/ref_algorithm_reverse.asp) | 反转数据范围中元素的顺序。                         |
| [reverse_copy()](https://www.w3school.com.cn/cpp/ref_algorithm_reverse_copy.asp) | 创建元素顺序反转后的范围副本。                     |
| [search()](https://www.w3school.com.cn/cpp/ref_algorithm_search.asp) | 在数据范围中搜索指定子序列。                       |
| [sort()](https://www.w3school.com.cn/cpp/ref_algorithm_sort.asp) | 对数据范围进行升序排序。                           |
| [swap()](https://www.w3school.com.cn/cpp/ref_algorithm_swap.asp) | 交换两个对象的值。                                 |
| [swap_ranges()](https://www.w3school.com.cn/cpp/ref_algorithm_swap_ranges.asp) | 交换两个范围中的元素。                             |
| [upper_bound()](https://www.w3school.com.cn/cpp/ref_algorithm_upper_bound.asp) | 在有序范围中查找大于给定值的第一个元素。           |



## C++ new 内存管理库

[C++ 内存管理库  | 菜鸟教程](https://www.runoob.com/cplusplus/cpp-libs-new.html)

C++ 是一种功能强大的编程语言，它提供了丰富的标准库来帮助开发者更高效地编写代码。

在 C++ 中，`<new>` 是一个非常重要的头文件，它包含了用于动态内存分配的函数和异常类型。

动态内存分配允许程序在运行时请求内存，这在处理不确定大小的数据结构时非常有用。

`<new>` 头文件定义了以下几个关键组件：

- `new` 运算符：用于动态分配内存。
- `delete` 运算符：用于释放动态分配的内存。
- `nothrow` 运算符：用于在内存分配失败时不抛出异常。
- `std::bad_alloc` 异常：当内存分配失败时抛出。

### 使用 `new` 运算符

`new` 运算符用于在堆上分配内存。其基本语法如下：

```cpp
<code class="language-cpp">pointer new (type [, initializer]);</code>
```

- `pointer` 是指向分配的内存的指针。
- `type` 是要分配的对象的类型。
- `initializer` 是一个可选的初始化表达式。

### 用 `delete` 运算符

`delete` 运算符用于释放之前使用 `new` 分配的内存。其基本语法如下：

```cpp
<code class="language-cpp">delete pointer;</code>
```

- `pointer` 是之前使用 `new` 分配的内存的指针。

**动态分配数组:**

```cpp
#include <iostream>
#include <new>

int main() {
  int* myArray = new int[10]; // 分配一个包含10个整数的数组
  for (int i = 0; i < 10; ++i) {
    myArray[i] = i * 2; // 初始化数组
  }

  for (int i = 0; i < 10; ++i) {
    std::cout << "Array[" << i << "]: " << myArray[i] << std::endl;
  }

  delete[] myArray; // 释放数组内存
  return 0;
}
```

输出结果：

```cpp
Array[0]: 0
Array[1]: 2
Array[2]: 4
Array[3]: 6
Array[4]: 8
Array[5]: 10
Array[6]: 12
Array[7]: 14
Array[8]: 16
Array[9]: 18
```



## C++ cmath 标准库

[C++ 标准库  | 菜鸟教程](https://www.runoob.com/cplusplus/cpp-libs-cmath.html)

C++ 标准库提供了丰富的功能，其中 `<cmath>` 是一个包含数学函数的头文件，它提供了许多基本的数学运算和常数。

`<cmath>` 是 C++ 标准库中的一个头文件，它定义了一组数学函数，这些函数可以执行基本的数学运算，如幂运算、三角函数、对数、绝对值等。

要使用 `<cmath>` 中的函数，你需要在你的 C++ 程序中包含这个头文件：

```cpp
#include <cmath>
```

### 常用函数

`<cmath>` 提供了许多数学函数，以下是一些常用的函数。

#### 1. 基本数学函数

| 函数              | 功能                       | 示例                       |
| :---------------- | :------------------------- | :------------------------- |
| `abs(x)`          | 计算整数 `x` 的绝对值      | `abs(-5) // 5`             |
| `fabs(x)`         | 计算浮点数 `x` 的绝对值    | `fabs(-5.5) // 5.5`        |
| `fmod(x, y)`      | 计算 `x` 除以 `y` 的余数   | `fmod(5.3, 2) // 1.3`      |
| `remainder(x, y)` | 计算 `x` 除以 `y` 的余数   | `remainder(5.5, 2) // 1.5` |
| `fmax(x, y)`      | 返回 `x` 和 `y` 中的较大值 | `fmax(3.5, 4.2) // 4.2`    |
| `fmin(x, y)`      | 返回 `x` 和 `y` 中的较小值 | `fmin(3.5, 4.2) // 3.5`    |
| `hypot(x, y)`     | 计算 `sqrt(x*x + y*y)`     | `hypot(3, 4) // 5`         |

#### 2. 指数和对数函数

| 函数        | 功能                                      | 示例                        |
| :---------- | :---------------------------------------- | :-------------------------- |
| `exp(x)`    | 计算 `e^x`，`e` 为自然对数的底数          | `exp(1) // 2.71828...`      |
| `log(x)`    | 计算 `x` 的自然对数                       | `log(2.71828) // 1`         |
| `log10(x)`  | 计算 `x` 的以 10 为底的对数               | `log10(100) // 2`           |
| `pow(x, y)` | 计算 `x` 的 `y` 次方                      | `pow(2, 3) // 8`            |
| `sqrt(x)`   | 计算 `x` 的平方根                         | `sqrt(16) // 4`             |
| `cbrt(x)`   | 计算 `x` 的立方根                         | `cbrt(27) // 3`             |
| `expm1(x)`  | 计算 `e^x - 1`                            | `expm1(1) // 1.71828...`    |
| `log1p(x)`  | 计算 `log(1 + x)`，适用于 x 接近 0 的情况 | `log1p(0.00001) // 0.00001` |

#### 3. 三角函数

| 函数          | 功能                                | 示例                       |
| :------------ | :---------------------------------- | :------------------------- |
| `sin(x)`      | 计算 `x` 的正弦值，`x` 以弧度为单位 | `sin(3.14159 / 2) // 1`    |
| `cos(x)`      | 计算 `x` 的余弦值，`x` 以弧度为单位 | `cos(3.14159) // -1`       |
| `tan(x)`      | 计算 `x` 的正切值，`x` 以弧度为单位 | `tan(0) // 0`              |
| `asin(x)`     | 计算 `x` 的反正弦值，返回弧度       | `asin(1) // 3.14159/2`     |
| `acos(x)`     | 计算 `x` 的反余弦值，返回弧度       | `acos(-1) // 3.14159`      |
| `atan(x)`     | 计算 `x` 的反正切值，返回弧度       | `atan(1) // 3.14159/4`     |
| `atan2(y, x)` | 计算 `y/x` 的反正切值，返回弧度     | `atan2(1, 1) // 3.14159/4` |

#### 4. 双曲函数

| 函数       | 功能                                  | 示例                   |
| :--------- | :------------------------------------ | :--------------------- |
| `sinh(x)`  | 计算 `x` 的双曲正弦                   | `sinh(0) // 0`         |
| `cosh(x)`  | 计算 `x` 的双曲余弦                   | `cosh(0) // 1`         |
| `tanh(x)`  | 计算 `x` 的双曲正切                   | `tanh(1) // 0.7616`    |
| `asinh(x)` | 计算 `x` 的反双曲正弦                 | `asinh(1) // 0.8814`   |
| `acosh(x)` | 计算 `x` 的反双曲余弦，`x` ≥ 1        | `acosh(1) // 0`        |
| `atanh(x)` | 计算 `x` 的反双曲正切，`x` 在 (-1, 1) | `atanh(0.5) // 0.5493` |

#### 5. 取整和浮点数操作

| 函数                | 功能                                     | 示例                  |
| :------------------ | :--------------------------------------- | :-------------------- |
| `ceil(x)`           | 返回不小于 `x` 的最小整数                | `ceil(2.3) // 3`      |
| `floor(x)`          | 返回不大于 `x` 的最大整数                | `floor(2.3) // 2`     |
| `trunc(x)`          | 返回去除小数部分的整数值                 | `trunc(2.8) // 2`     |
| `round(x)`          | 返回四舍五入到最接近的整数               | `round(2.5) // 3`     |
| `lround(x)`         | 返回四舍五入到 `long` 类型               | `lround(2.5) // 3`    |
| `llround(x)`        | 返回四舍五入到 `long long` 类型          | `llround(2.5) // 3`   |
| `nearbyint(x)`      | 返回舍入到最接近整数（但不引发浮点异常） | `nearbyint(2.5) // 2` |
| `rint(x)`           | 返回四舍五入到整数，符合当前舍入方式     | `rint(2.5) // 3`      |
| `modf(x, &intpart)` | 将 `x` 的整数和小数部分分离              | `modf(2.3, &intpart)` |

#### 6. 浮点数检查

| 函数          | 功能                                      | 示例                       |
| :------------ | :---------------------------------------- | :------------------------- |
| `isfinite(x)` | 检查 `x` 是否为有限值（非无穷大或非 NaN） | `isfinite(3.0) // true`    |
| `isinf(x)`    | 检查 `x` 是否为无穷大                     | `isinf(1.0 / 0.0) // true` |
| `isnan(x)`    | 检查 `x` 是否为 NaN                       | `isnan(0.0 / 0.0) // true` |
| `isnormal(x)` | 检查 `x` 是否为正常的非零浮点数           | `isnormal(1.0) // true`    |
| `signbit(x)`  | 检查 `x` 的符号是否为负                   | `signbit(-5.3) // true`    |



## C string.h 字符串函数

[C 标准库 –  | 菜鸟教程](https://www.runoob.com/cprogramming/c-standard-library-string-h.html)

### 简介

**string .h** 头文件定义了一个变量类型、一个宏和各种操作字符数组的函数。

`<string.h>` 是 C 标准库中的一个头文件，提供了一组用于处理字符串和内存块的函数。这些函数涵盖了字符串复制、连接、比较、搜索和内存操作等。

string字符串不能直接赋值（初始化可以），因为**string**实际上可以等同于以`\0`结尾的**char str[]**（字符数组）。

**数组名字就是一个指针，是数组的首指针位置，是个常量，不可修改的**

### 库变量

下面是头文件 string.h 中定义的变量类型：

| 序号 | 变量 & 描述                                                  |
| :--- | :----------------------------------------------------------- |
| 1    | **size_t** 这是无符号整数类型，它是 **sizeof** 关键字的结果。 |

### 库宏

下面是头文件 string.h 中定义的宏：

| 序号 | 宏 & 描述                             |
| :--- | :------------------------------------ |
| 1    | **NULL** 这个宏是一个空指针常量的值。 |

### 库函数

下面是头文件 string.h 中定义的函数：

| 序号 | 函数 & 描述                                                  |
| :--- | :----------------------------------------------------------- |
| 1    | [void *memchr(const void *str, int c, size_t n)](https://www.runoob.com/cprogramming/c-function-memchr.html) 在参数 *str* 所指向的字符串的前 n 个字节中搜索第一次出现字符 c（一个无符号字符）的位置。 |
| 2    | [int memcmp(const void *str1, const void *str2, size_t n)](https://www.runoob.com/cprogramming/c-function-memcmp.html) 把 *str1* 和 *str2* 的前 n 个字节进行比较。 |
| 3    | [void *memcpy(void *dest, const void *src, size_t n)](https://www.runoob.com/cprogramming/c-function-memcpy.html) 从 src 复制 n 个字符到 *dest*。 |
| 4    | [void *memmove(void *dest, const void *src, size_t n)](https://www.runoob.com/cprogramming/c-function-memmove.html) 另一个用于从 *src* 复制 n 个字符到 *dest* 的函数。 |
| 5    | [void *memset(void *str, int c, size_t n)](https://www.runoob.com/cprogramming/c-function-memset.html) 将指定的值 c 复制到 str 所指向的内存区域的前 n 个字节中。 |
| 6    | [char *strcat(char *dest, const char *src)](https://www.runoob.com/cprogramming/c-function-strcat.html) 把 *src* 所指向的字符串追加到 *dest* 所指向的字符串的结尾。 |
| 7    | [char *strncat(char *dest, const char *src, size_t n)](https://www.runoob.com/cprogramming/c-function-strncat.html) 把 *src* 所指向的字符串追加到 *dest* 所指向的字符串的结尾，直到 n 字符长度为止。 |
| 8    | [char *strchr(const char *str, int c)](https://www.runoob.com/cprogramming/c-function-strchr.html) 在参数 *str* 所指向的字符串中搜索第一次出现字符 c（一个无符号字符）的位置。 |
| 9    | [int strcmp(const char *str1, const char *str2)](https://www.runoob.com/cprogramming/c-function-strcmp.html) 把 *str1* 所指向的字符串和 *str2* 所指向的字符串进行比较。 |
| 10   | [int strncmp(const char *str1, const char *str2, size_t n)](https://www.runoob.com/cprogramming/c-function-strncmp.html) 把 *str1* 和 *str2* 进行比较，最多比较前 n 个字节。 |
| 11   | [int strcoll(const char *str1, const char *str2)](https://www.runoob.com/cprogramming/c-function-strcoll.html) 把 *str1* 和 *str2* 进行比较，结果取决于 LC_COLLATE 的位置设置。 |
| 12   | [char *strcpy(char *dest, const char *src)](https://www.runoob.com/cprogramming/c-function-strcpy.html) 把 *src* 所指向的字符串复制到 *dest*。 |
| 13   | [char *strncpy(char *dest, const char *src, size_t n)](https://www.runoob.com/cprogramming/c-function-strncpy.html) 把 *src* 所指向的字符串复制到 *dest*，最多复制 n 个字符。 |
| 14   | [size_t strcspn(const char *str1, const char *str2)](https://www.runoob.com/cprogramming/c-function-strcspn.html) 检索字符串 str1 开头连续有几个字符都不含字符串 str2 中的字符。 |
| 15   | [char *strerror(int errnum)](https://www.runoob.com/cprogramming/c-function-strerror.html) 从内部数组中搜索错误号 errnum，并返回一个指向错误消息字符串的指针。 |
| 16   | [size_t strlen(const char *str)](https://www.runoob.com/cprogramming/c-function-strlen.html) 计算字符串 str 的长度，直到空结束字符，但不包括空结束字符。 |
| 17   | [char *strpbrk(const char *str1, const char *str2)](https://www.runoob.com/cprogramming/c-function-strpbrk.html) 检索字符串 *str1* 中第一个匹配字符串 *str2* 中字符的字符，不包含空结束字符。也就是说，依次检验字符串 str1 中的字符，当被检验字符在字符串 str2 中也包含时，则停止检验，并返回该字符位置。 |
| 18   | [char *strrchr(const char *str, int c)](https://www.runoob.com/cprogramming/c-function-strrchr.html) 在参数 *str* 所指向的字符串中搜索最后一次出现字符 c（一个无符号字符）的位置。 |
| 19   | [size_t strspn(const char *str1, const char *str2)](https://www.runoob.com/cprogramming/c-function-strspn.html) 检索字符串 *str1* 中第一个不在字符串 *str2* 中出现的字符下标。 |
| 20   | [char *strstr(const char *haystack, const char *needle)](https://www.runoob.com/cprogramming/c-function-strstr.html) 在字符串 *haystack* 中查找第一次出现字符串 *needle*（不包含空结束字符）的位置。 |
| 21   | [char *strtok(char *str, const char *delim)](https://www.runoob.com/cprogramming/c-function-strtok.html) 分解字符串 *str* 为一组字符串，*delim* 为分隔符。 |
| 22   | [size_t strxfrm(char *dest, const char *src, size_t n)](https://www.runoob.com/cprogramming/c-function-strxfrm.html) 根据程序当前的区域选项中的 LC_COLLATE 来转换字符串 **src** 的前 **n** 个字符，并把它们放置在字符串 **dest** 中。 |

<string.h> 库提供了许多函数，允许你对字符串执行各种操作。

以下表格列出了所有字符串函数：

[C 字符串（string.h）库](https://www.w3school.com.cn/c/c_ref_string.asp)

| 函数                                                         | 描述                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| [memchr()](https://www.w3school.com.cn/c/ref_string_memchr.asp) | 返回内存中第一次出现某个值的指针。                           |
| [memcmp()](https://www.w3school.com.cn/c/ref_string_memcmp.asp) | 比较两个内存块，以确定哪一个表示更大的数值。                 |
| memcpy()                                                     | 将数据从一个内存块复制到另一个内存块。                       |
| memmove()                                                    | 考虑到内存块可能重叠的情况，将数据从一个内存块复制到另一个内存块。 |
| memset()                                                     | 将内存块中的所有字节设置为相同的值。                         |
| [strcat()](https://www.w3school.com.cn/c/ref_string_strcat.asp) | 将一个字符串追加到另一个字符串的末尾。                       |
| [strchr()](https://www.w3school.com.cn/c/ref_string_strchr.asp) | 返回字符串中第一次出现某个字符的指针。                       |
| [strcmp()](https://www.w3school.com.cn/c/ref_string_strcmp.asp) | 比较两个字符串中字符的 ASCII 值，以确定哪一个字符串的值更高。 |
| strcoll()                                                    | 比较两个字符串中基于区域设置的字符值，以确定哪一个字符串的值更高。 |
| [strcpy()](https://www.w3school.com.cn/c/ref_string_strcpy.asp) | 将一个字符串的字符复制到另一个字符串的内存中。               |
| [strcspn()](https://www.w3school.com.cn/c/ref_string_strcspn.asp) | 返回字符串的长度，直到出现第一个指定字符为止。               |
| [strerror()](https://www.w3school.com.cn/c/ref_string_strerror.asp) | 返回描述错误代码含义的字符串。                               |
| [strlen()](https://www.w3school.com.cn/c/ref_string_strlen.asp) | 返回字符串的长度。                                           |
| [strncat()](https://www.w3school.com.cn/c/ref_string_strncat.asp) | 将一个字符串中的指定数量的字符追加到另一个字符串的末尾。     |
| [strncmp()](https://www.w3school.com.cn/c/ref_string_strncmp.asp) | 比较两个字符串中指定数量的字符的 ASCII 值，以确定哪一个字符串的值更高。 |
| [strncpy()](https://www.w3school.com.cn/c/ref_string_strncpy.asp) | 将一个字符串中的指定数量的字符复制到另一个字符串的内存中。   |
| [strpbrk()](https://www.w3school.com.cn/c/ref_string_strpbrk.asp) | 返回字符串中第一个包含指定字符之一的位置的指针。             |
| [strrchr()](https://www.w3school.com.cn/c/ref_string_strrchr.asp) | 返回字符串中最后一次出现某个字符的指针。                     |
| [strspn()](https://www.w3school.com.cn/c/ref_string_strspn.asp) | 返回字符串的长度，直到第一个不是指定字符之一的字符为止。     |
| [strstr()](https://www.w3school.com.cn/c/ref_string_strstr.asp) | 返回另一个字符串中第一次出现某个字符串的指针。               |
| [strtok()](https://www.w3school.com.cn/c/ref_string_strtok.asp) | 使用分隔符将字符串分割成多个部分。                           |
| strxfrm()                                                    | 将字符串中的字符从 ASCII 编码转换为当前区域设置的编码。      |



## C <string.h>和C++ < string > 的比较

**以下内容都为deepseek总结，请仔细辨别内容正确与否**



### C语言中的特点

在 C 语言中，`string.h` 头文件处理的是 **以 null 字符结尾的字符数组**，这个概念需要准确理解.

**C 语言中没有真正的 "string" 类型**，所谓的 "字符串" 实际上是：

#### 1. 本质：`char[]`（字符数组）

```c
char str1[] = "Hello";  // 数组形式
// 等价于：char str1[6] = {'H', 'e', 'l', 'l', 'o', '\0'};
```

#### 2. 常用表示：`char*`（字符指针）

```c
char* str2 = "Hello";    // 指向字符串字面量的指针
char str3[] = "World";
char* str4 = str3;       // 指向字符数组的指针
```

#### 3. 最准确的说法：**以 `\0` 结尾的 `char` 数组**

#### 三种形式的区别

| 形式               | 示例                  | 内存位置  | 可否修改   |
| :----------------- | :-------------------- | :-------- | :--------- |
| `char[]`           | `char s[] = "hello";` | 栈内存    | ✅ 可修改   |
| `char*` 指向数组   | `char* p = array;`    | 栈/堆内存 | ✅ 可修改   |
| `char*` 指向字面量 | `char* p = "hello";`  | 只读段    | ❌ 不可修改 |

##### `const char*` 的角色

对于字符串字面量，应该使用 `const char*` 来确保安全：

```c
const char* str = "Hello";  // 正确：明确表示不可修改
// str[0] = 'h';  // 错误：编译时会报错
```

##### `string.h` 函数的参数

`string.h` 中的函数通常接受 `char*` 参数：

```c
#include <string.h>

int main() {
    char str1[] = "Hello";
    char str2[10];
    
    strlen(str1);     // 参数: const char*
    strcpy(str2, str1); // 参数: char*, const char*
    strcmp(str1, "Hi"); // 参数: const char*, const char*
    
    return 0;
}
```

#### 总结

**最准确的等价关系：**

- C 语言的 "string" ≈ **以 `\0` 结尾的 `char` 数组**
- 在函数参数中通常表现为 `char*` 或 `const char*`
- **不是**单一的 `char[]` 或 `char*`，而是一个概念体系

#### 重要区别

```c
// 这三种都表示"字符串"，但有重要区别：
char s1[] = "Hello";    // 可修改的数组
char* s2 = "Hello";     // 指向只读字面量（危险！） 指向的数据可以被修改
const char* s3 = "Hello"; // 指向只读字面量（安全） const 不能修改

// 正确的现代用法：
const char* message = "This is a constant string";
char buffer[100] = "This can be modified";
```

在 C 语言中，理解字符串就是理解 **字符数组、指针和内存管理** 的相互关系。



### C++中的特点

在 C++ 中，`std::string` 是一个**完整的类类型**，它远比 C 语言的字符串概念复杂和强大。

它不等于简单的字符指针或数组，而是一个封装了字符串管理的智能对象。

#### 1.std::string 的本质

```cpp
#include <string>

std::string s = "Hello";  // s 是一个对象，不是指针
```

#### 2. 封装了动态内存管理

```cpp
std::string s1 = "Short";
std::string s2 = "This is a very long string that requires dynamic allocation";
// s2 自动在堆上分配内存，无需手动管理
```

#### 3. 提供丰富的成员函数

```cpp
std::string s = "Hello World";
s.length();     // 11
s.substr(0, 5); // "Hello"
s.find("World");// 6
s += "!";       // 追加操作
```

#### 4.与 C 语言概念的对比

| 特性         | C 语言字符串        | C++ std::string               |
| :----------- | :------------------ | :---------------------------- |
| **类型**     | `char*` 或 `char[]` | `std::string` 类              |
| **内存管理** | 手动                | 自动（RAII-资源获取即初始化） |
| **长度获取** | `strlen()` 函数     | `.length()` 方法              |
| **拼接**     | `strcat()`          | `+` 运算符或 `.append()`      |
| **安全性**   | 容易缓冲区溢出      | 边界检查                      |
| **可修改性** | 依赖内存位置        | 总是可修改                    |

#### std::string 的核心能力

##### 动态大小

```cpp
std::string s;
s = "Hi";           // 长度 2
s = "This is a much longer string"; // 自动调整大小
```

##### 自动内存管理

```cpp
void function() {
    std::string s = "Some string";
    // 函数结束时，s 的析构函数自动释放内存
    // 无需手动 free() 或 delete[]
}
```

##### 丰富的操作

```cpp
std::string s = "C++ is powerful";
s.insert(4, "11");      // "C++11 is powerful"
s.replace(0, 3, "Java");// "Java11 is powerful"
s.erase(0, 4);          // "11 is powerful"
```

#### 与 C 字符串的互操作

##### 转换为 C 风格字符串

```cpp
std::string s = "Hello";
const char* c_str = s.c_str();  // 获取只读 C 字符串
char* data = s.data();          // 获取可修改的指针（C++17+）
```

##### 从 C 字符串构造

```cpp
const char* cstr = "Hello";
std::string s1(cstr);           // 从 C 字符串构造
std::string s2(cstr, 3);        // "Hel"
```

#### std::string 等于什么？

**std::string 不等于任何简单类型，它是一个：**

1. **智能字符容器** - 自动管理动态字符数组
2. **完整的字符串类** - 提供丰富的字符串操作功能
3. **RAII 对象** - 自动处理内存分配和释放
4. **类型安全抽象** - 封装底层字符数组细节

```cpp
// 错误的思维方式：
// std::string ≈ char*    ❌
// std::string ≈ char[]   ❌

// 正确的思维方式：
// std::string 是一个管理字符序列的智能对象 ✅
```

**简单来说：** `std::string` 最接近的是 **"一个自动管理的、功能丰富的、类型安全的动态字符数组包装器"**。



## C++ 迭代器

[C++ 迭代器](https://www.w3school.com.cn/cpp/cpp_iterators.asp)

[迭代器是什么，C++ STL迭代器（iterator）用法详解 - C语言中文网](https://c.biancheng.net/view/6675.html)

迭代器用于通过"指向"元素来访问和遍历数据结构（向量、集合等）中的元素。

之所以称为"迭代器"，是因为"迭代"是*循环*的技术术语。

以下是通过迭代器遍历向量的示例：

### 实例

```cpp
// 创建存储字符串的向量 cars
vector<string> cars = {"Volvo", "BMW", "Ford", "Tesla"};

// 创建向量迭代器 it
vector<string>::iterator it;

// 使用迭代器遍历向量
for (it = cars.begin(); it != cars.end(); ++it) {
  cout << *it << "\n";
}
```

### 例子解释：

1. 首先创建存储汽车品牌名称的字符串向量
2. 然后创建名为 "`it`" 的向量迭代器用于遍历
3. 使用 `for` 循环配合迭代器遍历向量。迭代器 (`it`) 指向向量第一个元素 (`cars.begin()`)，循环持续直到迭代器不等于 `cars.end()`
4. 递增运算符 (`++it`) 将迭代器移动到向量中的下一个元素
5. 解引用运算符 (`*it`) 访问迭代器指向的元素

**注意：**迭代器的类型必须与其遍历的数据结构类型匹配（本例中为 `string`）



参考引用：

-  [C++ vector 库](https://www.w3school.com.cn/cpp/cpp_ref_vector.asp)
- [C++ vector 容器 | 菜鸟教程](https://www.runoob.com/cplusplus/cpp-vector.html)
- [C++ ctime 库](https://www.w3school.com.cn/cpp/cpp_ref_ctime.asp)
- [C++ ctime 标准库| 菜鸟教程](https://www.runoob.com/cplusplus/cpp-libs-ctime.html)
- [C++ 标准库  | 菜鸟教程](https://www.runoob.com/cplusplus/cpp-libs-string.html)
- [C++ algorithm 库](https://www.w3school.com.cn/cpp/cpp_ref_algorithm.asp)
- [C++ 算法库  | 菜鸟教程](https://www.runoob.com/cplusplus/cpp-libs-algorithm.html)
- [C++ 算法](https://www.w3school.com.cn/cpp/cpp_algorithms.asp)
- [C++ 内存管理库  | 菜鸟教程](https://www.runoob.com/cplusplus/cpp-libs-new.html)
- [C++ 标准库  | 菜鸟教程](https://www.runoob.com/cplusplus/cpp-libs-cmath.html)
- [C 字符串（string.h）库](https://www.w3school.com.cn/c/c_ref_string.asp)
- [C 标准库 –  | 菜鸟教程](https://www.runoob.com/cprogramming/c-standard-library-string-h.html)
- [迭代器是什么，C++ STL迭代器（iterator）用法详解 - C语言中文网](https://c.biancheng.net/view/6675.html)
- [C++ 迭代器](https://www.w3school.com.cn/cpp/cpp_iterators.asp)