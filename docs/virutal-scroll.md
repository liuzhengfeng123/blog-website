# ElTreeVirtualScroll 虚拟滚动树

对 `element-ui` 树形控件 `el-tree` 进行了重构，用虚拟滚动的构造弥补了原始组件大数据量卡顿的不足。

## 安装与引入

安装

```bash
npm i el-tree-virtual-scroll -S
```

全局注册

```js
import VirtualScroll from 'el-tree-virtual-scroll'
import 'el-tree-virtual-scroll/styles/index.css' // 如果已经引入了 element-ui 官方样式则不必重复引用
Vue.component('virtualScroll', VirtualScroll)
```

或者局部注册

```js
import VirtualScroll from 'el-tree-virtual-scroll'

export default {
  component: {
    VirtualScroll
  }
  // ...
}
```

## 基础用法

基础的树形结构展示。

:::demo 要启用虚拟滚动数组，必须设置属性 `height` 和 `node-key`，`height` 是虚拟滚动树的容器高度，可以设为 `number` 类型或 `string` 类型，如果是 `number` 类型，则会被应用为如 `style.height: props.height + 'px'`，如果是 `string` 类型如 `600px` 则会被直接赋值如 `style.height: props.height`</br>如果树的节点高度不是 `26px` (`el-tree` 默认节点高度)，还需要传 `itemSize` 用于计算当前滚动位置该展示的列表。

```vue
<template>
  <virtual-scroll :data="data" node-key="id" :height="300" :item-size="26" />
</template>
<script>
export default {
  data() {
    return {
      data: []
    }
  },
  created() {
    const getKey = (prefix, id) => {
      return `${prefix}-${id}`
    }

    const createData = (maxDeep, maxChildren, minNodesNumber, deep = 1, key = 'node') => {
      let id = 0
      return Array.from({ length: minNodesNumber })
        .fill(deep)
        .map(() => {
          const childrenNumber =
            deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren)
          const nodeKey = getKey(key, ++id)
          return {
            id: nodeKey,
            label: nodeKey,
            children: childrenNumber
              ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
              : undefined
          }
        })
    }
    this.data = createData(4, 15, 15)
  }
}
</script>
```

:::

## 可选择

适用于需要选择层级时使用。
:::demo 当节点总数在 **20000** 以下时组件运行顺畅，但当节点超过 **30000** 时，勾选或者过滤数组就会有较明显的卡顿，这是由于`Vue` 组件实例会递归遍历 `data` 数组中的每一层的所有节点对象并通过 `Object.defineProperty` 将该对象的所有属性改写成响应式，这并不是由海量 `DOM` 节点带来的性能负担。

```vue
<template>
  <virtual-scroll :data="data" node-key="id" :height="300" show-checkbox />
</template>
<script>
export default {
  data() {
    return {
      data: []
    }
  },
  created() {
    const getKey = (prefix, id) => {
      return `${prefix}-${id}`
    }

    const createData = (maxDeep, maxChildren, minNodesNumber, deep = 1, key = 'node') => {
      let id = 0
      return Array.from({ length: minNodesNumber })
        .fill(deep)
        .map(() => {
          const childrenNumber =
            deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren)
          const nodeKey = getKey(key, ++id)
          return {
            id: nodeKey,
            label: nodeKey,
            children: childrenNumber
              ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
              : undefined
          }
        })
    }
    this.data = createData(4, 15, 15)
  }
}
</script>
```

:::

## 默认展开和默认选中

树节点可以在初始化阶段被设置为展开或选中。

分别通过 `default-expanded-keys` 和 `default-checked-keys` 设置默认展开和默认选中的节点。

:::demo

```vue
<template>
  <virtual-scroll
    :data="data"
    node-key="id"
    :height="300"
    show-checkbox
    :default-checked-keys="defaultCheckedKeys"
    :default-expanded-keys="defaultExpandedKeys"
  />
</template>
<script>
export default {
  data() {
    return {
      data: [],
      defaultExpandedKeys: [],
      defaultCheckedKeys: []
    }
  },
  created() {
    const getKey = (prefix, id) => {
      return `${prefix}-${id}`
    }

    const createData = (maxDeep, maxChildren, minNodesNumber, deep = 1, key = 'node') => {
      let id = 0
      return Array.from({ length: minNodesNumber })
        .fill(deep)
        .map(() => {
          const childrenNumber =
            deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren)
          const nodeKey = getKey(key, ++id)
          return {
            id: nodeKey,
            label: nodeKey,
            children: childrenNumber
              ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
              : undefined
          }
        })
    }
    this.data = createData(4, 15, 15)
    for (let datum of this.data) {
      const children = datum.children
      if (children) {
        this.defaultExpandedKeys.push(datum.id)
        this.defaultCheckedKeys.push(children[0].id)
        break
      }
    }
  }
}
</script>
```

