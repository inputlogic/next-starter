import { decode } from "blurhash"

export const blurhashToDataURL = (hash, width = 32, height = 32) => {
  if (!hash) return undefined

  const pixels = decode(hash, width, height)
  return parsePixels(pixels, width, height)
}

const parsePixels = (pixels, width, height) => {
  const pixelsString = Array.from(pixels).map(byte => String.fromCharCode(byte)).join("")
  const pngString = generatePng(width, height, pixelsString)
  const dataURL = typeof Buffer !== "undefined"
    ? Buffer.from(getPngArray(pngString)).toString("base64")
    : btoa(pngString)
  return "data:image/png;base64," + dataURL
}

const getPngArray = (pngString) => {
  const pngArray = new Uint8Array(pngString.length)
  for (let i = 0; i < pngString.length; i++) {
    pngArray[i] = pngString.charCodeAt(i)
  }
  return pngArray
}

const generatePng = (width, height, rgbaString) => {
  const DEFLATE_METHOD = String.fromCharCode(0x78, 0x01)
  const CRC_TABLE = []
  const SIGNATURE = String.fromCharCode(137, 80, 78, 71, 13, 10, 26, 10)
  const NO_FILTER = String.fromCharCode(0)

  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    }
    CRC_TABLE[n] = c
  }

  const inflateStore = (data) => {
    const MAX_STORE_LENGTH = 65535
    let storeBuffer = ""

    for (let i = 0; i < data.length; i += MAX_STORE_LENGTH) {
      const remaining = Math.min(data.length - i, MAX_STORE_LENGTH)
      const blockType = String.fromCharCode(remaining <= MAX_STORE_LENGTH ? 0x01 : 0x00)
      storeBuffer += blockType +
        String.fromCharCode(remaining & 0xFF, (remaining & 0xFF00) >>> 8) +
        String.fromCharCode((~remaining) & 0xFF, ((~remaining) & 0xFF00) >>> 8) +
        data.substring(i, i + remaining)
    }

    return storeBuffer
  }

  const adler32 = (data) => {
    const MOD_ADLER = 65521
    let a = 1, b = 0

    for (let i = 0; i < data.length; i++) {
      a = (a + data.charCodeAt(i)) % MOD_ADLER
      b = (b + a) % MOD_ADLER
    }

    return (b << 16) | a
  }

  const crc = (buf) => {
    let c = 0xffffffff
    for (let n = 0; n < buf.length; n++) {
      c = CRC_TABLE[(c ^ buf.charCodeAt(n)) & 0xff] ^ (c >>> 8)
    }
    return c ^ 0xffffffff
  }

  const dwordAsString = (dword) => String.fromCharCode(
    (dword >> 24) & 0xFF, (dword >> 16) & 0xFF, (dword >> 8) & 0xFF, dword & 0xFF
  )

  const createChunk = (length, type, data) =>
    dwordAsString(length) + type + data + dwordAsString(crc(type + data))

  const createIHDR = (width, height) => {
    const IHDRdata = dwordAsString(width) + dwordAsString(height) +
      String.fromCharCode(8) + String.fromCharCode(6) +
      String.fromCharCode(0) + String.fromCharCode(0) + String.fromCharCode(0)
    return createChunk(13, "IHDR", IHDRdata)
  }

  const IEND = createChunk(0, "IEND", "")
  const IHDR = createIHDR(width, height)

  let scanlines = ""
  for (let y = 0; y < rgbaString.length; y += width * 4) {
    scanlines += NO_FILTER + rgbaString.substr(y, width * 4)
  }

  const compressedScanlines = DEFLATE_METHOD + inflateStore(scanlines) + dwordAsString(adler32(scanlines))
  const IDAT = createChunk(compressedScanlines.length, "IDAT", compressedScanlines)

  return SIGNATURE + IHDR + IDAT + IEND
}
