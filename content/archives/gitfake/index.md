---
categories:
- 默认分类
date: '2025-12-22 14:17:24+08:00'
description: ''
draft: false
image: ''
slug: gitfake
cover: /archives/gitfake/3vs2dn.png
tags:
- git
title: 伪造git提交记录生成点阵字符
---


作为版本管理工具中的扛把子，由 linux 之父亲自操刀编写的 git 就不需要过多介绍了，想必已经是无人不知了

但有些人可能不知道的是，git 提交的记录其实是可以伪造的，核心的操作就在于提供了一些 override 的参数，这里用到的就是 `--date` 这个参数

![](/archives/gitfake/pl9nyx.png)

基于这个 override 的处理，再结合点阵字体的字符数组，就可以玩出花来，比如下面伪造 github 的 contributions 提交点，来进行一些特别的显示

![](/archives/gitfake/kqs6rr.png)

这个提交日期还可以一直前置，直到 `1970-01-01`，那么你的 github 主页就会显示一个如下的长长列表

![](/archives/gitfake/5as2tk.png)

这个玩意除了好玩之外，还有什么作用呢？来一个全部填充，假装把自己变成一个很努力的人，惊呆所有人，嘎嘎（如果面试可能还会有一点额外加分）

![](/archives/gitfake/z2g06p.png)

核心的代码就是以下这段，`get_github_day` 根据点阵字体获取对应的日期列表，dict 是一个由 0、1 组成的点阵字体二维数组

```python

def week_begin_day(day):
    weakday = time.strptime(day,'%Y-%m-%d')
    index = 0
    if (weakday[6]!=6):
        index = 6 - weakday[6] 
    y,m,d = weakday[0:3]
    begin_day = datetime.datetime(y,m,d)
    return begin_day + datetime.timedelta(index)

def get_draw_day(day, c):
    days = []
    letter = dict[c]
    for i in range(0,42):
        if (letter[i]==1):
            drawday = day + datetime.timedelta(i)
            days.append(drawday)
    return days

def get_day_by_word(word, day):
    days = []
    begin_day = week_begin_day(day) 
    index = 0
    n = len(word)
    while True:
        if (index >= n):
            break
        if word[index] != ' ':
            one_days = get_draw_day(begin_day, word[index])
            days.extend(one_days)
        index = index + 1
        begin_day = begin_day + datetime.timedelta(42)
    return days

def get_github_day():
    dates = []
    date_23 = get_day_by_word("FXXK GFW", "2023-01-07")
    dates.extend(date_23)
    return dates

def fake_commit(current_date, times):
    for t in times:
        commit_date = current_date.strftime("%Y-%m-%d") + " " + t.strftime("%H:%M:%S")
        with open('foo.txt', 'w', encoding='utf-8') as f:
            f.write(commit_date)
        os.system(f"git add foo.txt")
        os.system(f"git commit --quiet --date \"${commit_date}\" -m \"fake commit\"")

dates = get_github_day()
for d in dates:
    times = [random_time() for _ in range(random.randint(2, 5))]
    times.sort()
    fake_commit(d, times)
```

创建一个新仓库，然后在该仓库上进行 commit，为了让这些提交显示在 github 的 contributions 上，还需要配置本地 user.email 使用已经验证过的邮箱

![](/archives/gitfake/jez672.png)

![](/archives/gitfake/lphvoc.png)

如果不希望别人看到该仓库的提交明细，也可以新建为 private 仓库，然后在主页的 `Contribution Settings` 下拉列表中勾选 `Private contributions`

![](/archives/gitfake/3vs2dn.png)