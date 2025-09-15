import * as compiler from 'vue-template-compiler'
import { compileTemplate } from '@vue/component-compiler-utils'
import type { VueTemplateCompiler } from '@vue/component-compiler-utils/dist/types'

export function stripTemplate(content: string) {
  content = content.trim()
  if (!content) {
    return content
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim()
}

export function stripScript(content: string) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/)
  return result && result[2] ? result[2].trim() : ''
}

function pad(source:string) {
  return source
    .split(/\r?\n/)
    .map(line => `  ${line}`)
    .join('\n');
}

export function genInlineComponentText(template: string, script: string) {
  const finalOptions = {
    source: `<div>${template}</div>`,
    filename: 'inline-component', // TODO：这里有待调整
    compiler: compiler as VueTemplateCompiler
  }
  const compiled = compileTemplate(finalOptions)

  if (compiled.tips && compiled.tips.length) {
    compiled.tips.forEach((tip) => {
      console.warn(tip)
    })
  }

  // errors
  if (compiled.errors && compiled.errors.length) {
    console.error(
      `\n  Error compiling template:\n${pad(compiled.source)}\n` +
        compiled.errors.map((e) => `  - ${e}`).join('\n') +
        '\n'
    )
  }

  let demoComponentContent = `
    ${compiled.code}
  `

  script = script.trim();
  if (script) {
    script = script.replace(/export\s+default/, 'const democomponentExport =');
  } else {
    script = 'const democomponentExport = {}';
  }
  demoComponentContent = `(function() {
    ${demoComponentContent}
    ${script}
    return {
      render,
      staticRenderFns,
      ...democomponentExport
    }
  })()`;
  return demoComponentContent;
}
