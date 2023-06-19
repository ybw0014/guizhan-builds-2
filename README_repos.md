# repos.json 配置项

`repos.json` 包含了构建站所有项目的配置信息。需要注意的是，v2的配置文件与v1的配置文件不兼容。

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
      "author": "Sefiraat",
      "keywords": ["匠魂", "粘液匠魂"],
      "requirements": {
        "java": {
          
        }
      }
    }
  }
```

| 配置项 | 说明 |
| --- | --- |
| "SlimefunGuguProject/SlimeTinker:master" | 项目的标识符，格式为 `owner/repo:branch`，代表着可在GitHub上公开访问到的分支 |
| `type` | （必要）项目类型，目前支持 `maven` 和 `gradle` |
| `alias` | （可选）项目的别名，可以有多个。访问这些别名路径会跳转到主要路径。 |
| `buildOptions.name` | （必要）构建时的项目名称，通常为项目的英文名称 |
| `buildOptions.version` | （必要）构建时的项目版本，支持变量。详见下方版本变量。 |
| `displayOptions.hidden` | （可选）是否隐藏项目，隐藏后将不会在构建站的搜索结果中显示，但直接访问地址仍然可以访问。 |

