# progresspie
从不同角度创造自定义元素.

# how to use
## step 1
- npm install -g cnpm --registry=https://registry.npm.taobao.org
- cnpm install easy-pie --save

## step 2
import EasyPie from 'easy-pie';

- use in react

<pre>
    <EasyPie
        createElement={React.createElement}
        width="150px"
        height="150px"
        percent="45"
        backColor="#655"
        percentColor="yellowgreen"
    />

    react 通过jsx创建自定义组件并导出html模版，为了借用它这种工作模式，需要把React.createElement方法传入进来  否则返回空内容

    react 同时适用下面这种方法
</pre>

- use in 其他框架

<pre>
    <easy-pie
        width="150px"
        height="150px"
        percent="45"
        backColor="#655"
        percentColor="yellowgreen"
    >
    </easy-pie>

    在引人组件的时候同时创建了自定义元素 easy-pie 直接在html传入对应属性即可
</pre>

### github
[Jared](https://github.com/aisriver/easy-pie.git)