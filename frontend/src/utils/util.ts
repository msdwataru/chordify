// 配列を指定サイズのチャンクに分割するヘルパー関数
function chunk<T>(array: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(array.length / size) }, (_, index) =>
      array.slice(index * size, index * size + size)
    )
}

export { chunk }