# 部署指南

这个项目是亲友自用 PWA，不需要上架应用商店。推荐保持一个主入口和一个备用入口。

## 推荐入口

- 国际/备份入口：GitHub Pages
- 内地入口：静态网站镜像，例如 Cloudflare Pages、Vercel、Netlify、国内对象存储静态站点或其他可访问的静态托管

代码只维护一份。镜像入口只负责同步构建产物或同一个仓库。

## GitHub Pages

仓库地址：

```text
https://github.com/ZhengyangZou/worldcup-2026-pwa
```

线上地址：

```text
https://zhengyangzou.github.io/worldcup-2026-pwa/
```

项目已经在 `vite.config.ts` 里设置了生产路径：

```ts
const appBase = process.env.NODE_ENV === 'production' ? '/worldcup-2026-pwa/' : '/'
```

因此部署到 GitHub Pages 时不需要额外改路径。

## 本地检查

每次准备同步前运行：

```bash
pnpm test
pnpm lint
pnpm build
```

如果只是文档变更，至少运行：

```bash
pnpm build
```

## 什么时候 push

不需要每个小改动都 push。建议在这些节点 push：

- 完成一组功能后，例如赛程、积分、球员榜都稳定。
- 准备给亲友试用前。
- 比赛日前更新了一批真实数据后。
- 修改部署配置或 PWA 配置后。

当前工作流可以是：

1. Codex 本地连续修改和提交。
2. 阶段性确认页面可用。
3. 用 GitHub Desktop 一次性 push。
4. 等 GitHub Pages 自动发布。

## 内地镜像

内地镜像不建议另开一套代码。推荐策略：

1. 复用同一个 GitHub 仓库。
2. 镜像服务执行 `pnpm build`。
3. 发布 `dist/` 目录。
4. 镜像域名只作为备用链接发给亲友。

如果镜像服务部署在根路径，需要确认是否支持 `/worldcup-2026-pwa/` 这个 base path。若不支持，再单独调整构建配置；这个属于部署决策，改之前再确认。

## 分享给亲友

优先发两个链接：

- 主入口：内地镜像
- 备用入口：GitHub Pages

说明一句即可：如果一个打不开，就换另一个。

## 试用前复核

发链接前建议做一次简短复核：

1. 打开手机浏览器，确认首页、赛程、积分和球员榜都能正常滚动。
2. 随机点一场比赛，确认能跳到比赛详情。
3. 随机点一个直播或集锦入口，确认能打开对应外部页面。
4. 随机点一个球队或球员名，确认能跳到信息卡。
5. 如果使用内地镜像，再用 GitHub Pages 链接试一次作为备用入口。
