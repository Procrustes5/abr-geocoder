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
import {
  DatasetFileParams,
  IDatasetFile,
  IDatasetFileMeta,
} from '@domain/dataset-file';
import { DataField } from './data-field';
import { DataForPosFile } from './dataset-file';
import { IStreamReady } from '@domain/istream-ready';

export class ParcelPosDatasetFile
  extends DataForPosFile
  implements IDatasetFile
{
  get fields(): DataField[] {
    return [
      DataField.LG_CODE,
      DataField.MACHIAZA_ID,
      DataField.PRC_ID,
      DataField.REP_LON,
      DataField.REP_LAT,
    ];
  }

  constructor(params: DatasetFileParams) {
    super(params);
    Object.freeze(this);
  }

  static create(
    params: IDatasetFileMeta,
    csvFile: IStreamReady
  ): ParcelPosDatasetFile {
    const sql = `UPDATE
        "parcel"
      SET
        ${DataField.REP_LON.dbColumn} = @${DataField.REP_LON.dbColumn},
        ${DataField.REP_LAT.dbColumn} = @${DataField.REP_LAT.dbColumn}
      WHERE
        ${DataField.LG_CODE.dbColumn} = @${DataField.LG_CODE.dbColumn} AND
        ${DataField.MACHIAZA_ID.dbColumn} = @${DataField.MACHIAZA_ID.dbColumn} AND
        ${DataField.PRC_ID.dbColumn} = @${DataField.PRC_ID.dbColumn}
      `;
    return new ParcelPosDatasetFile({
      ...params,
      sql,
      csvFile,
    });
  }
}
