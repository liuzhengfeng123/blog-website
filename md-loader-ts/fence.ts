import type MarkdownIt from 'markdown-it'

// 覆盖默认的 fence 渲染策略
export default (md:MarkdownIt) => {
  // const defaultRender = md.renderer.rules.fence!;
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    // 判断该 fence 是否在 :::demo 内
    let prevToken = tokens[idx - 1];
    if(prevToken && prevToken.type === 'html_block' && prevToken.content.includes('<!-- prettier-ignore -->')) {
      prevToken = tokens[idx - 2]
    }
    const isInDemoContainer = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^demo\s*(.*)$/)
    if (token.info === 'vue' && isInDemoContainer) {
      return `<template slot="highlight"><pre v-pre><code class="vue">${md.utils.escapeHtml(token.content)}</code></pre></template>`;
    } else {
      return `<fence-code-block language="${token.info}" code-content="${token.content}"></fence-code-block>`
    }
  };
};
