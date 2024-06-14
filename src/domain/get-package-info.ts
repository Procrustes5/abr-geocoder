/*!
 * MIT License
 *
 * Copyright (c) 2023 デジタル庁
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { packageJsonMeta } from '@domain/package-json-meta';
import { parsePackageJson } from '@domain/parse-package-json';
import { upwardFileSearch } from '@domain/upward-file-search';
import { AbrgMessage } from './abrg-message/abrg-message';
import { AbrgError, AbrgErrorLevel } from './abrg-error/abrg-error';

/**
 * Package.json の情報を取得します。
 * @returns バージョンと説明の情報
 */
export const getPackageInfo = async (): Promise<packageJsonMeta> => {
  const packageJsonFilePath = await upwardFileSearch(__dirname, 'package.json');
  if (!packageJsonFilePath) {
    throw new AbrgError({
      messageId: AbrgMessage.CANNOT_FIND_PACKAGE_JSON_FILE,
      level: AbrgErrorLevel.ERROR,
    });
  }

  return parsePackageJson({
    filePath: packageJsonFilePath,
  });
};
