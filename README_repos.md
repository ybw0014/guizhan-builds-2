# repos.json 配置项

`repos.json` 包含了构建站所有项目的配置信息。需要注意的是，v2 的配置文件与 v1 的配置文件不兼容。

```json
  "SlimefunGuguProject/SlimeTinker:master": {
    "type": "maven",
    "alias": ["ybw0014/SlimeTinker-CN:master", "ybw0014/SlimeTinker:master"],
    "buildOptions": {
      "name": "SlimeTinker",
      "version": "Build {version} (git {git_commit})"
    },
    "displayOptions": {
      "hidden": false,
      "name": "SlimeTinker",
      "author": ["@Sefiraat"],
      "keywords": ["匠魂", "粘液匠魂"],
      "requirements": {
        "java": {

        }
      }
    }
  }
```

| 配置项                                   | 说明                                                                                     |
| ---------------------------------------- | ---------------------------------------------------------------------------------------- |
| "SlimefunGuguProject/SlimeTinker:master" | 项目的标识符，格式为 `owner/repo:branch`，代表着可在 GitHub 上公开访问到的分支           |
| `type`                                   | （必要）项目类型，目前支持 `maven` 和 `gradle`                                           |
| `alias`                                  | （可选）项目的别名，可以有多个。访问这些别名路径会跳转到主要路径。                       |
| `buildOptions.name`                      | （必要）构建时的项目名称，通常为项目的英文名称                                           |
| `buildOptions.version`                   | （必要）构建时的项目版本，支持变量。详见下方版本变量。                                   |
| `displayOptions.hidden`                  | （可选）是否隐藏项目，隐藏后将不会在构建站的搜索结果中显示，但直接访问地址仍然可以访问。 |
| `displayOptions.name`                    | （可选）项目的显示名称（不会用于搜索）。                                                 |
| `displayOptions.authors`                 | （可选）项目的作者列表。以`@`开头为 GitHub 用户，会链接到 GitHub。                       |
| `displayOptions.keywords`                | （可选）项目的关键词列表，搜索内容如果包含关键词的某一部分，则项目会被列入搜索列表中。   |
| `displayOptions.requirements`            | （可选）项目的运行要求。详见下方运行要求。                                               |

## 版本变量

变量会在构建时被实时替换。

| 变量           | 说明                                              |
| -------------- | ------------------------------------------------- |
| `{version}`    | 项目的构建站版本号，从 1 开始的自增整数。         |
| `{git_commit}` | 构建项目基于的提交 hash（commit hash），前 7 位。 |
| `{Year}`       | 构建项目时的完整年份。                            |
| `{year}`       | 构建项目时的年份，后 2 位。                       |
| `{Month}`      | 构建项目时的完整月份，前面有补 0。                |
| `{month}`      | 构建项目时的月份，前面无补 0。                    |
| `{Day}`        | 构建项目时处于当前月份中的第几天，前面有补 0。    |
| `{day}`        | 构建项目时处于当前月份中的第几天，前面有补 0。    |

## 运行要求
