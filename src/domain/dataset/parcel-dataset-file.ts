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
import { DatasetFileParams, IDatasetFileMeta } from '@domain/dataset-file';
import { DataField } from '@domain/dataset/data-field';
import { IStreamReady } from '@domain/istream-ready';
import { DataWithDateFile } from './dataset-file';

export class ParcelDatasetFile
  extends DataWithDateFile
  implements IDatasetFileMeta
{
  get fields(): DataField[] {
    return [
      DataField.LG_CODE,
      DataField.MACHIAZA_ID,
      DataField.PRC_ID,
      DataField.CITY,
      DataField.WARD,
      DataField.OAZA_CHO,
      DataField.CHOME,
      DataField.KOAZA,
      DataField.PRC_NUM1,
      DataField.PRC_NUM2,
      DataField.PRC_NUM3,
      DataField.RSDT_ADDR_FLG,
      DataField.PRC_REC_FLG,
      DataField.PRC_AREA_CODE,
      DataField.EFCT_DATE,
      DataField.ABLT_DATE,
      DataField.SRC_CODE,
      DataField.REMARKS,
      DataField.REAL_PROP_NUM,
    ];
  }

  constructor(params: DatasetFileParams) {
    super(params);
    Object.freeze(this);
  }

  static create(
    params: IDatasetFileMeta,
    csvFile: IStreamReady
  ): ParcelDatasetFile {
    const sql = `INSERT OR REPLACE INTO "parcel"
      (
        ${DataField.LG_CODE.dbColumn},
        ${DataField.MACHIAZA_ID.dbColumn},
        ${DataField.PRC_ID.dbColumn},
        ${DataField.CITY.dbColumn},
        ${DataField.WARD.dbColumn},
        ${DataField.OAZA_CHO.dbColumn},
        ${DataField.CHOME.dbColumn},
        ${DataField.KOAZA.dbColumn},
        ${DataField.PRC_NUM1.dbColumn},
        ${DataField.PRC_NUM2.dbColumn},
        ${DataField.PRC_NUM3.dbColumn},
        ${DataField.RSDT_ADDR_FLG.dbColumn},
        ${DataField.PRC_REC_FLG.dbColumn},
        ${DataField.PRC_AREA_CODE.dbColumn},
        ${DataField.EFCT_DATE.dbColumn},
        ${DataField.ABLT_DATE.dbColumn},
        ${DataField.SRC_CODE.dbColumn},
        ${DataField.REMARKS.dbColumn},
        ${DataField.REAL_PROP_NUM.dbColumn}
      )
      VALUES
      (
        @${DataField.LG_CODE.dbColumn},
        @${DataField.MACHIAZA_ID.dbColumn},
        @${DataField.PRC_ID.dbColumn},
        @${DataField.CITY.dbColumn},
        @${DataField.WARD.dbColumn},
        @${DataField.OAZA_CHO.dbColumn},
        @${DataField.CHOME.dbColumn},
        @${DataField.KOAZA.dbColumn},
        @${DataField.PRC_NUM1.dbColumn},
        @${DataField.PRC_NUM2.dbColumn},
        @${DataField.PRC_NUM3.dbColumn},
        @${DataField.RSDT_ADDR_FLG.dbColumn},
        @${DataField.PRC_REC_FLG.dbColumn},
        @${DataField.PRC_AREA_CODE.dbColumn},
        @${DataField.EFCT_DATE.dbColumn},
        @${DataField.ABLT_DATE.dbColumn},
        @${DataField.SRC_CODE.dbColumn},
        @${DataField.REMARKS.dbColumn},
        @${DataField.REAL_PROP_NUM.dbColumn}
      )
      `;
    return new ParcelDatasetFile({
      ...params,
      sql,
      csvFile,
    });
  }
}