:::

## 自定义节点内容

节点的内容支持自定义，可以在节点区添加按钮或图标等内容
:::demo

```vue
<template>
  <virtual-scroll :data="data" node-key="id" :height="300" default-expand-all>
    <template v-slot="{ node, data }">
      <div>
        <i
          :class="[
            'pefix',
            node.isLeaf
              ? 'el-icon-document is-leaf'
              : node.expanded
                ? 'el-icon-folder-opened'
                : 'el-icon-folder'
          ]"
        ></i>
        <span class="">{{ data.id }} - {{ data.label }}</span>
      </div>
    </template>
  </virtual-scroll>
</template>
<script>
export default {
  data() {
    return {
      data: []
    }
  },
  created() {
    const getKey = (prefix, id) => {
      return `${prefix}-${id}`
    }

    const createData = (maxDeep, maxChildren, minNodesNumber, deep = 1, key = 'node') => {
      let id = 0
      return Array.from({ length: minNodesNumber })
        .fill(deep)
        .map(() => {
          const childrenNumber =
            deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren)
          const nodeKey = getKey(key, ++id)
          return {
            id: nodeKey,
            label: nodeKey,
            children: childrenNumber
              ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
              : undefined
          }
        })
    }
    this.data = createData(4, 15, 15)
  }
}
</script>
<style lang="scss" scoped>
.pefix {
  margin-right: 10px;
  color: #409eff;

  &.is-leaf {
    color: #67c23a;
  }
}
</style>
```

:::

## 一键展开和一键收缩

虚拟滚动树提供了新的树方法： `expandAllNode` 和 `collapseAllNode` 可以一次性展开和收缩所有节点

:::demo

<!-- prettier-ignore -->
```vue
<template>
  <div>
    <div style="margin-bottom: 10px;">
      <el-button type="primary" size="small" @click="$refs.tree.expandAllNode()">expand all</el-button>
      <el-button type="info" size="small" @click="$refs.tree.collapseAllNode()">collapse all</el-button>
    </div>
    <virtual-scroll ref="tree" :data="data" node-key="id" :height="300" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: []
    }
  },
  created() {
    const getKey = (prefix, id) => {
      return `${prefix}-${id}`
    }

    const createData = (maxDeep, maxChildren, minNodesNumber, deep = 1, key = 'node') => {
      let id = 0
      return Array.from({ length: minNodesNumber })
        .fill(deep)
        .map(() => {
          const childrenNumber =
            deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren)
          const nodeKey = getKey(key, ++id)
          return {
            id: nodeKey,
            label: nodeKey,
            children: childrenNumber
              ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
              : undefined
          }
        })
    }
    this.data = createData(4, 15, 15)
  }
}
</script>
```

:::

## 节点过滤

通过关键字过滤树节点

:::demo 在需要对节点进行过滤时，调用 Tree 实例的`filter`方法，参数为关键字。需要注意的是，此时需要设置`filter-node-method`，值为过滤函数。

```vue
<template>
  <div>
    <div style="margin-bottom: 10px;">
      <el-input
        v-model="query"
        style="width: 240px"
        placeholder="Please enter keyword"
        @input="onQueryChanged"
      />
    </div>
    <virtual-scroll
      ref="tree"
      :data="data"
      node-key="id"
      :height="300"
      :filter-node-method="filterMethod"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      data: [],
      query: ''
    }
  },
  methods: {
    onQueryChanged() {
      this.$refs.tree.filter(this.query)
    },
    filterMethod(val, data) {
      return data.label.includes(val)
    }
  },
  created() {
    const getKey = (prefix, id) => {
      return `${prefix}-${id}`
    }

    const createData = (maxDeep, maxChildren, minNodesNumber, deep = 1, key = 'node') => {
      let id = 0
      return Array.from({ length: minNodesNumber })
        .fill(deep)
        .map(() => {
          const childrenNumber =
            deep === maxDeep ? 0 : Math.round(Math.random() * maxChildren)
          const nodeKey = getKey(key, ++id)
          return {
            id: nodeKey,
            label: nodeKey,
            children: childrenNumber
              ? createData(maxDeep, maxChildren, childrenNumber, deep + 1, nodeKey)
              : undefined
          }
        })
    }
    this.data = createData(4, 15, 15)
  }
}
</script>
<style lang="scss" scoped>
.pefix {
  margin-right: 10px;
  color: #409eff;

  &.is-leaf {
    color: #67c23a;
  }
}
</style>
```

:::

## Tree API

### Attributes

