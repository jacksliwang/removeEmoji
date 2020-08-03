/*
 * @Author: Wangxt
 * @Date: 2020-08-03 13:43:34
 * @LastEditors: Wangxt
 * @LastEditTime: 2020-08-03 13:44:45
 * @Description:
 */

 // 目前只加绒下列范围内的emoji

function isEmojiCharacter(substring) {
  for (let i = 0; i < substring.length; i++) {
    var hs = substring.charCodeAt(i);
    if (0xd800 <= hs && hs <= 0xdbff) {
      if (substring.length > 1) {
        var ls = substring.charCodeAt(i + 1);
        var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000;
        if (0x1d000 <= uc && uc <= 0x1f77f) {
          return { flag: true, num: i };
        }
      }
    } else if (substring.length > 1) {
      var ls = substring.charCodeAt(i + 1);
      if (ls == 0x20e3) {
        return { flag: true, num: i };
      }
    } else {
      if (0x2100 <= hs && hs <= 0x27ff) {
        return { flag: true, num: i };
      } else if (0x2B05 <= hs && hs <= 0x2b07) {
        return { flag: true, num: i };
      } else if (0x2934 <= hs && hs <= 0x2935) {
        return { flag: true, num: i };
      } else if (0x3297 <= hs && hs <= 0x3299) {
        return { flag: true, num: i };
      } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030
        || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b
        || hs == 0x2b50) {
        return { flag: true, num: i };
      }
    }
  }
}

function removeEmoji(str) { // 去掉emoji 字符
  let {flag, num} = isEmojiCharacter(str) || {}
  if (flag) {
    let str1
    if (!num) {
      str1 = str.substring(num + 4, str.length) // 这里的4表示  转unicode 编码会展示4位
    } else {
      str1 = str.substring(0, num) + str.substring(num + 4, str.length)
    }
    return removeEmoji(str1)
  }
  return str
}

