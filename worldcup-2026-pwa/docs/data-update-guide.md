# 数据更新指南

这个 App 走轻量亲友版路线：赛程比分自动读取 ESPN scoreboard，直播/集锦/新闻等精选内容本地维护，避免引入复杂后台、数据库或付费 API。

## 自动更新范围

App 打开后会自动请求：

```text
https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?limit=100
```

自动更新：

- 比赛时间
- 主客队
- 比分
- 比赛状态
- 球场
- ESPN 赛况链接

如果 ESPN 暂不可用，页面会保留 `src/features/matches/matchData.ts` 里的本地兜底赛程，并显示 `本地兜底 · ESPN 暂不可用`。

## 更新顺序

1. 确认 ESPN 自动赛程比分可用。
2. 更新直播/集锦补充链接。
3. 更新分组积分和小组第三排名。
4. 更新球员榜。
5. 更新新闻外链。
6. 运行 `pnpm test`、`pnpm lint`、`pnpm build`。

## 赛程、比分、直播和集锦

自动来源：`src/features/matches/espnScoreboardApi.ts`

本地兜底：`src/features/matches/matchData.ts`

ESPN 正常时，比赛时间、球队、比分、状态和球场会自动刷新；`matchData.ts` 主要作为 ESPN 失败时的兜底数据。

本地兜底每场比赛需要维护：

- `id`：短横线格式，例如 `bra-ger`。这个值会用于页面跳转锚点。
- `time`：北京时间或 `LIVE`。
- `venue`：球场名称。
- `home` / `away`：球队国旗和中文名。
- `score`：比分，未开始用 `-`。
- `status`：例如 `未开始`、`已结束`、`68' 进行中`。
- `links`：直播或集锦链接。

直播入口建议同时保留：

- 港澳：澳视体育 `https://www.tdm.com.mo/zh-hant/live?Channel=6&type=tv`
- 内地：央视频或央视世界杯页

集锦入口建议同时保留：

- FIFA YouTube 官方频道或具体视频
- 央视频/央视世界杯具体视频页

正式比赛开始后，优先把通用频道链接替换为具体场次链接。ESPN 自动数据只负责基础赛况，港澳/内地直播和集锦入口仍由本地规则补充。

## 分组积分

文件：`src/features/standings/standingsData.ts`

需要维护两块：

- `groupStandings`：12 个小组，每组 4 队。
- `thirdPlaceCandidates`：12 个小组第三名，用于自动排名并标记前 8 晋级。

球队状态：

- `advance`：小组前二晋级区。
- `thirdComparison`：第三名比较区。
- `out`：出局区。

第三名排名逻辑在 `src/features/standings/thirdPlaceRanking.ts`，通常不用改。

## 球员榜

文件：`src/features/players/playerLeaderboardData.ts`

当前保留：

- 射手榜
- 助攻榜
- 扑救榜
- 黄牌榜

每个球员需要维护：

- `playerId`：短横线或英文 ID，用于跳转。
- `playerName`：中文名。
- `teamName` 和 `teamFlag`：球队中文名和国旗。
- `position`：位置。
- `value`：榜单数值。
- `fallbackColor`：缺头像时的国家队色块。
- `avatarUrl`：可选，有头像时再填。

缺头像是允许的，页面会自动显示色块和姓名首字。

## 新闻外链

文件：`src/features/news/newsData.ts`

只维护：

- `title`
- `source`
- `href`
- `featured`：可选，设为 `true` 的新闻会放到重点位置。

轻量版不抓正文，避免版权和维护成本。

## 首页和概览文案

首页比赛日摘要：`src/features/home/homeData.ts`

首页 Hero 的比赛场次标题：由当前生效的比赛数据自动汇总；ESPN 可用时用 ESPN 数据，否则用本地兜底数据。

右侧赛事概览：由当前生效的比赛数据自动汇总；ESPN 可用时用 ESPN 数据，否则用本地兜底数据。

首页会显示当前状态：`自动更新 · ESPN` 或 `本地兜底 · ESPN 暂不可用`。

## 更新后的检查

每次改数据后运行：

```bash
pnpm test
pnpm lint
pnpm build
```

如果只是改新闻链接或文字，通常也应该至少运行 `pnpm build`，确认格式没有写错。