| 参数                  | 说明                                                                                                                                       | 类型                                   | 可选值 | 默认值 |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- | ------ | ------ |
| data                  | 展示数据                                                                                                                                   | array                                  | —      | —      |
| height                | 虚拟滚动树容器高度                                                                                                                         | string,number                          | —      | —      |
| item-size             | 树节点高度                                                                                                                                 | number                                 | —      | —      |
| empty-text            | 内容为空的时候展示的文本                                                                                                                   | String                                 | —      | —      |
| node-key              | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的                                                                                       | String                                 | —      | —      |
| props                 | 配置选项，具体看下表                                                                                                                       | object                                 | —      | —      |
| render-after-expand   | 是否在第一次展开某个树节点后才渲染其子节点                                                                                                 | boolean                                | —      | true   |
| load                  | 加载子树数据的方法，仅当 lazy 属性为true 时生效                                                                                            | function(node, resolve)                | —      | —      |
| render-content        | 树节点的内容区的渲染 Function                                                                                                              | Function(h, { node, data, store }      | —      | —      |
| highlight-current     | 是否高亮当前选中节点，默认值是 false。                                                                                                     | boolean                                | —      | false  |
| default-expand-all    | 是否默认展开所有节点                                                                                                                       | boolean                                | —      | false  |
| expand-on-click-node  | 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。                           | boolean                                | —      | true   |
| check-on-click-node   | 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点。                                                           | boolean                                | —      | false  |
| auto-expand-parent    | 展开子节点的时候是否自动展开父节点                                                                                                         | boolean                                | —      | true   |
| default-expanded-keys | 默认展开的节点的 key 的数组                                                                                                                | array                                  | —      | —      |
| show-checkbox         | 节点是否可被选择                                                                                                                           | boolean                                | —      | false  |
| check-strictly        | 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法，默认为 false                                                                     | boolean                                | —      | false  |
| default-checked-keys  | 默认勾选的节点的 key 的数组                                                                                                                | array                                  | —      | —      |
| current-node-key      | 当前选中的节点                                                                                                                             | string, number                         | —      | —      |
| filter-node-method    | 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏                                            | Function(value, data, node)            | —      | —      |
| accordion             | 是否每次只打开一个同级树节点展开                                                                                                           | boolean                                | —      | false  |
| indent                | 相邻级节点间的水平缩进，单位为像素                                                                                                         | number                                 | —      | 16     |
| icon-class            | 自定义树节点的图标                                                                                                                         | string                                 | -      | -      |
| lazy                  | 是否懒加载子节点，需与 load 方法结合使用                                                                                                   | boolean                                | —      | false  |
| draggable             | 是否开启拖拽节点功能                                                                                                                       | boolean                                | —      | false  |
| allow-drag            | 判断节点能否被拖拽                                                                                                                         | Function(node)                         | —      | —      |
| allow-drop            | 拖拽时判定目标节点能否被放置。`type` 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后 | Function(draggingNode, dropNode, type) | —      | —      |

### props

| 参数     | 说明                                                     | 类型                          | 可选值 | 默认值 |
| -------- | -------------------------------------------------------- | ----------------------------- | ------ | ------ |
| label    | 指定节点标签为节点对象的某个属性值                       | string, function(data, node)  | —      | —      |
| children | 指定子树为节点对象的某个属性值                           | string                        | —      | —      |
| disabled | 指定节点选择框是否禁用为节点对象的某个属性值             | boolean, function(data, node) | —      | —      |
| isLeaf   | 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效 | boolean, function(data, node) | —      | —      |

### 方法

`Tree` 内部使用了 Node 类型的对象来包装用户传入的数据，用来保存目前节点的状态。
`Tree` 拥有如下方法：

| 方法名              | 说明                                                                                      | 参数                                                                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| expandAllNode       | 展开所有树节点                                                                            | ——                                                                                                                                               |
| collapseAllNode     | 收缩所有树节点                                                                            | ——                                                                                                                                               |
| filter              | 对树节点进行筛选操作                                                                      | 接收一个任意类型的参数，该参数会在 filter-node-method 中作为第一个参数                                                                           |
| updateKeyChildren   | 通过 keys 设置节点子元素，使用此方法必须设置 node-key 属性                                | (key, data) 接收两个参数，1. 节点 key 2. 节点数据的数组                                                                                          |
| getCheckedNodes     | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前被选中的节点所组成的数组        | (leafOnly, includeHalfChecked) 接收两个 boolean 类型的参数，1. 是否只是叶子节点，默认值为 `false` 2. 是否包含半选节点，默认值为 `false`          |
| setCheckedNodes     | 设置目前勾选的节点，使用此方法必须设置 node-key 属性                                      | (nodes) 接收勾选节点数据的数组                                                                                                                   |
| getCheckedKeys      | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前被选中的节点的 key 所组成的数组 | (leafOnly) 接收一个 boolean 类型的参数，若为 `true` 则仅返回被选中的叶子节点的 keys，默认值为 `false`                                            |
| setCheckedKeys      | 通过 keys 设置目前勾选的节点，使用此方法必须设置 node-key 属性                            | (keys, leafOnly) 接收两个参数，1. 勾选节点的 key 的数组 2. boolean 类型的参数，若为 `true` 则仅设置叶子节点的选中状态，默认值为 `false`          |
| setChecked          | 通过 key / data 设置某个节点的勾选状态，使用此方法必须设置 node-key 属性                  | (key/data, checked, deep) 接收三个参数，1. 勾选节点的 key 或者 data 2. boolean 类型，节点是否选中 3. boolean 类型，是否设置子节点 ，默认为 false |
| getHalfCheckedNodes | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前半选中的节点所组成的数组        | -                                                                                                                                                |
| getHalfCheckedKeys  | 若节点可被选择（即 `show-checkbox` 为 `true`），则返回目前半选中的节点的 key 所组成的数组 | -                                                                                                                                                |
| getCurrentKey       | 获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null   | —                                                                                                                                                |
| getCurrentNode      | 获取当前被选中节点的 data，若没有节点被选中则返回 null                                    | —                                                                                                                                                |
| setCurrentKey       | 通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性                     | (key) 待被选节点的 key，若为 null 则取消当前高亮的节点                                                                                           |
| setCurrentNode      | 通过 node 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性                    | (node) 待被选节点的 node                                                                                                                         |
| getNode             | 根据 data 或者 key 拿到 Tree 组件中的 node                                                | (data) 要获得 node 的 key 或者 data                                                                                                              |
| remove              | 删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性                                  | (data) 要删除的节点的 data 或者 node                                                                                                             |
| append              | 为 Tree 中的一个节点追加一个子节点                                                        | (data, parentNode) 接收两个参数，1. 要追加的子节点的 data 2. 子节点的 parent 的 data、key 或者 node                                              |
| insertBefore        | 为 Tree 的一个节点的前面增加一个节点                                                      | (data, refNode) 接收两个参数，1. 要增加的节点的 data 2. 要增加的节点的后一个节点的 data、key 或者 node                                           |
| insertAfter         | 为 Tree 的一个节点的后面增加一个节点                                                      | (data, refNode) 接收两个参数，1. 要增加的节点的 data 2. 要增加的节点的前一个节点的 data、key 或者 node                                           |

### Events

| 事件名称         | 说明                                                  | 回调参数                                                                                                                                                           |
| ---------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| node-click       | 节点被点击时的回调                                    | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。                                                                  |
| node-contextmenu | 当某一节点被鼠标右键点击时会触发该事件                | 共四个参数，依次为：event、传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。                                                           |
| check-change     | 节点选中状态发生变化时的回调                          | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点本身是否被选中、节点的子树中是否有被选中的节点                                               |
| check            | 当复选框被点击的时候触发                              | 共两个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性 |
| current-change   | 当前选中节点变化时触发的事件                          | 共两个参数，依次为：当前节点的数据，当前节点的 Node 对象                                                                                                           |
| node-expand      | 节点被展开时触发的事件                                | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身                                                                    |
| node-collapse    | 节点被关闭时触发的事件                                | 共三个参数，依次为：传递给 `data` 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身                                                                    |
| node-drag-start  | 节点开始拖拽时触发的事件                              | 共两个参数，依次为：被拖拽节点对应的 Node、event                                                                                                                   |
| node-drag-enter  | 拖拽进入其他节点时触发的事件                          | 共三个参数，依次为：被拖拽节点对应的 Node、所进入节点对应的 Node、event                                                                                            |
| node-drag-leave  | 拖拽离开某个节点时触发的事件                          | 共三个参数，依次为：被拖拽节点对应的 Node、所离开节点对应的 Node、event                                                                                            |
| node-drag-over   | 在拖拽节点时触发的事件（类似浏览器的 mouseover 事件） | 共三个参数，依次为：被拖拽节点对应的 Node、当前进入节点对应的 Node、event                                                                                          |
| node-drag-end    | 拖拽结束时（可能未成功）触发的事件                    | 共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点（可能为空）、被拖拽节点的放置位置（before、after、inner）、event                               |
| node-drop        | 拖拽成功完成时触发的事件                              | 共四个参数，依次为：被拖拽节点对应的 Node、结束拖拽时最后进入的节点、被拖拽节点的放置位置（before、after、inner）、event                                           |

### Scoped Slot

| name | 说明                                      |
| ---- | ----------------------------------------- |
| —    | 自定义树节点的内容，参数为 { node, data } |
