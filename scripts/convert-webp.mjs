// 将 public/portfolio 下的 PNG 批量转为 WebP（保留透明通道/圆角）
import sharp from 'sharp'
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'

const dir = new URL('../public/portfolio', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')

const files = (await readdir(dir)).filter((f) => f.endsWith('.png'))
let before = 0
let after = 0

for (const f of files) {
  const src = path.join(dir, f)
  const dst = src.replace(/\.png$/, '.webp')
  await sharp(src).webp({ quality: 82, alphaQuality: 90 }).toFile(dst)
  before += (await stat(src)).size
  after += (await stat(dst)).size
}

console.log(`converted ${files.length} files`)
console.log(`before: ${(before / 1024 / 1024).toFixed(2)} MB`)
console.log(`after:  ${(after / 1024 / 1024).toFixed(2)} MB (${((after / before) * 100).toFixed(0)}%)`)
