declare namespace Utils {
  interface loadjs {
    state: string
  }
}

function load (script: HTMLScriptElement, resolve, reject): void {
  script.onload = function () {
    this.onerror = this.onload = null
    resolve('success')
  }
  script.onerror = function () {
    this.onerror = this.onload = null
    reject(new Error('Failed to load ' + script.src))
  }
}

function ieLoad (script, resolve): void {
  script.onreadystatechange = function () { // 脚本加载成功后
    if (this.readyState !== 'complete' && this.readyState !== 'loaded') return // 脚本没加载好则不执行回调函数 ie浏览器会自动报错
    this.onreadystatechange = null
    resolve('success')
  }
}

export const loadjs = async (path: string): Promise<Utils.loadjs> => {
  return await new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = path
    document.head.appendChild(script)
    if ('onloadl' in script) {
      load(script, resolve, reject)
    } else {
      // ie浏览器
      ieLoad(script, resolve)
    }
  })
}
